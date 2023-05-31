const express = require("express");
const router = express.Router();
const ctrlSuperheroes = require("../controller/superheroes");
const uploadCloud = require('../middleware/image');

router.post("/", ctrlSuperheroes.create);

router.put("/:superheroId", ctrlSuperheroes.access, ctrlSuperheroes.edit);

router.delete("/:superheroId", ctrlSuperheroes.access, ctrlSuperheroes.remove);

router.get("/", ctrlSuperheroes.showAll);

router.get("/:superheroId", ctrlSuperheroes.showOne);

router.patch(
  "/image/:superheroId",
  uploadCloud.single("flatImage"),
  ctrlSuperheroes.addImage
);

// router.post("/access", ctrlSuperheroes.access)

module.exports = router;
