const {
  registration,
  otpBaseActivation,
  tokenBaseActivation,
  login,
  changePassword,
  resetPasswordRequest,
  resetPassword,
  refreshtoken
} = require("../controllers/security");



const router = require("express").Router();

router.post("/auth/register", registration);
router.post("/auth/otpActivation", otpBaseActivation);
router.post("/auth/tokenActivation", tokenBaseActivation);
router.post("/auth/login", login);
router.post("/auth/changePassword", changePassword);
router.post("/auth/resetPasswordRequest", resetPasswordRequest);
router.post("/auth/resetPassword", resetPassword);
router.post("/auth/refreshtoken", refreshtoken);

module.exports = router;
