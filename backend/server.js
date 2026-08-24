const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
const PORT = process.env.PORT || 3000;;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test route
app.get("/", (req, res) => {
    res.send("Backend is working!");
});

// Contact form
app.post("/send-inquiry", async (req, res) => {

    try {

        const { name, email, phone, work, message } = req.body;

        console.log("Received inquiry:", {
            name,
            email,
            phone,
            work,
            message
        });

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        await transporter.sendMail({
            from: "kamilahmadkhan666@gmail.com",
            to: "kamilahmadkhan666@gmail.com",
            replyTo: email,
            subject: `Portfolio Inquiry — ${work}`,
            text:
`Name: ${name}
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

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});