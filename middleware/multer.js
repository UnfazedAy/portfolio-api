// Function: Multer middleware for file upload

import multer from 'multer';
import DatauriParser from 'datauri/parser.js';

const parser = new DatauriParser();
const memoryStorage = multer.memoryStorage();
const upload = multer({
  storage: memoryStorage,
  limits: {fileSize: 1 * 1024 * 1024}, // 1 MB
});

const bufferToDataUri = (fileFormat, buffer) => {
  parser.format(fileFormat, buffer);
};

export {upload, bufferToDataUri};
