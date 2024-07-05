# Invoice App - POS

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [Frontend](#frontend)
- [Backend](#backend)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)

## Introduction

This project is a full-stack Point of Sales System that allows users to manage invoices, track product stock, and view revenue projections. The system includes a interface for managing invoices and products, as well as a time-series graph for visualizing revenue data.

## Features

- Add, update, and delete invoices
- Autocomplete product input for invoices
- Pagination for invoice list
- Time-series graph for revenue projections
- Manage product stock levels

## Technologies Used

- **Frontend**: React.js, Redux, Tailwind CSS, Material Tailwind, ApexCharts
- **Backend**: Node.js, Express, MySQL, Sequelize ORM
- **Date Management**: date-fns

## Getting Started

### Prerequisites

- Node.js (>= 14.x)
- npm or yarn
- MySQL database

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/alfito234/invoice-apps.git
   cd invoice-apps
   ```

2. Install dependencies for the backend:
   ```sh
   cd backend
   npm install
   ```

3. Install dependencies for the frontend:
   ```sh
   cd ..
   npm install
   ```

### Running the Application

#### Backend

1. Create a `.env` file in the `backend` directory and configure your database connection:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=password
   DB_NAME=pos_system
   DB_DIALECT=mysql
   ```

2. Run database migrations:
   ```sh
   npx sequelize-cli db:migrate
   ```

3. Start the backend server:
   ```sh
   npm start
   ```

   The backend server will run on `http://localhost:3001`.

#### Frontend

1. Start the frontend development server:
   ```sh
   npm start
   ```

   The frontend development server will run on `http://localhost:5173`.

## Frontend

The frontend is built with Vite React.js and Redux, using Tailwind CSS for styling, Material Tailwind for library components, and ApexCharts for the revenue graph.

### Key Components

- `InvoiceForm`: Form for adding and updating invoices
- `InvoiceList`: List of invoices with pagination
- `RevenueGraph`: Time-series graph for revenue projections

## Backend

The backend is built with Node.js and Express, using Sequelize ORM for database management.

### Key Models

- `Invoice`: Represents an invoice, including customer details, date, total amount, and products
- `Product`: Represents a product, including name, price, stock, and picture

### Key Routes

- `POST /api/invoices`: Create a new invoice
- `GET /api/invoices`: Get a paginated list of invoices
- `GET /api/invoices/:id`: Get a single invoice by ID
- `PUT /api/invoices/:id`: Update an invoice
- `DELETE /api/invoices/:id`: Delete an invoice
- `GET /api/revenue`: Get revenue data for the specified period (daily, weekly, monthly)

## Usage

### Adding an Invoice

1. Fill in the invoice form with customer name, salesperson name, and notes.
2. Select products from the dropdown, specify quantities, and add them to the invoice.
3. Click the "Add Invoice" button to save the invoice.

### Viewing Revenue Graph

1. Select the desired time period (daily, weekly, monthly) from the dropdown.
2. View the revenue graph to see the revenue trends over time.

## API Endpoints

### Invoices

- `POST /api/invoices`
- `GET /api/invoices`
- `GET /api/invoices/:id`
- `PUT /api/invoices/:id`
- `DELETE /api/invoices/:id`

### Revenue

- `GET /api/revenue?period=daily|weekly|monthly`

