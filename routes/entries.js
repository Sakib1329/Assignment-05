var express = require("express");
const db = require("../database");
var router = express.Router();

// GET /:id - get all entry
router.get("/", async function (req, res) {
    // fetch data from postgres
    const result = await db.query("SELECT * FROM entries;");

    // send the data as response
    res.send(result.rows);
});

// GET /:id - get single entry
router.get("/:id", async function (req, res) {
    // fetch data from postgres
    const result = await db.query(`SELECT * FROM entries WHERE id=$1;`,[req.params.id]);

    // send the data as response
    res.send(result.rows);
});

// POST - Insert single entry
router.post("/", async function (req, res) {
    // read data from client
    const { title, amount, type } = req.body;

    const errors = [];
    if (title.length < 5) {
        errors.push("Title is too short");
    }
    if (amount < 0) {
        errors.push("Value must be positive");
    }
    if (!["income", "expense"].includes(type)) {
        errors.push("Invalid type - please use expense or income");
    }

    if (errors.length > 0) {
        return res.status(400).send({
            errorType: "VALIDATION_ERROR",
            errors,
        });
    }

    // save data to database
    const result = await db.query(
        `INSERT INTO entries (title, amount, type) VALUES ($1, $2, $3) RETURNING *;`,
        [title, amount, type]
    );

    // send the new entry as response
    res.send(result.rows[0]);
});

// PATCH /:id - update single entry
router.patch("/:id", async function (req, res) {

    const { title, amount, type } = req.body;

    const errors = [];
    if (title.length < 5) {
        errors.push("Title is too short");
    }
    if (amount < 0) {
        errors.push("Value must be positive");
    }
    if (!["income", "expense"].includes(type)) {
        errors.push("Invalid type - please use expense or income");
    }

    if (errors.length > 0) {
        return res.status(400).send({
            errorType: "VALIDATION_ERROR",
            errors,
        });
    }

    // save data to database
    const result = await db.query(
        `UPDATE entries SET title=$1, amount=$2, type=$3 WHERE id = $4 RETURNING *;`,
        [title, amount, type, req.params.id]
    );

    res.send(result.rows[0]);
});

// DELETE /:id - delete single entry
router.delete("/:id",async function(req,res){
    const result = await db.query(`DELETE FROM entries WHERE id=$1;`,[req.params.id]);
    res.send("Deleted successfully!");
});

module.exports = router;