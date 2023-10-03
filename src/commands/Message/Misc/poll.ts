import { EmbedBuilder, Message } from 'discord.js';
import IClient from '../../../interfaces/IClient';
import IMessageCommand from '../../../interfaces/IMessageCommand';


const OptionToEmoji: { [key: number]: string } = {
    1: "1️⃣",
    2: "2️⃣",
    3: "3️⃣",
    4: "4️⃣",
    5: "5️⃣",
    6: "6️⃣",
    7: "7️⃣",
    8: "8️⃣",
    9: "9️⃣",
    10: "🔟",
}


export const command: IMessageCommand = {
    name: "poll",
    description: "Create a poll",
    usage: "[options]",
    execute: async (message: Message<boolean>, client: IClient, args: string[]) => {
        // Get the poll options
        // They look like this: <command> option1/option2/option3
        // We only want the options
        const title = args[0];
        const options = args.slice(1).join(" ").split("/");

        if (args.length < 1) {
            message.reply("You need to provide a title and at least one option!");
            return;
        }

        if (!title) {
            message.reply("You need to provide a title!");
            return;
        }

        if (options.length < 1) {
            message.reply("You need to provide at least one option!");
            return;
        }

        if (options.length > 10) {
            message.reply("You can't have more than 10 options!");
            return;
        }

        // Create the poll
        const poll = new EmbedBuilder()
            .setTitle(title.replace(/_/g, " "))
            .setColor(0x0099FF)
            .setAuthor({
                name: message.author.tag,
                iconURL: `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.${message.author.avatar?.startsWith("a") ? "gif" : "png"}`,
            })

        // Add the options
        options.forEach((option, index) => {
            poll.addFields({
                name: `Option ${index + 1}`,
                value: option,
            });
        })

        // Send the poll
        message.delete();
        message.channel.send({ embeds: [poll] }).then((msg) => {
            options.forEach((option, index) => {
                msg.react(OptionToEmoji[index + 1]);
            })
        })
    }
} 

export default command;