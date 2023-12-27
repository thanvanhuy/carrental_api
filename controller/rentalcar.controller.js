const { request, response } = require("express");
const { sql, getConnection } = require('../database/db');
const queryrentalcar = require('../database/queryuser.js');

const getrentalcar = async (_req = request, _res = response) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query(queryrentalcar.queryrentalcar.getrentalcar);

        _res.json({
            success: true,
            status: 200,
            data: result.recordset
        });
    } catch (_err) {
        _res.json({
            success: false,
            msg: 'Lỗi khi lấy thông tin xe thuê',
            error: _err
        });
    }
};

const getrentalcarbyid = async (_req = request, _res = response) => {
    try {
        const id_rentalcar = _req.params.id_rentalcar;

        const pool = await getConnection();
        const result = await pool.request()
            .input('id_rentalcar', sql.Int, id_rentalcar)
            .query(queryrentalcar.queryrentalcar.getrentalcarbyid);

        _res.json({
            success: true,
            status: 200,
            data: result.recordset[0]
        });
    } catch (_err) {
        _res.json({
            success: false,
            msg: 'Lỗi khi lấy thông tin xe thuê',
            error: _err
        });
    }
};

const createrentalcar = async (_req = request, _res = response) => {
    const [pick, destination, direction, typevehicle, datetimehire, fullname, phone]  = _req.body;
    if (pick == null || destination == null || direction == null || typevehicle == null || datetimehire == null || fullname == null || phone == null) {
        return _res.status(400).json({
            success: false,
            msg: 'Vui lòng nhập đầy đủ thông tin!'
        });
    };
    try {
        
        const pool = await getConnection();
        const result = await pool.request()
            .input('pick', sql.NVarChar, pick)
            .input('destination', sql.NVarChar, destination)
            .input('direction', sql.NVarChar, direction)
            .input('typevehicle', sql.NVarChar, typevehicle)
            .input('datetimehire', sql.DateTime, datetimehire)
            .input('fullname', sql.NVarChar, fullname)
            .input('phone', sql.Char, phone)
            .query(queryrentalcar.queryrentalcar.insertrentalcar);
        _res.json({
            success: true,
            status: 200,
            msg: 'Tạo thành công',
            data: result
        });
    } catch (_err) {
        _res.json({
            success: false,
            msg: 'Lỗi khi thêm thông tin xe thuê',
            error: _err
        });
    };
};

const updaterentalcar = async (_req = request, _res = response) => {
    const { pick, destination, direction, typevehicle, datetimehire, fullname, phone, id_rentalcar } = _req.body;
    if (pick == null || destination == null || direction == null || typevehicle == null || datetimehire == null || fullname == null || phone == null || id_rentalcar == null) {
        return _res.status(400).json({
            success: false,
            msg: 'Vui lòng nhập đầy đủ thông tin'
        });
    };
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('pick', sql.NVarChar, pick)
            .input('destination', sql.NVarChar, destination)
            .input('direction', sql.NVarChar, direction)
            .input('typevehicle', sql.NVarChar, typevehicle)
            .input('datetimehire', sql.DateTime, datetimehire)
            .input('fullname', sql.NVarChar, fullname)
            .input('phone', sql.Char, phone)
            .input('id_rentalcar', sql.Int, id_rentalcar)
            .query(queryuser.queryrentalcar.updaterentalcar);

        _res.json({
            success: true,
            status: 200,
            msg: 'Cập nhật thành công',
            data: result
        });
    } catch (_err) {
        _res.json({
            success: false,
            msg: 'Lỗi khi cập nhật thông tin xe thuê',
            error: _err
        });
    };
};

const deleterentalcar = async (_req = request, _res = response) => {
    const { id_rentalcar } = _req.params.id_rentalcar;
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('id_rentalcar', sql.Int, id_rentalcar)
            .query(queryuser.queryrentalcar.deleterentalcar);

        _res.json({
            success: true,
            status: 200,
            msg: 'Xóa thành công',
            data: result
        });
    } catch (_err) {
        _res.json({
            success: false,
            msg: 'Lỗi khi xóa thông tin xe thuê',
            error: _err
        });
    };
};

module.exports = {
    getrentalcar,
    getrentalcarbyid,
    createrentalcar,
    updaterentalcar,
    deleterentalcar,
};
