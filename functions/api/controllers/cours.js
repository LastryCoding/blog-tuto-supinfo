const {
  validateCoursData,
  reduceCoursDetails,
} = require("../validations/cours");
const { db } = require("../../utils/admin");
const coursRef = db.collection("cours"); // Pour ne pas réécrire toute la syntaxe.. :)

// Create Cours
exports.create = (req, res) => {
  const newCours = {
    name: req.body.name,
    fullProf: req.body.fullProf,
    // typeExam: req.body.typeExam,
    // nbrCredit: req.body.nbrCredit,
    // nbrHeure: req.body.nbrHeure,
  };

  const { valid, errors } = validateCoursData(newCours);
  if (!valid) return res.status(400).json(errors);

  coursRef
    .add(newCours)
    .then((doc) => {
      res.status(201).json({ message: `document ${doc.id} created successfully` });
    })
    .catch((err) => {
      res.status(500).json({ error: "something went wrong" });
      console.error(err);
    });
};

// Add Cours details
exports.addCoursDetails = (req, res) => {
  let coursDetails = reduceCoursDetails(req.body);

  const document = coursRef.doc(req.params.idCours);
  document
    .update(coursDetails)
    .then(() => {
      return res.json({ message: "Details added succesfully" });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};

// Chercher un cours dans la base de données
exports.getCours = (req, res) => {
  const document = coursRef.doc(req.params.idCours);
  document
    .get()
    .then((doc) => {
      let cours = {
        idCours: doc.id,
        ...doc.data(),
      };
      return res.json(cours);
    })
    .catch((err) => console.error(err));
};

// Récupérer tous les cours dans la base de données
exports.getAllCours = (req, res) => {
  coursRef
    .get()
    .then((data) => {
      let cours = [];
      data.forEach((doc) => {
        cours.push({
          idCours: doc.id,
          ...doc.data(),
        });
      });
      return res.json(cours);
    })
    .catch((err) => console.error(err));
};

// Supprimer un cours
exports.deleteCours = (req, res) => {
  const document = coursRef.doc(req.params.idCours);
  document
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Cours not found" });
      } else {
        return document.delete();
      }
    })
    .then(() => {
      res.json({ message: "Cours deleted successfully" });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};
