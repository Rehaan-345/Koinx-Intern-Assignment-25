const mongoose = require("mongoose");


const CryptoDataSchema = new mongoose.Schema({
  bitcoin: {
    currentPrice: { type: Number, required: true },
    marketCap: { type: Number, required: true },
    change24h: { type: Number, required: true },
  },
  ethereum: {
    currentPrice: { type: Number, required: true },
    marketCap: { type: Number, required: true },
    change24h: { type: Number, required: true },
  },
  "matic-network": {
    currentPrice: { type: Number, required: true },
    marketCap: { type: Number, required: true },
    change24h: { type: Number, required: true },
  },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("CryptoData", CryptoDataSchema);
