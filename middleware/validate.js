// middleware/validate.js
const validateAccount = (req, res, next) => {
    const { name, email, accountType, initialDeposit } = req.body;

    // Validation checks
    if (!name || typeof name !== 'string') {
        return res.status(400).json({ message: "Invalid or missing 'name' field." });
    }
    if (!email || typeof email !== 'string' || !email.includes('@')) {
        return res.status(400).json({ message: "Invalid or missing 'email' field." });
    }
    if (!accountType || typeof accountType !== 'string') {
        return res.status(400).json({ message: "Invalid or missing 'accountType' field." });
    }
    if (initialDeposit === undefined || typeof initialDeposit !== 'number' || initialDeposit < 0) {
        return res.status(400).json({ message: "Invalid or missing 'initialDeposit' field." });
    }

    // Proceed to the next middleware or route handler
    next();
};

module.exports = {
    validateAccount
};
