require('dotenv').config(); // ✅ Load environment variables

const app = require('./src/app'); // ✅ Use relative path

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
