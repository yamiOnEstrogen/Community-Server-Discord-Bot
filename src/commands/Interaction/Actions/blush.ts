import { SlashCommandBuilder, CommandInteraction, EmbedBuilder } from "discord.js";
import ISlashCommand from "../../../interfaces/ISlashCommand";

import { getWaifu } from "../../../utils/Waifu";

export const command: ISlashCommand = {
    data: new SlashCommandBuilder()
        .setName("blush")
        .setDescription("UwU, senpai~"),
    async execute(interaction: CommandInteraction) {

        const waifu = await getWaifu('blush');

        const embed = new EmbedBuilder()
            .setDescription(`${interaction.user} is blushing!`)
            .setImage(waifu as string)
            .setColor("Aqua")
            .setFooter({
                text: `Powered by hylia.dev`,
            })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    },
} as ISlashCommand;