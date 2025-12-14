# Sweet Shop Management System

<img width="1840" height="1026" alt="Screenshot 2025-12-14 202605" src="https://github.com/user-attachments/assets/e26a6ca3-ca17-46ff-83a7-c31783d6fb8d" />


A full-stack production-ready application for managing a sweet shop inventory with user authentication, role-based access control, and comprehensive inventory management features.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Project Structure](#project-structure)
- [Quick Start](#quick-start)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Backend Documentation](#backend-documentation)
- [Frontend Documentation](#frontend-documentation)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Security](#security)
- [My AI Usage](#my-ai-usage)

## 📸 Screenshots

### 🔐 Authentication
#### Login Page
![Login Page]<img width="1844" height="1028" alt="Screenshot 2025-12-14 202432" src="https://github.com/user-attachments/assets/a0302674-49c7-4ac8-81c0-d704719bc7e7" />


#### Signup / Register Page
![Signup Page]<img width="1844" height="1017" alt="Screenshot 2025-12-14 202438" src="https://github.com/user-attachments/assets/cbe5b26a-9c46-4d37-ac4b-323a1c2b72db" />


---

### 👤 User Dashboard
#### User Dashboard View
![User Dashboard]<img width="1840" height="1026" alt="Screenshot 2025-12-14 202605" src="https://github.com/user-attachments/assets/ba1ee358-af9d-4e0c-b4ec-822797f7a8a7" />

)

#### Search Functionality
![Search Functionality]<img width="1848" height="1028" alt="Screenshot 2025-12-14 202246" src="https://github.com/user-attachments/assets/38ce7838-3e4e-48fc-870e-61b56ee6adf9" />


#### Filters (Category & Price Range)
![Filters]<img width="1836" height="1021" alt="Screenshot 2025-12-14 202310" src="https://github.com/user-attachments/assets/daefa70d-7dbf-42b4-bda9-c3e89206b794" />
<img width="1844" height="1021" alt="Screenshot 2025-12-14 202330" src="https://github.com/user-attachments/assets/7f5da6a4-7756-4a17-8bad-b6aeeaa1b4e5" />


---

### 🛠 Admin Dashboard
#### Admin Dashboard View
![Admin Dashboard]<img width="1824" height="1029" alt="Screenshot 2025-12-14 202149" src="https://github.com/user-attachments/assets/1dfa6f94-3eb6-4d1a-a4d8-7d7e24983088" />


#### Edit Sweet Functionality
![Edit Sweet]<img width="1851" height="1029" alt="Screenshot 2025-12-14 202204" src="https://github.com/user-attachments/assets/e48851b4-4aa0-416d-b2de-0958ec5500a2" />


#### Restock Sweet Functionality
![Restock Sweet]<img width="1847" height="1027" alt="Screenshot 2025-12-14 202219" src="https://github.com/user-attachments/assets/39907419-8918-46a9-b854-ed554991508f" />


#### Delete Sweet Confirmation
![Delete Sweet]<img width="1841" height="1028" alt="Screenshot 2025-12-14 202228" src="https://github.com/user-attachments/assets/c22742d1-3cdf-42f0-aa72-2bcd8c540461" />


---

### ➕ Add Sweet Functionality
#### Add New Sweet (Admin Panel)
![Add Sweet]<img width="1845" height="1026" alt="Screenshot 2025-12-14 202340" src="https://github.com/user-attachments/assets/a65bf2ab-d712-46d7-9af6-d27cd5ffba1e" />

#### User Purchase Flow
![Purchase Sweet]<img width="1845" height="1024" alt="Screenshot 2025-12-14 202613" src="https://github.com/user-attachments/assets/28604652-18dc-40f6-b0ae-0e1fb5f2eca8" />



## 📋 Project Overview

This project consists of two main components:
- **Backend**: Node.js + Express.js REST API with MongoDB
- **Frontend**: React application with Redux Toolkit and Tailwind CSS

## 🏗 Project Structure

```
incubit/
│
├── backend/          # Node.js + Express.js API
│   ├── src/
│   │   ├── config/   # Database and JWT configuration
│   │   ├── models/   # MongoDB models
│   │   ├── controllers/  # Request handlers
│   │   ├── routes/   # API routes
│   │   ├── middleware/   # Auth and admin middleware
│   │   ├── services/ # Business logic layer
│   │   └── tests/    # Test suites
│   ├── .env.example
│   ├── package.json
│   └── jest.config.js
│
├── frontend/         # React application
│   ├── src/
│   │   ├── app/      # Redux store
│   │   ├── features/ # Redux slices and services
│   │   ├── components/   # Reusable components
│   │   ├── pages/    # Page components
│   │   └── utils/    # Utility functions
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
└── README.md         # Complete project documentation
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the backend root directory:
   ```env
   # Server Configuration
   PORT=5000
   NODE_ENV=development

   # MongoDB Configuration
   MONGODB_URI=mongodb://localhost:27017/sweet-shop

   # JWT Configuration
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   JWT_EXPIRE=7d
   ```

4. **Start MongoDB** (if running locally)

5. **Run the server**
   ```bash
   # Development mode (with nodemon)
   npm run dev

   # Production mode
   npm start
   ```

   Backend will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

   Frontend will run on `http://localhost:3000`

4. **Build for Production**
   ```bash
   npm run build
   npm run preview
   ```

## ✨ Features

### Backend Features

- ✅ **JWT-based authentication** with secure password hashing
- ✅ **Password validation** - Minimum 6 characters enforced (validated on both frontend and backend)
- ✅ **Role-based access control** (Admin/User) with protected routes
- ✅ **RESTful API endpoints** following best practices
- ✅ **Input validation** using express-validator
- ✅ **Error handling** with proper HTTP status codes
- ✅ **Comprehensive test suite** using Jest and Supertest
- ✅ **MVC architecture** with strict separation of concerns
- ✅ **Service layer** for business logic separation
- ✅ **Sweet Management** - Full CRUD operations for sweets inventory
- ✅ **Search & Filter** - Advanced filtering by name, category, and price range
- ✅ **Inventory Management** - Purchase and restock functionality

### Frontend Features

- ✅ **User Authentication** - Secure login and registration with JWT
- ✅ **Password Validation** - Real-time password validation with visual feedback
  - Minimum 6 characters requirement
  - Red border and warning message for invalid passwords
  - Prevents form submission until password meets requirements
- ✅ **Protected Routes** - Route protection based on authentication status
- ✅ **Role-Based UI** - Different interfaces for admin and regular users
- ✅ **Sweet Dashboard** - Beautiful grid layout displaying all sweets
- ✅ **Advanced Search & Filter** - Filter by name, category, and price range
- ✅ **Purchase Functionality** - Users can purchase sweets with quantity selection
- ✅ **Admin Action Modals** - Admins can perform actions from Dashboard with popup modals
  - **Edit Modal**: Opens with option to navigate to Admin Panel for editing
  - **Restock Modal**: Quick restock with quantity input or navigate to Admin Panel
  - **Delete Modal**: Confirmation dialog with option to navigate to Admin Panel
- ✅ **Admin Panel** - Complete CRUD operations for sweets management
- ✅ **Form Placeholders** - Helpful placeholders in all form inputs for better UX
- ✅ **Price Increment** - Price field increments/decrements by 10 for easier adjustment
- ✅ **Inventory Management** - Restock functionality for admins
- ✅ **Responsive Design** - Mobile-first design with Tailwind CSS
- ✅ **Loading States** - Smooth loading indicators
- ✅ **Error Handling** - User-friendly error messages
- ✅ **State Management** - Redux Toolkit for centralized state management

## 🛠 Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcrypt
- **Validation**: express-validator
- **Testing**: Jest + Supertest
- **Environment Variables**: dotenv

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **State Management**: Redux Toolkit
- **Routing**: React Router DOM v6
- **HTTP Client**: Axios
- **Styling**: Tailwind CSS
- **Language**: JavaScript (ES6+)

## 📚 Backend Documentation

### Backend Project Structure

```
backend/
│
├── src/
│   ├── config/
│   │   ├── db.js          # MongoDB connection
│   │   └── jwt.js         # JWT token utilities
│   │
│   ├── models/
│   │   ├── User.js        # User model
│   │   └── Sweet.js       # Sweet model
│   │
│   ├── controllers/
│   │   ├── authController.js    # Authentication logic
│   │   └── sweetController.js   # Sweet management logic
│   │
│   ├── routes/
│   │   ├── authRoutes.js        # Auth endpoints
│   │   └── sweetRoutes.js       # Sweet endpoints
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js    # JWT authentication
│   │   └── adminMiddleware.js   # Admin authorization
│   │
│   ├── services/
│   │   └── sweetService.js      # Business logic layer
│   │
│   ├── tests/
│   │   ├── auth.test.js         # Auth tests
│   │   └── sweets.test.js       # Sweet tests
│   │
│   ├── app.js            # Express app configuration
│   └── server.js         # Server entry point
│
├── .env.example          # Environment variables template
├── package.json          # Dependencies
└── jest.config.js        # Jest configuration
```

### Environment Variables

Create a `.env` file in the backend root directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/sweet-shop

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d
```

**Environment Variables Explained:**
- **PORT**: Server port number (default: 5000)
- **NODE_ENV**: Environment mode (development/production)
- **MONGODB_URI**: MongoDB connection string
- **JWT_SECRET**: Secret key for JWT token signing (use a strong random string in production)
- **JWT_EXPIRE**: JWT token expiration time (e.g., 7d, 24h)

## 📚 Frontend Documentation

### Frontend Project Structure

```
frontend/
│
├── src/
│   ├── app/
│   │   └── store.js              # Redux store configuration
│   │
│   ├── features/
│   │   ├── auth/
│   │   │   ├── authSlice.js      # Auth Redux slice
│   │   │   └── authService.js    # Auth API service
│   │   │
│   │   └── sweets/
│   │       ├── sweetSlice.js     # Sweet Redux slice
│   │       └── sweetService.js   # Sweet API service
│   │
│   ├── components/
│   │   ├── Navbar.jsx            # Navigation bar
│   │   ├── SweetCard.jsx        # Sweet card component
│   │   └── ProtectedRoute.jsx   # Route protection component
│   │
│   ├── pages/
│   │   ├── Login.jsx             # Login page
│   │   ├── Register.jsx          # Registration page
│   │   ├── Dashboard.jsx         # Main dashboard
│   │   └── AdminPanel.jsx       # Admin management panel
│   │
│   ├── utils/
│   │   └── axios.js              # Axios instance with interceptors
│   │
│   ├── App.jsx                   # Main app component
│   ├── main.jsx                  # App entry point
│   └── index.css                # Global styles with Tailwind
│
├── index.html                    # HTML template
├── vite.config.js               # Vite configuration
├── tailwind.config.js           # Tailwind CSS configuration
└── postcss.config.js            # PostCSS configuration
```

### Frontend Environment Configuration

The frontend is configured to proxy API requests to the backend. The proxy is configured in `vite.config.js`:

```javascript
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:5000',
      changeOrigin: true,
    },
  },
}
```

If your backend runs on a different port or URL, update the proxy configuration accordingly.

## 📝 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",  // Minimum 6 characters required
  "role": "user"  // optional, defaults to "user"
}
```

**Validation Rules:**
- Password must be at least 6 characters
- Email must be valid format
- Name is required

**Response (201 Created)**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user"
    },
    "token": "jwt_token_here"
  }
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200 OK)**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user"
    },
    "token": "jwt_token_here"
  }
}
```

### Sweet Endpoints

All sweet endpoints require authentication. Include the JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

#### Get All Sweets
```http
GET /api/sweets
Authorization: Bearer <token>
```

#### Search/Filter Sweets
```http
GET /api/sweets/search?name=chocolate&category=candy&minPrice=10&maxPrice=100
Authorization: Bearer <token>
```

**Query Parameters:**
- `name`: Filter by name (case-insensitive partial match)
- `category`: Filter by category (case-insensitive partial match)
- `minPrice`: Minimum price filter
- `maxPrice`: Maximum price filter

**Response (200 OK)**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "sweet_id",
      "name": "Chocolate Bar",
      "category": "Chocolate",
      "price": 50,
      "quantity": 100,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### Get Sweet by ID
```http
GET /api/sweets/:id
Authorization: Bearer <token>
```

#### Create Sweet (Admin Only)
```http
POST /api/sweets
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "name": "Gummy Bears",
  "category": "Gummies",
  "price": 30,
  "quantity": 50
}
```

#### Update Sweet (Admin Only)
```http
PUT /api/sweets/:id
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "name": "Updated Chocolate Bar",
  "price": 60
}
```

#### Delete Sweet (Admin Only)
```http
DELETE /api/sweets/:id
Authorization: Bearer <admin_token>
```

#### Purchase Sweet
```http
POST /api/sweets/:id/purchase
Authorization: Bearer <token>
Content-Type: application/json

{
  "quantity": 5
}
```

**Response (200 OK)**
```json
{
  "success": true,
  "message": "Purchase successful",
  "data": {
    "_id": "sweet_id",
    "name": "Chocolate Bar",
    "quantity": 95,
    ...
  }
}
```

#### Restock Sweet (Admin Only)
```http
POST /api/sweets/:id/restock
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "quantity": 50
}
```

### Error Responses

All endpoints return consistent error responses:

```json
{
  "success": false,
  "message": "Error message here"
}
```

**Common HTTP Status Codes:**
- `400`: Bad Request (validation errors)
- `401`: Unauthorized (invalid/missing token)
- `403`: Forbidden (insufficient permissions)
- `404`: Not Found (resource not found)
- `500`: Internal Server Error

## 📖 Usage Guide

### User Registration

1. Navigate to `/register`
2. Fill in the registration form:
   - Name
   - Email
   - Password (minimum 6 characters)
     - **Real-time validation**: Warning appears if password is less than 6 characters
     - Input border turns red when invalid
     - Form cannot be submitted until password meets requirements
   - Confirm Password
3. Click "Register"
4. You'll be automatically logged in and redirected to the dashboard

### User Login

1. Navigate to `/login`
2. Enter your email and password
3. Click "Sign in"
4. You'll be redirected to the dashboard

### Dashboard (Regular Users)

- **View Sweets**: Browse all available sweets in a grid layout
- **Search & Filter**: Use the filter panel to search by:
  - Name
  - Category
  - Price range (min/max)
- **Purchase Sweets**: Click "Purchase" on any sweet card to buy
  - Select quantity in the modal
  - Confirm purchase
  - Quantity automatically updates

### Dashboard (Admin Users)

Admins see additional action buttons on each sweet card:

- **Edit Button**: 
  - Opens a modal with information about editing
  - Option to navigate directly to Admin Panel for full editing capabilities
- **Restock Button**:
  - Opens a modal with quantity input field
  - Can restock directly from Dashboard
  - Option to navigate to Admin Panel for more management options
- **Delete Button**:
  - Opens a confirmation modal
  - Can delete directly from Dashboard
  - Option to navigate to Admin Panel

### Admin Panel

Access the admin panel at `/admin` (admin users only)

**Admin Features:**
- **Add New Sweet**: Click "+ Add New Sweet" button
  - Form includes helpful placeholders for all fields
  - Price field increments/decrements by 10
- **Edit Sweet**: Click "Edit" on any sweet card
  - Opens modal with pre-filled form data
  - All fields have placeholders for guidance
- **Delete Sweet**: Click "Delete" on any sweet card (with confirmation)
- **Restock**: Click "Restock" to add inventory
  - Quick restock modal with quantity input
- **View All Sweets**: See all sweets with management options

### Protected Routes

- `/dashboard` - Requires authentication
- `/admin` - Requires authentication AND admin role
- `/login` and `/register` - Redirect to dashboard if already logged in

## 🎨 UI Features

### Design Highlights

- **Modern Gradient Design**: Beautiful pink-to-purple gradients
- **Responsive Grid Layout**: Adapts to different screen sizes
- **Card-Based UI**: Clean, organized sweet cards
- **Modal Dialogs**: Smooth modals for purchases and forms
- **Loading States**: Spinner animations during API calls
- **Error Messages**: Clear, user-friendly error displays
- **Role Badges**: Visual admin badges in navbar

### Color Scheme

- Primary: Pink (#EC4899)
- Secondary: Purple (#9333EA)
- Success: Green (#10B981)
- Danger: Red (#EF4444)
- Info: Blue (#3B82F6)

## 🧪 Testing

### Backend Tests

```bash
cd backend
npm test
npm run test:watch
npm test -- --coverage
```

### Test Coverage

The backend includes comprehensive tests for:
- ✅ User registration and login
- ✅ Authentication middleware
- ✅ Sweet CRUD operations
- ✅ Admin-only endpoints authorization
- ✅ Purchase and restock functionality
- ✅ Search and filter functionality
- ✅ Error handling

### Test Database

Tests use a separate test database. Make sure to configure `MONGODB_URI` in your test environment or the tests will use `mongodb://localhost:27017/sweet-shop-test` by default.

## 🔒 Security

### Security Features

- **Password Hashing**: bcrypt with salt rounds: 10
- **JWT Token Authentication**: Secure token-based authentication
- **Protected Routes**: Middleware-based route protection
- **Role-Based Access Control (RBAC)**: Admin and user role separation
- **Input Validation**: Comprehensive validation using express-validator
- **CORS Configuration**: Proper CORS setup
- **Environment Variable Protection**: Sensitive data in environment variables

### Frontend Security

- **JWT Storage**: Tokens stored in localStorage
- **Automatic Token Injection**: Axios interceptor adds token to requests
- **Token Expiration Handling**: Automatic redirect to login on 401 errors
- **Protected Routes**: Route-level authentication checks
- **Role-Based Access**: UI elements hidden based on user role

## 🆕 Recent Features Added

### Password Validation Enhancement
- Real-time password length validation
- Visual feedback with red border and warning message
- Prevents form submission until password meets minimum 6 character requirement

### Admin Action Modals in Dashboard
- **Edit Modal**: Provides quick access to edit functionality with navigation option
- **Restock Modal**: Quick restock feature with quantity input
- **Delete Modal**: Confirmation dialog with safety checks
- All modals include "Navigate to Admin Panel" option for full management

### Form Improvements
- **Placeholders**: All form inputs now include helpful placeholder text
  - Name: "e.g., Chocolate Bar, Gummy Bears"
  - Category: "e.g., Chocolate, Gummies, Candy"
  - Price: "e.g., 50.00"
  - Quantity: "e.g., 100"
- **Price Increment**: Price field now increments/decrements by 10 instead of 0.01 for easier adjustment

## 📱 Responsive Design

The application is fully responsive and works on:
- **Desktop**: Full-featured experience
- **Tablet**: Optimized grid layouts
- **Mobile**: Stacked layouts, touch-friendly buttons

## 🧩 Component Details

### Navbar
- Displays navigation links based on authentication status
- Shows user name and role badge
- Logout functionality

### SweetCard
- Displays sweet information
- Different actions based on user role:
  - Regular users: Purchase button
  - Admins: Edit, Restock, Delete buttons (with action modals)
- Purchase modal with quantity selection
- Admin action modals with navigation options
- Out-of-stock handling

### ProtectedRoute
- Wraps protected pages
- Redirects to login if not authenticated
- Redirects to dashboard if non-admin tries to access admin routes

## 🐛 Error Handling

- **Network Errors**: Displayed in user-friendly format
- **Validation Errors**: Shown inline in forms
  - **Password Validation**: Real-time validation with visual feedback
  - Red border and warning message for invalid inputs
- **Authentication Errors**: Automatic redirect to login
- **API Errors**: Error messages from backend displayed to user

## 🚀 Performance Optimizations

- **Code Splitting**: Vite automatically splits code
- **Lazy Loading**: Components loaded on demand
- **Optimized Builds**: Production builds are minified and optimized
- **Efficient State Management**: Redux Toolkit for optimal re-renders

## 📝 Code Quality

- **MVC Architecture**: Strict separation of concerns
- **Service Layer**: Business logic separated from controllers
- **Async/Await**: Modern asynchronous programming
- **Error Handling**: Comprehensive error handling
- **Validation**: Input validation on all endpoints
- **Comments**: Well-documented code
- **SOLID Principles**: Following best practices

## 🤖 My AI Usage

### 🔧 AI Tools Used
- **Cursor AI** – Used during the **initial development phase**
- **ChatGPT** – Used later for **selective backend guidance and UI/UX refinements**

---

### 🧠 How AI Was Used

#### 🚀 Initial Development (Cursor AI)
I initially used **Cursor AI** to assist with:
- **Setting up the project structure** and folder organization  
- **Designing a clean MVC-based backend architecture**  
- **Creating initial boilerplate code** for controllers, routes, and middleware  
- **Drafting initial backend test cases** to support a **TDD workflow**

All generated code was **manually reviewed, modified, and extended** to meet project requirements and maintain **high code quality**.

---

#### ⚙️ Backend Development Assistance (ChatGPT)
With the help of **ChatGPT**, I implemented and refined several backend components, including:
- **User and Sweet schema design**, where ChatGPT suggested schema structures and validation patterns, while I finalized the models based on application needs  
- **Indexing and validation rules**, using ChatGPT as a reference for **MongoDB best practices**, which were then manually applied and tested  
- **Inventory update logic (purchase and restock)**, where ChatGPT assisted in identifying **edge cases** (e.g., insufficient stock), and I implemented the final business logic  
- **Query logic for search and filtering**, where ChatGPT helped form **efficient query patterns** for name, category, and price range filtering, which were integrated and optimized manually  

All **database integration and MongoDB implementation** were completed with **careful manual validation and testing**.

---

#### 🎨 UI & Feature Refinements (ChatGPT)
After completing the core implementation, I used **ChatGPT selectively** to improve **usability and functionality**, including:
- Updating **admin dashboard actions** by clearly separating **Edit, Restock, and Delete** buttons  
- Adding **navigation options to the Admin Panel**, allowing admins to **add and fully manage sweets**  
- Improving **user-side price range filters** by enforcing **minimum and maximum price limits**  
- Refining **UI behavior and layout decisions** for a better **user experience**  
- Improving **clarity and structure** in selected documentation sections  

All suggested changes were **reviewed, customized, and implemented manually**.

---

### 🧩 Reflection
AI tools were used as **productivity and guidance aids**, **not** as a replacement for development. All **architectural decisions, business logic, database handling, authorization rules, and final UI behavior** were **implemented, tested, and validated by me**.

This project represents a **balanced development workflow**, where AI accelerated progress while **full ownership and responsibility for code quality and correctness remained entirely mine**.

However, manual review and testing were essential to ensure:
- Business logic correctness
- Integration between components
- Real-world usability
- Performance considerations
- Fine-tuning UI/UX details
- Testing user flows
- Ensuring proper error handling
- Optimizing performance
- Ensuring accessibility

The collaboration between AI assistance and human oversight resulted in a production-ready, maintainable codebase with excellent user experience.

## 📄 License

ISC

## 👤 Author

Sweet Shop Management System

---

**Happy Coding! 🍬**
