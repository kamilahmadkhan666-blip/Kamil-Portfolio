const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve portfolio files
app.use(express.static(path.join(__dirname, "..")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "!DOCTYPE html.html"));
});

// Contact form
app.post("/send-inquiry", async (req, res) => {
    try {
        const { name, email, phone, work, message } = req.body;

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            replyTo: email,
            subject: `Portfolio Inquiry — ${work}`,
            text: `Name: ${name}
Email: ${email}
Phone: ${phone}
Type of Work: ${work}

Message:
${message}`
        });

        res.json({
            success: true,
            message: "Inquiry sent successfully!"
        });

    } catch (error) {
        console.error("EMAIL ERROR:", error);

        res.status(500).json({
            success: false,
            message: "Failed to send inquiry."
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});