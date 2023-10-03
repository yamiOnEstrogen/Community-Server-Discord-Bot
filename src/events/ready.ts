import { Events, ActivityType } from "discord.js";
import mongoose from "mongoose";
import webServer from "../wwwroot/webserver";
import AnimeFourm from "../services/AnimeFourm";
import CaughtIn4k from "../services/CaughtIn4k";
const Levels = require("discord.js-leveling");


module.exports = {
    name: Events.ClientReady,
    once: true,
    async execute(client: any) {
        AnimeFourm().Watch(client);
        CaughtIn4k().Watch(client);
        console.clear();
        console.log(`Logged in as ${client.user.tag}`);

        client.user.setActivity("The Furry Nation (/)", { type: ActivityType.Watching });

        mongoose.connect(process.env.mongo_url as string);

        const db = mongoose.connection;

        db.on("error", () => {
            console.error(`Error connecting to MongoDB`);
        });
    
        db.once("open", () => {
            console.log("Connected to MongoDB");
        });

        Levels.setURL(process.env.mongo_url as string);

        webServer(client);
    }
}