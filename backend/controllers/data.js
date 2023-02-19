const db = require('../server');

// Get data
exports.songs = (req, res) => {

    let { start, limit } = req.query;

    if (!start) {
        start = 0;
    }

    if (!limit) {

        //Get all songs
        db.query(`SELECT id, title, art, songfile, trailer, album, length FROM songs`, [], (error, result) => {
            if (error) throw error;
            res.json(result);
        });

    } else {

        //convert to Integers
        start = parseInt(start);
        limit = parseInt(limit);

        // Get the songs
        db.query('SELECT id, title, art, songfile, trailer, album, length FROM songs ORDER BY id DESC LIMIT ? OFFSET ?', [limit, start], (error, result) => {
            if (error) throw error;
            res.json(result);
        })

    }
    
}

exports.albums = (req, res) => {

    let { start, limit } = req.query;

    if (!start) {
        start = 0;
    }

    if (!limit) {

        //Get all songs
        db.query(`SELECT id, title, art, songs, original_date FROM albums`, [], (error, result) => {
            if (error) throw error;
            res.json(result);
        });

    } else {

        //convert to Integers
        start = parseInt(start);
        limit = parseInt(limit);

        // Get the songs
        db.query('SELECT id, title, art, songs, original_date FROM albums ORDER BY id ASC LIMIT ? OFFSET ?', [limit, start], (error, result) => {
            if (error) throw error;
            res.json(result);
        })
        
    }
    
}

exports.videos = (req, res) => {

    let { start, limit } = req.query;

    if (!start) {
        start = 0;
    }

    if (!limit) {

        //Get all songs
        db.query(`SELECT id, title, thumbnail, videofile, trailer, album, length FROM videos`, [], (error, result) => {
            if (error) throw error;
            res.json(result);
        });

    } else {

        //convert to Integers
        start = parseInt(start);
        limit = parseInt(limit);

        // Get the songs
        db.query('SELECT id, title, thumbnail, videofile, trailer, album, length FROM videos ORDER BY id DESC LIMIT ? OFFSET ?', [limit, start], (error, result) => {
            if (error) throw error;
            res.json(result);
        })

    }
    
}

exports.donations = (req, res) => {

    let { start, limit } = req.query;

    if (!start) {
        start = 0;
    }

    if (!limit) {

        //Get all songs
        db.query(`SELECT id, firstname, lastname, email, ammount, date_of FROM donators`, [], (error, result) => {
            if (error) throw error;
            res.json(result);
        });

    } else {

        //convert to Integers
        start = parseInt(start);
        limit = parseInt(limit);

        // Get the songs
        db.query('SELECT id, firstname, lastname, email, ammount, date_of FROM donators ORDER BY id DESC LIMIT ? OFFSET ?', [limit, start], (error, result) => {
            if (error) throw error;
            res.json(result);
        })
        
    }
    
}

exports.analytics = (req, res) => {

    db.query('SELECT COUNT(id) AS albums FROM albums', [], (error, result) => {
        if (error) throw error;

        const albums = result[0].albums;
        db.query('SELECT COUNT(id) AS songs FROM songs', [], (error, result) => {
            if (error) throw error;

            const songs = result[0].songs;
            db.query('SELECT COUNT(id) AS videos FROM videos', [], (error, result) => {
                if (error) throw error;

                const videos = result[0].videos;
                db.query('SELECT SUM(ammount) AS donations FROM donators', [], (error, result) => {
                    if (error) throw error;

                    
                    let donations = result[0].donations;
                    if (result[0].donations == null) {
                        donations = 0;
                    }

                    const summary = {
                        albums: albums,
                        songs: songs,
                        videos: videos,
                        donations: donations
                    }
                    res.json(summary);

                })
               
            })
            
        })
       
    })

    // let { start, limit } = req.query;

    // if (!start) {
    //     start = 0;
    // }

    // if (!limit) {

    //     //Get all songs
    //     db.query(`SELECT id, name, email, ammount, date_of FROM donators`, [], (error, result) => {
    //         if (error) throw error;
    //         res.json(result);
    //     });

    // } else {

    //     //convert to Integers
    //     start = parseInt(start);
    //     limit = parseInt(limit);

    //     // Get the songs
    //     db.query('SELECT id, name, email, ammount, date_of FROM donators ORDER BY id DESC LIMIT ? OFFSET ?', [limit, start], (error, result) => {
    //         if (error) throw error;
    //         res.json(result);
    //     })
        
    // }
    
}

//postdata
exports.addPayment = (req, res) => {

    function makeid(length) {
        let result           = '';
        let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;
        for ( let i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
       return result;
    }

    let uniqueID = makeid(20);
    
    res.json({
        ID: uniqueID
    });

    // let errorList = [];
    // let validationResult = "";

    // // let { id } = req.params;
    // let { id, title, album, length } = req.body;

    // if (!title || !album || !length) {

    //     validationResult ={ status: `failed`, statusCode: 405, message: `Please fill in all fields` };
    //     errorList.push(validationResult);
    //     res.json(errorList);
    //     return;

    // }

    // db.query("UPDATE songs SET ? WHERE id = ?", [{title: title, album: album, length: length}, id], (error, result) => {

    //     if (error) throw error;
    //     validationResult ={status: `ok`, statusCode: 200, message: `song updated successfully`};
    //     errorList.push(validationResult);
    //     res.json(errorList);

    // });
    
}

//Update data
exports.editsong = (req, res) => {

    let errorList = [];
    let validationResult = "";

    let { id } = req.params;
    let { title, album, length } = req.body;

    if (!title || !album || !length) {

        validationResult ={ status: `failed`, statusCode: 405, message: `Please fill in all fields` };
        errorList.push(validationResult);
        res.json(errorList);
        return;

    }

    // Get old album name
    db.query("SELECT album FROM songs WHERE id=?", [id], (error, result) => {

        if (error) throw error;

        if(result.length < 1) {
            validationResult ={status: `failed`, statusCode: 405, message: `This album does not exist`};
            errorList.push(validationResult);
            res.json(errorList);
            return; 
        }

        const oldAlbum = result[0].album;

        if (oldAlbum !== album) {

            db.query("UPDATE songs SET ? WHERE id = ?", [{title: title, album: album, length: length}, id], (error, result) => {

                if (error) throw error;
                
                if ( oldAlbum !== "none" && album === "none") {
                    // deduct one from old album
                    db.query("UPDATE albums SET songs = songs-1 WHERE title = ?", [oldAlbum], (error, result) => {
                        if (error) throw error;
    
                        validationResult ={status: `ok`, statusCode: 200, message: `song updated successfully`};
                        errorList.push(validationResult);
                        res.json(errorList);
                        return;
                    });
                }

                if ( oldAlbum === "none" && album !== "none") {
                    // add one from new album
                    db.query("UPDATE albums SET songs = songs+1 WHERE title = ?", [album], (error, result) => {
                        if (error) throw error;
    
                        validationResult ={status: `ok`, statusCode: 200, message: `song updated successfully`};
                        errorList.push(validationResult);
                        res.json(errorList);
                        return;
                    });
                }

                if ( oldAlbum !== "none" && album !== "none") {
                    // remove one from old album
                    db.query("UPDATE albums SET songs = songs-1 WHERE title = ?", [oldAlbum], (error, result) => {
                        if (error) throw error;
    
                        // add one to new album
                        db.query("UPDATE albums SET songs = songs+1 WHERE title = ?", [album], (error, result) => {
                            if (error) throw error;
        
                            validationResult ={status: `ok`, statusCode: 200, message: `song updated successfully`};
                            errorList.push(validationResult);
                            res.json(errorList);
                            return;
                        });
                    });
                    
                }
        
            });

        } else {

            db.query("UPDATE songs SET ? WHERE id = ?", [{title: title, album: album, length: length}, id], (error, result) => {

                if (error) throw error;
                validationResult ={status: `ok`, statusCode: 200, message: `song updated successfully`};
                errorList.push(validationResult);
                res.json(errorList);
        
            });

            
            
            // else {

            //     // update both albums songCount (old and new)
            //     // check if old album is none
            //     // deduct one from old albums
            //     //add one to new album
            //     db.query("UPDATE songs SET ? WHERE id = ?", [{title: title, album: album, length: length}, id], (error, result) => {

            //         if (error) throw error;
            //         validationResult ={status: `ok`, statusCode: 200, message: `song updated successfully`};
            //         errorList.push(validationResult);
            //         res.json(errorList);
            
            //     });

            // }

        }

        // update the album - check if old album equals new album \\ if new album equals none
        // update old album songs count and new album song count

    });
    
}

exports.editvideo = (req, res) => {

    let errorList = [];
    let validationResult = "";

    let { id } = req.params;
    let { title, trailer, album, length } = req.body;

    if (!title || !trailer || !album || !length) {

        validationResult ={ status: `failed`, statusCode: 405, message: `Please fill in all fields` };
        errorList.push(validationResult);
        res.json(errorList);
        return;

    }

    db.query("UPDATE videos SET ? WHERE id = ?", [{title: title, trailer: trailer, album: album, length: length}, id], (error, result) => {

        if (error) throw error;
        validationResult ={status: `ok`, statusCode: 200, message: `video updated successfully`};
        errorList.push(validationResult);
        res.json(errorList);

    });
    
}

exports.editalbum = (req, res) => {

    let errorList = [];
    let validationResult = "";
    let prevtitle = "";

    let { id } = req.params;
    let { title, originaldate } = req.body;

    if (!title) {

        validationResult ={ status: `failed`, statusCode: 405, message: `Please fill in all fields` };
        errorList.push(validationResult);
        res.json(errorList);
        return;

    }

    db.query("SELECT title from albums WHERE id = ?", [id], (error, result) => {
        if (error) throw error;
        prevtitle = result[0].title;

        db.query("UPDATE albums SET ? WHERE id = ?", [{title: title, original_date: originaldate}, id], (error, result) => {
            if (error) throw error;
    
            db.query("UPDATE songs SET ? WHERE album = ?", [{album: title}, prevtitle], (error, result) => {

                db.query("UPDATE videos SET ? WHERE album = ?", [{album: title}, prevtitle], (error, result) => {

                    if (error) throw error;
                    validationResult ={status: `ok`, statusCode: 200, message: `album updated successfully`};
                    errorList.push(validationResult);
                    res.json(errorList);
    
                });

            });
            
        });

    });
    
}

//Delete data
exports.removesong = (req, res) => {

    let errorList = [];
    let validationResult = "";

    let { id } = req.params;

    // select song album from album
    db.query("SELECT album FROM songs WHERE id=?", [id], (error, result) => {

        if (error) throw error;
        
        if (result < 1 || result[0].album == "none") {
            db.query("DELETE FROM songs WHERE id = ?", [id], (error, result) => {

                if (error) throw error;
    
                validationResult ={status: `ok`, statusCode: 200, message: `song deleted successfully`};
                errorList.push(validationResult);
                res.json(errorList);
                return;
        
            });
        }

        const oldAlbum = result[0].album;

        //delete the song
        db.query("DELETE FROM songs WHERE id = ?", [id], (error, result) => {

            if (error) throw error;

            //remove one from song album
            db.query("UPDATE albums SET songs = songs-1 WHERE title = ?", [oldAlbum], (error, result) => {
                if (error) throw error;

                validationResult ={status: `ok`, statusCode: 200, message: `song deleted successfully`};
                errorList.push(validationResult);
                res.json(errorList);
                return;
            });
    
        });

    });
    
}

exports.removevideo = (req, res) => {

    let errorList = [];
    let validationResult = "";

    let { id } = req.params;

    db.query("DELETE FROM videos WHERE id = ?", [id], (error, result) => {

        if (error) throw error;
        validationResult ={status: `ok`, statusCode: 200, message: `video deleted successfully`};
        errorList.push(validationResult);
        res.json(errorList);

    });
    
}

exports.removealbum = (req, res) => {

    let errorList = [];
    let validationResult = "";

    let { id } = req.params;

    db.query("SELECT title from albums WHERE id = ?", [id], (error, result) => {
        if (error) throw error;
        prevtitle = result[0].title;

        db.query("DELETE FROM albums WHERE id = ?", [id], (error, result) => {
            if (error) throw error;
    
            db.query("DELETE FROM songs WHERE album = ?", [prevtitle], (error, result) => {
                if (error) throw error;

                db.query("DELETE FROM videos WHERE album = ?", [prevtitle], (error, result) => {

                    if (error) throw error;
                    validationResult ={status: `ok`, statusCode: 200, message: `album deleted successfully`};
                    errorList.push(validationResult);
                    res.json(errorList);
    
                });

            });
            
        });

    });
    
}