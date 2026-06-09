const app = require('./src/app');
const connectDB = require('./src/config/database');
require("dotenv").config();
connectDB()

app.listen(5000, "0.0.0.0", () => {
    console.log(`server is running on port 5000`);
});
