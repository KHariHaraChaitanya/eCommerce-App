# 🛒E-Commerce Web App

An eCommerce web application built with **Node.js**, **Express**, **MongoDB**, and **EJS**, supporting dynamic product (template) uploads, user authentication, and admin approvals. This app demonstrates a robust backend system with secure routing, session handling, image uploads, and a responsive front-end using server-side rendering.

---

## 🚀 Features

### 👤 Authentication & Authorization
- User registration and login system using **JWT tokens**.
- Admin and User role-based access.
- Middleware to protect private routes using token verification.

### 🧾 Product (Template) Management
- Admins can:
  - Upload new product templates (with image).
  - Edit, delete, approve, or disapprove uploaded templates.
- Users can:
  - Upload their own templates (pending admin approval).
  - Manage (update/delete) their own uploads.

### 🔎 Search Functionality
- Full-text search implemented with MongoDB.
- Users can search templates by keywords.

### 📁 Image Uploads
- Template images uploaded using **Multer**.
- Server-side validation and file storage configuration.

### 🖥️ Dashboards
- **Admin Dashboard**: Manage all templates with controls to approve/disapprove.
- **User Dashboard**: View and manage user-specific uploads.
- Both dashboards dynamically rendered with **EJS** templates.

### 🔐 Session Management
- Session storage of user email for personalized experience.
- Express sessions integrated with MongoDB for persistence.

---

## 🧪 Tech Stack

| Layer       | Technology              |
|-------------|--------------------------|
| Backend     | Node.js, Express.js      |
| Frontend    | EJS, HTML, CSS, SCSS     |
| Database    | MongoDB (Mongoose)       |
| Auth        | JWT, Express Sessions    |
| Uploads     | Multer                   |

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/KHariHaraChaitanya/eCommerce-App.git
   cd eCommerce-App
   npm install
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   npm start
👥 Contributing
Contributions are welcome! Please fork the repository and submit a pull request.

📄 License
This project is licensed under the MIT License.

✨ Acknowledgments
Inspired by standard eCommerce workflows.

Built as part of learning full-stack development

