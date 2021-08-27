		module.exports = {
  name: "setticket",
  async run(client, message, args) {
    	const enmap = require('enmap');
	const settings = new enmap({
 name: 'settings',
 autoFetch: true,
 cloneLevel: 'deep',
 fetchAll: true,
});
	const Discord = require('discord.js')
	if (!message.member.hasPermission("ADMINISTRATOR")) {
		const c = new Discord.MessageEmbed();
		c.addField("❌Error❌" , "Invalid permissions you need the `ADMINISTRATOR` permission to execute this command!")
		c.setColor("RED")
		c.setFooter("Command executed by "+message.author.tag+"")
		c.setTimestamp();
     return message.channel.send(c);
   }
   let channel = message.mentions.channels.first();
   if (!channel) return message.reply('Please specify a channel!');

   let sent = await channel.send(
    new Discord.MessageEmbed()
     .setTitle('Ticket System')
     .setDescription(
      'react with‏‏‎ ‎‏‏‎ ‎ 🎫 ‏‏‎ ‎‏‏‎ ‎to open a ticket'
     )
     .setFooter(
      'Made by August#6458',
      ''
     )
     .setColor('00f8ff')
   );

   sent.react('🎫');
   settings.set(`${message.guild.id}-ticket`, sent.id);
   const e = new Discord.MessageEmbed();
	 e.setTitle("Ticket!")
	 e.addField("Setup Status" , "Succesfull!")
	 e.addField("Channel" , channel)
   e.setColor("GREEN")
   message.channel.send(e);
  }
 }