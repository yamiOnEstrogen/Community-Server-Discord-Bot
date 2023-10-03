import { Client, EmbedBuilder, Message, GuildMember, Events } from "discord.js";
import IClient from "../interfaces/IClient";
import config from "../config";
import LevelRolesModel from "../models/LevelRolesModel";
const Levels = require("discord.js-leveling");

const DEFUALT_LEVEL_UP_MESSAGE = "Congratulations %u! You have reached level %l!";

const supportServer = process.env.guild_id;
const staffRole = process.env.STAFF_ID;

module.exports = {
    name: Events.MessageCreate,
    once: false,
    async execute(message: Message, client: IClient) {
        if (message.author.bot) return;

        if (message.content.startsWith(config.StaffPrefix)) {
            const server = client.guilds.cache.get(supportServer as string);
            const member = await server?.members.fetch(message.author.id);
            if (!(member?.roles.cache.has(staffRole as string))) {
              return;
            }
      
            const args = message.content.slice(config.StaffPrefix.length).trim().split(/ +/);
            const commandName = args.shift()?.toLowerCase();

      
            if (!commandName) {
              return;
            }
      
            const command = client.messageCommands.get(commandName);
 

            if (!command) {
              return;
            }
      
            try {
              await command.execute(message, client, args);
            } catch (error) {
              console.error(error);
              message.reply(`${(error as Error).message}`);
            }
          }

        const randomAmountOfXp = Math.floor(Math.random() * 50) + 1;;

        const hasLeveledUp = await Levels.appendXp(message.member?.id, message.guild?.id, randomAmountOfXp);

        if (hasLeveledUp) {
            const user = await Levels.fetch(message.member?.id, message.guild?.id);
            const LevelRoles = await LevelRolesModel.find({})

            const member = message.guild?.members.cache.get(message.member?.id as string);

            const levelUpEmbed = new EmbedBuilder()
                .setColor(0x0099FF)
                .setTitle("Level Up!")
                .setDescription(DEFUALT_LEVEL_UP_MESSAGE.replace("%u", `<@${message.member?.id}>`).replace("%l", user.level.toString()));

            await message.channel.send({ embeds: [levelUpEmbed] });

            for (const role of LevelRoles) {
                if (user.level.toString() >= role.neededLevel.toString()) {
                    member?.roles.add(role.role);
                } else {
                    console.log(`User ${message.member?.id} has not reached the level ${role.neededLevel}`);
                }
            }
        }
    }
}