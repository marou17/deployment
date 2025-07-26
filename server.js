const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ Connecté à MongoDB"))
.catch((err) => console.error("❌ Erreur de connexion", err));

const path = require('path');
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log( `Serveur lancé sur http://localhost:${PORT} ` );
});