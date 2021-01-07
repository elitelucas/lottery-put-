const express = require("express");
const router = express.Router();
const user_controller = require("../controllers/user");
const enjoy_controller = require("../controllers/enjoy");
const checkAuth = require("../middleware/authChecker");
const checkAdmin = require("../middleware/adminChecker");
const checkSuperAdmin = require("../middleware/superAdminChecker");
const complaints_controller = require('../controllers/complaints');
const bonus_controller = require('../controllers/bonus');
const bank_controller = require('../controllers/bank');
const reward_controller = require('../controllers/reward');
const admin_controller = require('../controllers/admin');
/**
 * @route   POST /register
 * @desc    Register new user
 * @access  Public
 */
router.post("/signup",user_controller.validateUser, user_controller.user_register);

/**
 * @route   PUT /phone
 * @desc    Update user phone details and Send SMS OTP verfication code
 * @access  Private
 */
router.post("/phone", user_controller.user_phone);
router.post("/phoneChange", checkAuth, user_controller.user_phone_change);
/**
 * @route   POST /verify
 * @desc    Send SMS OTP verfication code
 * @access  Private
 */
router.post("/verify", user_controller.user_verify);
router.post("/nickname", checkAuth, user_controller.postNickname);
// @route   POST /login
// @desc    Login User / Returning JWT Token
// @access  Public
router.post("/login", user_controller.user_login);
router.post("/change-password", checkAuth, user_controller.change_password);
// @route   POST /enjoy
// @desc    enjoy request
// @access  Public
router.get("/enjoy/:level", checkAuth, enjoy_controller.getEnjoy);
router.post("/enjoy", checkAuth, enjoy_controller.postEnjoy);
router.get("/enjoy-page/:level/:page", checkAuth, enjoy_controller.getEnjoyPage);
router.get("/enjoy-my-page/:level/:page", checkAuth, enjoy_controller.getEnjoyMyPage);
//admin enjoy
router.get("/enjoy-admin/:level", checkAuth, checkAdmin, checkSuperAdmin, enjoy_controller.getEnjoyAdmin);
router.post("/enjoy-admin", checkAuth, checkAdmin, checkSuperAdmin, enjoy_controller.postEnjoyAdmin);
router.post("/enjoy-admin-auto", checkAuth, checkAdmin, checkSuperAdmin, enjoy_controller.postEnjoyAdminAuto);
//complaints
router.get("/complaints/:status/:page", checkAuth, complaints_controller.getComplaints);
router.post("/complaints", checkAuth,complaints_controller.postComplaints);
router.put("/complaints", checkAuth,complaints_controller.putComplaints);
router.get("/complaints-admin/:status/:page", checkAuth, checkAdmin, complaints_controller.getComplaintsAdmin);
router.post("/complaints-admin", checkAuth,checkAdmin,complaints_controller.postComplaintsAdmin);
router.get("/new-complaints", checkAuth,complaints_controller.getNewComplaints);
router.get("/new-complaints-admin", checkAuth, checkAdmin, complaints_controller.getNewComplaintsAdmin);



//Referal
router.get("/bonus/:no/:page?", checkAuth, bonus_controller.getBonus);
router.post("/apply/:no", checkAuth, bonus_controller.postApply);
router.get("/apply/:page", checkAuth, bonus_controller.getApply);
router.get("/refered/:level", checkAuth, bonus_controller.getRefered);

//Bank
router.post("/bank", checkAuth, bank_controller.postBank);
router.delete("/bank", checkAuth, bank_controller.deleteBank);
router.post("/withdrawl", checkAuth, bank_controller.postWithdrawl);
router.get("/withdrawlList/:page", checkAuth, bank_controller.getWithdrawlList);
router.get("/withdrawl-admin-download/:status", checkAuth, checkAdmin, checkSuperAdmin, bank_controller.getAdminWithdrawalDownload);
router.get("/withdrawl-admin/:status/:page", checkAuth, checkAdmin, bank_controller.getAdminWithdrawl);
router.post("/withdrawl-admin", checkAuth, checkAdmin, checkSuperAdmin, bank_controller.postAdminWithdrawl);
router.get("/recharge-admin/:page", checkAuth, checkAdmin, bank_controller.getAdminRecharge);
router.post("/recharge-admin", checkAuth, checkAdmin, bank_controller.postAdminRecharge);
router.post("/recharge", checkAuth, bank_controller.postRecharge);
router.get("/rechargeList/:page", checkAuth, bank_controller.getRechargeList);
router.post("/response-recharge", bank_controller.postResponseRecharge);
router.get("/response-recharge", bank_controller.getResponseRecharge);
router.post("/notify-recharge", bank_controller.postNotifyRecharge);
router.get("/budget", checkAuth, bank_controller.getBudget);

//reward
router.post("/reward", checkAuth, checkAdmin, reward_controller.createReward);
router.get("/rewards/:page", checkAuth, checkAdmin, reward_controller.listReward);
router.delete("/reward/:id", checkAuth, checkAdmin, reward_controller.deleteReward);
router.get("/reward/:id", reward_controller.putReward);

//admin users
router.get("/users/:page/:search?", checkAuth, checkAdmin, user_controller.getUsers);
router.get("/user/:id", checkAuth, checkAdmin, user_controller.getUser);
router.put("/pointUp/:id", checkAuth, checkAdmin, checkSuperAdmin, user_controller.putPointUp);
router.put("/pointDown/:id", checkAuth, checkAdmin, checkSuperAdmin, user_controller.putPointDown);
router.post("/balance/:id", checkAuth, checkAdmin, checkSuperAdmin, user_controller.patchBalance);
router.delete("/remove-user/:id", checkAuth, checkAdmin, checkSuperAdmin, user_controller.removeUser);
router.post("/add-user/", checkAuth, checkAdmin, checkSuperAdmin, user_controller.addUser);

//admin panel - statistics
router.get("/admin/total", checkAuth, checkAdmin, checkSuperAdmin, admin_controller.getTotal);
router.get("/admin/revenues/:from/:to", checkAuth, checkAdmin, checkSuperAdmin, admin_controller.getRevenue);
router.get("/admin/visits/:from/:to", checkAuth, checkAdmin, checkSuperAdmin, admin_controller.getVisit);
router.get("/admin/rws/:from/:to", checkAuth, checkAdmin, checkSuperAdmin, admin_controller.getRWS);


module.exports = router;
