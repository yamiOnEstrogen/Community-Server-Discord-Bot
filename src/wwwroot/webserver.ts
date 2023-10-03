import express, { Request, Response, NextFunction } from "express";
import { createServer } from "http";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import { Client } from "discord.js";
import path from 'path';
import xml2js from 'xml2js';
import IClient from "../interfaces/IClient";
import AnimeFourmModel from "../models/AnimeFourmModel";
import LevelRolesModel from "../models/LevelRolesModel";

const app = express();
const server = createServer(app);

const ERRORWITHLANG = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<root>
    <request>
        <error>True</error>
        <message>Something Went Wrong while processing your request to endpoint: %{endpoint}</message>
    </request>
</root>`;


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(express.static(path.join(__dirname, "www")));

function AllowLangs(req: Request, res: Response, data: any) {
    const { lang } = req.query;
    const xmlBuilder = new xml2js.Builder();

    switch (lang) {
        case "json":
            res.set('Content-Type', 'application/json');
            res.send(data);
            break;
        case "xml":
           try { 
                res.set('Content-Type', 'application/xml');
                res.send(xmlBuilder.buildObject(data));
                break;
           } catch (e) {
                res.set('Content-Type', 'application/xml');
                res.send(ERRORWITHLANG.replace("%{endpoint}", req.path));
                break;
           }
        default:
            res.set('Content-Type', 'application/json');
            res.send(data);
    }
}

export default function webServer(client: Client) {

    app.get("/", (req: Request, res: Response) => {
        AllowLangs(req, res, {
            user: client.user,
            caches: {
                "channels": client.channels.cache,
                "guilds": client.guilds.cache,
                "users": client.users.cache,
                "emojis": client.emojis.cache,
            },
        });
    });

    app.get("/guilds", (req: Request, res: Response) => {
        AllowLangs(req, res, {
            guilds: client.guilds.cache,
        });
    });

    app.get("/channels/:channelId?", (req: Request, res: Response) => {
        if (req.params.channelId) {
            AllowLangs(req, res, {
                channel: client.channels.cache.get(req.params.channelId),
            });
        } else {
            AllowLangs(req, res, {
                channels: client.channels.cache,
            });
        }
    });

    app.get("/users/:userId?", (req: Request, res: Response) => {
        if (req.params.userId) {
            AllowLangs(req, res, {
                user: client.users.cache.get(req.params.userId),
            });
        } else {
            AllowLangs(req, res, {
                users: client.users.cache,
            });
        }
    });

    app.get("/emojis/:emojiId?", (req: Request, res: Response) => {
        if (req.params.emojiId) {
            AllowLangs(req, res, {
                emoji: client.emojis.cache.get(req.params.emojiId),
            });
        } else {
            AllowLangs(req, res, {
                emojis: client.emojis.cache,
            });
        }
    });

    app.get("/anime-fourm", async (req: Request, res: Response) => {
        AllowLangs(req, res, {
            animefourm: await AnimeFourmModel.find({}),
        });
    });

    app.get("/level-roles", async (req: Request, res: Response) => {
        AllowLangs(req, res, {
            levelroles: await LevelRolesModel.find({}),
        });
    })


    server.listen(process.env.PORT || 8080, () => {
        console.log(`listening on *:${process.env.PORT || 8080}`);
    });
}