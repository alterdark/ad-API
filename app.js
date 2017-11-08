const { join } = require('path')
const express = require('express')
const app = express()
const fs = require('fs')
const romMaps = require(join(__dirname, 'maps'))
const romsPath = join(__dirname, 'sourceroms')
const cors = require('cors')
const pump = require('pump')
const through2 = require('through2')

app.use(cors())

app.get('/api/:id', function (req, res) {
  // ROM name comes from the path parameter, example: /api/alterDark
  let romid = req.params.id
  let query = req.query
  let memMap = romMaps[romid]

  // return an error if there is no rom map
  if (!memMap) {
    return res.status(400).json({
      message: `No map to rom ${romid}`
    })
  }
  // create a write stream of the base ROM file
  let rom = fs.createReadStream(
    join(romsPath, `${romid}.nes`)
    // { highWaterMark: 1024 * 8 } // quarter chunk size, just to play with
  )

  // this is the "chunk size" we need in order to offset the index for multiple chunks
  let chunkSize = rom._readableState.highWaterMark
  let chunk = 0

  let transform = through2(function (romData, enc, callback) {
    // keeping track of the chunk number so we can offset the map keys
    let offset = chunkSize * chunk
    Object.keys(query).forEach(addr => {
      let mapAddr = memMap[addr] + offset
      let newAddr = Number(query[addr])
      if (romData.indexOf(mapAddr) > -1) {
        romData[mapAddr] = newAddr
      }
    })
    this.push(romData)
    chunk++
    callback()
  })

  res.type('application/octet-stream')
  // we use pump to take the rom file, put it through our transform, then pipe to the client so we can take advantage of streaming
  pump(rom, transform, res)
})

app.listen(process.env.PORT || 3000, function () {
  console.log('Listening!')
})
