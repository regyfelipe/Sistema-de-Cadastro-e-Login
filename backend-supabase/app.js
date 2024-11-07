// backend/app.js
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors"); 
const path = require('path');

const authRoutes = require("./routes/authRoutes");

dotenv.config();

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST'], 
  allowedHeaders: ['Content-Type'], 
}));



app.use(express.json({ limit: '10mb' })); 
app.use(express.urlencoded({ limit: '10mb', extended: true })); 

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use("/api", authRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
