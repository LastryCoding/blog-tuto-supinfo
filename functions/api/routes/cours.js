const express = require("express");
const router = express.Router();
const {
  addCoursDetails,
  create,
  getAllCours,
  getCours,
  deleteCours,
} = require("../controllers/cours");

// GET DATA OF ALL COURS
router.route("/").get(getAllCours);
// GET DATA OF ONE COURS
router.route("/id/:idCours").get(getCours);
// CREATE NEW
router.route("/create").post(create);
// UPDATE ONE
router.route("/update/:idCours").put(addCoursDetails);
// DELETE ONE
router.route("/delete/:idCours").delete(deleteCours);

module.exports = router;
