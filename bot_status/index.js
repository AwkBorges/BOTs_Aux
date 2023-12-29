const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
const {GatewayIntentBits } = require('discord.js');
const Discord = require("discord.js");
require('dotenv').config()
const client = new Discord.Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
	],
});
const token = process.env.TOKEN;
const guildId = process.env.GUILD;

client.on('ready', () => {
  console.log(`Bot conectado como ${client.user.tag}`);
});

client.login(token);

app.get('/status', (req, res) => {

    const guild = client.guilds.cache.get(guildId);

    if (guild) {
        const data = {
          membros: null,
          clientes: null,
          vendas: null
        };
      
        guild.channels.cache.forEach(channel => {
          const channelName = channel.name;
      
          if (channelName.startsWith('🦝┃Guaxinins:')) {
            const value = channelName.split(':')[1].trim();
            data.membros = value;
          } else if (channelName.startsWith('🖤 ┃Clientes:')) {
            const value = channelName.split(':')[1].trim();
            data.clientes = value;
          } else if (channelName.startsWith('💵┃Vendas:')) {
            const value = channelName.split(':')[1].trim();
            data.vendas = value;
          }
        });
      
        const jsonData = JSON.stringify(data);
        res.send(jsonData);
      }
    
  });


const port = 3001;
app.listen(port, () => {
  console.log(`Servidor está rodando na porta ${port}`);
});