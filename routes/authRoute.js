const {
  registration,
  otpBaseActivation,
  tokenBaseActivation,
  login,
  logout,
  changePassword,
  resetPasswordRequest,
  resetPassword,
  refreshtoken
} = require("../controllers/security");
const { authenticate } = require("../middlewares");

const router = require("express").Router();

router.post("/auth/register", registration);
router.post("/auth/otpActivation", otpBaseActivation);
router.post("/auth/tokenActivation", tokenBaseActivation);
router.post("/auth/login", login);
router.post("/auth/changePassword", changePassword);
router.post("/auth/resetPasswordRequest", resetPasswordRequest);
router.post("/auth/resetPassword", resetPassword);
router.post("/auth/refreshtoken", refreshtoken);
router.route("/auth/logout").put(authenticate, logout)


module.exports = router;
