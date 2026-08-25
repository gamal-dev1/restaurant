# Restaurant Ordering RESTful API

A scalable backend API for a **Restaurant Food Ordering platform** built with **Node.js, Express.js, and MongoDB**,
combining **real-time order management**, secure **Paymob payments**, and role-based restaurant operations.

**Live Server:** https://restaurant-production-2615.up.railway.app

---

## Key Features

* **Authentication & RBAC:** JWT-based authentication with role-specific permissions for **Manager, Staff, and Customer**.
* **Restaurant Management:** Hierarchical **Categories → Subcategories → Menu Items → Modifiers** with search, filtering, sorting, and pagination.
* **Cart & Pricing Engine:** Dynamic cart pricing with modifiers, percentage/fixed discounts, coupons, and usage limits.
* **Order Management:** Complete order lifecycle from creation to delivery, including status management, cancellation, delivery addresses, and payment tracking.
* **Secure Online Payments:** **Paymob** integration using payment intentions, webhooks, and **HMAC-SHA512 verification**.
* **Real-Time Operations:** **Socket.IO** for real-time order status updates and notifications.
* **Validation & Error Handling:** Joi validation, reusable middleware, async error handling, and centralized error management.

## User Roles

* **Manager:** Full control over users, restaurant data, and administrative operations.
* **Staff:** Manages orders and customer-related operations.
* **Customer:** Browses the menu, manages carts, applies coupons, places orders, and completes online payments.

## Tech Stack & Architecture

* **Backend:** Node.js, Express.js
* **Database:** MongoDB, Mongoose
* **Authentication:** JWT, bcrypt
* **Validation:** Joi
* **Real-Time:** Socket.IO
* **Payments:** Paymob API, Webhooks, HMAC-SHA512
* **Utilities:** Multer, QR Code, Slugify
* **Architecture:** Modular MVC, reusable middleware, centralized error handling, and API feature utilities.

## API Documentation

[View Postman Documentation](https://documenter.getpostman.com/view/52617149/2sBYAsxXDi)
