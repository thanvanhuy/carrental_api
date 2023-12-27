const { request, response } = require("express");
const { sql, getConnection } = require('../database/db');
const myQueryAdmin = require('../database/queryadmin.js');
const jwt = require('jsonwebtoken');

require('dotenv').config();


const signInAdmin = async (_req = request, _res = response) => {
    try {
        console.log(_req.body)
        const { username, password } = _req.body;
        if (username == null || password == null) {
            return _res.status(400).json({
                success: false,
                msg: 'Bad Request | Please fill all fields to sign in'
            });
        };
        const pool = await getConnection();
        const result = await pool.request()
            .input('username', sql.VarChar, username)
            .input('password', sql.VarChar, password)
            .query(myQueryAdmin.loginadmin);
                   const user = result.recordset[0];
        if (result.rowsAffected[0] == 0) {

            return _res.status(400).json({
                success: false,
                msg: 'Wrong credentials | Please verify and try again'
            });

        }

        const token = jwt.sign(user.id_login, process.env.JWTKEY);


        _res.json({
            success: true,
            status: 200,
            token: token
        });


    } catch (_err) {
        _res.json({
            success: false,
            msg: 'Error validating user',
            error: _err
        });
    };
};
module.exports = {
    signInAdmin
  };