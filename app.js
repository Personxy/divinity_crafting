const http = require("http");
const fs = require("fs");
const path = require("path");

const projectRoot = __dirname;
const port = Number(process.env.PORT || 4173);

function contentType(filePath) {
  if (filePath.endsWith(".html")) return "text/html; charset=utf-8";
  if (filePath.endsWith(".json")) return "application/json; charset=utf-8";
  if (filePath.endsWith(".css")) return "text/css; charset=utf-8";
  if (filePath.endsWith(".js")) return "application/javascript; charset=utf-8";
  return "application/octet-stream";
}

function safeJoin(base, requestedPath) {
  const normalized = requestedPath.replaceAll("\\", "/");
  const joined = path.join(base, normalized);
  const resolvedBase = path.resolve(base);
  const resolvedJoined = path.resolve(joined);
  if (resolvedJoined === resolvedBase || resolvedJoined.startsWith(resolvedBase + path.sep)) return resolvedJoined;
  return null;
}

const server = http.createServer((req, res) => {
  const urlPath = decodeURIComponent((req.url || "/").split("?")[0]);
  const requestPath = urlPath === "/" ? "/index.html" : urlPath;
  const filePath = safeJoin(projectRoot, requestPath);

  if (!filePath) {
    res.statusCode = 400;
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.end("Bad request");
    return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.statusCode = 404;
      res.setHeader("Content-Type", "text/plain; charset=utf-8");
      res.end("Not found");
      return;
    }
    res.statusCode = 200;
    res.setHeader("Content-Type", contentType(filePath));
    res.end(data);
  });
});

server.listen(port, () => {
  process.stdout.write(`http://localhost:${port}/\n`);
});

