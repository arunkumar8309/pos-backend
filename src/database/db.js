require('dotenv').config();
const mongoose = require('mongoose');

const URI = process.env.DB_URL;
console.log("Database URI",URI);
mongoose.connect(URI,{
  useUnifiedTopology: true,
  useNewUrlParser: true,

});

const connection = mongoose.connection;

try {
  connection.once('open', () => {
    console.log('DB is running');
  });
} catch (error) {
  console.log('Error while connecting DB');

  console.log(error.message);
}
