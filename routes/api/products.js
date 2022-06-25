const express = require("express");
const { products: ctrl } = require("../../controllers");
const { ctrlWrapper } = require("../../middlewares");
const { isValidId } = require("../../middlewares");
const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAll));
router.get("/:id", isValidId, ctrlWrapper(ctrl.getById));
router.post("/", ctrlWrapper(ctrl.add));
router.put("/:id", isValidId, ctrlWrapper(ctrl.updateById));
router.delete("/:id", isValidId, ctrlWrapper(ctrl.removeById));

module.exports = router;
