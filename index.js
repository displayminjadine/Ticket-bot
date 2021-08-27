var Discord = require('discord.js');
const fs = require('fs')
const client = new Discord.Client();
const { readdirSync } = require('fs');
const { join } = require('path')

const token = "ODEwMTUyODcxNTgzNjc4NDk1.YCffqA.dRl7MjvfCZfpA47BL1wu1QWFNME";
const prefix = "!";

client.on('ready', () => {
    client.user.setActivity("Made by August#6458 || displayminjadine on yt");
    console.log("Bot is ready!")
    });

client.commands = new Discord.Collection();
const commandFiles = readdirSync(join(__dirname, "commands")).filter(file => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(join(__dirname, "commands", `${file}`));
  client.commands.set(command.name, command);
}
client.on("error", console.error);
client.on("message", async message => {

  if (message.author.bot) return;
  if (message.channel.type === 'dm') return;
  if (message.content.startsWith(prefix)) {
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    if (!client.commands.has(command)) return;
    try {
      client.commands.get(command).run(client, message, args);
    } catch (error) {
      console.error(error);
    }
  }
})

client.on('messageReactionAdd', async (reaction, user) => {
	const enmap = require('enmap');
	const Discord = require('discord.js')
	const db = require('quick.db')
	client.db = db;
	const settings = new enmap({
 name: 'settings',
 autoFetch: true,
 cloneLevel: 'deep',
 fetchAll: true,
});
 if (user.partial) await user.fetch();
 if (reaction.partial) await reaction.fetch();
 if (reaction.message.partial) await reaction.message.fetch();

 if (user.bot) return;
 let ticketid = await settings.get(`${reaction.message.guild.id}-ticket`);
 if (!ticketid) return;

 if (reaction.message.id == ticketid && reaction.emoji.name == '🎫') {
  reaction.users.remove(user);

 if (client.db.get(`cooldowns.ticket.${user.id}`) + 6000 > Date.now()) {
     return user.send("You can't make a ticket for another` 5 minutes`").catch(() => console.log("can't dm this user "+user.user.tag+""));
   }
 client.db.set(`cooldowns.ticket.${user.id}`,Date.now());
 
  reaction.message.guild.channels
   .create(`ticket-${user.username}`, {
    permissionOverwrites: [
     {
      id: user.id,
      allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
     },
     {
      id: reaction.message.guild.roles.everyone,
      deny: ['VIEW_CHANNEL'],
     },
    ],
    type: 'text',
   })
   .then(async (channel) => {
    channel.send(
     `<@${user.id}> Welcome!`,
     new Discord.MessageEmbed()
      .setDescription(
       'Support will be with you shortly.\n \n ;close to close the ticket.'
      )
      .setColor('00f8ff')
      .setFooter(
       ''+prefix+'close to close the ticket || Made by displayminjadine on yt'
      )
      .setTimestamp()
    );
   });
 }
});

client.login(token)