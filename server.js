const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');

// Set up Express app
const app = express();
const port = 3000;

// Middleware
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON requests
app.use(express.static(path.join(__dirname, '../')));
app.use('/image/products', express.static(path.join('image/products'))); // Serve product images



// MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Replace with your MySQL username
    password: '', // Replace with your MySQL password
    database: 'pastry_palette2' // Replace with your database name
});

// Connect to MySQL
connection.connect(err => {
    if (err) {
        console.error('Error connecting to database:', err);
        process.exit();
    }
    console.log('Connected to database!');
});

// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, 'image/products')); // Save images in the specified folder
    },
    filename: function (req, file, cb) {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName); // Generate a unique filename
    }
});

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        const allowedTypes = /jpeg|jpg|png/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);

        if (extname && mimetype) {
            cb(null, true);
        } else {
            cb(new Error('Only JPEG, JPG, and PNG images are allowed'));
        }
    }
});

// API to add a product

app.post('/add-product', upload.single('image'), (req, res) => {
    const { product_id, product_name, description, price, quantity } = req.body;
    const image = req.file ? `image/products/${req.file.filename}` : null;

    if (!product_id || !product_name || !description || !price || !quantity || !image) {
        return res.status(400).json({ message: 'All fields, including product ID and image, are required' });
    }

    const sql = 'INSERT INTO inventory_table (Product_ID, Product_Name, Description, Price, Image, Quantity) VALUES (?, ?, ?, ?, ?, ?)';
    connection.query(sql, [product_id, product_name, description, price, image, quantity], (err, result) => {
        if (err) {
            console.error('Error adding product:', err);
            return res.status(500).json({ message: 'Error adding product', error: err.message });
        }
        res.status(200).json({ message: 'Product added successfully' });
    });
});



/*app.post('/add-product', upload.single('image'), (req, res) => {
    const { product_name, description, price, quantity } = req.body;
    const image = req.file ? `image/products/${req.file.filename}` : null; // This will save the path correctly without a leading slash

    if (!product_name || !description || !price || !quantity || !image) {
        return res.status(400).json({ message: 'All fields, including image, are required' });
    }

    const sql = 'INSERT INTO inventory_table (Product_ID, Product_Name, Description, Price, Image, Quantity) VALUES (?, ?, ?, ?, ?, ?)';
    connection.query(sql, [product_id, product_name, description, price, image, quantity], (err, result) => {
        if (err) {
            console.error('Error adding product:', err);
            return res.status(500).json({ message: 'Error adding product', error: err.message });
        }
        res.status(200).json({ message: 'Product added successfully' });
    });
});
*/


// app.post('/add-product', upload.single('image'), (req, res) => {
//     alert('jp')
//     const { product_id, product_name, description, price, quantity } = req.body;
//     const image = req.file ? `image/products/${req.file.filename}` : null; // This will save the path correctly without a leading slash

//     if (!product_id || !product_name || !description || !price || !quantity || !image) {
//         return res.status(400).json({ message: 'All fields, including image, are required' });
//     }

//     const sql = 'INSERT INTO inventory_table (Product_ID, Product_Name, Description, Price, Image, Quantity) VALUES (?, ?, ?, ?, ?, ?)';
//     connection.query(sql, [product_id, product_name, description, price, image, quantity], (err, result) => {
//         if (err) {
//             console.error('Error adding product:', err);
//             return res.status(500).json({ message: 'Error adding product', error: err.message });
//         }
//         res.status(200).json({ message: 'Product added successfully' });
//     });
// });


// API to fetch all products
app.get('/get-products', (req, res) => {
    const sql = 'SELECT * FROM inventory_table'; // Ensure the "Image" field is included in this query
    connection.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching products:', err);
            return res.status(500).json({ message: 'Error fetching products' });
        }
        res.status(200).json(results);
    });
});

// API to get the product count
app.get('/get-product-count', (req, res) => {
    const sql = 'SELECT COUNT(*) as "Product Count" FROM inventory_table'; // Ensure the "Image" field is included in this query
    connection.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching products:', err);
            return res.status(500).json({ message: 'Error fetching products' });
        }
        res.status(200).json(results);
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://127.0.0.1:${port}`);
});
