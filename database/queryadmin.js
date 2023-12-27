const myQueryAdmin = {
    loginadmin: 'select * from administrator where username=@username and password=@password'
};

module.exports = myQueryAdmin;
