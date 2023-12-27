const querycontac = {
    getcontact: 'select * from contact order by timecontact desc',
    getcontactbyid: 'select * from contact where id_contact = @id_contact',
    insertcontact: 'insert into contact(username,phone,servicesname,note,timecontact) values(@username,@phone,@servicesname,@note,GETDATE())',
    updatecontact: 'update contact set username = @username, phone = @phone, servicesname = @servicesname, note = @note where id_contact = @id_contact',
    deletecontact: 'delete from contact where id_contact = @id_contact',
};
const querycar = {
    getcar: 'select * from car',
    getcarbytype: 'select * from car where cartype = @cartype',
    getcarbyid: 'select * from car where id_car = @id_car',
    insertcar: 'insert into car(namecar, brandcar, price, imagecar, statuscar, cartype, adddate) values(@namecar, @brandcar, @price, @imagecar, @statuscar, @cartype, GETDATE())',
    updatecar: 'update car set namecar = @namecar, brandcar = @brandcar, price = @price, imagecar = @imagecar, statuscar = @statuscar, cartype = @cartype where id_car = @id_car',
    deletecar: 'delete from car where id_car = @id_car',
};
const queryrentalcar = {
    getrentalcar: 'select * from rentalcar order by adddate desc',
    getrentalcarbyid: 'select * from rentalcar where id_rentalcar = @id_rentalcar',
    insertrentalcar: 'insert into rentalcar(pick, destination, direction, typevehicle, datetimehire, fullname, phone,adddate) values(@pick, @destination, @direction, @typevehicle, @datetimehire, @fullname, @phone,GETDATE())',
    updaterentalcar: 'update rentalcar set pick = @pick, destination = @destination, direction = @direction, typevehicle = @typevehicle, datetimehire = @datetimehire, fullname = @fullname, phone = @phone where id_rentalcar = @id_rentalcar',
    deleterentalcar: 'delete from rentalcar where id_rentalcar = @id_rentalcar',
};
const queryinfo = {
    getinfo: 'select * from info',
    getinfobyid: 'select * from info where id_info = @id_info',
    insertinfo: 'insert into info(nameinfo, link) values(@nameinfo, @link)',
    updateinfo: 'update info set nameinfo = @nameinfo, link = @link where id_info = @id_info',
    deleteinfo: 'delete from info where id_info = @id_info',
};
const queryprice = {
    getprice: 'select * from price',
    getpricebyid: 'select * from price where id_price = @id_price',
    insertprice: 'insert into price(addr, km, type4, type7, type16) values(@addr, @km, @type4, @type7, @type16)',
    updateprice: 'update price set addr = @addr, km = @km, type4 = @type4, type7 = @type7, type16 = @type16 where id_price = @id_price',
    deleteprice: 'delete from price where id_price = @id_price',
};
module.exports ={
    querycontac,
    querycar,
    queryrentalcar,
    queryinfo,
    queryprice,
} 

