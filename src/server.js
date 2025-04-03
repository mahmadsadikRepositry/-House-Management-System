import app from './app.js'; 
import dotenv from 'dotenv'; 
import connectDB from './config/db.js';
// Load environment variables 
dotenv.config(); 
 
//Connect with Database
await connectDB();

const PORT = process.env.PORT || 3000; 
 
app.listen(PORT, () => { 
    console.log(`🚀 Server running on http://localhost:${PORT}`); 
});