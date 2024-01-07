var express = require('express');
var router = express.Router();

var income= 30500.00;
var expense = 10000.00

/* GET Available Budget. */
router.get('/', function(req, res, next) {
    const availableBudget = 20500.00;
    res.send(JSON.stringify(availableBudget));
});

/* GET Income. */
router.get('/income', function(req, res, next) {
    res.send(JSON.stringify(income));
});

/* GET Expense. */
router.get('/expense', function(req, res, next) {
    res.send(JSON.stringify(expense));
});

router.post('/income', function(req,res, next){
    console.log(req.body);
    income = req.body?.ammount;
    console.log(income);
    res.send(JSON.stringify(income))
});

router.post('/expense', function(req,res, next){
    console.log(req.body);
    expense = req.body?.ammount;
    console.log(expense);
    res.send(JSON.stringify(expense))
});

module.exports = router;