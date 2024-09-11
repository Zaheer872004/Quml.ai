# Quml.ai - A Next.js Application

This project is a full-stack application built with modern web development practices. It leverages Next.js, TypeScript, and MongoDB, ensuring type safety, efficient data handling, and a seamless user experience.

## Project Overview

This Next.js application is designed to provide a robust and user-friendly platform. Key features include:

- **Database:** MongoDB for efficient data storage and retrieval.
- **Schema Design:** Mongoose for flexible and powerful schema design.
- **Validation:** Zod for schema validation, ensuring data integrity.
- **Authentication:** Custom credentials with NextAuth for secure user authentication, including email verification with a 6-digit OTP.
- **Frontend Design:** Tailwind CSS for styling and ShadCN components for building dynamic, responsive interfaces.
- **Type Safety:** TypeScript is utilized to enhance code reliability and maintainability.
- **Debouncing:** Implemented for Fullname availability checks, providing real-time feedback during sign-up.

## Features

- **Email Verification:** Users receive a 6-digit OTP via email upon sign-up. Once verified, they are redirected to the sign-in page.
- **Post-Sign-In Redirection:** After successful sign-in, users are redirected to the Quml.ai home page.
- **Fullname Availability Check:** Real-time feedback on Fullname availability using debouncing.

## Getting Started

To get the project up and running on your local machine, follow these steps:

### Prerequisites

- [Node.js](https://nodejs.org/) (v16.x or higher)
- npm, Yarn, or pnpm
- [MongoDB](https://www.mongodb.com/) (local instance or MongoDB Atlas)
- Environment variables setup

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Zaheer872004/Quml.ai.git
   cd Quml.ai
