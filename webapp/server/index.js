// Auth route
try {
	console.log('Loading routes/auth...');
	app.use('/api/auth', require('./routes/auth'));
	console.log('Loaded routes/auth successfully.');
} catch (err) {
	console.error('Error loading routes/auth:', err);
}

// Global error handlers for uncaught exceptions and unhandled rejections
process.on('uncaughtException', (err) => {
	console.error('Uncaught Exception:', err);
	process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
	console.error('Unhandled Rejection at:', promise, 'reason:', reason);
	process.exit(1);
});

console.log('--- index.js starting ---');
console.log('Loading dotenv...');
require('dotenv').config();
console.log('dotenv loaded');
console.log('Loading express...');
const express = require('express');
console.log('express loaded');
console.log('Loading mongoose...');
const mongoose = require('mongoose');
console.log('mongoose loaded');
console.log('Loading cors...');
const cors = require('cors');
console.log('cors loaded');


const app = express();
console.log('express app created');
app.use(cors({
	origin: [
		'https://webapp-qhil.onrender.com',
		'http://localhost:3000'
	],
	credentials: true
}));
console.log('cors middleware applied');
app.use(express.json());
console.log('json middleware applied');

// MongoDB connection

console.log('Connecting to MongoDB with URI:', process.env.MONGODB_URI);
console.time('MongoDB connection time');
mongoose.connect(process.env.MONGODB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true
}).then(() => {
	console.timeEnd('MongoDB connection time');
	console.log('MongoDB connected');
}).catch(err => {
	console.timeEnd('MongoDB connection time');
	console.error('MongoDB connection error:', err);
	process.exit(1);
});



// Register player route after app and middleware are initialized
try {
	console.log('Loading routes/player...');
	app.use('/api/player', require('./routes/player'));
	console.log('Loaded routes/player successfully.');
} catch (err) {
	console.error('Error loading routes/player:', err);
}

// Routes with detailed error logging
try {
	console.log('Loading routes/example...');
	app.use('/api/example', require('./routes/example'));
	console.log('Loaded routes/example successfully.');
} catch (err) {
	console.error('Error loading routes/example:', err);
}


app.get('/', (req, res) => {
	res.send('API is running');
});

// Global error handler
app.use((err, req, res, next) => {
	console.error('Unhandled error:', err);
	res.status(500).json({ error: 'Internal Server Error', details: err.message });
});

const PORT = process.env.PORT || 4000;
try {
	app.listen(PORT, () => {
		console.log(`Server running on port ${PORT}`);
	});
	console.log('App.listen called successfully');
} catch (err) {
	console.error('Error starting server:', err);
	process.exit(1);
}