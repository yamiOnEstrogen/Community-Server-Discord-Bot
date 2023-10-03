import mongoose from "mongoose";
import { Client, ForumChannel, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } from "discord.js";
import IClient from "../interfaces/IClient";
import AnimeFourmModel from "../models/AnimeFourmModel";
const malScraper = require('mal-scraper')

const FOURM_CHANNEL = "1158590284700069908";

const AnimeFourm = () => ({
    Watch: async (client: Client) => {
        AnimeFourmModel.watch().on("change", async (change) => {
            if (change.operationType === "insert") {
                malScraper.getInfoFromURL(change.fullDocument.url)
                .then((data: any) => {
                    const channel = client.channels.cache.get(FOURM_CHANNEL) as ForumChannel;

                    const WelcomeMessage = `Welcome to the AnimeFourm!\n\nPlease follow the rules outlined in <#1158592633250263041>`

                    if (channel) {
                        channel.threads.create({
                            name: `${data.japaneseTitle} (${data.englishTitle})`,
                            autoArchiveDuration: 60,
                            rateLimitPerUser: 5,
                            reason: `Created by ${client.user?.tag} - AnimeFourm`,
                            //@ts-ignore
                            message: WelcomeMessage
                        })
                        
                        .then((thread: any) => {


                            const dataEmbed = new EmbedBuilder()
                            .setColor(0x0099FF)
                            .setTitle(`${data.japaneseTitle} (${data.englishTitle})`)
                            .setURL(change.fullDocument.url)
                            .addFields(
                                { name: "Synopsis", value: data.synopsis.substring(0, 150).concat("..."), inline: false },
                                { name: "Status", value: data.status, inline: false },
                                { name: "Type", value: data.type, inline: false },
                                { name: "Episodes", value: data.episodes, inline: false },
                                { name: "Score", value: data.score, inline: false },
                                { name: "Popularity", value: data.popularity, inline: false },
                                { name: "Genres", value: data.genres.join(", "), inline: false }
                            )
                            .setImage(data.picture)


                            const linkButton = new ButtonBuilder()
                            .setURL(`${change.fullDocument.url}`)
                            .setLabel("Check out the Anime on MAL!")
                            .setStyle(ButtonStyle.Link)

                            const row = new ActionRowBuilder()
                            .addComponents(linkButton)

                            thread.send({
                                embeds: [dataEmbed],
                                components: [row]
                            })
                        })
                    }
                })
                .catch((err: any) => console.log(err))
            }
        });
    }
});

export default AnimeFourm;