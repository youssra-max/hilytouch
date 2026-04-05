# 🌸 Hily Touch — Premium Beauty Marketplace

Hily Touch is a high-end e-commerce and marketplace platform dedicated to natural beauty and cosmetics. Built with a modern tech stack, it connects customers looking for premium skincare and makeup with professional partners and vendors.

---

## ✨ Key Features

### 🛒 E-Commerce & Marketplace
- **Unified Product Catalog**: Filter by category (Soins Visage, Maquillage, etc.), price range, and new arrivals.
- **Partner Dashboard**: Dedicated portal for B2B partners to submit and manage their own product listings.
- **Smart Cart**: 
    - Real-time shipping calculation based on the **58 Algerian Wilayas**.
    - Promo Code validation system (percentage or fixed amount discounts).
    - Payment on Delivery (Cash on Delivery) flow.

### 👤 User Engagement
- **Customer Dashboard**: Personalized space to track **Loyalty Points**, order history, and saved addresses.
- **Loyalty Program**: Earn points through purchases, registrations, and product reviews.
- **Skin Diagnostic**: Interactive quiz to provide personalized product recommendations based on skin type and concerns.
- **Wishlist & Tracking**: Save favorite items and track order status in real-time.

### 🔍 Search & Discovery
- **Unified Global Search**: Search instantly across products, categories, and blog articles.
- **Recently Viewed**: Keep track of the last 30 products explored by the user.

---

## 🛠 Technology Stack

### Frontend
- **Framework**: [Next.js](https://nextjs.org/) (React)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Styling**: Vanilla CSS (Premium design system with glassmorphism and smooth animations)
- **API Communication**: Native Fetch with JWT authentication management

### Backend
- **Framework**: [Django](https://www.djangoproject.com/) + [Django REST Framework](https://www.django-rest-framework.org/)
- **Authentication**: JWT (JSON Web Tokens) with `SimpleJWT`
- **Database**: SQLite (Development) / PostgreSQL (Ready)
- **Features**: Custom user roles, automated shipping rate seeding, and complex business logic for discounts and loyalty rewards.

---

## 🚀 Getting Started

### 1. Requirements
- Node.js (v18+)
- Python (v3.10+)

### 2. Backend Setup
```bash
cd backend
# Create and activate a virtual environment
python -m venv venv
source venv/bin/activate # Windows: venv\Scripts\activate

# Install dependencies
pip install django djangorestframework django-cors-headers djangorestframework-simplejwt Pillow

# Run migrations
python manage.py makemigrations
python manage.py migrate

# Seed shipping rates (Algerian Wilayas)
python manage.py shell -c "exec(open('seed_wilayas.py', encoding='utf-8').read())"

# Create a superuser
python manage.py createsuperuser

# Start the server
python manage.py runserver
```

### 3. Frontend Setup
```bash
# In the root directory
npm install
npm run dev
```
The application will be available at `http://localhost:3000`.

---

## 📸 Admin Portal
Access the database management at `http://localhost:8000/admin` to:
- Manage product categories and stock.
- View and update order statuses.
- Create promo codes and manage loyalty transactions.
- Verify partner applications.

---

## 📄 License
This project is licensed under the ISC License.

---
*Created with ❤️ by the Hily Touch Team.*
