const mongoose = require("mongoose");

module.exports = mongoose.model( // exports allows us to use many functions with schema
  // In the mongoose connection, create a model called "User" with the respective schema
  "User",
  new mongoose.Schema({
    id: { type: String }, // User ID
    username: { type: String },
    registeredAt: { type: Number, default: Date.now() },
    balance: { type: Number, default: 0 },
    premiumBalance: { type: Number, default: 0 },
    inventory: {
      skin_test: {
        value: { type: Number, default: 0 },
        price: { type: Number, default: 1.90 },
        image: { type: String, default: "/glockfade.png"}
      },
      skin_test2: {
        value: { type: Number, default: 0 },
        price: { type: Number, default: 1.90 },
        image: { type: String, default: "/forzeholo.png"}
      },
      skin_test3: {
        value: { type: Number, default: 0 },
        price: { type: Number, default: 1.90 },
        image: { type: String, default: "/recoilcasenew.png"}
      },
      case1: {
        value: { type: Number, default: 0 },
        price: { type: Number, default: 1.90 },
        image: { type: String, default: "/recoilcasenew.png"}
      },
      case2: {
        value: { type: Number, default: 0 },
        price: { type: Number, default: 1.90 },
        image: { type: String, default: "/brokenfangnew.png"}
      },
      case3: {
        value: { type: Number, default: 0 },
        price: { type: Number, default: 1.90 },
        image: { type: String, default: "/dreamnightmaresnew.png"}
      },
      case4: {
        value: { type: Number, default: 0 },
        price: { type: Number, default: 1.90 },
        image: { type: String, default: "/stockholmcontenders.png"}
      },
      case5: {
        value: { type: Number, default: 0 },
        price: { type: Number, default: 1.90 },
        image: { type: String, default: "/stockholmdust.png"}
      },
      case6: {
        value: { type: Number, default: 0 },
        price: { type: Number, default: 1.90 },
        image: { type: String, default: "/recoilcasenew.png"}
      },
    },
    passiveUpgrades: {
      passiveUpgrade1: {
        level: { type: Number, default: 0 },
        value: { type: Number, default: 0 }
      },
      passiveUpgrade2: {
        level: { type: Number, default: 0 },
        value: { type: Number, default: 0 }
      },
      passiveUpgrade3: {
        level: { type: Number, default: 0 },
        value: { type: Number, default: 0 }
      },
      passiveUpgrade4: {
        level: { type: Number, default: 0 },
        value: { type: Number, default: 0 }
      }
    }
  })
);
