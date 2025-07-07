
import React from "react";
import fs from "fs";
import path from "path";

// Utility to extract headings for TOC
function extractHeadings(html: string) {
  const headingRegex = /<h([2-4])[^>]*>(.*?)<\/h\1>/gi;
  const headings = [] as { level: number; text: string; id: string }[];
  let match;
  while ((match = headingRegex.exec(html))) {
    const level = parseInt(match[1], 10);
    // Generate a slug/id for anchor links
    const text = match[2].replace(/<[^>]+>/g, "").trim();
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    headings.push({ level, text, id });
  }
  return headings;
}

export default async function ImprovePhysicalPerformancePage() {
  // Read the HTML content from the client file (or ideally from a dedicated HTML file)
  const htmlPath = path.join(process.cwd(), "vitabella/src/app/improve-physical-performance/ippClient.tsx");
  let html = await fs.promises.readFile(htmlPath, "utf8");
  // Remove everything before <body> and after </body>
  html = html.replace(/^[\s\S]*<body[^>]*>/i, "").replace(/<\/body>[\s\S]*$/i, "");
  // Remove inline <style> and <script> tags
  html = html.replace(/<style[\s\S]*?<\/style>/gi, "");
  html = html.replace(/<script[\s\S]*?<\/script>/gi, "");

  // Extract headings for TOC
  const headings = extractHeadings(html);

  // Insert anchor ids for headings
  let htmlWithAnchors = html;
  headings.forEach(({ text, id }) => {
    const headingRegex = new RegExp(
      `<h([2-4])([^>]*)>(\\s*${text.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1")}\\s*)<\\/h\\1>`,
      "i"
    );
    htmlWithAnchors = htmlWithAnchors.replace(
      headingRegex,
      `<h$1 id="${id}"$2>$3</h$1>`
    );
  });

  return (
    <main className="container" style={{ paddingTop: 32, paddingBottom: 32 }}>
      <article className="awlc-columns" style={{ display: "block", maxWidth: 900, margin: "auto" }}>
        <h1 className="h1" style={{ textAlign: "center", marginBottom: 24 }}>
          Improve Physical Performance: Hormone Therapy & Peptides
        </h1>
        {/* Table of Contents */}
        <nav aria-label="Table of Contents" style={{ margin: "32px 0" }}>
          <h2 className="h2" style={{ fontSize: 28, marginBottom: 12 }}>Table of Contents</h2>
          <ul style={{ listStyle: "none", paddingLeft: 0 }}>
            {headings.map(({ text, id, level }) => (
              <li key={id} style={{ marginLeft: (level - 2) * 20 }}>
                <a href={`#${id}`} style={{ color: "#4263AE", textDecoration: "none" }}>{text}</a>
              </li>
            ))}
          </ul>
        </nav>
        {/* Main Content */}
        <section
          className="body-text"
          style={{ background: "#fff", borderRadius: 12, padding: 24, boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}
          dangerouslySetInnerHTML={{ __html: htmlWithAnchors }}
        />
      </article>
    </main>
  );
}
