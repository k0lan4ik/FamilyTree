const Router = require("express");
const router = new Router();
const personeRouter = require("./personeRouter");
const userRouter = require("./userRouter");

router.use("/user", userRouter);
router.use("/persone", personeRouter);

module.exports = router;
