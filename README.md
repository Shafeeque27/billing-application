# Invoice & Product Management App

A simple web application to manage invoices and products. Built with **React**, **Axios**, **Tailwind CSS**, and **React Router**, the app allows you to create, view, search, and delete invoices and products.

## Features

### Invoices
- List all invoices
- View invoice details
- Search invoices by **Invoice Number** or **Customer Name**
- Create new invoices with multiple items
- Secure PDF generation for invoices

### Products
- List all products
- Add new products
- Edit existing products
- Delete products
- Search products by **Name**, **Price**, or **Stock**

### General
- Responsive UI with Tailwind CSS
- API integration with Axios
- Loading states and error handling
- Search input with debounce to avoid continuous rendering

## Tech Stack
- **Frontend:** React, Tailwind CSS, React Router
- **Backend:** Node.js, Express (API endpoints)
- **HTTP Client:** Axios
- **PDF Generation:** Backend endpoint returning PDF blob
- **State Management:** React useState & useEffect
