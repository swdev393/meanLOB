var mysql = require('mysql');

module.exports = function (app) {
    var pool = mysql.createPool({
        host: 'yourServer',
        user: 'yourMySqlUser',
        password: 'yourMySqlPassword',
        database: 'yourMySQLDataBase'
    });

    var connection = mysql.createConnection({
        host: 'yourServer',
        user: 'yourMySqlUser',
        password: 'yourMySqlPassword',
        database: 'yourMySQLDataBase'
    });
    connection.connect(function (err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }
        console.log('connected as id ' + connection.threadId);
    });
    app.mysqlpool = pool;       //not currently using at the moment
    app.mysqlcnn = connection;
};
