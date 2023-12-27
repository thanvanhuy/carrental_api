const { request, response } = require("express");
const { sql, getConnection } = require('../database/db');
const queryuser = require('../database/queryuser.js');

const getcontact = async (_req = request, _res = response) => {
    try {

        const pool = await getConnection();
        const result = await pool.request().query(queryuser.querycontac.getcontact);

        _res.json({
            success: true,
            status: 200,
            data: result.recordset
        });


    } catch (_err) {
        _res.json({
            success: false,
            msg: 'Lỗi khi xuất',
            error: _err
        });
    };
};
const getcontactbyid = async (_req = request, _res = response) => {
    try {
        const id_contact = _req.params.id_contact;
        console.log(id_contact)
        const pool = await getConnection();
        const result = await pool.request()
        .input('id_contact',sql.Int,id_contact)
        .query(queryuser.querycontac.getcontactbyid);
       
        _res.json({
            success: true,
            status: 200,
            data: result.recordset[0]
        });


    } catch (_err) {
        _res.json({
            success: false,
            msg: 'Lỗi khi xuất',
            error: _err
        });
    };
};
const createcontac = async (_req = request, _res = response) => {
    const [ username, phone, servicesname, note]  = _req.body;
    if (username == null || phone == null || servicesname == null || note == null) {
        return _res.status(400).json({
            success: false,
            msg: 'Vui lòng nhập đầy đủ thông tin'
        });
    };
    try {

        const pool = await getConnection();
        const result = await pool.request()
            .input('username',sql.NVarChar,username)
            .input('phone',sql.Char,phone)
            .input('servicesname',sql.NVarChar,servicesname)
            .input('note',sql.NVarChar,note)
            .query(queryuser.querycontac.insertcontact);
        _res.json({
            success: true,
            status: 200,
            msg: 'Tạo thành công',
            data: result
        });
    } catch (_err) {
        console.log(_err)
        _res.json({
            success: false,
            msg: 'Lỗi khi thêm',
            error: _err
        });
    };
};
const updatecontact =async(_req=request,_res=response)=>{
    const { username, phone, servicesname, note,id_contact } = _req.body;
    if (username == null || phone == null || servicesname == null || note == null || id_contact==null) {
        return _res.status(400).json({
            success: false,
            msg: 'Vui lòng nhập đầy đủ thông tin'
        });
    };
    try {

        const pool = await getConnection();
        const result = await pool.request()
            .input('username',sql.NVarChar,username)
            .input('phone',sql.Char,phone)
            .input('servicesname',sql.NVarChar,servicesname)
            .input('note',sql.NVarChar,note)
            .input('id_contact',sql.Int,id_contact)
            .query(queryuser.querycontac.updatecontact);
        _res.json({
            success: true,
            status: 200,
            msg: 'Cập nhật thành công',
            data: result
        });
    } catch (_err) {
        _res.json({
            success: false,
            msg: 'Lỗi khi cập nhật',
            error: _err
        });
    };
}
const deletecontact =async(_req=response,_res=request)=>{
  
    const { id_contact } = _req.params;
    console.log(id_contact);
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('id_contact',sql.Int,id_contact)
            .query(queryuser.querycontac.deletecontact);
            _res.json({
                success: true,
                status: 200,
                msg: 'Cập nhật thành công',
                data: result
            });
    } catch (error) {
        
    }
}
module.exports = {
    getcontact,
    getcontactbyid,
    createcontac,
    updatecontact,
    deletecontact,
}