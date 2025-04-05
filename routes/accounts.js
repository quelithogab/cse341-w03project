const express = require('express');
const router = express.Router();

const accountsController = require('../controllers/accounts');

const { validateAccount } = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');

// GET: Retrive all accounts
router.route('/')
    .get(accountsController.getAll);

// POST: Creat a new account
router.route('/')
    .post(isAuthenticated, validateAccount, accountsController.createAccount);

router.put('/:id', isAuthenticated, validateAccount, accountsController.updateAccount);
router.delete('/:id', isAuthenticated, validateAccount, accountsController.deleteAccount);
    

module.exports = router;