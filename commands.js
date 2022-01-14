function commands (channel) {
  channel.send('L.start 開始冒險!\nL.menu 查看遊戲選單\nL.commands 取得指令列表')
}

module.exports = { commands }