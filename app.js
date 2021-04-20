const http = require("http"); //Common JavaScript
// import * as http from "http"; //ES 6
const fs = require("fs");

const rqListener = (req, res) => {
  //   console.log(req);
  //   console.log(req.url, req.method, req.headers);
  //   process.exit();
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Enter message</title></head>");
    res.write(
      "<body><form action='/message' method='POST'><input type='text' name='message' /><button type='submit'>Send</button></form></body>"
    );
    res.write("</html>");
    return res.end();
  }

  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });
    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      fs.writeFile("message.txt", message, (error) => {
        //Redirecting
        res.statusCod = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }

  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>First server</title></head>");
  res.write("<body><h1>Hello world</h1></body>");
  res.write("</html>");
  res.end();
};

const server = http.createServer(rqListener);

server.listen(3000);
