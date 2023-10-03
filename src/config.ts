import { GatewayIntentBits } from "discord.js";

import IConfig from "./interfaces/IConfig";

const config: IConfig = {
    StaffPrefix: "$$",
    GreetingChannel: "1158591207656665150",
    RulesChannel: "1158592633250263041",
    RolesChannel: "1158592633250263041",
    Intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildEmojisAndStickers, GatewayIntentBits.GuildMessages],
    github_url: "https://github.com/0xhylia/community-server-discord-bot",
}

export default config;