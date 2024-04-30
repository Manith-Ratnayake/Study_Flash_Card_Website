const mysql = require('mysql2');
const express = require('express');
const bcrypt = require('bcryptjs');
const cors = require('cors');

require('dotenv').config();

// Initialize Express app
const app = express();
const port = 13662; // Make sure this port is not in conflict

// Enable CORS for all routes (be more specific in production)
app.use(cors());

// mysql2 pool configuration using environment variables
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  connectTimeout: 30000  // Adjusted to 30 seconds
}).promise();


app.use(express.static('../Frontend'));
app.use(express.json());




// Example API: Sign In
app.post('/api/signin', async (req, res) => {
  const { email, password } = req.body;
  try {
    const [users] = await pool.query('SELECT * FROM User_Detail WHERE Email = ?', [email]);
    const user = users[0];
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.Password);
    if (!isMatch) {
      return res.status(401).send({ message: 'Invalid credentials' });
    }

    res.send({ message: 'Login successful', email: user.Email });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).send({ message: 'Server error' });
  }
});




// Example API: Signup
app.post('/api/signup', async (req, res) => {
  const { email, password } = req.body;
  try {
    const [existing] = await pool.query('SELECT * FROM User_Detail WHERE Email = ?', [email]);
    if (existing.length > 0) {
      return res.status(409).send({ message: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query('INSERT INTO User_Detail (Email, Password) VALUES (?, ?)', [email, hashedPassword]);
    res.status(201).send({ message: 'User created', user: { email: email } });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).send({ message: 'Server error during signup' });
  }
});





// // DatabaseConnection.js
app.post('/api/getAllUserSubjects', async (req, res) => {
  const userEmail = req.body.email;
  console.log("Received request for user email:", userEmail);

  try {
      // Example response if fetching from a database
      const [results] = await pool.query('SELECT Subject FROM User_subject WHERE Email = ?', [userEmail]);
      console.log("Query Results: ", results);


      if (!results || results.length === 0) {
          console.log("No subjects found for user:", userEmail);
          return res.status(404).json({ message: 'No subjects found for the user' });
      }

      const subjects = await Promise.all(results.map(async (result) => {
        return result.Subject;
    }));
    

      console.log("Subject: ", subjects);
      res.json({ subjects });
  } catch (error) {
      console.error('Error executing SQL query:', error);
      return res.status(500).json({ error: 'An error occurred while fetching user subjects' });
  }
});








function startServer(port) {
  app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
  }).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${port} is already in use, trying port ${port + 1}`);
      startServer(port + 1);
    } else {
      console.error(err);
    }
  });
}

startServer(port);


