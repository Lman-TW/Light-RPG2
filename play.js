const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')

const { get_user_profile } = require('./data')

function play (client, {channel, author}) {
  get_user_profile(client, author)
  if (client.User === 'none') {
    const embed = new MessageEmbed()
        .setTitle('請先開始遊戲')
        .setFooter('使用L.start來開始遊戲')
        .setColor(`0x#E74C3C`)
      channel.send({ embeds: [embed] })
    return
  }
  const row = new MessageActionRow()
	.addComponents(
		new MessageButton()
			.setCustomId('area')
			.setLabel('地區')
			.setStyle('PRIMARY'),
	)
  channel.send ({ content: '遊玩選單', components: [row] })

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
    if (i.customId === 'area') {
      area(author)
    }
    row.components[0].setDisabled(true);
  });
  collector.once('end', () => {
    row.components[0].setDisabled(true);
  	message.delete()
  })
}

module.exports = { play }