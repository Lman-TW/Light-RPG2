const { MessageActionRow, MessageButton } = require('discord.js');
const { commands } = require('./commands')
const { check_profile } = require('./start')

var channel_save = 0

//遊戲選單
async function menu (client , msg, { channel, author }) {
  channel_save = 0
	const row = new MessageActionRow()
	.addComponents(
		new MessageButton()
			.setCustomId('Commands')
			.setLabel('指令')
			.setStyle('PRIMARY'),
	);
  const row2 = new MessageActionRow()
	.addComponents(
		new MessageButton()
			.setCustomId('Start')
			.setLabel('開始遊戲')
			.setStyle('PRIMARY'),
	);
  const message = await channel.send({ content: '遊戲選單', components: [row, row2] });

  const collector = message.createMessageComponentCollector({
    filter: async function(i) {
      await i.deferUpdate();
      if (i.user.id !== author.id) {
        i.followUp({
          content: '您無法使用別人的按鈕',
          ephemeral: true
        });
        return false;
      }
      return true;
    },
    time: 30e3
  });

  collector.on('collect', async i => {
    if (i.customId === 'Commands') {
      commands(i.channel);
      collector.stop();
    }
    if (i.customId === 'Start') {
      check_profile(client, msg);
      collector.stop();
    }
  });

  collector.once('end', () => {
    row.components[0].setDisabled(true);
    message.delete()
  })
}

module.exports = { menu }