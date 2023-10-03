import { GatewayIntentBits } from "discord.js";

/**
 * The interface for the config file
 * @interface IConfig
 */

interface IConfig {
    StaffPrefix: string;
    github_url: string;
    GreetingChannel: string;
    RulesChannel: string;
    RolesChannel: string;
    Intents: GatewayIntentBits[];
}

export default IConfig;