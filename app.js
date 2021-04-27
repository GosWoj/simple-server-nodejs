// const http = require("http"); //Common JavaScript
import * as http from "http"; //ES 6
// const routes = require("./routes");
import { requestHandler } from "./routes.js";

// const rqListener = (req, res) => {
//   //   console.log(req);
//   //   console.log(req.url, req.method, req.headers);
//   //   process.exit();
// };

const server = http.createServer(requestHandler);

server.listen(3000);
