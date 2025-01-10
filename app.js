const express = require("express");
const axios = require("axios");
const cron = require("node-cron");
const mongoose = require("mongoose");
const CryptoData = require("./src/models/CryptoData");
// LIBRARIES


// .ENV Config / Imports
require("dotenv").config();
const PORT = process.env.PORT || 5000;
const API = process.env.API;
const MONGO = process.env.MONGO_URI;


// Express App Intialisation
const app = express();
app.use(express.json());



// MongoDB setup
mongoose
  .connect(MONGO)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.error("MongoDB connection error:", error));




// Default Adress  ------------------------------->     '/' Index,Home
app.get("/", (req, res) => {
  res.send("Server Running...");
});




// Fetch particular coin data  ------------------->    '/ stats ? coin=bitcoin '
app.get("/stats", async (req, res) => {

  const { coin } = req.query;  //Get the coin queryParam
  
  // Check for valid Coin
  if (["bitcoin", "ethereum", "matic-network"].includes(coin)) { 

    console.log("valid")
  
    try {
  
      var fet = { _id: 0 }; // Defining columns to be retrieve
      
      fet[coin] = 1;

      const crypto = await CryptoData.findOne({}, fet) //Fetching Data from MongoDB
        .sort({ timestamp: -1 }) // Sorts the documents and gets the latest One
        .exec();
  
        if (crypto) {
          // If data found RETURN data with 200
          return res.status(200).json(crypto[coin]);
      
        }
      
        return res.status(404).json({
          // Else 404 code when not found
          error: `No data found for the requested cryptocurrency: ${coin}`,
      
        });
        
        // Any Error while retrieveing
      } catch (error) {
      
        console.error("Error fetching cryptocurrency data:", error);
      
        return res.status(400).json({

          error: "Error in fetching Data",

        });
    }
  }

  // If {coin} "query param" is empty or Invalid
  return res.status(400).json({
    error:
      "Invalid or missing coin parameter. Must be one of: bitcoin, matic-network, ethereum.",
  });
});




// CRON Funtion defination
// 0(minutes) */2(every 2 hours)
cron.schedule("0 */2 * * *", async function jobYouNeedToExecute() {
  try {

    const response = await axios.get(API); // Fetch details at equal intervals of time (2 Hours)
    const data = response.data;

    console.log(data);
    var u_data = [];  // To store individual coins data
    
    for (const [coinId, details] of Object.entries(data)) {
    
      console.log([coinId, details]);
    
      u_data.push({
        currentPrice: details.usd,
        marketCap: details.usd_market_cap,
        change24h: details.usd_24h_change,
      });

    }

    // Insert Fetched fresh data into the DB 

    await CryptoData.create({
      bitcoin: u_data[0],
      ethereum: u_data[1],
      "matic-network": u_data[2],
    });

    console.log(u_data);

    console.log("Crypto data fetched and stored successfully.");

  } catch (error) {
    
    console.error("Error fetching cryptocurrency data:", error.message);

  }

  console.log(new Date().toLocaleString());
  
});



// Running of Express Object
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
