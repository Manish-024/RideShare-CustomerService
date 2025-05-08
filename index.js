require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const Database = require("./config/database");
const ticketRoutes = require("./routes/tickets");

const PORT = process.env.PORT || 4001;
const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@bits-scalable.gjrn38y.mongodb.net/RideShare?retryWrites=true&w=majority`;

const db = new Database(MONGODB_URI);
db.connect()
  .then(() => console.log("Connected to database: customerSupport"))
  .catch((err) => console.error("Error connecting to database:", err));

// Ensure uploads directory
const uploadsPath = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsPath)) fs.mkdirSync(uploadsPath, { recursive: true });

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(uploadsPath));
app.use("/tickets", ticketRoutes);

app.get("/server-status", (req, res) => {
  res.status(200).json({ message: "Server is up and running!" });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
