# 💰 Mini Expense Tracker

A MERN stack application to track daily income and expenses.
Built for JIET Open Innovations Labs - Internship Task 2.

## Features
- Add, edit, delete transactions
- Separate income and expense records
- Calculate total income, total expenses, and balance
- Search and filter by type and category
- Input validation on frontend and backend
- Responsive UI

## Tech Stack
- MongoDB Atlas
- Express.js
- React.js
- Node.js

## Setup Instructions

### 1. Clone the repository
git clone https://github.com/anshulvyas2003/expense-tracker.git
cd expense-tracker

### 2. Setup Backend
cd server
npm install

Create a .env file inside server folder:

node index.js

### 3. Setup Frontend
cd ../client
npm install
npm start

## Environment Variables
- MONGO_URI — Your MongoDB Atlas connection string
- PORT — Backend port (5000)

## How AI Was Used
Used Claude AI to understand MERN concepts, generate boilerplate code,
debug errors, and learn how frontend connects to backend.