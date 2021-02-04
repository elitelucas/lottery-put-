const Complaints = require("../models/User");
const User = require("../models/User");
const Withdrawl = require("../models/Withdrawl");
const bcrypt = require("bcryptjs");
const Recharge = require("../models/Recharge");
const Recharging = require("../models/Recharging");
const unirest = require('unirest');
var crypto = require('crypto');
const axios = require("axios");
var usd_baht = 1;

axios.get(`http://data.fixer.io/api/latest?access_key=${process.env.FIXER}&symbols=usd,thb`)
    .then((res) => {
        // console.log(res);
        usd_baht = res.data.rates.USD / res.data.rates.THB;
        // console.log(usd_baht);
    })
    .catch((error) => {
        console.error(error)
    });
setInterval(() => {
    axios.get(`http://data.fixer.io/api/latest?access_key=${process.env.FIXER}&symbols=usd,thb`)
        .then((res) => {
            usd_baht = res.data.rates.USD / res.data.rates.THB;
            // console.log(usd_baht);
        })
        .catch((error) => {
            console.error(error)
        });
}, 3600000*8);

exports.postBank = (req, res, next) => {

    const comp = req.body;
    // console.log(comp);
    User.findById(req.userFromToken._id, (err, user) => {

        user.bank_card.push(comp);
        user.save();
        return res.status(200).json({ message: "Add succesfully" });
    })
    // new Complaints(comp).save((err,user)=>{
    //     console.log(err);
    //     return res.status(200).json({message:"Send succesfully"});
    // });

};
exports.deleteBank = (req, res, next) => {
    const key = req.body.key;
    User.findById(req.userFromToken._id, (err, user) => {
        user.bank_card.splice(key, 1);

        user.save();
        return res.status(200).json({ message: "Remove succesfully" });
    })

    // new Complaints(comp).save((err,user)=>{
    //     console.log(err);
    //     return res.status(200).json({message:"Send succesfully"});
    // });

};


exports.postWithdrawl = async (req, res, next) => {
    const amount = Math.abs(parseFloat(req.body.amount));
    if(amount<100 || amount>1000){
        return res.status(400).json({ error: "Withdrawal allowed : $ 100~1000" });
    }
    const user = await User.findById(req.userFromToken._id);
    if (user.withdrawals > user.bets) {
        return res.status(400).json({
            error: `Amount of bet = $ ${user.withdrawals} 
        Valid bet = $ ${user.bets}
        Pending bet= $ ${user.withdrawals - user.bets}`
        });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (isMatch) {
        if (parseFloat(user.budget) < amount)
            return res.status(401).json({ error: "You don't have enough money!" });
        const comp = {};
        comp.user = user._id;
        comp.bank_code = req.body.bankCode;
        comp.province = req.body.province;
        comp.order_amount = req.body.amount;
        comp.acc_no = req.body.accNo;
        comp.acc_name = req.body.accName;
        comp.summary = "Withdrawal from the Lottery";

        user.budget = parseFloat(user.budget) - amount;
        await user.save();
        await (new Withdrawl(comp)).save();
        return res.status(200).json({ message: 'success! It will be take a few minutes to transfer.' });
    } else return res.status(401).json({ error: "Password incorrect!" });
};

exports.getAdminWithdrawl = async (req, res, next) => {
    const page = req.params.page;
    let withdrawls, total;
    if(req.params.status==2){
        withdrawls = await Withdrawl.find({}).sort("-createdAt").skip((page - 1) * 20).limit(20);
        total = await Withdrawl.countDocuments({});
    }else{
        withdrawls = await Withdrawl.find({ status: req.params.status }).sort("-createdAt").skip((page - 1) * 20).limit(20);
        total = await Withdrawl.countDocuments({ status: req.params.status });
    }
    const res_data = [];
    for (var i = 0; i < withdrawls.length; i++) {
        try {
            const aa = await User.findById(withdrawls[i].user);
            res_data[i] = {};
            res_data[i].createdAt = withdrawls[i].createdAt;
            res_data[i]._id = withdrawls[i]._id;
            res_data[i].status = withdrawls[i].status;
            res_data[i].userId = aa._id;
            res_data[i].userNickname = aa.nickname;
            res_data[i].userPhone = aa.phone;
            res_data[i].order_amount = withdrawls[i].order_amount;
            res_data[i].bank_code = withdrawls[i].bank_code;
            res_data[i].province = withdrawls[i].province;
            res_data[i].acc_no = withdrawls[i].acc_no;
            res_data[i].acc_name = withdrawls[i].acc_name;
            res_data[i].email = aa.email;
        } catch (ex) {
            continue;
        }
    }
    return res.status(200).json({ data: res_data, page, last_page: Math.ceil(total / 20) });
};

exports.postAdminWithdrawl = async (req, res, next) => {
    var withdrawl = await Withdrawl.findById(req.body.id);
    var user = await User.findById(withdrawl.user);
    if(withdrawl.status!=0){
        return res.status(400).json({ message: 'Only waiting withdrawals can be controlled' });
    }
    switch (req.body.status) {
        case -1: {
            //decline

            user.budget = parseFloat(user.budget) + parseFloat(withdrawl.order_amount);
            console.log(user.budget);
            withdrawl.status = -1;
            const saved_w = await withdrawl.save();
            const saved = await user.save();
            return res.status(200).json({ message: 'ok' });
        }
        case 1: {
            //approve
            let body = {
                acc_name: withdrawl.acc_name,
                acc_no: withdrawl.acc_no,
                bank_code: withdrawl.bank_code,
                ccy_no: "THB",
                mer_no: process.env.PAYMENT_NO,
                mer_order_no: req.body.id,
                order_amount: Math.floor(withdrawl.order_amount/usd_baht),
                province: withdrawl.province,
                summary: withdrawl.summary
            };
            // console.log(process.env.PAYMENT_WITHDRAWAL_URL);
            const sign = crypto.createHash('md5')
                .update(`acc_name=${body.acc_name}&acc_no=${body.acc_no}&bank_code=${body.bank_code}` +
                    `&ccy_no=${body.ccy_no}&mer_no=${body.mer_no}&mer_order_no=${body.mer_order_no}` +
                    `&order_amount=${body.order_amount}&province=${body.province}&summary=${body.summary}&key=${process.env.PAYMENT_KEY}`).digest("hex");
            // console.log(`acc_name=${body.acc_name}&acc_no=${body.acc_no}&bank_code=${body.bank_code}` +
            //     `&ccy_no=${body.ccy_no}&mer_no=${body.mer_no}&mer_order_no=${body.mer_order_no}` +
            //     `&order_amount=${body.order_amount}&summary=${body.summary}&key=${process.env.PAYMENT_KEY}`)
            withdrawl.sign = sign;
            body = { ...body, sign };
            console.log(`acc_name=${body.acc_name}&acc_no=${body.acc_no}&bank_code=${body.bank_code}` +
                `&ccy_no=${body.ccy_no}&mer_no=${body.mer_no}&mer_order_no=${body.mer_order_no}` +
                `&order_amount=${body.order_amount}&province=${body.province}&summary=${body.summary}&key=${process.env.PAYMENT_KEY}`)
            console.log(body);

            await unirest
                .post(process.env.PAYMENT_WITHDRAWAL_URL)
                .headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' })
                .encoding('utf-8')
                .send(body)
                .then(async (response) => {
                    // console.log(response)
                    if (response.body) {
                        console.log(response.body)
                        if (response.body.status.toLowerCase() == "success") {
                            withdrawl.status = 1;
                            const saved_w = await withdrawl.save();
                            const financial={};
                            financial.type="Withdrawal";
                            financial.amount=-parseInt(withdrawl.order_amount);
                            financial.details={};
                            financial.details.orderID=withdrawl.id;
                            user.financials.push(financial);
                            await user.save();
                            return res.status(200).json({ message: 'ok' });
                        } else {
                            user.budget = parseFloat(user.budget) + parseFloat(withdrawl.order_amount);
                                
                            withdrawl.status = -2;
                            await user.save();
                            const saved_w = await withdrawl.save();
                            return res.status(400).json({ message: 'failed' });
                        }

                    } else {
                        withdrawl.status = -2;
                        user.budget = parseFloat(user.budget) + parseFloat(withdrawl.order_amount);

                        await user.save();
                        const saved_w = await withdrawl.save();
                        return res.status(400).json({ message: 'failed' });
                    }
                }).catch(async (err) => {
                    withdrawl.status = -2;
                    user.budget = parseFloat(user.budget) + parseFloat(withdrawl.order_amount);

                    await user.save();
                    const saved_w = await withdrawl.save();
                    return res.status(400).json({ message: 'failed' });
                });
        }
    }



};



exports.getAdminRecharge = async (req, res, next) => {
    const page = req.params.page;
    const recharges = await Recharge.find({}).sort("-createdAt").skip((page - 1) * 20).limit(20);
    const total = await Recharge.countDocuments({});
    const res_data = [];
    for (var i = 0; i < recharges.length; i++) {
        try {
            const aa = await User.findById(recharges[i].user);
            res_data[i] = {};
            res_data[i]._id = recharges[i]._id;
            res_data[i].status = recharges[i].status;
            res_data[i].createdAt = recharges[i].createdAt;
            res_data[i].userId = aa._id;
            res_data[i].userNickname = aa.nickname;
            res_data[i].userPhone = aa.phone;
            res_data[i].money = recharges[i].money;

        } catch (ex) {
            continue;
        }

    }

    return res.status(200).json({
        data: res_data, page: page,
        last_page: Math.ceil(total / 20)
    });


    // new Complaints(comp).save((err,user)=>{
    //     console.log(err);
    //     return res.status(200).json({message:"Send succesfully"});
    // });

};

exports.postAdminRecharge =async (req, res, next) => {

    var recharge = await Recharge.findById(req.body.id);
    if (recharge.status == 1) {
        return res.status(400).json({ message: 'failed' });
    }
    var user = await User.findById(recharge.user);
    if (req.body.status == -1) {
        await recharge.remove();
        return res.status(200).json({ message: 'ok' });
    }
    if (req.body.status == 1 && recharge.status != 1)
        user.budget = parseFloat(user.budget) + parseFloat(recharge.money);
    recharge.status = req.body.status;
    const saved_w = await recharge.save();
    const saved = await user.save();
    return res.status(200).json({ message: 'ok' });

};



exports.getWithdrawlList = async (req, res, next) => {
    const page = req.params.page;
    await Withdrawl.updateMany({ user: req.userFromToken._id },{$set:{seen:true}});
    const withdrawls = await Withdrawl.find({ user: req.userFromToken._id }).sort({ _id: -1 }).skip((page - 1) * 20).limit(20);
    const total = await User.countDocuments({ user: req.userFromToken._id });
    return res.status(200).json({ data: withdrawls, page, last_page: Math.ceil(total / 20) });


    // new Complaints(comp).save((err,user)=>{
    //     console.log(err);
    //     return res.status(200).json({message:"Send succesfully"});
    // });

};

exports.getRechargeList = async (req, res, next) => {
    const page = req.params.page;
    const recharges = await Recharge.find({ user: req.userFromToken._id }).sort({ _id: -1 }).skip((page - 1) * 20).limit(20);
    const total = await Recharge.countDocuments({ user: req.userFromToken._id });
    return res.status(200).json({ data: recharges, page, last_page: Math.ceil(total / 20) });


};
exports.postRecharge = async (req, res, next) => {
    // const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    // console.log(ip);
    const amount=parseInt(req.body.money);
    // console.log("amount=" + amount);
    if (amount === "" || req.body.email === "") {
        return res.status(400).json({ error: "Please input correct data" });
    }
    if(amount<50){
        return res.status(400).json({ error: "More than 50$ recharged allowed" });
    }
    const user = await User.findById(req.userFromToken._id)
    const comp = {};
    comp.user = req.userFromToken._id;
    comp.order_amount = amount;
    comp.pname = req.body.name;
    comp.pemail = req.body.email;
    comp.phone = req.body.phone;
    comp.accNo = req.body.accNo;
    comp.bankCode = req.body.method;
    comp.busi_code=req.body.methodType;
    user.email = req.body.email;
    const saved = await user.save();
    const data = await new Recharging(comp).save();
    // const sign = crypto.createHash('md5')
    //     .update(`busi_code=${data.busi_code}&ccy_no="INR"&countryCode="IND"&goods="Make deposit"&mer_no=${process.env.PAYMENT_NO}` +
    //         `&mer_order_no=${data.id}&notifyUrl=${process.env.APP_URL + "/notify-recharge"}` +
    //         `&order_amount=${data.order_amount}&pageUrl=${process.env.APP_URL + "/response-recharge"}` +
    //         `&pemail=${data.pemail}&phone=${data.phone}&pname=${data.pname}&key=${process.env.PAYMENT_KEY}`).digest("hex");
    let body = {
        accNo:data.accNo,
        bankCode:data.bankCode,
        busi_code: data.busi_code,
        ccy_no: "THB",
        countryCode: "THA",
        goods: "Make deposit",
        mer_no: process.env.PAYMENT_NO,
        mer_order_no: data.id,
        notifyUrl: process.env.APP_URL + "api/notify-recharge",
        order_amount: Math.abs(Math.ceil(data.order_amount/usd_baht)),
        pageUrl: process.env.APP_URL + "api/response-recharge",
        pemail: data.pemail,
        phone: data.phone,
        pname: data.pname,
        timeout_express: '30m'

    }

    const sign = crypto.createHash('md5')
        .update(`accNo=${body.accNo}&bankCode=${body.bankCode}&busi_code=${body.busi_code}&ccy_no=THB&countryCode=THA&goods=${body.goods}&mer_no=${body.mer_no}` +
            `&mer_order_no=${body.mer_order_no}&notifyUrl=${body.notifyUrl}` +
            `&order_amount=${body.order_amount}&pageUrl=${body.pageUrl}` +
            `&pemail=${body.pemail}&phone=${body.phone}&pname=${body.pname}&timeout_express=30m&key=${process.env.PAYMENT_KEY}`).digest("hex");
    // console.log(`busi_code=${body.busi_code}&ccy_no="INR"&countryCode="IND"&goods=${body.goods}&mer_no=${body.mer_no}` +
    // `&mer_order_no=${body.mer_order_no}&notifyUrl=${body.notifyUrl}` +
    // `&order_amount=${body.order_amount}&pageUrl=${body.pageUrl}` +
    // `&pemail=${body.pemail}&phone=${body.phone}&pname=${body.pname}&timeout_express=30m&key=${process.env.PAYMENT_KEY}`);
    // console.log(`busi_code=${data.busi_code}&goods="Make deposit"&mer_no=${process.env.PAYMENT_NO}` +
    //     `&mer_order_no=${data.id}&notifyUrl=${process.env.APP_URL + "/notify-recharge"}` +
    //     `&order_amount=${data.order_amount}&pageUrl=${process.env.APP_URL + "/response-recharge"}` +
    //     `&pemail=${data.pemail}&phone=${data.phone}&pname=${data.pname}&key=${process.env.PAYMENT_KEY}`);
    // console.log(sign);
    data.sign = sign;
    await data.save();
    body = { ...body, sign };
    console.log(body);
    console.log(process.env.PAYMENT_DEPOSIT_URL)
    await unirest
        .post(process.env.PAYMENT_DEPOSIT_URL)
        .headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' })
        .encoding('utf-8')
        .send(body)
        .then(function (response) {
            if (response.body) {
                console.log(response.body);
                if(response.body.status=='SUCCESS')
                    return res.status(200).json({ url: response.body.order_data });
                else
                    return res.status(400).json({ error: "Failed"});
            } else {
                return res.status(400).json({ error: "Failed"});
            }
        });







};
exports.postResponseRecharge = async (req, res, next) => {
    // const data = `busi_code=UPI&err_code=!00000&err_msg=!00000` +
    //     `&mer_no=gm761100000067975&mer_order_no=5fe341db97811392a80ec1a8` +
    //     `&order_amount=1000&order_no=2012230000000526387201051906&order_time=2020-12-23 20:10:51` +
    //     `&pay_amount=1000&pay_time=2020-12-23 20:13:16&status=SUCCESS&key=${process.env.PAYMENT_KEY}`
    // const sign = crypto.createHash('md5')
    //     .update(data).digest("hex");
    // console.log(data);
    // console.log(sign)
    return res.redirect('/my/recharge');

};
exports.getResponseRecharge = async (req, res, next) => {
    // const data = `busi_code=UPI&err_code=!00000&err_msg=!00000` +
    //     `&mer_no=gm761100000067975&mer_order_no=5fe341db97811392a80ec1a8` +
    //     `&order_amount=1000&order_no=2012230000000526387201051906&order_time=2020-12-23 20:10:51` +
    //     `&pay_amount=1000&pay_time=2020-12-23 20:13:16&status=SUCCESS&key=${process.env.PAYMENT_KEY}`
    // const sign = crypto.createHash('md5')
    //     .update(data).digest("hex");
    // console.log(data);
    // console.log(sign)
    return res.redirect('/my/recharge');

};
exports.postNotifyRecharge = async (req, res, next) => {
    try {
        // console.log(req.body);
        const recharging = await Recharging.findById(req.body.mer_order_no);
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        // console.log(ip);
        const data = `busi_code=UPI&err_code=${req.body.err_code}&err_msg=${req.body.err_msg}` +
            `&mer_no=${req.body.mer_no}&mer_order_no=${req.body.mer_order_no}` +
            `&order_amount=${req.body.order_amount}&order_no=${req.body.order_no}&order_time=${req.body.order_time}` +
            `&pay_amount=${req.body.pay_amount}&pay_time=${req.body.pay_time}&status=${req.body.status}&key=${process.env.PAYMENT_KEY}`
        const sign = crypto.createHash('md5')
            .update(data).digest("hex");
        // console.log(sign);
        // console.log(req.body.sign);
        if (recharging && sign == req.body.sign && (ip == process.env.PAYMENT_IP1 || ip == process.env.PAYMENT_IP2) && req.body.status == 'SUCCESS') {
            // console.log('Succeed');
            const recharge = new Recharge();
            recharge.user = recharging.user;
            recharge.phone = recharging.phone;
            recharge.money = req.body.pay_amount;
            recharge.status = 1;
            await recharge.save();
            const user = await User.findById(recharge.user);
            if (user.recharged) {
                user.budget += parseInt(recharge.money);
                user.withdrawals+=parseInt(recharge.money)*6;
                const financial={};
                financial.type="Recharge";
                financial.amount=parseInt(recharge.money);
                financial.details={};
                financial.details.orderID=recharge.id;
                user.financials.push(financial);
            } else {
                user.budget += Math.floor(parseInt(recharge.money) * 1.35);
                user.withdrawals+=Math.floor(parseInt(recharge.money) * 1.35)*6;
                user.recharged = true;
                const financial={};
                financial.type="Recharge";
                financial.amount=Math.floor(parseInt(recharge.money) * 1.35);
                financial.details={};
                financial.details.orderID=recharge.id;
                user.financials.push(financial);
            }            
            
            await user.save();
            await recharging.remove();
            return res.json({});
        }
        return res.json({});
    } catch (err) {
        const recharging = await Recharging.find(req.body.mer_order_no);

        // console.log(sign);
        return res.redirect('/my/recharge');
    }


    // new Complaints(comp).save((err,user)=>{
    //     console.log(err);
    //     return res.status(200).json({message:"Send succesfully"});
    // });

};
exports.getBudget = async (req, res, next) => {
    var user = await User.findById(req.userFromToken._id);

    return res.status(200).json({ budget: user.budget });


    // new Complaints(comp).save((err,user)=>{
    //     console.log(err);
    //     return res.status(200).json({message:"Send succesfully"});
    // });

};
exports.getAdminWithdrawalDownload=async (req, res, next) => {
    let withdrawls, total;
    if(req.params.status==2){
        withdrawls = await Withdrawl.find({}).sort("-createdAt").populate('user');
    }else{
        withdrawls = await Withdrawl.find({ status: req.params.status }).populate('user');
    }
    res.json(withdrawls);
};