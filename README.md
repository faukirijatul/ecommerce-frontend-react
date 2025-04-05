# TokoBaju - Fullstack E-commerce Application

TokoBaju is a fullstack e-commerce application that allows users to browse, purchase, and manage clothing orders online. This application includes an interactive frontend and a robust backend to handle authentication, product management, shopping cart, and order processing.

## Demo
- **Frontend Demo**: [https://tokobaju-nine.vercel.app/](https://tokobaju-nine.vercel.app/)
- **Backend Repository**: [https://github.com/faukirijatul/ecommerce-backend-express.git](https://github.com/faukirijatul/ecommerce-backend-express.git)

## Tech Stack

### Frontend
The frontend is built with modern technologies to provide a responsive and interactive user experience.

- **Dependencies**:
  - `@reduxjs/toolkit`: "^2.6.1" - State management with Redux Toolkit
  - `axios`: "^1.8.4" - HTTP client for backend communication
  - `date-fns`: "^4.1.0" - Utility for date manipulation and formatting
  - `react`: "^19.0.0" - Core library for building UI
  - `react-dom`: "^19.0.0" - DOM rendering for React
  - `react-icons`: "^5.5.0" - Collection of icons for UI
  - `react-redux`: "^9.2.0" - Redux integration with React
  - `react-router-dom`: "^7.4.0" - Routing for application navigation
  - `react-toastify`: "^11.0.5" - Toast notifications for user feedback

- **Dev Dependencies**:
  - `@eslint/js`: "^9.21.0" - Linting for JavaScript code
  - `@types/react`: "^19.0.10" - Type definitions for React
  - `@types/react-dom`: "^19.0.4" - Type definitions for React DOM
  - `@vitejs/plugin-react`: "^4.3.4" - Vite plugin for React
  - `autoprefixer`: "^10.4.21" - Adds vendor prefixes to CSS
  - `eslint`: "^9.21.0" - Tool for code linting and formatting
  - `eslint-plugin-react-hooks`: "^5.1.0" - Linting for React Hooks
  - `eslint-plugin-react-refresh`: "^0.4.19" - Optimization for React Refresh
  - `globals`: "^15.15.0" - Global definitions for ESLint
  - `postcss`: "^8.5.3" - CSS processor
  - `tailwindcss`: "^3.4.17" - Utility-first CSS framework
  - `vite`: "^6.2.0" - Build tool and development server

### Backend
The backend is built with Express.js and MongoDB to handle business logic, authentication, and data storage.

- **Dependencies**:
  - `bcrypt`: "^5.1.1" - Password hashing for security
  - `cloudinary`: "^2.6.0" - Cloud image upload management
  - `cookie-parser`: "^1.4.7" - Cookie parsing for authentication
  - `cors`: "^2.8.5" - Enables Cross-Origin Resource Sharing
  - `dotenv`: "^16.4.7" - Environment variable management
  - `express`: "^4.21.2" - Web framework for Node.js
  - `jsonwebtoken`: "^9.0.2" - JWT implementation for authentication
  - `mongoose`: "^8.13.0" - ODM for MongoDB
  - `morgan`: "^1.10.0" - HTTP request logging
  - `multer`: "^1.4.5-lts.2" - Middleware for file uploads
  - `stripe`: "^18.0.0" - Payment integration with Stripe
  - `validator`: "^13.15.0" - Input data validation

## Key Features
- **Authentication**: User registration, login, logout, and profile updates
- **Product Management**: Display product listings with filtering and sorting
- **Shopping Cart**: Add, edit, and remove items from the cart
- **Orders**: Create orders (COD and Stripe), track status, and manage all orders (admin)
- **Responsive UI**: Mobile-friendly design using Tailwind CSS

## Running Locally

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- Stripe account for payments
- Cloudinary account for image uploads

### Frontend
1. Clone this repository:
   ```bash
   git clone https://github.com/username/tokobaju-frontend.git
   cd tokobaju-frontend