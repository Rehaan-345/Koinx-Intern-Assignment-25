# Crypto API Showcase

This project is a cryptocurrency data showcase that interacts with a backend API to retrieve real-time stats and deviation of coins like Bitcoin, Ethereum, and Matic Network.

You can access the app hosted at [https://koinx-intern-assignment-25.onrender.com](https://koinx-intern-assignment-25.onrender.com).

The project features an HTML interface that allows users to select a cryptocurrency and get its current price, market cap, and 24-hour price change stats. Additionally, it fetches and displays the standard deviation of the selected cryptocurrency's price based on historical data.

## Features

- **Stats API**: Provides current price, market cap, and 24h price change for selected cryptocurrencies.
- **Deviation API**: Calculates and displays the standard deviation of a cryptocurrency's price over the last 100 entries.
- **Cron Job**: Fetches fresh cryptocurrency data every 2 hours and stores it in MongoDB.

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express, Axios, MongoDB
- **Cron Jobs**: node-cron (for periodically fetching crypto data)
- **MongoDB**: Database to store and retrieve cryptocurrency data

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/Rehaan-345/Koinx-Intern-Assignment-25.git
   ```
   
2. Navigate to the project directory:
   ```bash
   cd Koinx-Intern-Assignment-25
   ```
3. Install the necessary dependencies:
    ```makefile
   npm install
    ```
4. Create a `.env` file in the root directory and add the following variables:
   ```bash
   PORT=5000
   API=<Your_Crypto_API_URL>
   MONGO_URI=<Your_MongoDB_Connection_String>
   ```
5. Start the server:
   ```bash
   npm start
   ```
6. The app should now be running at `http://localhost:5000`.

## Usage

Once the server is running:

- In `index.html` change the `API_BASE_URL` to `localhost:5000` or `127.0.0.1:5000`.
- Open `127.0.0.1:5000` or `localhost:5000` in your browser.
- You can choose a coin (Bitcoin, Ethereum, or Matic Network) and click the **Get Stats** button to fetch real-time cryptocurrency stats.
- Similarly, you can click the **Get Deviation** button to calculate the standard deviation of the selected coin.
