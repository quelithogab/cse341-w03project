const mongodb = require('../data/database');
const ObjectId  = require('mongodb').ObjectId;

// GET: Retrieve all accounts
const getAll = async (req, res) => {
    //#swagger.tags=['Contacts']
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
    //#swagger.tags=['Contacts']
    const { name, email, accountType, initialDeposit } = req.body;

    if (!name || !email || !accountType || initialDeposit == null) {
        return res.status(400).json({ message: "All fields are required (name, email, accountType, initialDeposit)." });
    }

    if (initialDeposit < 0) {
        return res.status(400).json({ message: "Initial deposit cannot be negative." });
    }

    try {
        const newAccount = { name, email, accountType, balance: initialDeposit, createdAt: new Date() };
        const response = await mongodb.getDatabase().collection('accounts').insertOne(newAccount);

        res.status(201).json({ id: response.insertedId });
    } catch (error) {
        res.status(500).json({ message: "Error creating account", error: error.message });
    }
};

// PUT: Update account details
const updateAccount = async (req, res) => {
    //#swagger.tags=['Contacts']
    const { id } = req.params;
    const { name, email, accountType, balance } = req.body;

    if (!ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid account ID" });
    }

    if (!name || !email || !accountType || balance == null) {
        return res.status(400).json({ message: "All fields are required." });
    }

    try {
        const updatedAccount = { name, email, accountType, balance };
        const response = await mongodb.getDatabase().collection('accounts').updateOne(
            { _id: new ObjectId(id) },
            { $set: updatedAccount }
        );

        if (response.matchedCount === 0) {
            return res.status(404).json({ message: "Account not found." });
        }

        res.status(200).json({ message: "Account updated successfully." });
    } catch (error) {
        res.status(500).json({ message: "Error updating account", error: error.message });
    }
};

// DELETE: Remove an account
const deleteAccount = async (req, res) => {
    //#swagger.tags=['Contacts']
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid account ID" });
    }

    try {
        const response = await mongodb.getDatabase().collection('accounts').deleteOne({ _id: new ObjectId(id) });

        if (response.deletedCount === 0) {
            return res.status(404).json({ message: "Account not found." });
        }

        res.status(200).json({ message: "Account deleted successfully." });
    } catch (error) {
        res.status(500).json({ message: "Error deleting account", error: error.message });
    }
};



module.exports = {
    getAll,
    createAccount,
    updateAccount,
    deleteAccount
};
