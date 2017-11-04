const express = require('express')
const fs = require('fs');
const app = express();
const admaps = require('./maps');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/api', function (req, res) {
    console.log(`Alterdark API online!`);
    let romid = req.query.rom;
    let memorymap = admaps[romid];
    let buffer = fs.readFileSync(`./sourceroms/${romid}.nes`);
    console.log(req.query);
    let newbytes = req.query;
    for (var prop in newbytes) {
        if (prop != "rom") {
          console.log(`0x00${parseInt(newbytes[prop])} at $00${parseInt(memorymap[prop])}`);
          buffer[parseInt(memorymap[prop])] = parseInt(newbytes[prop]);
        }
    }
    res.header("Access-Control-Allow-Origin", "*");
    res.type('application/octet-stream');
    res.send(buffer);
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Listening!')
});