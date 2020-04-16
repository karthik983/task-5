const express = require("express");

const router = express.Router();
const { performance, PerformanceObserver } = require("perf_hooks")
const { check, validationResult } = require('express-validator');
router.get("/", (req, res) => {
    res.send("get data user")
})


const Users = require("../models/newusers")

router.post("/send", [
    check('email').isEmail().withMessage("Please Enter Valid email"),
    check('password').isLength({ min: 6 }).withMessage("Password length should be more than 6 characters!"),
    check("address").notEmpty().withMessage("Enter your Address")
], performance.timerify(poster=(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    else {
        let userN = req.body
        const newuser = new Users(userN)
        newuser.save((err) => {
            if (err) {
                res.send("something went wrong")
            } else {
                res.send(newuser)
                console.log(`The memory used is ${Math.floor((process.memoryUsage().heapUsed)/1024/1024)}MB`)

            }
        })
    }
})
)


router.get("/get", 
performance.timerify
 (getme=(req, res) => {
    Users.find({}, (err, data) => {
        if (err) {
            throw err;
        }
        res.send(data)
        console.log(`The memory used is ${(process.memoryUsage().heapUsed)/1024/1024}KB`)
    })
})
)

// Delete a data

router.delete("/del/:email", performance.timerify((req, res) => {
    Users.remove({ email: req.params.email }, (err) => {
        if (err) {
            throw err;
        }
        res.send("SuccessFully Deleted!")
    })
})
)


router.put("/put/:id", (req, res) => {
    Users.findById(req.params.id, (err, user_data) => {
        if (err) {
            throw err;
        }
        user_data.password = req.body.password;

        user_data.save((err) => {

            if (err) {
                throw err;
            }

            res.send(user_data)
        })
    })
})

const obs= new PerformanceObserver((list)=>{
    console.log(list.getEntries()[0].duration)
    performance.clearMarks()
})
obs.observe({entryTypes:["function"]})

module.exports = router;