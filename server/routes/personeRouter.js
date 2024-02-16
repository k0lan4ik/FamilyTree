const Router = require("express");
const router = new Router();
const personeController = require("../controllers/personeController");

router.post("/", personeController.create);
router.get("/", personeController.getAll);
router.get("/:id", personeController.getOne);
router.post("/img/:id", personeController.setImage);
router.post("/delete/:id", personeController.destroy);
router.post("/change/:id", personeController.changeOne);
router.post("/info/", personeController.createInfo);
router.get("/info/", personeController.getAllInfo);
router.post("/info/change/:id", personeController.changeOneInfo);
router.post("/info/delete/:id", personeController.destroyOneInfo);

module.exports = router;
