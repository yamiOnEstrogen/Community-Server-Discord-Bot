import { Client, EmbedBuilder, Message, GuildMember, Events, TextChannel } from "discord.js";
import config from "../config";
import IClient from "../interfaces/IClient";

const DEFUALT_MESSAGE = "Welcome to The Furry Nation %u!\nPlease read the rules in <#1158592633250263041>. We are also [Open Source](https://git.hylia.dev/community-server-discord-bot)";

module.exports = {
    name: Events.GuildMemberAdd,
    once: false,
    async execute(member: any, client: IClient) {
        const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle("Welcome to the Furry Nation!")
            .setDescription(DEFUALT_MESSAGE.replace("%u", `<@${member.id}>`));

        const channel = client.channels.cache.get(config.GreetingChannel) as TextChannel;

        if (channel) {
            channel.send({ embeds: [embed], content: `${member}` });
        }

        // Give the role 1158810835586666576
        await member.roles.add("1158810835586666576");


    }
}