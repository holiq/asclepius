class ImageSizeException extends Error {
  constructor(message, statusCode = 400) {
    super(message);
    this.name = 'ImageSizeException';
    this.statusCode = statusCode;
  }
}

module.exports = ImageSizeException;
