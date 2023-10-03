import { SlashCommandBuilder, CommandInteraction, SlashCommandStringOption, Webhook, WebhookClient } from "discord.js";
import ISlashCommand from "../../../interfaces/ISlashCommand";
import { UwU } from "../../../core/fun";

export const command: ISlashCommand = {
    data: new SlashCommandBuilder()
        .setName("owoify")
        .setDescription("owoify a text")
        .addStringOption(option => option.setName("text").setDescription("The text to owoify").setRequired(true))
        .addBooleanOption(option => option.setName("extra-emojis").setDescription("Whether to include extra uwu emojis"))
        .addBooleanOption(option => option.setName("separate").setDescription("Separate the owoified text from command output")),
    execute: (interaction: CommandInteraction) => {
        //@ts-ignore
        const text = interaction.options.getString("text");
        //@ts-ignore
        const includeExtraUwuEmojis = interaction.options.getBoolean("extra-emojis");
        //@ts-ignore
        const separate = interaction.options.getBoolean("separate");

        const uwuText = UwU(text, includeExtraUwuEmojis);

        if (separate) {
            interaction.channel?.send(uwuText);
            interaction.reply({
                content: `UwUified text: ${uwuText}\n\nCommand output: ${text}`,
                ephemeral: true
            });
        } else {
            interaction.reply(uwuText);
        }

    },
} as ISlashCommand;