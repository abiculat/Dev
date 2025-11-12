# Online Shop - MERN Stack Application

A full-stack online shop application built with MongoDB, Express, React, and Node.js.

## Features

✅ **React UI Framework**: Reactstrap with Bootstrap for responsive UI
✅ **Form Controls**: TextBox, Button, Dropdown, Radio, Checkbox, Date picker, Search box
✅ **Navigation**: Modern navbar with search functionality
✅ **CRUD Operations**: Full Create, Read, Update, Delete functionality
✅ **Server-side Calculations**: 
  - Discount calculations
  - Tax computation (8% of subtotal)
  - Final price calculations
  - Order total computation
✅ **MongoDB Collections**: 
  - Products (8 documents)
  - Orders (5 documents)
  - Users (3 documents)
✅ **Data Types**: Text, Numbers, Boolean, Date
✅ **User Authentication**: Registration and Login
✅ **Location-based Service**: Nearby orders feature
✅ **React Testing**: 4+ test cases included
✅ **Docker Containerization**: docker-compose setup
✅ **GitHub Ready**: Version controlled

## Project Structure

```
online-shop/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   └── Order.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── productController.js
│   │   └── orderController.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── productRoutes.js
│   │   └── orderRoutes.js
│   ├── middleware/
│   │   └── auth.js
│   ├── scripts/
│   │   └── seedDatabase.js
│   ├── server.js
│   ├── package.json
│   ├── .env
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   ├── Navbar.test.js
│   │   │   ├── ProductCard.js
│   │   │   └── ProductCard.test.js
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   ├── Home.test.js
│   │   │   ├── Products.js
│   │   │   ├── Orders.js
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   └── Profile.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.js
│   │   ├── App.test.js
│   │   ├── App.css
│   │   └── index.js
│   ├── public/
│   │   └── index.html
│   ├── package.json
│   ├── Dockerfile
│   └── .env
├── docker-compose.yml
└── README.md
```

## Installation & Setup

### Using Docker (Recommended)

```bash
# Navigate to project directory
cd online-shop

# Start all services
docker-compose up --build

# Access the application
# Frontend: http://localhost:3000
# Backend: http://localhost:5000
# MongoDB: localhost:27017
```

### Manual Setup

#### Backend Setup

```bash
cd backend
npm install
npm run seed  # Seed database with initial data
npm start     # Start backend server (runs on port 5000)
```

#### Frontend Setup

```bash
cd frontend
npm install
npm start     # Start frontend (runs on port 3000)
```

## Database

MongoDB collections with sample data:

### Products Collection (8 documents)
- Wireless Headphones
- USB-C Cable
- Cotton T-Shirt
- JavaScript Book
- Coffee Maker
- Running Shoes
- Phone Case
- Yoga Mat

### Orders Collection (5 documents)
- Order details with items, totals, and shipping info
- Status tracking (Pending, Processing, Shipped, Delivered)
- Payment status and priority indicators

### Users Collection (3 users)
- Admin user
- Regular users
- Location-based addresses

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)
- `PUT /api/auth/profile` - Update user profile (protected)

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product details
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Orders
- `GET /api/orders` - Get all orders (user/admin)
- `GET /api/orders/:id` - Get order details
- `POST /api/orders` - Create new order
- `PUT /api/orders/:id` - Update order status
- `DELETE /api/orders/:id` - Delete order
- `GET /api/orders/nearby` - Get orders near location

## Form Controls

The application includes:
- ✅ TextBox: Name, Email, Phone, Address fields
- ✅ Button: Submit, Search, Add to Cart, View Details
- ✅ Dropdown: Category filter, Status selector
- ✅ Radio: Payment status toggle
- ✅ Checkbox: Priority shipping
- ✅ Date: Order dates, delivery dates
- ✅ Search Box: Product search in navbar

## Testing

Run tests with:

```bash
cd frontend
npm test
```

Test cases:
1. Navbar component renders correctly
2. ProductCard displays product information
3. Home page displays welcome message and features
4. App component renders without crashing

## Key Features Implementation

### CRUD with Business Logic
- Products with automatic discount calculation
- Orders with automatic tax computation (8%)
- Final price calculation
- Stock quantity management
- Order total aggregation

### Server-side Processing
All calculations and validations happen on the backend:
- Price calculations with discount
- Tax computation
- Stock verification
- Order status updates

### Location-Based Service
- Store location coordinates (latitude, longitude)
- Find orders near specific coordinates
- Distance-based queries

## Demo Credentials

```
Email: john@example.com
Password: password123
```

## Technologies Used

### Backend
- Node.js & Express.js
- MongoDB & Mongoose
- JWT for authentication
- bcryptjs for password hashing
- CORS enabled

### Frontend
- React 18
- React Router v6
- Reactstrap (Bootstrap components)
- Axios for API calls
- React Testing Library

### DevOps
- Docker & Docker Compose
- MongoDB container
- Multi-stage builds for frontend

## Deployment

Ready for deployment on:
- Heroku
- Railway
- Vercel (frontend)
- AWS
- Google Cloud
- DigitalOcean

## Future Enhancements

- Real payment integration (Stripe/PayPal)
- Advanced location services with maps
- Real-time notifications
- Product reviews and ratings
- Wishlist functionality
- Advanced search filters
- Admin dashboard
- Email notifications

## License

MIT

## Author

Online Shop Development Team

---

**Status**: ✅ Development Complete - Ready for Deployment

