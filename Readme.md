# Hive Gateway Service

A GraphQL Gateway service built with TypeScript, using GraphQL Mesh for API composition and Hive Gateway for GraphQL federation.

## 🚀 Features

- GraphQL API Gateway
- TypeScript support
- API composition with GraphQL Mesh
- GraphQL federation with Hive Gateway
- ESLint and Prettier for code quality
- Husky for git hooks
- Docker support
- Environment variable configuration

## 📋 Prerequisites

- Node.js (v22 or higher)
- npm (v10 or higher)
- Docker (optional, for containerization)

## 🛠️ Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd hive-gateway-service
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp example.env .env
   ```
   Fill in the required environment variables in `.env`:
   - `PAYLOAD_CMS_ENDPOINT`: Payload CMS service endpoint
   - `AUTH_SERVICE_ENDPOINT`: Authentication service endpoint
   - `USER_SERVICE_ENDPOINT`: User service endpoint
   - `NOTIFICATION_SERVICE_ENDPOINT`: Notification service endpoint
   - `SEARCH_SERVICE_ENDPOINT`: Search service endpoint
   - `PORT`: Server port (default: 4000)

## 🏃‍♂️ Running the Application

### Development Mode

1. Start the development server:

   ```bash
   npm run start
   ```

2. Build the supergraph:
   ```bash
   npm run build
   ```

### Production Mode

1. Build the Docker image:

   ```bash
   docker build -t hive-gateway-service .
   ```

2. Run the container:
   ```bash
   docker run -p 4000:4000 hive-gateway-service
   ```

## 📝 Available Scripts

- `npm run build` - Build the supergraph using GraphQL Mesh
- `npm run start` - Start the Hive Gateway service (default port: 4000)
- `npm run lint` - Run ESLint to check and fix code issues
- `npm run lint:check` - Check for linting issues without fixing
- `npm run format` - Format code using Prettier
- `npm run format:check` - Check code formatting without making changes

## 🔧 Code Quality Tools

### ESLint Configuration

The project uses ESLint with TypeScript support. Key configurations:

- TypeScript-specific rules
- Prettier integration
- Modern JavaScript features support
- Console logging warnings (except for warn and error)

### Prettier Configuration

Code formatting is handled by Prettier with:

- Consistent code style
- Integration with ESLint
- Automatic formatting on save (if configured in your editor)

### Git Hooks

Husky is configured to run the following checks before each commit:

1. Code formatting
2. Linting
3. TypeScript type checking
4. Build verification

## 🏗️ Project Structure

```
hive-gateway-service/
├── src/                    # Source code
│   ├── gateway.config.ts   # Gateway configuration (includes port settings)
│   └── mesh.config.ts      # GraphQL Mesh configuration
├── .env                    # Environment variables
├── example.env            # Example environment variables
├── .eslintrc.json        # ESLint configuration
├── .prettierrc           # Prettier configuration
├── tsconfig.json         # TypeScript configuration
├── nodemon.json          # Nodemon configuration
├── Dockerfile            # Docker configuration
└── supergraph.graphql    # Generated supergraph schema
```

## 🔐 Environment Variables

| Variable                      | Description                     | Default Value | Notes                                                        |
| ----------------------------- | ------------------------------- | ------------- | ------------------------------------------------------------ |
| PAYLOAD_CMS_ENDPOINT          | Payload CMS service endpoint    | -             | Required for Payload CMS integration                         |
| AUTH_SERVICE_ENDPOINT         | Authentication service endpoint | -             | Required for authentication                                  |
| USER_SERVICE_ENDPOINT         | User service endpoint           | -             | Required for user management                                 |
| NOTIFICATION_SERVICE_ENDPOINT | Notification service endpoint   | -             | Required for notifications                                   |
| SEARCH_SERVICE_ENDPOINT       | Search service endpoint         | -             | Optional but will be required in future search functionality |
| PORT                          | Server port                     | 4000          | Can be changed based on availability                         |
| AUTH_TOKEN                    | Auth token                      | -             | Required to verify user's auth                               |

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.
