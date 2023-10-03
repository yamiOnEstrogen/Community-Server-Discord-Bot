import { SlashCommandBuilder, CommandInteraction, EmbedBuilder } from "discord.js";
import ISlashCommand from "../../../interfaces/ISlashCommand";

const options = [
    "It is certain.",
    "It is decidedly so.",
    "Without a doubt.",
    "Yes - definitely.",
    "You may rely on it.",
    "As I see it, yes.",
    "Most likely.",
    "Outlook good.",
    "Signs point to yes.",
    "Reply hazy, try again.",
    "Ask again later.",
    "Better not tell you now.",
    "Cannot predict now.",
    "Concentrate and ask again.",
    "Don't count on it.",
    "My reply is no.",
    "My sources say no.",
    "Outlook not so good.",
    "Very doubtful.",
    "Maybe, maybe not.",
    "It's possible.",
    "The stars are not aligned.",
    "It's a mystery to me.",
];


export const command: ISlashCommand = {
    data: new SlashCommandBuilder()
        .setName("8ball")
        .setDescription("Play 8ball")
        .addStringOption(option =>
            option.setName("question")
                .setDescription("The question you want to ask")
                .setRequired(true)),
    async execute(interaction: CommandInteraction) {
        
        const randomoption = options[Math.floor(Math.random() * options.length)];
        await interaction.reply(randomoption);
        
    },
} as ISlashCommand;