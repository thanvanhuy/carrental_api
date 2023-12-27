const { request, response } = require("express");
const { sql, getConnection } = require('../database/db');
const querycar = require('../database/queryuser.js');

const getcar = async (_req = request, _res = response) => {
    try {

        const pool = await getConnection();
        const result = await pool.request().query(querycar.querycar.getcar);

        _res.json({
            success: true,
            status: 200,
            data: result.recordset
        });

    } catch (_err) {
        _res.json({
            success: false,
            msg: 'Lỗi khi lấy thông tin xe',
            error: _err
        });
    }
};
const getcarbytype = async (_req = request, _res = response) => {
    try {
        const [cartype] = _req.body;
        const pool = await getConnection();
        const result = await pool.request()
            .input('cartype', sql.Int, cartype)
            .query(querycar.querycar.getcarbytype);

        _res.json({
            success: true,
            status: 200,
            data: result.recordset
        });

    } catch (_err) {
        _res.json({
            success: false,
            msg: 'Lỗi khi lấy thông tin xe',
            error: _err
        });
    }
};
const getcarbyid = async (_req = request, _res = response) => {
    try {
        const id_car = _req.params.id_car;

        const pool = await getConnection();
        const result = await pool.request()
            .input('id_car', sql.Int, id_car)
            .query(querycar.querycar.getcarbyid);

        _res.json({
            success: true,
            status: 200,
            data: result.recordset[0]
        });

    } catch (_err) {
        _res.json({
            success: false,
            msg: 'Lỗi khi lấy thông tin xe',
            error: _err
        });
    }
};

const createcar = async (_req = request, _res = response) => {

    const { namecar, brandcar, price, imagecar, statuscar, cartype } = _req.body;
   
    if ( namecar == null || brandcar == null || price == null || imagecar == null || statuscar == null || cartype == null) {
        return _res.status(400).json({
            success: false,
            msg: 'Vui lòng nhập đầy đủ thông tin'
        });
    };
    try {

        const pool = await getConnection();
        const result = await pool.request()
            .input('namecar', sql.NVarChar, namecar)
            .input('brandcar', sql.NVarChar, brandcar)
            .input('price', sql.Float, price)
            .input('imagecar', sql.NVarChar, imagecar)
            .input('statuscar', sql.NVarChar, statuscar)
            .input('cartype', sql.NVarChar, cartype)
            .query(querycar.querycar.insertcar);

        _res.json({
            success: true,
            status: 200,
            msg: 'Tạo thành công',
            data: result
        });

    } catch (_err) {
        _res.json({
            success: false,
            msg: 'Lỗi khi thêm xe',
            error: _err
        });
    };
};

const updatecar = async (_req = request, _res = response) => {
    const { id_car, namecar, brandcar, price, imagecar, statuscar, cartype } = _req.body;
    if (id_car == null || namecar == null || brandcar == null || price == null || imagecar == null || statuscar == null || cartype == null) {
        return _res.status(400).json({
            success: false,
            msg: 'Vui lòng nhập đầy đủ thông tin'
        });
    };
    try {

        const pool = await getConnection();
        const result = await pool.request()
            .input('id_car', sql.Int, id_car)
            .input('namecar', sql.NVarChar, namecar)
            .input('brandcar', sql.NVarChar, brandcar)
            .input('price', sql.Float, price)
            .input('imagecar', sql.NVarChar, imagecar)
            .input('statuscar', sql.Int, statuscar)
            .input('cartype', sql.Int, cartype)
            .query(querycar.querycar.updatecar);
          
        _res.json({
            success: true,
            status: 200,
            msg: 'Cập nhật thành công',
            data: result
        });

    } catch (_err) {
        _res.json({
            success: false,
            msg: 'Lỗi khi cập nhật xe',
            error: _err
        });
    };
};

const deletecar = async (_req = request, _res = response) => {
    const { id_car } = _req.params;
    try {

        const pool = await getConnection();
        const result = await pool.request()
            .input('id_car', sql.Int, id_car)
            .query(querycar.querycar.deletecar);

        _res.json({
            success: true,
            status: 200,
            msg: 'Xóa thành công',
            data: result
        });

    } catch (_err) {
        _res.json({
            success: false,
            msg: 'Lỗi khi xóa xe',
            error: _err
        });
    }
};

module.exports = {
    getcar,
    getcarbytype,
    getcarbyid,
    createcar,
    updatecar,
    deletecar
};
