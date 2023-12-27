const fs = require('fs');
const path = require('path');


const uploadImage = (req, res) => {
  try {
    if (!req.files) {
      return res.status(400).send('No files were uploaded.');
    }


    const image = req.files.image;
    const uploadPath = path.join(__dirname, '../images/', image.name);


    image.mv(uploadPath, (err) => {
      if (err) {
        return res.status(500).send(err);
      }

      res.status(200).send('File uploaded successfully.');
    });
  } catch (err) {
    res.status(500).send(err);
  }
};
const deleteImage = (req, res) => {
    try {
      const imageName = req.params.name;
      const imagePath = path.join(__dirname, '../images/', imageName);

      fs.unlinkSync(imagePath);
      
      res.status(200).send('File deleted successfully.');
    } catch (err) {
      res.status(500).send(err);
    }
  };
  const convertToBase64 = async (req, res) => {
    try {
      const imageName = req.body.name;
      const imagePath = path.join(__dirname, '../images/', imageName);
      var bitmap = fs.readFileSync(imagePath);
      const base64Image = Buffer.from(bitmap).toString('base64');
      return res.status(200).json({
        success: true,
        data:base64Image
    })
    } catch (err) {
      res.status(500).send(err);
    }
  };
module.exports = {
  uploadImage,
  deleteImage,
  convertToBase64,
};
