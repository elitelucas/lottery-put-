const bcrypt = require("bcryptjs");
const Complaints = require("../models/Complaints");
const jwt = require("jsonwebtoken");
const Bonus1 = require("../models/Bonus1");
const Bonus2 = require("../models/Bonus2");
const User = require("../models/User");
const Apply = require("../models/Apply");
const { Console } = require("console");



exports.getBonus = async (req, res, next) => {

    switch (req.params.no) {
        case '0': {
            //level1
            const data = await Bonus1.find({ '$and': [{ applied: false }, { receiver: req.userFromToken._id }] });
            var total = data.reduce((all, ele) => all + parseFloat(ele.money), 0);
            const user = await User.findById(req.userFromToken._id);
            return res.status(200).json({ ref_code: user._id, total, count: user.refered1.length });

            break;
        }
        case '1': {
            //level1

            break;
        }
        case '10': {
            //level2
            Bonus2.find({ '$and': [{ applied: false }, { receiver: req.userFromToken._id }] }, (err, data) => {
                var total = data.reduce((all, ele) => all + parseFloat(ele.money), 0);
                User.findById(req.userFromToken._id, (err, user) => {
                    return res.status(200).json({ ref_code: user._id, total, count: user.refered2.length });
                });
            });
            break;
        }
        case '11': {
            //level2

            break;
        }
        case '100': {
            //level1+2
            const page=req.params.page;
            const data1 = await Bonus1.find({ receiver: req.userFromToken._id }).skip((page - 1) * 20).limit(20);
            const data2 = await Bonus2.find({ receiver: req.userFromToken._id }).skip((page - 1) * 20).limit(20);
            const total1 = await Bonus1.countDocuments({ receiver: req.userFromToken._id });
            const total2 = await Bonus2.countDocuments({ receiver: req.userFromToken._id });
            const total = total1 > total2 ? total1 : total2;
            res.status(200).json({ bonus1: data1, bonus2: data2, page, last_page: Math.ceil(total / 20) });
            break;
        }
    }

};

exports.postApply = (req, res, next) => {
    if (req.params.no == '0') {
        Bonus1.find({ '$and': [{ applied: false }, { receiver: req.userFromToken._id }] }, (err, data) => {
            var total = data.reduce((all, ele) => all + parseFloat(ele.money), 0);
            if (total < 100)
                return res.status(400).json({ error: 'smaller than 100' });
            else {
                const tmp = {};
                tmp.money = total;
                tmp.level = 1;
                tmp.user = req.userFromToken._id;
                new Apply(tmp).save();
                data.forEach(ele => {
                    ele.applied = true;
                    ele.save();
                })

                User.findById(req.userFromToken._id, (err, user) => {
                    user.budget = parseFloat(user.budget) + total;
                    user.save();
                    return res.status(200).json({ message: 'ok' });
                })
            }
        });
    } else {
        Bonus2.find({ '$and': [{ applied: false }, { receiver: req.userFromToken._id }] }, (err, data) => {
            var total = data.reduce((all, ele) => all + parseFloat(ele.money), 0);
            if (total < 100)
                return res.status(400).json({ error: 'smaller than 100' });
            else {
                const tmp = {};
                tmp.money = total;
                tmp.level = 2;
                tmp.user = req.userFromToken._id;
                new Apply(tmp).save();
                data.forEach(ele => {
                    ele.applied = true;
                    ele.save();
                })
                User.findById(req.userFromToken._id, (err, user) => {
                    user.budget = parseFloat(user.budget) + total;
                    user.save();
                    return res.status(200).json({ message: 'ok' });
                })
            }
        });
    }

};
exports.getApply =async (req, res, next) => {
    const page = req.params.page;

    const data = await Apply.find({ user: req.userFromToken._id }).skip((page - 1) * 20).limit(20);
    const total = await Apply.countDocuments({ user: req.userFromToken._id });
    return res.status(200).json({ data: data, page, last_page: Math.ceil(total / 20) });

};
exports.getRefered = async (req, res, next) => {
    if (req.params.level == '0') {
        const user = await User.findById(req.userFromToken._id)
        .populate('refered1');
        var referers = user.refered1;

        for (var i = 0; i < referers.length; i++) {
            referers[i] = referers[i].phone;
        }
        // console.log(referers);
        return res.status(200).json({ data: referers });

    } else {
        const user = await User.findById(req.userFromToken._id)
        .populate('refered2');
        var referers = user.refered2;

        for (var i = 0; i < referers.length; i++) {
            referers[i] = referers[i].phone;
        }
        // console.log(referers);
        return res.status(200).json({ data: referers });
    }

};
