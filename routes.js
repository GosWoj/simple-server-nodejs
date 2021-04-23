const fs = require("fs");

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Enter message</title></head>");
    res.write("<body>");
    res.write("<form action='/message' method='POST'>");
    res.write("<input type='text' name='message' />");
    res.write("<button type='submit'>Send</button>");
    res.write("</form>");
    res.write("</body");
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
  } else {
    res.write("<html>");
    res.write("<head><title>Page not found</title></head>");
    res.write("<body><h1>Page not found!</h1></body>");
    res.write("</html>");
    res.end();
  }
};

exports.requestHandler = requestHandler;
