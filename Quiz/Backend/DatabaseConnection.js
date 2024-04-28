const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;


const { User, Subject, Question } = require('DatabaseTable.js');
app.use(express.json());





// Create MySQL connection
const connection = mysql.createConnection({
  host: process.env.DB_HOST,     
  user: process.env.DB_USER,      
  password: process.env.DB_PASSWORD, 
  database: process.env.DB_NAME 
});



console.log("The Process worked!!!")





// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});






app.post('/saveData', async (req, res) => {
  try {
      const user = await User.create(req.body);
      res.status(200).json({ success: true, user });
  } catch (err) {
      console.error('Error saving data:', err);
      res.status(500).json({ error: 'Failed to save data' });
  }
});








// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
