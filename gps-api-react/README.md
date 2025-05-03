# GPS-API-React

## About the Project

This project is a **crypto wallet emulator** designed to:
- List the coins added to the wallet.
- Display their price history with filters for date ranges.
- Fetch historical data for coins not added to the wallet at a specific time, using the **GPS-API**.

The backend GPS-API utilizes MongoDB as its database to store coin-related data. The React frontend communicates with this API to provide a seamless user experience.

## Features

1. **Wallet Management**:
   - Add and remove coins from the wallet.
   - View detailed price history for each coin.
   - Filter coin data by custom date ranges.

2. **User Interface**:
   - Responsive design with support for mobile and desktop views.
   - Navigation through a bottom navigator for quick access to different sections like the home, wallet, and account settings.

3. **Integration**:
   - Backend API integration for fetching real-time and historical coin data.
   - Uses Material-UI components for a clean and intuitive interface.

4. **Authentication**:
   - Secure user authentication for accessing wallet features.
   - Email verification and customizable notification preferences.

## Project Structure

- **Frontend**: Built with React, featuring components like `Home.js`, `Manage.js`, and `ReqWithAuth.js` for handling wallet operations and API requests.
  - `src/Router.js`: Defines the application's routing logic.
  - `src/components`: Contains reusable components for navigation, data visualization, and user interaction.
  - `public/index.html`: Entry point for rendering the React application in the browser.

- **Backend**: Developed using Node.js and Express, with MongoDB as the database.
  - `app.js`: Main server file to handle API endpoints and middleware.
  - `db/connect.js`: Establishes the database connection.
  - `models/Crypto.js`: Defines the schema for storing cryptocurrency data.

## Deployment Process

### Frontend
1. Build the application:
   ```bash
   npm run build
   ```
  - This will generate a `build` folder containing the static files for deployment.
2. Deploy the contents of the `build` folder to a hosting platform like Netlify, Vercel, or GitHub Pages.
### Backend
1. Set up a MongoDB database and configure the connection URI in the environment file (`.env`).
2. Start the server:
   node app.js
3. Ensure the backend is hosted on a service like Heroku or AWS to provide API access to the frontend.

## Getting Started

### Prerequisites
- Node.js and npm installed on your machine.

### Installation
1. Clone the repository:
   git clone https://github.com/sserdardundar/react-projects.git
2. Navigate to the project directory:
   cd gps-api-react
3. Install dependencies:
   npm install

## Learn More
For a deeper understanding of React and its ecosystem, refer to:
- React Documentation: https://reactjs.org/
- Material-UI Documentation: https://mui.com/
