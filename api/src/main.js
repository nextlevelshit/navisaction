const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp'); // Install sharp: npm install sharp
const mime = require('mime'); // Install mime: npm install mime

const app = express();
const port = 3000;

// Allow CORS with custom options
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
}));

app.use(express.static('public'));
app.use(express.json());

const uploadFolder = './uploads';

const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4', 'video/webm'];

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadFolder);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname.toLowerCase());
    },
});

const fileFilter = (req, file, cb) => {
    if (allowedMimeTypes.includes(mime.getType(file.originalname))) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({ storage, fileFilter });

app.post('/upload', upload.array("files"), (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).send({ success: false, message: 'No files recieved' });
    }

    console.table(req.files);

    const images = req.files.map(file => ({
        name: file.originalname,
        url: `http://localhost:${port}/images/${file.filename}`
    }));

    res.send({ success: true, message: 'Files uploaded successfully', files: images });
});

app.get('/images', (req, res) => {
    fs.readdir(uploadFolder, (err, files) => {
        if (err) {
            return res.status(500).send({ success: false, message: 'Failed to read directory' });
        }

        const images = files
            .filter(file => allowedMimeTypes.includes(mime.getType(file)))
            .map(file => {
                const timestamp = file.slice(0, 13);
                const originalname = file.slice(14);
                return {
                    name: originalname,
                    timestamp,
                    url: `http://localhost:${port}/images/${file}`
                };
            })
            .sort((a, b) => b.timestamp - a.timestamp)
            .map(({ name, url }) => ({ name, url }));

        res.send({ success: true, images });
    });
});


app.get('/images/:filename', async (req, res) => {
    const filePath = path.join(uploadFolder, req.params.filename);

    if (!fs.existsSync(filePath)) {
        return res.status(404).send({ success: false, message: 'File not found' });
    }

    // Set default width and height for resizing
    const width = parseInt(req.query.width) || 300;
    const height = parseInt(req.query.height) || 300;

    const mimetype = mime.getType(filePath);

    if (allowedMimeTypes.includes(mimetype)) {
        res.setHeader('Content-Type', mimetype);

        if (mimetype.startsWith('image')) {
            const metadata = await sharp(filePath).metadata();
            const orientation = metadata.orientation;

            sharp(filePath)
                .resize({ height }).withMetadata({ orientation }).toBuffer()
                .then(data => res.send(data))
                .catch((_) => res.status(500).send({ success: false, message: 'Failed to transform image' }));
        } else {
            // Video resizing and serving can be implemented here using FFmpeg
            res.sendFile(filePath);
        }
    } else {
        res.status(400).send({ success: false, message: 'Invalid file format' });
    }
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
