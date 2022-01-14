const { Client } = require('discord.js');
const client = new Client({ 
  intents: ['GUILDS', 'GUILD_MESSAGES']
})

const keepAlive = require("./server")
const { menu } = require('./menu')
const { commands } = require('./commands')
const { check_profile } = require('./start')
const { play } = require('./play')

const { load, save } = require('./data')

client.on('ready', () => {
  console.log(`成功啟動 ${client.user.tag}!`)
  load(client)
  setInterval(() => save(client), 600_000)
})

client.on('messageCreate', msg => {
  if (msg.author.bot) return

  if (msg.channel.type === 'dm') {
    msg.channel.send('請在[伺服器]上的頻道跟我互動！')
    return
  }

  if (msg.content === 'L.menu') {
    menu(client, msg, msg)
  }

  if (msg.content === 'L.commands') {
    commands(msg.channel.id)
  }

  if (msg.content === 'L.start') {
    check_profile(client, msg)
  }

  if (msg.content === 'L.play') {
    play(client, msg)
  }

  if (msg.content === 'L.save') {
    save(client)
  }

  if (msg.content === 'L.load') {
    load(client)
  }
})

client.login(process.env.TOKEN)
keepAlive()