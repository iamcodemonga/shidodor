const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config({ path: './.env' });
const db = require('../server.js');
const { promisify } = require('util');
const path = require('path');

exports.album = async(req, res) => {

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

    let errorList = [];
    let validationResult = "";

    let { albumtitle, albumdate } = req.body;
    let arttype = ['image/png', 'image/jpg', 'image/jpeg'];

    // check if file is selected
    if (!req.files) {
        validationResult = {status: `failed`, statusCode: 405, message: `Please, select album cover!`};
        errorList.push(validationResult);
        res.json(errorList);
        return;
    }

    let file = req.files.albumcover;
    let filename = `albumcover${Date.now()+path.extname(file.name)}`;
    let filepath = path.join(__dirname, '../bucket', filename);

    // check for invalid file type
    if (!arttype.includes(file.mimetype)) {
        validationResult = {status: `failed`, statusCode: 405, message: `Filetype not supported, only JPG, JPEG and PNG are allowed!`};
        errorList.push(validationResult);
        res.json(errorList);
        return;
    }

    // check for empty form fields
    if (!albumtitle || !albumdate) {
        validationResult = { status: `failed`, statusCode: 405, message: `Please, fill in all fields!` };
        errorList.push(validationResult);
        res.json(errorList);
        return;
    }

    // add album to database
    db.query("INSERT INTO albums (uid, title, art, songs, original_date, date_created) VALUES (?, ?, ?, ?, ?, NOW())", [uniqueID, albumtitle, filename, 0, albumdate], (error, result) => {

        if (error) throw error;

        validationResult ={status: `ok`, statusCode: 200, message: `Album created successfully!`};
        file.mv(filepath);
        errorList.push(validationResult);
        res.json(errorList);

    });

}

exports.test = async(req, res) => {

    let errorList = [];
    let validationResult = "";


    // let { title, description } = req.body;
    

    // check if file is selected
    

    const { albumcover } = req.files;
    let { albumtitle, albumdate } = req.body;

    const body = {
        albumtitle,
        albumdate
    }

    const files = {
        albumcover
    }

    console.log('----------------------------------------------');
    console.log(body);
    console.log('----------------------------------------------');
    console.log('----------------------------------------------');
    console.log('----------------------------------------------');
    console.log('----------------------------------------------');
    console.log(files)

    validationResult = {status: "ok", statusCode: 200, message: "successfully uploaded!"};
    errorList.push(validationResult);
    res.json(errorList);

}

exports.song = async(req, res) => {

    let errorList = [];
    let validationResult = "";

    let { songtitle, duration, album } = req.body;
    let songtype = ['audio/mp3', 'audio/mpeg'];
    let covertype = ['image/png', 'image/jpg', 'image/jpeg'];

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

    if (req.files) {

        const { songfile, songtrailer, songcover } = req.files;

        if (!songfile) {
            validationResult = {status: `failed`, statusCode: 405, message: `Please, select a song (mp3 file)!`};
            errorList.push(validationResult);
            res.json(errorList);
            return;
        }

        if (!songtrailer) {
            validationResult = {status: `failed`, statusCode: 405, message: `Please, select a trailer for the song (mp3 file)!`};
            errorList.push(validationResult);
            res.json(errorList);
            return;
        }

        if (!songcover) {
            validationResult = {status: `failed`, statusCode: 405, message: `Please, select a cover image for the song!`};
            errorList.push(validationResult);
            res.json(errorList);
            return;
        }

        let songname = `song${Date.now()+path.extname(songfile.name)}`;
        let songtrailername = `songtrailer${Date.now()+path.extname(songtrailer.name)}`;
        let songcovername = `songcover${Date.now()+path.extname(songcover.name)}`;

        let songpath = path.join(__dirname, '../bucket', '/encrypted', songname);
        let songtrailerpath = path.join(__dirname, '../bucket', songtrailername);
        let songcoverpath = path.join(__dirname, '../bucket', songcovername);

        if (!songtype.includes(songfile.mimetype)) {
            validationResult = {status: `failed`, statusCode: 405, message: `song format not supported, only mp3 is supported!`};
            errorList.push(validationResult);
            res.json(errorList);
            return;
        }

        if (!songtype.includes(songtrailer.mimetype)) {
            validationResult = {status: `failed`, statusCode: 405, message: `trailer format not supported, only mp3 is supported!`};
            errorList.push(validationResult);
            res.json(errorList);
            return;
        }

        if (!covertype.includes(songcover.mimetype)) {
            validationResult = {status: `failed`, statusCode: 405, message: `cover format not supported, only JPG, JPEG and PNG are allowed!`};
            errorList.push(validationResult);
            res.json(errorList);
            return;
        }

        if (!songtitle || !duration || !album) {
            validationResult = { status: `failed`, statusCode: 405, message: `Please, fill in all fields!` };
            errorList.push(validationResult);
            res.json(errorList);
            return;
        }

        db.query("INSERT INTO songs (title, uid, art, songfile, trailer, album, length, date_created) VALUES (?,?, ?, ?, ?, ?, ?, NOW())", [songtitle, uniqueID, songcovername, songname, songtrailername, album, duration], (error, result) => {

            if (error) throw error;

            if (album == 'none') {

                    validationResult ={status: `ok`, statusCode: 200, message: `Song uploaded successfully!`};
                    songfile.mv(songpath);
                    songtrailer.mv(songtrailerpath);
                    songcover.mv(songcoverpath);
                    errorList.push(validationResult);
                    res.json(errorList);

            } else {

                db.query("UPDATE albums SET songs = songs+1 WHERE title = ?", [album], (error, result) => {

                    if (error) throw error;

                    validationResult ={status: `ok`, statusCode: 200, message: `Song uploaded successfully!`};
                    songfile.mv(songpath);
                    songtrailer.mv(songtrailerpath);
                    songcover.mv(songcoverpath);
                    errorList.push(validationResult);
                    res.json(errorList);

                });

            }

        });

    } else {
        validationResult = {status: `failed`, statusCode: 405, message: `No file selected, select song, trailer and song cover!`};
        errorList.push(validationResult);
        res.json(errorList);
        return;
    }

}

exports.video = async(req, res) => {

    let errorList = [];
    let validationResult = "";

    let { videotrailer, videotitle, duration, album } = req.body;
    let videotype = ['video/mp4'];
    let thumbnailtype = ['image/png', 'image/jpg', 'image/jpeg'];

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

    if (req.files) {

        const { videofile, thumbnail } = req.files;

        if (!videofile) {
            validationResult = {status: `failed`, statusCode: 405, message: `Please, select a video (mp4 file)!`};
            errorList.push(validationResult);
            res.json(errorList);
            return;
        }

        if (!thumbnail) {
            validationResult = {status: `failed`, statusCode: 405, message: `Please, select a thumbnail for the video!`};
            errorList.push(validationResult);
            res.json(errorList);
            return;
        }

        let videoname = `video${Date.now()+path.extname(videofile.name)}`;
        let thumbnailname = `thumbnail${Date.now()+path.extname(thumbnail.name)}`;

        let videopath = path.join(__dirname, '../bucket', '/encrypted', videoname);
        let thumbnailpath = path.join(__dirname, '../bucket', thumbnailname);

        if (!videotype.includes(videofile.mimetype)) {
            validationResult = {status: `failed`, statusCode: 405, message: `video format not supported, only mp4 is supported!`};
            errorList.push(validationResult);
            res.json(errorList);
            return;
        }

        if (!thumbnailtype.includes(thumbnail.mimetype)) {
            validationResult = {status: `failed`, statusCode: 405, message: `thumbnail format not supported, only JPG, JPEG and PNG are allowed!`};
            errorList.push(validationResult);
            res.json(errorList);
            return;
        }

        if (!videotrailer || !videotitle || !duration || !album) {
            validationResult = { status: `failed`, statusCode: 405, message: `Please, fill in all fields!` };
            errorList.push(validationResult);
            res.json(errorList);
            return;
        }

        db.query("INSERT INTO videos (uid, title, thumbnail, videofile, trailer, album, length, date_created) VALUES (?,?, ?, ?, ?, ?, ?, NOW())", [uniqueID, videotitle, thumbnailname, videoname, videotrailer, album, duration], (error, result) => {

            if (error) throw error;

            validationResult ={status: `ok`, statusCode: 200, message: `Music video uploaded successfully!`};
            videofile.mv(videopath);
            thumbnail.mv(thumbnailpath);
            errorList.push(validationResult);
            res.json(errorList);

        });

    } else {
        validationResult = {status: `failed`, statusCode: 405, message: `No file selected, select a video and add a thumbnail!`};
        errorList.push(validationResult);
        res.json(errorList);
        return;
    }
}
