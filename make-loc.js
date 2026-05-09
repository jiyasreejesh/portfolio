const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

fs.mkdirSync("meta", { recursive: true });

const extToType = {
  ".html": "html",
  ".css": "css",
  ".js": "js",
  ".json": "json",
};

function csvEscape(value) {
  value = String(value ?? "");
  return `"${value.replaceAll('"', '""')}"`;
}

const files = execFileSync("git", ["ls-files"], { encoding: "utf8" })
  .split(/\r?\n/)
  .filter(Boolean)
  .filter((file) => extToType[path.extname(file)] && file !== "meta/loc.csv");

const rows = [];

for (const file of files) {
  const type = extToType[path.extname(file)];
  const blame = execFileSync("git", ["blame", "--line-porcelain", "--", file], {
    encoding: "utf8",
  });

  let current = {};
  let lineNum = 0;

  for (const raw of blame.split(/\r?\n/)) {
    if (!raw) continue;

    if (/^[0-9a-f]{40}\s/.test(raw)) {
      current = { commit: raw.split(" ")[0] };
    } else if (raw.startsWith("author ")) {
      current.author = raw.slice(7);
    } else if (raw.startsWith("author-time ")) {
      current.authorTime = Number(raw.slice(12));
    } else if (raw.startsWith("author-tz ")) {
      current.timezone = raw.slice(10);
    } else if (raw.startsWith("\t")) {
      lineNum++;

      const text = raw.slice(1);
      const dateObj = new Date(current.authorTime * 1000);

      rows.push({
        commit: current.commit,
        file,
        line: lineNum,
        author: current.author,
        date: dateObj.toISOString().slice(0, 10),
        time: dateObj.toTimeString().slice(0, 8),
        timezone: current.timezone,
        datetime: dateObj.toISOString(),
        type,
        depth: text.match(/^\s*/)[0].length / 2,
        length: text.length,
      });
    }
  }
}

const header = [
  "commit",
  "file",
  "line",
  "author",
  "date",
  "time",
  "timezone",
  "datetime",
  "type",
  "depth",
  "length",
];

const csv = [
  header.join(","),
  ...rows.map((row) => header.map((key) => csvEscape(row[key])).join(",")),
].join("\n");

fs.writeFileSync("meta/loc.csv", csv);
console.log(`wrote meta/loc.csv with ${rows.length} rows`);