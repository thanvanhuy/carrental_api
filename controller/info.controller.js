const { request, response } = require("express");
const { sql, getConnection } = require('../database/db');
const queryinfo = require('../database/queryuser.js');

const getinfo = async (_req = request, _res = response) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query(queryinfo.queryinfo.getinfo);

        _res.json({
            success: true,
            status: 200,
            data: result.recordset
        });
    } catch (_err) {
        _res.json({
            success: false,
            msg: 'Lỗi khi lấy thông tin info',
            error: _err
        });
    }
};

const getinfobyid = async (_req = request, _res = response) => {
    try {
        const id_info = _req.params.id_info;

        const pool = await getConnection();
        const result = await pool.request()
            .input('id_info', sql.Int, id_info)
            .query(queryinfo.queryinfo.getinfobyid);

        _res.json({
            success: true,
            status: 200,
            data: result.recordset[0]
        });
    } catch (_err) {
        _res.json({
            success: false,
            msg: 'Lỗi khi lấy thông tin info',
            error: _err
        });
    }
};

const createinfo = async (_req = request, _res = response) => {
    const { nameinfo, link } = _req.body;
    if (nameinfo == null || link == null) {
        return _res.status(400).json({
            success: false,
            msg: 'Vui lòng nhập đầy đủ thông tin'
        });
    };
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('nameinfo', sql.NVarChar, nameinfo)
            .input('link', sql.NVarChar, link)
            .query(queryinfo.queryinfo.insertinfo);

        _res.json({
            success: true,
            status: 200,
            msg: 'Tạo thành công',
            data: result
        });
    } catch (_err) {
        _res.json({
            success: false,
            msg: 'Lỗi khi thêm thông tin info',
            error: _err
        });
    };
};

const updateinfo = async (_req = request, _res = response) => {
    const { nameinfo, link, id_info } = _req.body;
    if (nameinfo == null || link == null || id_info == null) {
        return _res.status(400).json({
            success: false,
            msg: 'Vui lòng nhập đầy đủ thông tin'
        });
    };
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('nameinfo', sql.NVarChar, nameinfo)
            .input('link', sql.NVarChar, link)
            .input('id_info', sql.Int, id_info)
            .query(queryinfo.queryinfo.updateinfo);

        _res.json({
            success: true,
            status: 200,
            msg: 'Cập nhật thành công',
            data: result
        });
    } catch (_err) {
        _res.json({
            success: false,
            msg: 'Lỗi khi cập nhật thông tin info',
            error: _err
        });
    };
};

const deleteinfo = async (_req = request, _res = response) => {
    const { id_info } = _req.params.id_info;
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('id_info', sql.Int, id_info)
            .query(queryinfo.queryinfo.deleteinfo);

        _res.json({
            success: true,
            status: 200,
            msg: 'Xóa thành công',
            data: result
        });
    } catch (_err) {
        _res.json({
            success: false,
            msg: 'Lỗi khi xóa thông tin info',
            error: _err
        });
    };
};

module.exports = {
    getinfo,
    getinfobyid,
    createinfo,
    updateinfo,
    deleteinfo,
};
