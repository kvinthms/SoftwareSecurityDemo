const sqlite3 = require('sqlite3').verbose();
var jwt = require('jsonwebtoken');
var settings = require('../config/config');
const { URL, parse } = require('url');

exports.getUsers = (req,res) => {
    const db = new sqlite3.Database(__dirname + '/database.db');
    db.all('SELECT * FROM USERS', (err, rows) => {
        if(!err){
            res.status(200).send(rows);
        }
        else{
            res.sendStatus(404);
        }
    });
}


exports.getUserinfo = (req, res) => {

    var token = req.body.token;

    if(token){
        token = token.substring(4,token.length)
        jwt.verify(token, settings.secret, function(err, decoded) {
        if (err) {

        	console.log(err);
        	res.status(400).send({success: false, msg: 'Authentication failed'});
        }
        else{
            var decoded = jwt.decode(token);
            var person = decoded.username;
            const db = new sqlite3.Database(__dirname + '/database.db');
            if(person == 'admin') {

				db.all('SELECT USERNAME FROM USERS', (err, rows) => {
					if(!err){
						res.status(200).send(rows);
					}
					else{
						res.sendStatus(404);
					}
				});

			}
			else {
				res.status(400).send({success: false, msg: 'Authentication failed'});
			}
        }
        });
    }
    else{
        res.status(400).send({success: false, msg: 'Authentication failed'});
    }
}

exports.search = (req, res) => {
    const db = new sqlite3.Database(__dirname + '/database.db');
    db.all('SELECT COMNAME FROM FLOWERS WHERE COMNAME LIKE ?', [req.body.search + '%'], (err, rows) => {
        if (!err) {
            console.log(rows);
            
            res.status(200).send(rows);
        }
        else {
            console.log(err);
            res.status(400)
        }
    });
}

exports.getFlowers = (req, res) => {
    const db = new sqlite3.Database(__dirname + '/database.db');
    db.all('SELECT * FROM FLOWERS', (err, rows) => {
        if (!err) {
            res.send(rows);
        }
        else {
            console.log(err);
        }
    });
}

exports.getSightings = (req, res) => {
    const db = new sqlite3.Database(__dirname + '/database.db');
    db.all('SELECT * FROM SIGHTINGS', (err, rows) => {
        if (!err) {
            res.send(rows);
        }
        else {
            console.log(err);
        }
    });
}

exports.getComments = (req, res) => {
    const db = new sqlite3.Database(__dirname + '/database.db');
    db.all('SELECT * FROM COMMENTS', (err, rows) => {
        if (!err) {
            res.send(rows);
        }
        else {
            console.log(err);
        }
    });
}

exports.postComments = (req, res) => {

    const stringIsAValidUrl = (s) => {
        try {
          new URL(s);
          return true;
        } catch (err) {
          return false;
        }
      };
    
    const flower = req.body.flower;
    var comments = req.body.comments;
    var links = req.body.links;
    if (!links){
        links = '';
    }
    links = links.toLowerCase()
    if(!stringIsAValidUrl(links)){
        res.status(400).send({success: false, msg: 'Invalid Link'});
        return
    }
    else{
        links = links.replace("javascript:", "")
        if(!stringIsAValidUrl(links)){
            res.status(400).send({success: false, msg: 'Invalid Link'});
            return
        }
    }

    var token = req.body.token;
    if(token){
        token = token.substring(4,token.length)
        jwt.verify(token, settings.secret, function(err, decoded) {
        if (err) {
            /*
            err = {
                name: 'TokenExpiredError',
                message: 'jwt expired',
                expiredAt: 1408621000
            }
            */
        console.log(err);
        
        res.status(400).send({success: false, msg: 'Authentication failed'});
        }
        else{
            var decoded = jwt.decode(token);
            var person = decoded.username
            const SQLInsertSighting = 'INSERT INTO COMMENTS (flower, username, comments, links) VALUES (?, ?, ?, ?)';
            const db = new sqlite3.Database(__dirname + '/database.db');
            db.all(SQLInsertSighting, [flower, person, comments, links], (err, rows) => {
                if (!err) {
                    console.log('Comment has been inserted!')
                    res.status(200).send('Comment has been inserted!')
                }
                else {
                    console.log(err);
                    res.status(400)
                }
            });
        }
        });
    }
    else{
        res.status(400).send({success: false, msg: 'Authentication failed'});
    }
}

exports.flowersUpdate = (req, res) => {
    const oldName = "'" + req.body.oldcomname + "'";
    const newName = "'" + req.body.comname + "'";
    const oldgenus = "'" + req.body.oldgenus + "'";
    const newGenus = "'" + req.body.genus + "'";
    const oldspecies = "'" + req.body.oldspecies + "'";
    const newSpecies = "'" + req.body.species + "'";

    //res.send(oldName);

    const db = new sqlite3.Database(__dirname + '/database.db');
    //name
    const SQLUpdateName = 'UPDATE FLOWERS SET COMNAME = ? WHERE FLOWERS.COMNAME = ?';
    const SQLUpdateSightings = 'UPDATE SIGHTINGS SET NAME = ? WHERE SIGHTINGS.NAME = ?';
    const SQLUpdateGenus = 'UPDATE FLOWERS SET GENUS = ? WHERE FLOWERS.GENUS = ?';
    const SQLUpdateSpecies = 'UPDATE FLOWERS SET SPECIES = ? WHERE FLOWERS.SPECIES = ?';
    db.all(SQLUpdateName, [newName, oldName], (err, rows) => {
        if (!err) {
            db.all(SQLUpdateSightings, [newName, oldName], (err, rows) => {
                if (!err) {
                    db.all(SQLUpdateGenus, [newGenus, oldgenus], (err, rows) => {
                        if (!err) {
                            db.all(SQLUpdateSpecies, [newSpecies, oldspecies], (err, rows) => {
                                if (!err) {
                                   // console.log("G");
                                    console.log('Name has been changed!\nGenus has been changed!\nSpecies has been changed!\n');
                                    res.send('Name has been changed!\nGenus has been changed!\nSpecies has been changed!\n');
                                    
                                }
                                else {
                                    console.log(err);
                                }
                            })
                        }
                        else {
                            console.log(err);
                        }
                    })
                }
                else {
                    console.log(err);
                }
            })
        }
        else {
            console.log(err);
        }
    })
    
}

exports.sightingsInsert = (req, res) => {
    const name = req.body.name;
    const location = req.body.location;
    const date = req.body.date;

    var token = req.body.token;
    if(token){
        token = token.substring(4,token.length)
        jwt.verify(token, settings.secret, function(err, decoded) {
        if (err) {
            /*
            err = {
                name: 'TokenExpiredError',
                message: 'jwt expired',
                expiredAt: 1408621000
            }
            */
        console.log(err);
        
        res.status(400).send({success: false, msg: 'Authentication failed'});
        }
        else{
            var decoded = jwt.decode(token);
            var person = decoded.username
            const SQLInsertSighting = 'INSERT INTO SIGHTINGS (NAME, PERSON, LOCATION, SIGHTED) VALUES (?, ?, ?, ?)';
            const db = new sqlite3.Database(__dirname + '/database.db');
            db.all(SQLInsertSighting, [name, person, location, date], (err, rows) => {
                if (!err) {
                    console.log('Sighting has been inserted!')
                    res.status(200).send('Sighting has been inserted!')
                }
                else {
                    console.log(err);
                    res.status(400)
                }
            });
        }
        });
    }
    else{
        res.status(400).send({success: false, msg: 'Authentication failed'});
    }

    
}

exports.flowersDelete = (req, res) => {
    const name = "'" + req.body.name + "'";
    const genus = "'" + req.body.genus + "'";
    const species = "'" + req.body.species + "'";

    const SQLDeleteFlower = 'DELETE FROM FLOWERS WHERE COMNAME = ' + name + ' AND GENUS = ' + genus + ' AND SPECIES = ' + species;
    const db = new sqlite3.Database(__dirname + '/database.db');
    db.all(SQLDeleteFlower, (err, rows) => {
        if (!err) {
            console.log('Flower has been deleted!');
            res.send('Flower has been deleted!');
        }
        else {
            console.log(err);
        }
    });
} 

exports.performance = (req, res) => {
    const db = new sqlite3.Database(__dirname + '/database.db');
    var preQuery = new Date().getTime();
    db.serialize(function(){
        db.each("SELECT * FROM flowers", function(err,row){
            //console.log(row.GENUS + " | " + row.SPECIES + " | " + row.COMNAME);
        });
    });
    var postQuery = new Date().getTime();
    var duration = (postQuery - preQuery) / 1000;
    console.log(duration);
    res.body.num(duration);
}