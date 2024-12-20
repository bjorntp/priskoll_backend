const mysql = require('mysql2');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello world! AGAIN! AND ONCE MORE!');
});

const connection = mysql.createConnection({
  host: "mysql_container",
  user: "analytics_user",
  password: "userpassword"
});

const initDB_query = `
  CREATE TABLE visitors (
    ip VARCHAR(255),
    timestamp  DATE
  );
`;

connection.connect(function(err) {
  if (err) {
    console.log("error")
  } else {
    console.log("Connected to DB");
    connection.query(`USE analytics`);
    connection.query(initDB_query, function(err, result) {
      if (err) {
        console.log("Error: ", err);
      } else {
        console.log(result);
      }
    });
  }
});

app.post('/api/track-visit', (req, res) => {
  const visitorData = {
    ip: req.ip,
    timestamp: new Date(),
  }
  console.log(visitorData.ip);
  console.log(visitorData.timestamp);
  var add_visit_query =
    `
  INSERT INTO visitors
  VALUES (?, ?);
  `
  connection.query(add_visit_query, [visitorData.ip, visitorData.timestamp], function(err, result) {
    if (err) {
      console.log("Error: ", err);
      res.status(500).send('Error');
    } else {
      console.log(result);
      res.status(200).send('Visit logged');
    }
  });
})

app.listen(PORT, () => {
  console.log(`Server uning on http://localhost:${PORT}`);
});
