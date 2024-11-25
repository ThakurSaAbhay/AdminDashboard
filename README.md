# Admin Dashboard 🚀 [</>](https://admindashboard-1-vhtl.onrender.com/)

An **Admin Dashboard Application** for Role-Based Access Control (RBAC). It empowers administrators to manage users, roles, and permissions with ease. Built with **React**, **Node.js**, and **MongoDB** for efficient user and role management.

---

## 🏢 **Features**

- **User Management**
  - View user details such as name, email, role, and status.
  - Add new users and assign roles dynamically.
  - Edit user details and status.
  - Delete user accounts with a single click.

- **Role Management**
  - Create new roles with custom permissions.
  - Edit existing roles and update their permissions.
  - Delete roles while ensuring system integrity.

- **Authentication**
  - Secure login system for admin access.

- **Security**
  - Jwt based login and session management.
  - Bcrypt hashed password for user privacy.

- **Dashboard Analytics**
  - Total users, active users, and role statistics at a glance.

---

## 🎯 **Tech Stack**

### Frontend
- **React.js**: Dynamic UI for managing users and roles.
- **CSS**: Custom styling for an elegant and responsive design.
- **Toastify**: For real-time notifications.

### Backend
- **Node.js**: RESTful API for handling requests.
- **Express.js**: Backend framework for rapid API development.
- **MongoDB**: NoSQL database for storing user and role data.

### Libraries & Tools
- **Axios**: Handling API calls.
- **React Router**: Smooth navigation within the app.
- **Bcrypt & JWT**: Secure authentication.

---


## 🚀 **Getting Started**

### Prerequisites

Ensure the following tools are installed:
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/)

---

### Frontend Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ThakurSaAbhay/Admin-Dashboard.git
   cd Admin-Dashboard/rbac-ui


2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Start the development server:**

    ```bash
    npm start
    ```

4. **Build for production:**

    ```bash
    npm run build
    ```

---

### Backend Setup

1. **Navigate to the backend directory:**

    ```bash
    cd ../backend
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Set up environment variables:**
   Create a `.env` file with the following content:

    ```env
    MONGO_URI=mongodb://localhost:27017/admin-dashboard
    JWT_SECRET=your_secret_key
    PORT=5000
    ```

4. **Start the backend server:**

    ```bash
    node server.js
    ```

---

## 🖼️ **Screenshots**

### Dashboard Overview
![image](https://github.com/user-attachments/assets/76cd922c-283c-42bd-b2ce-58567eac8e61)


### User Management
![image](https://github.com/user-attachments/assets/2eb4a13e-5ccd-46a6-8c6f-a59c8567ee9c)


### Role Management
![image](https://github.com/user-attachments/assets/0328dd45-e786-4f57-8a6b-d627005a6d61)


---

## 🔗 **API Endpoints**

### User API

- `GET /api/users`: Fetch all users.
- `POST /api/users`: Create a new user.
- `PUT /api/users/:id`: Update user details.
- `DELETE /api/users/:id`: Delete a user.

### Role API

- `GET /api/roles`: Fetch all roles.
- `POST /api/roles`: Create a new role.
- `PUT /api/roles/:id`: Update role details.
- `DELETE /api/roles/:id`: Delete a role.

---


## 💻 **Contributing**

We welcome contributions! Follow these steps to get started:

1. **Fork this repository.**
2. **Create a new branch for your feature:**

    ```bash
    git checkout -b feature-name
    ```

3. **Commit and push your changes:**

    ```bash
    git commit -m "Add new feature"
    git push origin feature-name
    ```

4. **Open a pull request.**

---

## 🛡️ **License**

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## 🙌 **Acknowledgements**

Special thanks to the open-source community for their tools and libraries.
