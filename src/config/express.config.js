import express from "express";
import http from "http";
const app = express();

/**
 *
 * importing mongodb connection file
 *
 */
import "./mongodb.config";

/*
// why we create http.createServer?

For most production Node.js applications, especially when using WebSockets,
 graceful shutdowns, or low-level server events, creating the server 
 explicitly with http.createServer(app) is the preferred pattern.
*/
const server = http.createServer(app);

app.use(express.json());

export default server;
