# Installation Instructions
1. create empty directory on a system with node.js installed
2. copy all files/folders into empty folder
3. open the ./server/mysql/mysql.js file with your text editor of choice and update the following values to point to your mysql database (see NOTE for instructions on how to create the mysql table for the project):
        host: 'yourServer',
        user: 'yourMySqlUser',
        password: 'yourMySqlPassword',
        database: 'yourMySQLDataBase'

3. at the command/terminal prompt navigate to the project folder and enter the following commands:
   npm install
   node server.js
4. open a web browser and navigate to http://localhost:1337

NOTE: For simplicity, the tags property is treated as a plain old text edit field instead of a list which allows this example to run with just one table.  
CREATE TABLE `ngLOBproducts` (
  `productId` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `productName` varchar(50) DEFAULT NULL,
  `productCode` varchar(10) DEFAULT NULL,
  `releaseDate` date DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `cost` decimal(14,2) DEFAULT NULL,
  `price` decimal(14,2) DEFAULT NULL,
  `category` varchar(25) DEFAULT NULL,
  `tags` varchar(50) DEFAULT NULL,
  `imageUrl` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`productId`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;
