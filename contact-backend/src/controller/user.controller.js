
import { User } from "../models/user.model.js"
import { asyncHandler } from "../utils/asyncHandler.js";

const getContacts = asyncHandler(async (req, res) => {
    try {
        // Default values for pagination, sorting, and search
        const { page = 1, limit = 10, sortBy = 'firstName', sortOrder = 'asc', search = '' } = req.body;
        const order = sortOrder === 'asc' ? 1 : -1;
        
        // Calculate the starting index for pagination
        const skip = (page - 1) * limit;

        // Create search conditions
        const searchQuery = {
            isActive: true,
            $or: [
                { firstName: { $regex: search, $options: 'i' } },
                { lastName: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
                { phoneNumber: { $regex: search, $options: 'i' } }
            ]
        };

        // Fetch contacts with pagination, sorting, and search
        const contacts = await User.find(searchQuery)
            .sort({ [sortBy]: order })
            .skip(skip)
            .limit(limit);

        // Fetch the total number of contacts that match the search query for pagination info
        const totalItems = await User.countDocuments(searchQuery);

        // Send the response with total items count
        return res.status(200).json(
            {
                status: 200,
                data : {contacts, totalItems},
                message : "Contacts fetched successfully"
            }
        );
    } catch (error) {
        console.error("Error occurred while fetching contact list", error);
        return res.status(500).json(new Response(500, null, "Error occurred while fetching contact list"));
    }
});


const addContact = asyncHandler(async (req, res) => {
    try {
        console.log("Inside add contact");
        const { firstName, lastName, email, phoneNumber, company, jobTitle } = req.body;
        console.log("First name:", firstName);

        // Check if any field is empty
        if ([firstName, lastName, email, phoneNumber, company, jobTitle].some(field => !field?.trim())) {
            return res.status(400).json({
                status: 400,
                data: null,
                message: "All fields are required"
            });
        }

        const response = await User.create({
            firstName,
            lastName,
            company,
            email,
            jobTitle,
            phoneNumber,
            isActive: true
        });
        await response.save();
        if(!response){
            console.log("Error while saving : ");
            return res.status(500).json({
                status : 500,
                data : null,
                message : "Error while saving the entity in database"
            })
        }
        console.log("Response:", response);
        return res.status(201).json({
            status: 201,
            data: response._id,
            message: "Contact created successfully"
        });
    } catch (error) {
        console.error("Error while adding contacts:", error);
        return res.status(500).json({
            status: 500,
            data: null,
            message: "Error occurred while adding new contact"
        });
    }
});


const deleteContact = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        
        // Find the contact by ID and isActive status
        const contact = await User.findOne({ _id: id, isActive: true });
        if (contact == null) {
            return res.status(404).json({
                    status : 404,
                    data : null,
                    message : "Contact with the given ID not found"
            }
            );
        }

        // Update isActive to false
        await User.updateOne({ _id: id }, { $set: { isActive: false } });

        return res.status(200).json(
            {
                status : 200,
                data : null,
                message : "Contact successfully removed"
            }
            
        );
    } catch (error) {
        console.error("Error while deleting contact:", error);
        return res.status(500).json(
            new Response(
                500,
                null,
                "Error occurred while marking the contact as inactive"
            )
        );
    }
});

const updateContact = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, email, phoneNumber, company, jobTitle } = req.body;

        // Validate required fields
        if ([firstName, lastName, email, phoneNumber, company, jobTitle].some(field => field?.trim() === "")) {
            return res.status(400).json({status : 400, data : null, message : "All fields are required"});
        }

        // Find and update the contact
        const updatedContact = await User.findByIdAndUpdate(
            id,
            { firstName, lastName, company, email, jobTitle, phoneNumber },
            { new: true }  // Returns the updated document
        );
        
        // If contact not found
        if (!updatedContact) {
            return res.status(404).json({status : 404, data : null, message : "Contact not found"});
        }

        // Successful update response
        return res.status(200).json({status:200, data : null, message :"Contact updated successfully"});

    } catch (error) {
        console.error("Error while updating contact:", error);
        return res.status(500).json(new Response(500, null, "Error occurred while updating contact"));
    }
});

export {
    getContacts,
    addContact,
    updateContact,
    deleteContact
}