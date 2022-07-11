const jwt = require('jsonwebtoken');
const db = require('../server.js');
const { promisify } = require('util');
const nodemailer = require('nodemailer');
const { default: axios } = require('axios');
const path = require('path');

// Get data
exports.hero = (req, res) => {

    // Latest songs
    // Top Albums
    // Trending videos

    db.query(`SELECT id, uid, title, art, songs FROM albums ORDER BY id DESC LIMIT ?`, [4], (error, result) => {
        if (error) throw error;

        const topAlbums = result;
        // console.log(topAlbums);

        db.query(`SELECT id, uid, title, art, length FROM songs ORDER BY id DESC LIMIT ?`, [8], (error, result) => {
            if (error) throw error;

            const latestSongs = result
            // console.log(latestSongs);

            db.query(`SELECT id, uid, title, thumbnail, length FROM videos ORDER BY id DESC LIMIT ?`, [3], (error, result) => {
                if (error) throw error;

                const trendingVideos = result;
                // console.log(trendingVideos);

                const homePage = { latestSongs, topAlbums, trendingVideos };
                res.json(homePage);
            })
        })
    })
    
}

exports.albums = (req, res) => {

    db.query(`SELECT  id, uid, title, art, songs FROM albums`,[], (error, result) => {
        if (error) throw error;

        const albums = result;

        db.query(`SELECT COUNT(id) AS total FROM albums`,[], (error, result) => {
            if (error) throw error;
    
            const total = result[0].total;

            const totalAlbums = { total, albums };
    
            res.json(totalAlbums);
        })
    })
}

exports.songs = (req, res) => {

    db.query(`SELECT  id, uid, title, art, length FROM songs`,[], (error, result) => {
        if (error) throw error;

        const songs = result;

        db.query(`SELECT COUNT(id) AS total FROM songs`,[], (error, result) => {
            if (error) throw error;
    
            const total = result[0].total;

            const totalAlbums = { total, songs };
    
            res.json(totalAlbums);
        })
    })
}

exports.videos = (req, res) => {

    db.query(`SELECT  id, uid, title, thumbnail, length FROM videos`,[], (error, result) => {
        if (error) throw error;

        const videos = result;

        db.query(`SELECT COUNT(id) AS total FROM videos`,[], (error, result) => {
            if (error) throw error;
    
            const total = result[0].total;

            const totalAlbums = { total, videos };
    
            res.json(totalAlbums);
        })
    })
}

exports.song = (req, res) => {

    const { uid } = req.params;
    // const { id, ref } = req.query;
    const { ref } = req.query;
    let status = false;
    let paid = false;
    let songDetails = {};
    let relatedSongs = [];
    let page = { status, paid, songDetails, relatedSongs };

    // const page = { status, paid, songDetails, relatedSongs };

    if (!uid) {
        res.status(404).json(page);
        return;
    }

    if (!ref) {

        db.query(`SELECT id, uid, title, art, songfile, trailer, album, length FROM songs WHERE uid = ?`, [uid], (error, result) => {

            if (error) throw error;

            if (result.length < 1) {
                res.json({ status, paid, songDetails, relatedSongs});
                return;
            }

            // res.json(result[0]);
            status = true;
            songDetails = result[0];
            let therealsong = result[0].songfile;

            db.query('SELECT * FROM songs WHERE songfile != ? LIMIT ?', [therealsong, 4], (error, result) => {
                if (error) throw error;

                if (result.length > 0) {

                    relatedSongs = result;
                    res.json({ status, paid, songDetails, relatedSongs });
                    return;
                }

            });

        });

    } else {

        db.query('SELECT id, firstname, lastname, email, ammount, media, propertyId, reference FROM donators WHERE propertyId = ? AND reference = ?', [ uid, ref ], (error, result) => {
            if (error) throw error;
    
            if (result.length > 0) {
                paid = true;
    
                db.query(`SELECT id, uid, title, art, songfile, trailer, album, length FROM songs WHERE uid = ?`, [uid], (error, result) => {
    
                    if (error) throw error;
            
                    if (result.length < 1) {
                        res.json({ status, paid, songDetails, relatedSongs});
                        return;
                    }
            
                    // res.json(result[0]);
                    status = true;
                    songDetails = result[0];
                    let therealsong = result[0].songfile;
            
                    db.query('SELECT * FROM songs WHERE songfile != ? LIMIT ?', [therealsong, 4], (error, result) => {
                        if (error) throw error;
            
                        if (result.length > 0) {
            
                            relatedSongs = result;
                            res.json({ status, paid, songDetails, relatedSongs });
                            return;
                        }
            
                    });
            
                });
            } else {
                db.query(`SELECT id, uid, title, art, songfile, trailer, album, length FROM songs WHERE uid = ?`, [uid], (error, result) =>{
    
                    if (error) throw error;
            
                    if (result.length < 1) {
                        res.json({ status, paid, songDetails, relatedSongs});
                        return;
                    }
            
                    // res.json(result[0]);
                    status = true;
                    songDetails = result[0];
                    let therealsong = result[0].songfile;
            
                    db.query('SELECT * FROM songs WHERE songfile != ? LIMIT ?', [therealsong, 4], (error, result) => {
                        if (error) throw error;
            
                        if (result.length > 0) {
            
                            relatedSongs = result;
                            res.json({ status, paid, songDetails, relatedSongs });
                            return;
                        }
            
                    });
            
                });
            }
    
        });
    }
    
}

exports.video = (req, res) => {

    const { uid } = req.params;
    // const { id, ref } = req.query;
    const { ref } = req.query;
    let status = false;
    let paid = false;
    let videoDetails = {};
    let relatedVideos = [];
    let page = { status, paid, videoDetails, relatedVideos };

    // const page = { status, paid, songDetails, relatedSongs };

    if (!uid) {
        res.status(404).json(page);
        return;
    }

    if (!ref) {

        db.query(`SELECT id, uid, title, thumbnail, videofile, trailer, album, length FROM videos WHERE uid = ?`, [uid], (error, result) => {

            if (error) throw error;

            if (result.length < 1) {
                res.json({ status, paid, videoDetails, relatedVideos });
                return;
            }

            // res.json(result[0]);
            status = true;
            videoDetails = result[0];
            let therealvideo = result[0].videofile;

            db.query('SELECT * FROM videos WHERE videofile != ? LIMIT ?', [therealvideo, 3], (error, result) => {
                if (error) throw error;

                if (result.length > 0) {

                    relatedVideos = result;
                    res.json({ status, paid, videoDetails, relatedVideos });
                    return;
                }

            });

        });

    } else {
        
        db.query('SELECT id, firstname, lastname, email, ammount, media, propertyId, reference FROM donators WHERE propertyId = ? AND reference = ?', [ uid, ref ], (error, result) => {
            if (error) throw error;
    
            if (result.length > 0) {
                paid = true;
    
                db.query(`SELECT id, uid, title, thumbnail, videofile, trailer, album, length FROM videos WHERE uid = ?`, [uid], (error, result) => {
    
                    if (error) throw error;
            
                    if (result.length < 1) {
                        res.json({ status, paid, videoDetails, relatedVideos});
                        return;
                    }
            
                    // res.json(result[0]);
                    status = true;
                    videoDetails = result[0];
                    let therealvideo = result[0].videofile;
            
                    db.query('SELECT * FROM videos WHERE videofile != ? LIMIT ?', [therealvideo, 3], (error, result) => {
                        if (error) throw error;
            
                        if (result.length > 0) {
            
                            relatedVideos = result;
                            res.json({ status, paid, videoDetails, relatedVideos });
                            return;
                        }
            
                    });
            
                });
            } else {

                db.query(`SELECT id, uid, title, thumbnail, videofile, trailer, album, length FROM videos WHERE uid = ?`, [uid], (error, result) => {
    
                    if (error) throw error;
            
                    if (result.length < 1) {
                        res.json({ status, paid, videoDetails, relatedVideos});
                        return;
                    }
            
                    // res.json(result[0]);
                    status = true;
                    videoDetails = result[0];
                    let therealvideo = result[0].videofile;
            
                    db.query('SELECT * FROM videos WHERE videofile != ? LIMIT ?', [therealvideo, 3], (error, result) => {
                        if (error) throw error;
            
                        if (result.length > 0) {
            
                            relatedVideos = result;
                            res.json({ status, paid, videoDetails, relatedVideos });
                            return;
                        }
            
                    });
            
                });

            }
    
        });
    }
    
}

exports.album = (req, res) => {

    const { uid } = req.params;
    // const { id, ref } = req.query;
    const { ref } = req.query;
    let status = false;
    let paid = false;
    let albumDetails = {};
    let tracks = [];
    let relatedAlbums = [];
    let albumtitle = '';
    let page = { status, paid, albumDetails, tracks, relatedAlbums };

    if (!uid) {
        res.status(404).json(page);
        return;
    }

    if (!ref) {

        db.query(`SELECT id, uid, title, art, songs, original_date FROM albums WHERE uid = ?`, [uid], (error, result) => {

            if (error) throw error;

            if (result.length < 1) {
                res.json({ status, paid, albumDetails, tracks, relatedAlbums });
                return;
            }

            // res.json(result[0]);
            albumtitle = result[0].title;
            console.log('I am the first');
            status = true;
            albumDetails = result[0];

            db.query('SELECT id, uid, title, art, songfile, trailer, length FROM songs WHERE album=?', [albumtitle], (error, result) => {
                if (error) throw error;

                tracks = result;
                db.query('SELECT * FROM albums WHERE title != ? LIMIT ?', [albumtitle, 4], (error, result) => {
                    if (error) throw error;
    
                    if (result.length > 0) {
    
                        relatedAlbums = result;
                        res.json({ status, paid, albumDetails, tracks, relatedAlbums });
                        return;
                    }
    
                });

            })

        });

    } else {
        
        db.query('SELECT id, firstname, lastname, email, ammount, media, propertyId, reference FROM donators WHERE propertyId = ? AND reference = ?', [ uid, ref ], (error, result) => {
            if (error) throw error;
    
            if (result.length > 0) {
                paid = true;
    
                db.query(`SELECT id, uid, title, art, songs, original_date FROM albums WHERE uid = ?`, [uid], (error, result) => {
    
                    if (error) throw error;
            
                    if (result.length < 1) {
                        res.json({ status, paid, albumDetails, tracks, relatedAlbums});
                        return;
                    }
            
                    // res.json(result[0]);
                    albumtitle = result[0].title;
                    console.log('i am the second')
                    status = true;
                    albumDetails = result[0];
                    db.query(`SELECT id, uid, title, art, songfile, trailer, length FROM songs WHERE album = ?`, [albumtitle], (error, result) => {
                        if (error) throw error;
        
                        tracks = result;
                        db.query('SELECT * FROM albums WHERE title != ? LIMIT ?', [albumtitle, 4], (error, result) => {
                            if (error) throw error;
                
                            if (result.length > 0) {
                
                                relatedAlbums = result;
                                res.json({ status, paid, albumDetails, tracks, relatedAlbums });
                                return;
                            }
                
                        });
        
                    })
            
                });
            } else {

                db.query(`SELECT id, uid, title, art, songs, original_date FROM albums WHERE uid = ?`, [uid], (error, result) => {
    
                    if (error) throw error;
            
                    if (result.length < 1) {
                        res.json({ status, paid, albumDetails, tracks, relatedAlbums});
                        return;
                    } else {
                        albumtitle = result[0].title;
                        console.log('I am the third');
                        status = true;
                        albumDetails = result[0];
                        db.query(`SELECT id, uid, title, art, songfile, trailer, length FROM songs WHERE album = ?`, [albumtitle], (error, result) => {
                            if (error) throw error;
            
                            tracks = result;
                            db.query('SELECT * FROM albums WHERE title != ? LIMIT ?', [albumtitle, 4], (error, result) => {
                                if (error) throw error;
                    
                                if (result.length > 0) {
                    
                                    relatedAlbums = result;
                                    res.json({ status, paid, albumDetails, tracks, relatedAlbums });
                                    return;
                                }
                    
                            });
            
                        })
                    }
            
                });

            }
    
        });
    }
    
}

exports.contact = (req, res) => {
    
    const { name, email, subject, message } = req.body;

    let template = `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no"><title>contact us</title><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"></head><body style="background: rgb(13,13,13);display: flex;justify-content: center;align-items: center;height: 720px;width: 100%;color: rgb(244,244,244);padding: 30px;"><div style="max-width: 500px;min-width: 300px;background: #121212;min-height: 200px;padding: 40px 20px;"><div><h1 style="text-align: center;">MESSAGE ALERT!!!</h1><p style="color: #a2a0a0;padding: 5px 0;margin-top: 30px;"><strong>Name</strong>: ${name}</p><p style="color: #a2a0a0;padding: 5px 0;"><strong>Email</strong>: ${email}</p><p style="color: #a2a0a0;padding: 5px 0;"><strong>message</strong>: ${message}</p></div></div></body></html>`;
      
        let transporter = nodemailer.createTransport({
            host: "smtp.shidodor.com",
            port: 465,
            secure: true,
            auth: {
                user: 'admin@shidodor.com',
                pass: '@ogeneking',
            },
            tls: {
                rejectUnauthorized:false
            }
        });
      

         transporter.sendMail({
            from: '"shidodor" <admin@shidodor.com>',
            to: "support@chidodor.com", 
            subject: subject, 
            text: "Hello world?", 
            html: template,
        }, (error, info) => {
            if (error){
                res.json({ status: 'failed', statusCode: 405, message: 'Could not send message, try Again!'});
            } else if (info) {
                console.log(info.messageId);
                res.json({ status: 'ok', statusCode: 200, message: 'message sent successfully'});
            }
        });

        // async function main() {
          
        //     let transporter = nodemailer.createTransport({
        //         host: "smtp.shidodor.com",
        //         port: 465,
        //         secure: true,
        //         auth: {
        //             user: "admin@shidodor.com",
        //             pass: "@ogeneking",
        //         },
        //         tls: {
        //             rejectUnauthorized:false
        //         }
        //     });

        //     let info = await transporter.sendMail({
        //         from: '"shidodor" <admin@shidodor.com>',
        //         to: "ogbozman@gmail.com, obs4good@gmail.com",
        //         subject: subject,
        //         text: "Hello world?",
        //         html: template,
        //     });
          
        //     console.log("Message sent: %s", info.messageId);

        //   }
          
        //   main().catch(console.error);
}

exports.donate = (req, res) => {
    const { uid, type } = req.query;

    if (uid && type) {

        db.query(`SELECT uid From ${type}s WHERE uid = ?`, [uid], (error, result) => {
            if (error) throw error;

            if (result.length > 0) {
                res.json({ status: 'ok', statusCode: 200, message: 'successful routing '})
                return;
            } else {
                res.json({ status: 'failed', statusCode: 405, message: 'file doesnt exist '})
                return;
            }
        })
        
    } else {
        res.json({ status: 'failed', statusCode: 405, message: 'unsuccessful routing '});
    }
}

exports.verifyPayment = (req, res) => {
    
    const { reference } = req.query;
    
    axios.get(`https://api.paystack.co/transaction/verify/${reference}`, { 
        headers: {
            authorization: `Bearer ${process.env.SECRET_KEY}`,
            "content-type": "application/json",
            "cache-control": "no-cache"
            },
        })
        .then((response) => {
            if (response.status !== 200) {
                res.json({ status: 'failed', statusCode: 405, message: 'Networl error' });
                return;
            }
            if (!response.data.status) {
                res.json({ status: 'failed', statusCode: 405, message: 'Invalid Transaction' });
                return;
            }

            const { first_name, last_name, email } = response.data.data.customer;
            const { uid, mediaType } = response.data.data.metadata;
            const ammount = parseInt(response.data.data.amount)/100;

            const url = `https://shidodor.com/${mediaType}/${uid}?ref=${reference}`;

            const template = `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no"><title>Thank you</title><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"></head><body style="background: rgb(13,13,13);display: flex;justify-content: center;align-items: center;height: 720px;width: 100%;color: rgb(244,244,244);padding: 30px;"><div style="max-width: 500px;min-width: 300px;background: #121212;min-height: 200px;padding: 40px 20px;"><div><h1 style="text-align: center;">THANK YOU!!!</h1><p style="color: #a2a0a0;padding: 20px 0;">Hello <strong>${first_name}</strong>! We highly appreciate your donation to shidodor music as your donation is also a motivation for us to produce more ogene music. Click on the button below to access the full music, video or album your donated for. The button will take you to our website and you will find a download button for the video or song. If it is an album! you will have to download the tracks individually as there will be a download button behind each track.</p><p style="text-align: center;"><a href="${url}" style="text-decoration: none;background: #34cb34;color: black;padding: 10px 50px;font-weight: bold;border-radius: 5px;">Download Here</a></p><p style="color: #a2a0a0;padding: 20px 0;">If the button above happens not to be responding! click on the link below or copy and paste the link on your favorite browser to download the music.</p><p style="background-color: #454545;border-radius: 3px;padding: 10px;text-align: center;"><a href="#" style="word-wrap: break-word;color: #34cb34;">${url}</a></p></div></div></body></html>`;

            let transporter = nodemailer.createTransport({
                host: "smtp.shidodor.com",
                port: 465,
                secure: true,
                auth: {
                    user: 'admin@shidodor.com',
                    pass: '@ogeneking',
                },
                tls: {
                    rejectUnauthorized:false
                }
            });
          
             transporter.sendMail({
                from: '"shidodor" <admin@shidodor.com>',
                to: email, 
                subject: "Donation successful!!!", 
                text: "Hello world?", 
                html: template,
            }, (error, info) => {
                if (error){
                    res.json({ status: 'failed', statusCode: 405, message: 'Could not send message, try Again!'});
                    console.log('an error occurred while sending mail');
                    return;
                } else if (info) {

                    db.query("INSERT INTO donators (firstname, lastname, email, ammount, media, propertyId, reference, date_of) VALUES (?, ?, ?, ?, ?,?, ?, CURDATE())", [ first_name, last_name, email, ammount, mediaType, uid, reference ], (error, result) => {

                        if (error) throw error;
        
                        res.json({ status: 'ok', statusCode: 200, message: 'message sent successfully'});
                        console.log(info.messageId);
                        
                    });
                }
            });
            
            // console.log(response.data);
        })
        .catch(error => {
            console.log(error.message);
        })


}

exports.download = (req, res) => {
    const { filename } = req.params;

    // const location = path.join(__dirname, 'bucket', 'encrypted', filename);
    // const location = `../bucket/encrypted/${filename}`;
    const location = path.join(__dirname, `../bucket/encrypted/${filename}`);

    res.download(location);
}
