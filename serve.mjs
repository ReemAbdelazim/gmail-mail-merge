// Serves the tool on http://localhost:5173 (Google sign-in needs a real http://localhost origin, not file://).
//   node serve.mjs
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT ?? 5173);

createServer(async (req, res) => {
  const path = req.url.split("?")[0];
  if (path !== "/" && path !== "/index.html") { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { "content-type": "text/html; charset=utf-8", "cache-control": "no-store", "referrer-policy": "no-referrer" });
  res.end(await readFile(join(here, "index.html")));
}).listen(PORT, "127.0.0.1", () => {
  console.log(`Gmail Mail Merge running at http://localhost:${PORT}  (Ctrl+C to stop)`);
});
