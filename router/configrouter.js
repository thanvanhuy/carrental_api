const express = require('express');
const router = express.Router();
//jwt
const authen =require('../middlewares/admin.middleware.js')

//controller
const signInAdmin =require('../controller/admin.controller.js')
const car=require('../controller/car.controller.js')
const contact=require('../controller/contac.controller.js')
const info=require('../controller/info.controller.js')
const rentalcar=require('../controller/rentalcar.controller.js')
const priceController = require('../controller/price.controller.js');
const sendMail = require('../controller/sendmail.controller.js');
const image=require('../controller/images.controller.js');

//image
router.post('/convertimage',image.convertToBase64);
router.post('/uploadimage',image.uploadImage);
router.post('/deleteimage',image.deleteImage);

//send mail
router.post('/sendmail',sendMail)
//price car
router.get('/getallprice', priceController.getprice);
router.post('/getpricebyid/:id_price', authen, priceController.getpricebyid);
router.post('/insertprice',authen, priceController.createprice);
router.put('/updateprice', authen, priceController.updateprice);
router.post('/deleteprice/:id_price', authen, priceController.deleteprice);

// Info
router.get('/getallinfo', info.getinfo);
router.post('/getinfobyid/:id_info', authen, info.getinfobyid);
router.post('/insertinfo',authen, info.createinfo);
router.put('/updateinfo', authen, info.updateinfo);
router.post('/deleteinfo/:id_info', authen, info.deleteinfo);

// Rental Car
router.get('/getallrentalcar',authen, rentalcar.getrentalcar);
router.post('/getrentalcarbyid/:id_rentalcar', authen, rentalcar.getrentalcarbyid);
router.post('/insertrentalcar', rentalcar.createrentalcar);
router.put('/updaterentalcar', authen, rentalcar.updaterentalcar);
router.post('/deleterentalcar/:id_rentalcar', authen, rentalcar.deleterentalcar);

// car
router.get('/getallcar',car.getcar);
router.post('/getallcartype',car.getcarbytype);
router.post('/getcarbyid/:id_car', authen, car.getcarbyid);
router.post('/insertcar',authen,car.createcar);
router.put('/updatecar',authen,car.updatecar);
router.post('/deletecar/:id_car',authen,car.deletecar);

// contac
router.get('/getallcontac',authen,contact.getcontact);
router.post('/getcontacbyid/:id_contact', authen, contact.getcontactbyid);
router.post('/insertcontac',contact.createcontac);
router.put('/updatecontac',authen,contact.updatecontact);
router.post('/deletecontac/:id_contact',authen,contact.deletecontact);


// admin login
router.post('/signinadmin', signInAdmin.signInAdmin);

module.exports=  router;