const mongodb = require('../data/database');
const ObjectId  = require('mongodb').ObjectId;

// GET: Retrieve all accounts
const getAll = async (req, res) => {
    //#swagger.tags=['Accounts']
    try {
        const result = await mongodb.getDatabase().db().collection('accounts').find();
        const accounts = await result.toArray();

        if (accounts.length === 0) {
            return res.status(404).json({ message: "No accounts found." });
        }

        res.status(200).json(accounts);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving accounts", error: error.message });
    }
};

// POST: Crete a new account
const createAccount = async (req, res) => {
    //#swagger.tags=['Accounts']
    const accounttId = new ObjectId(req.params.id);
    const account = {
        name: req.body.name,
        email: req.body.email,
        accountType: req.body.accountType,
        initialDeposit: req.body.initialDeposit
    };
    const response = await mongodb.getDatabase().db().collection('accounts').insertOne(account);
    if (response.acknowledged > 0) {
        res.status(204).send();
    }   else {
        res.status(500).json(response.error || 'Error creating account');
    }
};

// PUT: Update account details
const updateAccount = async (req, res) => {
    //#swagger.tags=['Accounts']
    const accountId = new ObjectId(req.params.id);
    const account = {
        name: req.body.name,
        email: req.body.email,
        accountType: req.body.accountType,
        initialDeposit: req.body.initialDeposit
    };
    const response = await mongodb.getDatabase().db().collection('accounts').replaceOne({_id: accountId }, account);
    if (response.modifiedCount > 0) {
        res.status(204).send({ message: "Account updated successfully." });
    }   else {
        res.status(500).json(response.error || 'An error is occured while updating the account.');
    }
};

// DELETE: Remove an account
const deleteAccount = async (req, res) => {
    //#swagger.tags=['Accounts']
    const accountId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('accounts').deleteOne({_id: accountId });
    if (response.deletedCount > 0) {
        res.status(204).send({ message: "Account deleted successfully." });
    }   else {
        res.status(500).json(response.error || 'An error is occured while deleting the contact.');
    }

     
};



module.exports = {
    getAll,
    createAccount,
    updateAccount,
    deleteAccount
};
