const express = require('express');
const router = express.Router();

const accountsController = require('../controllers/accounts');

// GET: Retrive all accounts
router.route('/')
    .get(accountsController.getAll);

// POST: Creat a new account
router.route('/')
    .post(accountsController.createAccount);

router.put('/:id', accountsController.updateAccount);
router.delete('/:id', accountsController.deleteAccount);
    

module.exports = router;