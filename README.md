# 🧾 RetailEase - Billing & Inventory Management System

![Java](https://img.shields.io/badge/Backend-Spring%20Boot-6DB33F?logo=springboot&logoColor=white) ![React](https://img.shields.io/badge/Frontend-React.js-61DAFB?logo=react&logoColor=black) ![MySQL](https://img.shields.io/badge/Database-MySQL-4479A1?logo=mysql&logoColor=white) ![Security](https://img.shields.io/badge/Auth-JWT%20Security-red) ![Razorpay](https://img.shields.io/badge/Payment-Razorpay-blue)

## 📖 Overview
**RetailEase** is a comprehensive full-stack web application designed to streamline daily operations for retail businesses. It creates a seamless bridge between inventory management and point-of-sale (billing) processes.

This system solves manual billing errors and inventory tracking issues by providing a **Role-Based Admin Panel** and a fast, secure **Billing Interface** integrated with **Razorpay** for digital payments.

## ✨ Key Features

### 🔐 Security & Authentication
* **JWT Authentication:** Secure login mechanism using Spring Security and JSON Web Tokens.
* **Role-Based Access Control (RBAC):**
    * **Admin:** Full control over inventory, staff management, and sales reports.
    * **Staff:** Restricted access to billing and order processing only.

### 🛒 Billing & Sales
* **Dynamic Cart:** Add/Remove items, adjust quantities, and auto-calculate totals (Subtotal + 1% Tax).
* **Instant Invoicing:** Generates a detailed receipt popup immediately after order placement.
* **Payment Flexibility:** Supports **Cash** and **Online Payments (UPI/Cards)** via Razorpay (Test Mode).

### 📦 Inventory & Admin Management
* **User Management:** Admins can onboard new staff members.
* **Product Catalog:** CRUD operations for Categories and Items (supports Image Uploads & Color tags).
* **Analytics:** View Order History to track sales performance.

## 🛠️ Tech Stack

| Component | Technologies Used |
| :--- | :--- |
| **Backend** | Java, Spring Boot, Spring Security (JWT), Hibernate/JPA |
| **Frontend** | React.js, Bootstrap 5, Context API, React Hot Toast |
| **Database** | MySQL (Railway Cloud / Localhost) |
| **Payments** | Razorpay Payment Gateway (Test Environment) |
| **Tools** | Maven, Postman, Git/GitHub |

## 📸 Screenshots
| Login Screen | Admin Dashboard |
|:---:|:---:|
| ![Login](./client/public/Login.png) | ![Dashboard](./client/public/Dashboard.png) |

| Billing Section | Payment Gateway |
|:---:|:---:|
| ![Explore](./client/public/Explore.png) | ![Payment](./client/public/Payment.png) |

| Inventory Management | Order History |
|:---:|:---:|
| ![Items](./client/public/Items.png) | ![History](./client/public/History.png) |

## 🚀 Installation & Setup

### 1. Backend Setup (Spring Boot)
1.  Clone the repo and open the `backend` folder in IntelliJ IDEA / Eclipse.
2.  Update `application.properties` with your MySQL credentials:
    ```properties
    spring.datasource.url=jdbc:mysql://localhost:3306/billing_db
    spring.datasource.username=root
    spring.datasource.password=password
    ```
3.  Run the application (Server starts on `localhost:8080`).

### 2. Frontend Setup (React)
1.  Navigate to the client folder:
    ```bash
    cd client
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Run the frontend:
    ```bash
    npm start
    ```

## ⚠️ Important Note
This project uses **Razorpay Test Keys**. No real money is deducted during transactions. Ensure you have internet connectivity to load the payment modal.

---
**Developed by [Pranjal Patel](https://github.com/pranjalpatel044)**
