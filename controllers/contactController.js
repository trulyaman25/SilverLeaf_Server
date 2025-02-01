import Contact from "../models/contactModel.js";

export const createContact = async (req, res) => {
    try {
        const { firstName, lastName, email, phoneNumber, countryCode, message } = req.body;

        if (!firstName || !email || !message) {
            return res.status(400).json({ 
                error: "Required fields are missing",
                details: "First name, email, and message are required" 
            });
        }

        const contactData = {
            firstName,
            lastName,
            email,
            phoneNumber: phoneNumber ? phoneNumber : undefined,
            countryCode: countryCode || "+91",
            message
        };

        const newContact = new Contact(contactData);
        const savedContact = await newContact.save();
        res.status(201).json({ 
            success: true,
            message: "Form submitted successfully", 
            contact: savedContact 
        });
    } catch (error) {
        console.error('Error saving contact:', error);
        res.status(500).json({ 
            error: "Failed to submit form", 
            details: error.message 
        });
    }
};

export const getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};
