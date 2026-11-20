// Renders portfolio.html deterministically, frame by frame, and encodes an MP4.
// Usage: node render.mjs [out.mp4] [startFrame] [endFrame]   (frames optional, for quick previews)
// Set VARIANT=vertical for the 9:16 (1080x1920) cut.
import puppeteer from "puppeteer-core";
import ffmpegPath from "ffmpeg-static";
import { spawn } from "node:child_process";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";

const here = path.dirname(fileURLToPath(import.meta.url));
const vertical = process.env.VARIANT === "vertical";
const page_file = vertical ? "portfolio-vertical.html" : "portfolio.html";
const size = vertical ? { width: 1080, height: 1920 } : { width: 1920, height: 1080 };
const out = path.resolve(process.argv[2] ?? path.join(here, vertical ? "hadi-ramdhani-motion-9x16.mp4" : "hadi-ramdhani-motion.mp4"));
const CHROME = process.env.CHROME_PATH ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ["--allow-file-access-from-files", "--hide-scrollbars", "--force-device-scale-factor=1", "--font-render-hinting=none"],
});
const page = await browser.newPage();
await page.setViewport({ ...size, deviceScaleFactor: 1 });
await page.goto(pathToFileURL(path.join(here, page_file)).href, { waitUntil: "networkidle0" });
await page.waitForFunction("window.__ready === true", { timeout: 60000 });

const fps = await page.evaluate("window.__fps");
const total = await page.evaluate("window.__frames");
const first = Number(process.argv[3] ?? 0);
const last = Math.min(Number(process.argv[4] ?? total), total);

const ff = spawn(
  ffmpegPath,
  ["-y", "-f", "image2pipe", "-framerate", String(fps), "-i", "-", "-c:v", "libx264", "-preset", "medium", "-crf", "16",
   "-pix_fmt", "yuv420p", "-movflags", "+faststart", out],
  { stdio: ["pipe", "inherit", "inherit"] },
);
const done = new Promise((res, rej) => { ff.on("close", (c) => (c === 0 ? res() : rej(new Error("ffmpeg exit " + c)))); });

const t0 = Date.now();
// Frames must be seeked in order: the swarm simulation is stateful.
for (let f = 0; f < last; f++) {
  await page.evaluate((n) => window.__seek(n), f);
  if (f < first) continue;
  const buf = await page.screenshot({ type: "jpeg", quality: 95 });
  if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once("drain", r));
  if (f % 60 === 0) console.log(`frame ${f}/${last}  ${((Date.now() - t0) / 1000).toFixed(0)}s`);
}
ff.stdin.end();
await done;
await browser.close();
console.log("wrote", out);
