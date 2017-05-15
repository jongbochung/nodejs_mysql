## What is this?

This is a simple app with nodejs and mysql.

Basic codes to insert, update, delete and select records from mysql

## Libraries and tools

* mySql
* body-parser
* express
* jade

## Create table
 1. CREATE TABLE `client` (
 1.  `id` int(11) NOT NULL AUTO_INCREMENT,
 1.  `companyName` varchar(30) NOT NULL,
 1.  `address` varchar(200) NOT NULL,
 1.  `manager` varchar(30) NOT NULL,
 1.  PRIMARY KEY (id)
 1. ) ENGINE=InnoDB DEFAULT CHARSET=utf8;

## Running locally

1. Clone the repository
1. npm install
1. Visit `http://localhost:3000/home`
