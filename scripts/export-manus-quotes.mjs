/**
 * Exports every quote request out of the old Manus MySQL database and writes
 * netlify/functions/legacy-quotes.json, which the admin dashboard reads so the
 * old submissions keep showing up alongside new Netlify ones.
 *
 * Run BEFORE the Manus account is shut off, with the old DATABASE_URL:
 *
 *   DATABASE_URL="mysql://user:pass@host:3306/dbname" node scripts/export-manus-quotes.mjs
 *
 * Needs mysql2 available:  npm i -D mysql2
 */
import { writeFile } from "node:fs/promises";
import mysql from "mysql2/promise";

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error("Set DATABASE_URL to the old Manus database connection string.");
  process.exit(1);
}

const url = new URL(DATABASE_URL);
const connection = await mysql.createConnection({
  host: url.hostname,
  port: url.port || 3306,
  user: url.username,
  password: decodeURIComponent(url.password),
  database: url.pathname.slice(1),
  ssl: { rejectUnauthorized: true },
});

// The table has been named both ways across migrations.
const TABLES = ["quoteRequests", "quote_requests"];
let rows = null;
for (const table of TABLES) {
  try {
    const [r] = await connection.query("SELECT * FROM \`" + table + "\` ORDER BY createdAt DESC");
    rows = r;
    console.log("read " + r.length + " row(s) from " + table);
    break;
  } catch {
    /* try the next name */
  }
}
await connection.end();

if (!rows) {
  console.error("Could not find a quote requests table.");
  process.exit(1);
}

const quotes = rows.map((r) => ({
  id: "legacy-" + r.id,
  name: r.name,
  company: r.company ?? null,
  email: r.email,
  phone: r.phone ?? null,
  projectDetails: r.projectDetails ?? r.project_details ?? "",
  status: r.status ?? "new",
  notes: r.notes ?? null,
  createdAt: new Date(r.createdAt ?? r.created_at).toISOString(),
}));

await writeFile(
  "netlify/functions/legacy-quotes.json",
  JSON.stringify(quotes, null, 2) + "\n"
);
console.log("wrote netlify/functions/legacy-quotes.json (" + quotes.length + " quotes)");
