const http = require("http"); //Common JavaScript
// import * as http from "http"; //ES 6
const routes = require("./routes");

// const rqListener = (req, res) => {
//   //   console.log(req);
//   //   console.log(req.url, req.method, req.headers);
//   //   process.exit();
// };

const server = http.createServer(routes.requestHandler);

server.listen(3000);
