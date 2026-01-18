# Alpine Trails POI API

A TypeScript-based REST API for managing hiking trails and points of interest (POIs) in the Alps. Built with Hapi.js and MongoDB, this backend service provides comprehensive trail management, POI tracking, and user authentication for hiking applications.

## Features

- 🏔️ **Trail Management** - Create, update, and manage hiking trails
- 📍 **POI System** - Track mountain huts, lakes, and peaks
- 🔐 **JWT Authentication** - Secure user authentication with role-based access control
- 👥 **User Management** - Admin capabilities for user administration
- 🖼️ **Image Support** - Upload images via Cloudinary integration
- 📊 **API Documentation** - Auto-generated Swagger/OpenAPI documentation
- 🧪 **Comprehensive Testing** - Vitest test suite with MongoDB Memory Server
- 🌱 **Data Seeding** - Built-in seeder for initializing database with Alpine trail data

## Tech Stack

- **Framework:** Hapi.js 21.4
- **Runtime:** Node.js 20+
- **Language:** TypeScript 5.9 (ES2022)
- **Database:** MongoDB with Mongoose 9.0
- **Authentication:** JWT (hapi-auth-jwt2)
- **Validation:** Joi 17.13
- **Image Storage:** Cloudinary
- **Testing:** Vitest with coverage support
- **Code Quality:** ESLint + Prettier
- **Module System:** ES Modules

## Getting Started

### Prerequisites

- Node.js 20 or higher
- MongoDB instance (local or cloud)
- Cloudinary account (for image uploads)

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```env
PORT=your_port_for_server
db=your_mongodb_connection_string
jwt_secret=your_jwt_secret
cookie_name=your_cookie_name
cloudinary_name=your_cloudinary_name
cloudinary_key=your_cloudinary_key
cloudinary_secret=your_cloudinary_secret
```

### Database Seeding

Populate the database with sample Alpine trail data:

```bash
npm run seed
```

### Development

```bash
npm run dev        # Start development server with hot reload
```

### Production

```bash
npm run build      # Build TypeScript to JavaScript
npm start          # Run production build
```

### Testing

```bash
npm test              # Run all tests
npm run test:watch    # Watch mode for development
npm run test:coverage # Generate coverage report
```

## API Endpoints

The API is documented with Swagger/OpenAPI. Start the server and visit `/documentation` for interactive API docs.

### Authentication

- `POST /api/signup` - Register a new user
- `POST /api/authenticate` - Login and receive JWT token

### Admin

- `GET /api/users` - Get all users (admin only)
- `POST /api/admin/{id}` - Promote user to admin (admin only)
- `DELETE /api/users/{id}` - Delete a user (admin only)
- `DELETE /api/users` - Delete all users (admin only)

### Trails

- `GET /api/trails` - Get all trails
- `GET /api/trails/{id}` - Get a specific trail
- `POST /api/trails` - Create a new trail (auth required)
- `PUT /api/trails/{id}` - Update a trail (auth required)
- `DELETE /api/trails/{id}` - Delete a trail (auth required)
- `DELETE /api/trails` - Delete all trails (admin only)
- `POST /api/trails/{id}/images` - Upload trail images (auth required)

### POIs (Points of Interest)

- `GET /api/pois` - Get all POIs
- `GET /api/pois/{id}` - Get a specific POI
- `POST /api/pois` - Create a new POI (auth required)
- `PUT /api/pois/{id}` - Update a POI (auth required)
- `DELETE /api/pois/{id}` - Delete a POI (auth required)
- `POST /api/pois/{id}/images` - Upload POI image (auth required)

### POI Categories

- `hut` - Mountain huts
- `lake` - Lakes
- `peak` - Mountain peaks with summit cross

## Project Structure

```
src/
├── api/              # API route handlers
├── helper/           # Utilities (JWT, DB, seeding)
├── models/           # Data models and schemas
│   ├── joi-schemas/  # Request/response validation
│   └── mongo/        # MongoDB stores and schemas
├── tests/            # Test suites
└── types/            # TypeScript type definitions
```

## Code Style

This project uses:

- **ESLint** with TypeScript configuration
- **Prettier** for code formatting
- **Double quotes** for strings

### Linting

```bash
npm run lint
```

## License

MIT

## Contact

Project Link: [https://github.com/TimKast/trails-poi-backend](https://github.com/TimKast/trails-poi-backend)

---

**Happy Hiking! 🥾⛰️**
