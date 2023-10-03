import { SlashCommandBuilder, CommandInteraction, EmbedBuilder } from "discord.js";
import ISlashCommand from "../../../interfaces/ISlashCommand";

import { getWaifu } from "../../../utils/Waifu";

export const command: ISlashCommand = {
    data: new SlashCommandBuilder()
        .setName("cry")
        .setDescription("senpai...Why..."),
    async execute(interaction: CommandInteraction) {

        const waifu = await getWaifu('cry');

        const embed = new EmbedBuilder()
            .setDescription(`${interaction.user} is crying!`)
            .setImage(waifu as string)
            .setColor("Aqua")
            .setFooter({
                text: `Powered by hylia.dev`,
            })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    },
} as ISlashCommand;