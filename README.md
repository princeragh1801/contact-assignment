# Contact Management System

## Introduction
The **Contact Management System** is a web application designed to help users efficiently manage and organize contact information. It allows users to add, view, update, and delete contact details such as names, email addresses, phone numbers, company, and job titles. This feature-rich system simplifies the process of managing business relationships and ensures that all contact data is accessible, up-to-date, and easy to navigate.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Features
1. **Add New Contacts**:
   - Users can add a contact using a form with fields for:
     - First Name
     - Last Name
     - Email
     - Phone Number
     - Company
     - Job Title

2. **View Contacts**:
   - A table displays all contacts with features like:
     - Sorting
     - Pagination
     - Action buttons for editing and deleting.

3. **Edit Contact Information**:
   - Update any contact's details to keep information current.

4. **Delete Contacts**:
   - Remove outdated or duplicate entries to maintain a clean database.

## Technologies Used
- **Frontend**: ReactJS with Material UI (MUI) components for a modern and responsive UI.
- **Backend**: Node.js for building a robust RESTful API.
- **Database**: MongoDB for storing and managing contact data.

## Installation

### Prerequisites
- [Node.js](https://nodejs.org/) installed.
- MongoDB set up locally or a MongoDB Atlas account.

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/contact-management-system.git
   cd contact-management-system
2. Navigate to the frontend folder and install dependencies
    ```bash
    cd frontend
    npm install

3. Navigate to the backend folder and install dependencies
    ```bash
    cd ../backend
    npm install

4. Set up the Database Connection
    In the backend directory, create a `.env` file.
    Add your MongoDB connection string and backend port to the `.env` file:

    ```env
    MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/contact-management
    PORT=5000

## Usage

### Adding a New Contact:
1. Click on the "Add Contact" button.
2. Fill out the form fields:
   - First Name
   - Last Name
   - Email
   - Phone Number
   - Company
   - Job Title
3. Submit the form to save the contact.

### Viewing Contacts:
1. View all saved contacts in the table.
2. Use the pagination and sorting options to browse through large contact lists.

### Editing a Contact:
1. Click the "Edit" button in the actions column for a contact.
2. Modify the fields and save the changes.

### Deleting a Contact:
1. Click the "Delete" button in the actions column to remove a contact.

