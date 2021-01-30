import fs from "fs";
import http, { IncomingMessage, ServerResponse } from "http";

const path: string = "db/task.json";
const task: string = fs.existsSync(path) ?  fs.readFileSync(path, "utf8") : '';

const server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(task);
  }
);

server.listen(4444, "127.0.0.1");
