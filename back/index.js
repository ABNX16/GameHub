const express = require('express'); 
const mongoose = require('mongoose'); 
const cors = require('cors'); 
require('dotenv').config();

const adminRoute = require('./routes/adminRoute');
const userRoute = require('./routes/userRoute');
const orderlistRoute = require('./routes/orderlistRoute'); 
const cartRoutes = require('./routes/cartRoute'); 
const userlistRoutes = require('./routes/userlistRoute');
const sellerRoute = require('./routes/sellerRoute')
const visitedRoute = require('./routes/visitedRoute')
const acceptRoute = require('./routes/acceptRoute')
const rejectRoute = require('./routes/rejectRoute')

const app = express();
const PORT = 5000;

app.use('/uploads', express.static('uploads'));

app.use(cors());
app.use(express.json());

// Mount all routes
app.use('/admin', adminRoute);
app.use('/user', userRoute);
app.use('/order', orderlistRoute);
app.use('/cart', cartRoutes); 
app.use('/userlist', userlistRoutes); 
app.use('/seller',sellerRoute)
app.use('/visited',visitedRoute)
app.use('/accept',acceptRoute)
app.use('/reject',rejectRoute)

// MongoDB connection
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected"))
.catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Test route
app.get("/", (req, res) => {
  res.send("Backend Server Running");
});

app.listen(PORT, () => {
  console.log(`🚀 Server started at: http://localhost:${PORT}`);
});
