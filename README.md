# Online Quiz API

A robust RESTful API built with NestJS for managing online quizzes, questions, and user attempts.

## Features

- User authentication and authorization
- Quiz management
- Question management with multiple choice answers
- Quiz attempts tracking
- Question attempts tracking
- Seeding functionality for development

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL
- npm or yarn

## Installation

1. Clone the repository:

```bash
git clone https://github.com/ashishgourr/online-quiz-api.git
cd online-quiz-api
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory and add the following variables:

```env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=your_username
DATABASE_PASSWORD=your_password
DATABASE_NAME=online_quiz
JWT_SECRET=your_jwt_secret
```

4. Run database migrations:

```bash
npm run migration:run
```

5. Start the development server:

```bash
npm run start:dev
```

## API Documentation

The API documentation is available at `/api` when running the server.

## Development

- `npm run start:dev` - Start development server
- `npm run build` - Build the application
- `npm run start:prod` - Start production server
- `npm run test` - Run tests
- `npm run migration:generate` - Generate migrations
- `npm run migration:run` - Run migrations

## Project Structure

```
src/
├── auth/           # Authentication module
├── users/          # User management
├── quizzes/        # Quiz management
├── questions/      # Question management
├── answers/        # Answer management
├── quiz-attempts/  # Quiz attempts tracking
├── question-attempts/ # Question attempts tracking
├── seed/          # Database seeding
└── config/        # Configuration files
```

## License

This project is licensed under the MIT License.
