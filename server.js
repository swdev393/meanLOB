var http = require('http'),
    express = require('express'),
    bodyParser = require('body-parser');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var app = express();

app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));    

require('./server/mysql/mysql')(app);

app.get('/api/products', function(req,res){
    app.mysqlcnn.query("SELECT * from ngLOBproducts", function (err, rows) {
        if(err)
        {
            console.log("Problem with MySQL"+err);
        }
        else
        {
            res.end(JSON.stringify(rows));
        }
    });
});


app.get('/api/products/:productId', function (req, res) {
    /** NOTE: WE SHOULD ALWAYS TRY TO USE Stored procedure or validate string for SQL
        INJECTION attacks. This is just for proof of concept purposes. 
    **/
    if (req.params.productId == 0) {
        //create new record - send back an empty record to edit
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        var newProduct =                        
        {   "productId": 0,
            "productName": "",
            "productCode": "AAA-0000",                  //need to match mask        
            "releaseDate": "2014-01-18T07:00:00.000Z",  //just need valid date to pass validation
            "description": "",
            "cost": 0.00,
            "price": 0.00,
            "category": "",
            "tags": "",
            "imageUrl": ""
        };
        // { 'productId': 0 };
        res.end(JSON.stringify(newProduct));
    } else {
        //get existing record
        app.mysqlcnn.query("SELECT * from ngLOBproducts where productId =" + req.params.productId, function (err, rows, fields) {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            str = '';
            if (rows.length == 0) {
                console.log("no such record found...");
            }
            else {
                res.end(JSON.stringify(rows[0]));
            }
        });
    }
});

//save or create new if productId = 0
app.post('/api/products', function (req, res) {
    /** NOTE: WE SHOULD ALWAYS TRY TO USE Stored procedure or validate string for SQL
        INJECTION attacks. This is just for proof of concept purposes. 
    **/

    var sql = "";
    var data = {
        productId: req.body.productId,
        productName: req.body.productName,
        productCode: req.body.productCode,
        releaseDate: req.body.releaseDate,
        description: req.body.description,
        cost: req.body.cost,
        price: req.body.price,
        category: req.body.category,
        tags: req.body.tags,
        imageUrl: req.body.imageUrl
    };
    if (data.productId > 0) {
        sql = "UPDATE ngLOBproducts SET " +
                "productName = '" + data.productName + "'," +
                "productCode = '" + data.productCode + "'," +
                "releaseDate = '" + data.releaseDate + "'," +
                "description = '" + data.description + "'," +
                "cost = " + data.cost + "," +
                "price = " + data.price + "," +
                "category = '" + data.category + "'," +
                "tags = '" + data.tags + "'," +
                "imageUrl = '" + data.imageUrl + "' " +
                "WHERE productId = " + data.productId;

    } else {
        sql = "INSERT INTO ngLOBproducts( " +
        "productName, productCode, releaseDate, description, cost, price, category, tags, imageUrl) " +
        "VALUES ('" + data.productName + "'," +
                 "'" + data.productCode + "'," +
                 "'" + data.releaseDate + "'," +
                 "'" + data.description + "'," +
                     + data.cost + "," +
                     + data.price + "," +
                 "'" + data.category + "'," +
                 "'" + data.tags + "'," +
                 "'" + data.imageUrl + "')"; 
    }
    console.log('SQL: ' + sql);

    app.mysqlcnn.query(sql, function (err, result) {
        if (err) {
            console.log("no such record found...");
        }
        else {
            res.end();
        }
    });
    
});

app.get('*', function (req, res) {
    res.render('index');
});

var port = process.env.port || 1337;
app.listen(port);
console.log('Listening on port ' + port + '...');
