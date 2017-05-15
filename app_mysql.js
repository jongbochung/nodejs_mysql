var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var mysql = require('mysql');
var conn = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : '********',
  database :'your_database'
});
conn.connect();
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.locals.pretty = true;

app.set('views', './views_mysql');
app.set('view engine', 'jade');

app.get('/home/add', function(req, res){
  var sql = 'SELECT id, companyName FROM client';
  conn.query(sql, function(err, companies, fields){
    if(err){
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
    res.render('add', {companies:companies});
  });
});
app.post('/home/add', function(req, res){
    var companyName = req.body.companyName;
    var address = req.body.address;
    var manager = req.body.manager;
    var sql = 'INSERT INTO client (companyName, address, manager) VALUES(?,?,?)';
    conn.query(sql, [companyName, address, manager], function(err, results, fields){
      if(err) {
          res.status(500).send('Internal Server Error');
      } else{
        res.redirect('/home/'+results.insertId);
      }
    });
})
app.get(['/home/:id/edit'], function(req, res){
  var sql = 'SELECT id, companyName FROM client';
  conn.query(sql, function(err, companies, fields){
    var id = req.params.id;
    if(id){
      var sql = 'SELECT * FROM client WHERE id = ?';
      conn.query(sql, [id], function(err, companies, fields){
        if(err){
          console.log(err);
          res.status(500).send('Internal Server Error');
        } else{
          res.render('edit',{companies:companies, company:companies[0]});
        }
      });
    } else{
      console.log('no id');
      res.status(500).send('Internal Server Error');
    }
  });
});
app.post(['/home/:id/edit'], function(req, res){
  var companyName = req.body.companyName;
  var address = req.body.address;
  var manager = req.body.manager;
  var id = req.params.id;
  console.log("=========================>"+id);
  var sql = `UPDATE client SET companyName=?, address=?, manager=? WHERE id=?`;
  conn.query(sql, [companyName, address, manager, id], function(err, results, fields){
    if(err){
      console.log(err);
      res.status(500).send('Internal Server Error');
    } else{
      res.redirect('/home/'+id);
    }
  })
});
app.get(['/home/:id/delete'], function(req, res){
  var sql = 'SELECT id, companyName FROM client';
  var id = req.params.id;
  conn.query(sql, function(err, companies, fields){
    var sql = 'SELECT * FROM client WHERE id=?';
    conn.query(sql, [id], function(err, company){
      if(err){
        console.log("no id found");
        res.status(500).send('Internal Server Error');
      } else{
        res.render('delete', {companies:companies, company:company[0]});
      }
    });
  });
});
app.post(['/home/:id/delete'], function(req, res){
  var id = req.params.id;
  var sql = 'DELETE FROM client WHERE id=?';
  conn.query(sql, [id], function(err, results){
    res.redirect('/home');
  })
});
app.get(['/home', '/home/:id'], function(req, res){
  var sql = 'SELECT id, companyName FROM client';
  conn.query(sql, function(err, companies, fields){
    var id = req.params.id;
    if(id){
      var sql = 'SELECT * FROM client WHERE id = ?';
      conn.query(sql, [id], function(err, companies, fields){
        if(err){
          console.log(err);
          res.status(500).send('Internal Server Error');
        } else{
          res.render('view',{companies:companies, company:companies[0]});
        }
      });
    } else{
      res.render('view', {companies:companies});
    }
  });
});


app.listen(3000, function(){
    console.log('Connected....');
})
