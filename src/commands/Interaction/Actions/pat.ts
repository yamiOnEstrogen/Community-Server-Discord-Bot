import { SlashCommandBuilder, CommandInteraction, EmbedBuilder } from "discord.js";
import ISlashCommand from "../../../interfaces/ISlashCommand";

import { getWaifu } from "../../../utils/Waifu";

export const command: ISlashCommand = {
    data: new SlashCommandBuilder()
        .setName("pat")
        .setDescription("pat someone!")
        .addUserOption(option => option.setName('user').setDescription('The user to pat').setRequired(true)),
    async execute(interaction: CommandInteraction) {

        const waifu = await getWaifu('pat');

        const embed = new EmbedBuilder()
            .setDescription(`${interaction.user} is patting ${interaction.options.getUser('user')!}`)
            .setImage(waifu as string)
            .setColor("Aqua")
            .setFooter({
                text: `Powered by hylia.dev`,
            })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    },
} as ISlashCommand;