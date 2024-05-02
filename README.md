# SDE Home assignment

- Check out the live demo [here](https://sde-assignment.onrender.com)
- Note: This is free version on render so when not used for while it turns down, please wait for few seconds for to server starup.

## Getting Started with the Node Application

This guide will help you to set up and run the Node.js application on your local machine.

### Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (Download from [Node.js official website](https://nodejs.org/))
- npm (Comes with Node.js installation)
- MongoDB (Follow the installation guide on [MongoDB official website](https://www.mongodb.com/try/download/community))

### Installation

1. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/Astro-Abhi/sde-assignment
   cd sde-assignment
   ```

2. Install the required npm packages:
   ```bash
   npm install
   ```

3. Setup MongoDB
    - Create db as test
    - create a collection called as users

3. Set up your environment variables:
   - Update the `MONGO_URI` variable in the `.env` file with your MongoDB URI.

### Running the Application

1. Start the server:
   ```bash
   npm run start
   ```

2. Open your browser and navigate to `http://localhost:3000` to view the application.

### Additional Commands

- To run the application in development mode (with nodemon):
  ```bash
  npm run dev
  ```

