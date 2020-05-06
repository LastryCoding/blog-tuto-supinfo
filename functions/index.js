const functions = require("firebase-functions");
const app = require("express")();

const COURS = require("./api/routes/cours");

app.use("/cours", COURS);

exports.api = functions.region("europe-west3").https.onRequest(app);
