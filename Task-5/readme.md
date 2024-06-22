# Job Board Project

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
  - [User Routes](#user-routes)
  - [Job Routes](#job-routes)
  - [Application Routes](#application-routes)
- [Frontend Routes](#frontend-routes)
- [Contributing](#contributing)
- [License](#license)

## Introduction
The Job Board Project is a web application designed to facilitate job postings and applications. Employers can post job openings and job seekers can search for and apply to jobs. The project consists of a backend built with Node.js and Express, and a frontend built with React.

## Features
- User authentication and authorization
  - Register as Employer or Job Seeker
  - Login and logout functionality
- Job Management
  - Employers can post, update, and delete job listings
  - Job seekers can view and search for job listings
- Application Management
  - Employers can view applications for their job postings
  - Job seekers can apply to jobs and view their applications
- Responsive design with a user-friendly interface

## Tech Stack
### Backend
- Node.js
- Express
- MongoDB
- Mongoose
- JWT for authentication
- bcrypt for password hashing

### Frontend
- React
- React Router
- Axios for API calls
- Bootstrap for styling

## Installation

### Backend Setup

1. Clone the repository and navigate to backend directory:
  ```bash
  git clone https://github.com/yourusername/job-board.git](https://github.com/DeepSeaCreature0/Encryptix.git
  cd Task-5/backend/
  ```
2. Install dependencies:
  ```bash
  npm install
  ```
3. Edit the .env file in the backend/config directory with the following content:
  ```bash
  MONGO_URI=your_mongodb_connection_string
  ```
4. Start the backend server:
  ```bash
  npm start
  ```

### Frontend Setup

1.Navigate to frontend directory:
```bash
cd Task-5/frontend/
```
2. Install dependencies:
```bash
npm install
```
3. Start the frontend development server:
```bash
npm run dev
```
4. Open your browser and navigate to:
```bash
http://localhost:5173/
```

## Usage
1. Register a new account as either an Employer or a Job Seeker.
2. Login with your credentials.
3. Employers can post new job listings and manage existing ones.
4. Job seekers can search for job listings and apply to them.
   
## API Endpoints
### User Routes
1. `POST /api/v1/user/register` - Register a new user
2. `POST /api/v1/user/login` - Login a user
3. `GET /api/v1/user/logout` - Logout a user
4. `GET /api/v1/user/getUser` - Get User Details

### Job Routes
1. `GET /api/v1/job/getAllJobs` - Get all jobs
2. `GET /api/v1/job/myJobs` - Get jobs posted by the logged-in employer
3. `GET /api/v1/job/:id` - Get a single job by ID
4. `POST /api/v1/job/postJob` - Post a new job
5. `PUT /api/v1/job/updateJob/:id` - Update a job
6. `DELETE /api/v1/job/deleteJob/:id` - Delete a job

### Application Routes
1. `POST /api/v1/app/postApp` - Apply to a job(Job Seeker only)
2. `GET /api/v1/application/employerGetAllApps` - Get applications for the jobs posted by the user(Employer only)
3. `GET /api/v1/application/jobSeekerGetAllApps` - Get applications for the jobs applied by the user(Job Seeker only)
3. `DELETE /api/v1/application/job/jobSeekerDeleteApp/:id` - Delete the application(Job Seeker only)

### Frontend Routes
1. `/` - Home page
2. `/login` - Login page
3. `/register` - Register page
4. `/job/getAllJobs` - View all job listings
5. `/job/post` - Post a new job (employers only)
6. `/job/me` - View jobs posted by the logged-in employer
7. `/job/:id` - View details of a specific job
8. `/application/me` - View applications made by the logged-in job seeker
8. `/application/:id` - Apply for a job with id

## Contributing
Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch: git checkout -b my-feature-branch.
3. Make your changes and commit them: git commit -m 'Add some feature'.
4. Push to the branch: git push origin my-feature-branch.
5. Submit a pull request.
   
## License
This project is licensed under the MIT License.
