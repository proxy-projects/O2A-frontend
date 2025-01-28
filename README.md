# Automated Attendance Management

## Overview

The Automated Attendance Management App is a web application designed to manage and track attendance for organizations. It provides features such as user authentication, QR code generation, and a dashboard for managing attendance records.

## Features

- **User Authentication**: Secure login and signup functionality.
- **Dashboard**: A central hub for managing attendance and viewing records.
- **QR Code Generation**: Generate QR codes for easy check-in and check-out.
- **Profile Management**: Users can view and edit their profiles.
- **Protected Routes**: Ensure that only authenticated users can access certain parts of the application.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **React Router**: For handling routing in the application.
- **Material-UI**: A popular React UI framework for building responsive and accessible components.
- **Vite**: A fast build tool for modern web projects.
- **Lucide-React**: A collection of beautiful and customizable icons.
- **Supabase**: Used for authentication and database management.

## Project Structure

- **src/components**: Contains reusable UI components such as Sidebar, Menu, and InfoForm.
- **src/pages**: Contains page components like Dashboard, Login, SignUp, and Profile.
- **src/context**: Contains context providers for managing global state, such as authentication.
- **src/lib**: Utility functions and helpers.
- **src/config**: Configuration files for the application.

## Setup and Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/...
   ```

2. **Install Dependencies**

   Make sure you have Node.js and npm installed. Then run:

   ```bash
   npm install
   ```

3. **Environment Variables**

   Create a `.env` file in the root directory and add the following environment variables:

   ```plaintext
   VITE_SUPABASE_URL=your-supabase-url
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

4. **Run the Application**

   Start the development server:

   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5173`.

5. **Build for Production**

   To build the application for production, run:

   ```bash
   npm run build
   ```

   The output will be in the `dist` directory.

## Usage

- **Login/Signup**: Users can create an account or log in using their credentials.
- **Dashboard**: Access the dashboard to manage attendance records.
- **Profile**: View and edit user profile information.



## Contact

For any questions or feedback, please contact [junior.hirwa@ojemba.com].
