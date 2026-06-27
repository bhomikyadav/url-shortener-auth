import express, { type Express, Request, Response } from "express";
import http, { type Server } from "http";

// service contants 
import { SERVICE_NAME, SERVICE_API_PRIFIX } from './contant.config'

import utilities from '../utilities/middleware/api.middleware'




import routes from "../routes";




const app: Express = express();

/**
 *
 * importing mongodb connection file
 *
 */
import "./mongodb.config";
import { RequestContext } from "../utilities/request-context";
/*
// why we create http.createServer?

For most production Node.js applications, especially when using WebSockets,
 graceful shutdowns, or low-level server events, creating the server 
 explicitly with http.createServer(app) is the preferred pattern.
*/
const server: Server = http.createServer(app);

app.use(utilities);


app.use((req: Request, res, next) => {
    next();
})

app.use(`${SERVICE_API_PRIFIX}/${SERVICE_NAME}`, routes);



app.all("/*path", (req: Request, res: Response) => {
    return res.send("invalid URL")
})

app.use(express.json());

export default server;
