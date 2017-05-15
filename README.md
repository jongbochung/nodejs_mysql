## What is this?

This is a simple app with nodejs and mysql.

Basic codes to insert, update, delete and select records from mysql

## Libraries and tools

* mySql
* body-parser
* express
* jade

## Create table

```
  CREATE TABLE `client` (
   `id` int(11) NOT NULL AUTO_INCREMENT,
   `companyName` varchar(30) NOT NULL,
   `address` varchar(200) NOT NULL,
   `manager` varchar(30) NOT NULL,
   PRIMARY KEY (id)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```
## Running locally

1. Clone the repository
1. npm install
1. Visit `http://localhost:3000/home`
