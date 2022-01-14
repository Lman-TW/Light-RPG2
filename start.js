const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')

const { get_user_profile } = require('./data')
const { add } = require('./data')

var Class_start = ''

async function start_class (client, channel, author) {
  client.User = ''
  client.Class = ''
	const row = new MessageActionRow()
	.addComponents(
		new MessageButton()
			.setCustomId('劍士')
			.setLabel('劍士')
			.setStyle('PRIMARY'),
	);
  const row2 = new MessageActionRow()
	.addComponents(
		new MessageButton()
			.setCustomId('弓箭手')
			.setLabel('弓箭手')
			.setStyle('PRIMARY'),
	);
  const row3 = new MessageActionRow()
	.addComponents(
		new MessageButton()
			.setCustomId('法師')
			.setLabel('法師')
			.setStyle('PRIMARY'),
	);
  const row4 = new MessageActionRow()
	.addComponents(
		new MessageButton()
			.setCustomId('盾士')
			.setLabel('盾士')
			.setStyle('PRIMARY'),
	);
  const message = await channel.send({ content: '請選擇您要的職業！', components: [row, row2, row3, row4] });

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
    if (i.customId === '劍士') {
      Class_start = '劍士'
      collector.stop();
    } else if (i.customId === '弓箭手') {
      Class_start = '弓箭手'
      collector.stop
    } else if (i.customId === '法師') {
      Class_start = '法師'
      collector.stop
    } else if (i.customId === '盾士') {
      Class_start = '盾士'
      collector.stop
    }
    row.components[0].setDisabled(true);
    get_user_profile(client, author.id)
    if (client.User === 'none') {
      add(client, author.id, Class_start)
      const embed = new MessageEmbed()
        .setTitle('成功創建檔案！')
        .setFooter(`用戶：${author.username}\n職業：${Class_start}`)
        .setColor(`0x#2ECC71`)
      channel.send({ embeds: [embed] })
    } else {
       const embed = new MessageEmbed()
        .setTitle('你已經開始遊戲了！')
        .setFooter('使用L.play來玩！')
        .setColor(`0x#E74C3C`)
      channel.send({ embeds: [embed] })
    }
  });
  collector.once('end', () => {
    row.components[0].setDisabled(true);
  	message.delete()
  })
}

//檢查用戶是否已經登記過資料
function check_profile (client, { channel, author }) {
  get_user_profile(client, author)
  console.log()
  if (client.User === 'none') {
    start_class(client, channel, author)
    return
  } else {
    channel.send('您已經開始遊戲了！')
  }
}

module.exports = { check_profile }