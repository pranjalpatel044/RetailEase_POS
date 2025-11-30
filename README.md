# 🧾 Billing Management System

A **full-stack Retail Billing & Inventory Management System** built with **Spring Boot, React.js, MySQL, and Razorpay**.  
It includes **Admin Panel** for managing users, categories, items, and **User Panel** for billing, cart, payments, and receipts.

---

## ✨ Features

### 🔑 Authentication & Roles
- Secure login with **JWT authentication**
- Role-based access:
  - **Admin** → manage staff users, categories, items, orders
  - **Staff/User** → create customer bills, process payments

### 🛒 Billing & Orders
- Add items to cart, update quantity, remove items
- Generate customer orders with **Cash** or **UPI (Razorpay test)**
- Auto calculate subtotal, tax (1%), and total
- Print **receipt popup** with order details

### 📊 Admin Panel
- Manage **users** (add/edit staff accounts)
- Manage **categories & items** (with image upload and color selection)
- View order history and reports

### 💳 Payment Integration
- **Cash mode** → instant order confirmation  
- **UPI mode** → Razorpay test payment flow (no real money)  
- Payment verification and failure handling included

---

## 🛠️ Tech Stack

**Frontend:** React.js, Bootstrap, Context API, React Hot Toast  
**Backend:** Spring Boot, Spring Security (JWT), JPA/Hibernate  
**Database:** MySQL (Railway/Local)  
**Payments:** Razorpay (Test Keys)  
**Deployment:** Frontend on Vercel, Backend on Render/Railway  

---

## 🚀 Live Demo

- **Frontend (Live):** [https://your-frontend-url.com](https://your-frontend-url.com)  
- **Backend (API):** [https://your-backend-url.com](https://your-backend-url.com)  

---

## 🔑 Demo Accounts

Use these accounts to explore the project:

### 👨‍💼 Admin
- Email: `demo.admin@yourapp.com`
- Password: `DemoAdmin@123`

### 👩‍💻 Staff / Cashier
- Email: `demo.user@yourapp.com`
- Password: `DemoUser@123`

---

## 🧭 How to Try

1. Visit the **Live frontend** link.  
2. **Login as Admin** to:
   - Add/manage staff users  
   - Add categories and items with images  
   - View orders and reports  
3. **Login as Staff** to:
   - Add items to cart and enter customer details  
   - Choose **Cash** or **UPI** (Razorpay test) payment  
   - View and print **receipt popup**  
4. View all created orders in the Orders page.  

⚠️ Note: Razorpay integration runs in **test mode** → no real payments.

---

## 📸 Screenshots

| Login | Admin Panel | Billing Page | Receipt Popup |
|-------|-------------|--------------|---------------|
| ![Login](docs/screens/login.png) | ![Admin Panel](docs/screens/admin.png) | ![Billing](docs/screens/billing.png) | ![Receipt](docs/screens/receipt.png) |

---

## 🏗️ Project Setup (Local)

### Backend
```bash
git clone https://github.com/your-username/billing-management-backend.git
cd billing-management-backend
./mvnw spring-boot:run
