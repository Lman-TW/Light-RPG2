const express = require("express")

const server = express()

server.all("/", (req, res) => {
  res.send("機器人正在運作!")
})

function keepAlive() {
  server.listen(3000, () => {
    console.log("伺服器準備好了!")
  })
}

module.exports = keepAlive