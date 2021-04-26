const express = require('express');
const imagesRouter = express.Router();
const auth = require('./auth');
const path = require('path');
const crypto = require('crypto');//to generate file name
const mongoose = require('mongoose');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');

require('dotenv').config();

let db = mongoose.connection;

let gfs;

// console.log(db);
// console.log('~~~~~~~~~~');

db.on('open', () => {
  gfs = Grid(db, mongoose.mongo);
  gfs.collection('imageUpload');
});

let storage = new GridFsStorage({
  url: process.env.DATABASE_CONNECT,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      const fileInfo = {
        filename: file.originalname,
        bucketName: "imageUpload"
      }
      resolve(fileInfo);
    });
  }
});

const upload = multer({ storage });

imagesRouter.post('/upload', upload.single("upload"), async (req, res) => {
  res.json({
    file: req.file,
  });
});

imagesRouter.get('/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // check if file exists
    if (!file || file.length == 0) {
      return res.status(404).json({
        message: "This file does not exist",
      });
    }
    // check if the file is an image
    if (file.contentType === 'image/jpeg' || file.contentType === 'img/png') {
      // read output to browser
      const readStream = gfs.createReadStream(file.filename);
      readStream.pipe(res);
    } else {
      res.status(404).json({
        message: "It is not an image",
      });
    }
  });
});

imagesRouter.delete('/:id', (req, res) => {
  gfs.remove({ _id: req.params.id, root: 'imageUpload' }, (error, gridStore) => {
    if (error) {
      return res.status(404).json({ message: error, });
    }
    res.json({ message: 'Image deleted', });
  })
});

module.exports = imagesRouter;
