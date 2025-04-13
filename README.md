
# Book Landing Page with Vercel API Integration

This project is a book landing page with an email signup feature for a reading club, using:
- React for the frontend
- Vercel Serverless Functions for API endpoints
- MongoDB for data storage

## Deployment Instructions

### Prerequisites
1. A [Vercel](https://vercel.com) account
2. A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account (or other MongoDB provider)

### Setup MongoDB
1. Create a MongoDB database (e.g., `reading_club_db`)
2. Create a collection named `subscribers`
3. Get your MongoDB connection string

### Deploy to Vercel
1. Push your code to a GitHub repository
2. Import the repository to Vercel
3. In the Vercel project settings, add an environment variable:
   - MONGODB_URI = your_mongodb_connection_string
4. Deploy the project

Vercel will automatically recognize the `api` directory and deploy the serverless functions.

### Local Development
For local development with API access:
1. Install the Vercel CLI: `npm i -g vercel`
2. Run `vercel dev` in the project root
3. The API endpoints will be available at `http://localhost:3000/api/email-signup`

## Project Structure
- `/api`: Vercel serverless functions
  - `/utils`: Utilities for the API
  - `email-signup.js`: Email signup endpoint
- `/src`: React application code
