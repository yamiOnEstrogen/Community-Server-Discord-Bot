import mongoose from "mongoose";
import { Client, ForumChannel, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } from "discord.js";
import IClient from "../interfaces/IClient";
import CaughtIn4kModel from "../models/CaughtIn4kModel";
import { fDate } from "developer-toolkit-utils";

const FOURM_CHANNEL = "1158903189236629514";

const CaughtIn4k = () => ({
    Watch: async (client: Client) => {
        CaughtIn4kModel.watch().on("change", async (change) => {
            if (change.operationType === "insert") {
                const channel = client.channels.cache.get(FOURM_CHANNEL) as ForumChannel;

                channel.threads.create({
                    name: `Caught in 4k! ${fDate(new Date())}`,
                    autoArchiveDuration: 60,
                    rateLimitPerUser: 5,
                    reason: `Created by ${client.user?.tag} - CaughtIn4k`,
                    //@ts-ignore
                    message: `Caught in 4k! ${fDate(new Date())}`
                })
                
                .then((thread: any) => {
                    thread.send({
                        content: change.fullDocument.image
                    })
                })
            }
        });
    }
});

export default CaughtIn4k;