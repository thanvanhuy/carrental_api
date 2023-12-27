const { request, response } = require("express");
const { sql, getConnection } = require('../database/db');
const queryprice = require('../database/queryuser.js');

const getprice = async (_req = request, _res = response) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query(queryprice.queryprice.getprice);

        _res.json({
            success: true,
            status: 200,
            data: result.recordset
        });
    } catch (_err) {
        _res.json({
            success: false,
            msg: 'Lỗi khi xuất giá',
            error: _err
        });
    };
};

const getpricebyid = async (_req = request, _res = response) => {
    try {
        const id_price = _req.params.id_price;
        const pool = await getConnection();
        const result = await pool.request()
            .input('id_price', sql.Int, id_price)
            .query(queryprice.queryprice.getpricebyid);

        _res.json({
            success: true,
            status: 200,
            data: result.recordset[0]
        });
    } catch (_err) {
        _res.json({
            success: false,
            msg: 'Lỗi khi xuất giá',
            error: _err
        });
    };
};

const createprice = async (_req = request, _res = response) => {
    const { addr, km, type4, type7, type16 } = _req.body;

    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('addr', sql.NVarChar, addr)
            .input('km', sql.Int, km)
            .input('type4', sql.Float, type4)
            .input('type7', sql.Float, type7)
            .input('type16', sql.Float, type16)
            .query(queryprice.queryprice.insertprice);

        _res.json({
            success: true,
            status: 200,
            msg: 'Tạo giá thành công',
            data: result
        });
    } catch (_err) {
        _res.json({
            success: false,
            msg: 'Lỗi khi thêm giá',
            error: _err
        });
    };
};

const updateprice = async (_req = request, _res = response) => {
    const { id_price, addr, km, type4, type7, type16 } = _req.body;

    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('id_price', sql.Int, id_price)
            .input('addr', sql.NVarChar, addr)
            .input('km', sql.Int, km)
            .input('type4', sql.Float, type4)
            .input('type7', sql.Float, type7)
            .input('type16', sql.Float, type16)
            .query(queryprice.queryprice.updateprice);

        _res.json({
            success: true,
            status: 200,
            msg: 'Cập nhật giá thành công',
            data: result
        });
    } catch (_err) {
        _res.json({
            success: false,
            msg: 'Lỗi khi cập nhật giá',
            error: _err
        });
    };
};

const deleteprice = async (_req = request, _res = response) => {
    const id_price = _req.params.id_price;

    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('id_price', sql.Int, id_price)
            .query(queryprice.queryprice.deleteprice);

        _res.json({
            success: true,
            status: 200,
            msg: 'Xóa giá thành công',
            data: result
        });
    } catch (_err) {
        _res.json({
            success: false,
            msg: 'Lỗi khi xóa giá',
            error: _err
        });
    };
};

module.exports = {
    getprice,
    getpricebyid,
    createprice,
    updateprice,
    deleteprice,
};
