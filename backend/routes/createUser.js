const express = require('express');
const router = express.Router();
const user = require('../models/user');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require('express-validator');

router.post('/createuser', [
    body('role').not().isEmpty(),
    body('name').not().isEmpty(),
    body('email').isEmail(),
    body('clerkId').not().isEmpty(),
    body('resumeLink').not().isEmpty(),
    body('skills').not().isEmpty(),
    body('password').isLength({ min: 5 }) // Add password validation
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // Create user
        await user.create({
            role: req.body.role,
            name: req.body.name,
            email: req.body.email,
            clerkId: req.body.clerkId,
            resumeLink: req.body.resumeLink,
            skills: req.body.skills,
            password: hashedPassword // Save hashed password
        });

        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.json({ success: false, error: "An error occurred while creating the user." });
    }
});

router.post("/loginuser", [
    body('email').isEmail(),
    body('password').isLength({ min: 5 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        const userData = await user.findOne({ email });
        if (!userData) {
            return res.status(400).json({ errors: "Invalid credentials" });
        }

        const pwdCompare = await bcrypt.compare(password, userData.password);
        if (!pwdCompare) {
            return res.status(400).json({ errors: "Invalid credentials" });
        }

        const payload = {
            user: {
                id: userData.id
            }
        };

        const authToken = jwt.sign(payload, jwtSecret);
        return res.json({ success: true, authToken });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ errors: "Server error" });
    }
});

module.exports = router;
