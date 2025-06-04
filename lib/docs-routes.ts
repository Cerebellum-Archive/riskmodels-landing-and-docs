// lib/docs-routes.ts
import fs from "fs";
import path from "path";

function getAllDocsFiles(dir: string, baseDir: string): string[] {
  let results: string[] = [];
  const list = fs.readdirSync(dir);

  list.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat && stat.isDirectory()) {
      results = results.concat(getAllDocsFiles(filePath, baseDir));
    } else if (
      (file.endsWith(".tsx") || file.endsWith(".mdx")) &&
      file !== "layout.tsx" &&
      file !== "page.tsx"
    ) {
      // Store relative path from baseDir
      results.push(path.relative(baseDir, filePath));
    }
  });

  return results;
}

type DocsRouteTree = {
  path: string | undefined;
  label: string;
  order?: number;
  children?: DocsRouteTree[];
};

function buildTree(routes: { path: string; label: string; order?: number }[]): DocsRouteTree[] {
  const root: DocsRouteTree[] = [];

  for (const route of routes) {
    const parts = route.path.replace(/^\/docs\//, "").split("/").filter(Boolean);
    let currentLevel = root;
    let accumulatedPath = "/docs";

    for (let i = 0; i < parts.length; i++) {
      accumulatedPath += "/" + parts[i];
      // Ambil order dari nama folder/file jika ada
      const matchOrder = parts[i].match(/^(\d+)-/);
      const order = matchOrder ? parseInt(matchOrder[1], 10) : 0;
      let node = currentLevel.find((n) => n.label.toLowerCase() === parts[i].replace(/^\d+-/, "").replace(/-/g, " ").toLowerCase());

      if (!node) {
        node = {
          path: undefined,
          label: parts[i]
            .replace(/^\d+-/, "")
            .replace(/-/g, " ")
            .replace(/\b\w/g, (c) => c.toUpperCase()),
          order,
          children: [],
        };
        currentLevel.push(node);
      }

      if (i === parts.length - 1) {
        node.path = route.path;
        node.label = route.label;
        node.order = route.order ?? order;
      }

      currentLevel = node.children!;
    }
  }

  // Urutkan children berdasarkan order
  function sortTree(nodes: DocsRouteTree[]) {
    nodes.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    for (const node of nodes) {
      if (node.children && node.children.length > 0) {
        sortTree(node.children);
      }
    }
  }

  function cleanTree(nodes: DocsRouteTree[]) {
    for (const node of nodes) {
      if (node.children && node.children.length > 0) {
        if (!node.children.some((child) => !child.children || child.children.length === 0)) {
          node.path = undefined;
        }
        cleanTree(node.children);
      }
    }
  }
  cleanTree(root);
  sortTree(root);

  return root;
}

export function getDocsRoutes(): DocsRouteTree[] {
  const docsDir = path.join(process.cwd(), "app/docs");
  const files = getAllDocsFiles(docsDir, docsDir);

  const flatRoutes = files.map((relativePath) => {
    const slug = relativePath.replace(/\.tsx$|\.mdx$/, "").replace(/\\/g, "/");
    const parts = slug.split("/");
    let label = parts[parts.length - 1];
    let pathStr = `/docs/${slug}`;

    if (label === "page") {
      label = parts.length > 1 ? parts[parts.length - 2] : label;
      pathStr = `/docs/${parts.slice(0, -1).join("/")}/`;
    }

    // Ambil order dari nama file/folder jika ada
    const matchOrder = label.match(/^(\d+)-/);
    const order = matchOrder ? parseInt(matchOrder[1], 10) : 0;

    return {
      path: pathStr,
      label: label
        .replace(/^\d+-/, "")
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase()),
      order,
    };
  });

  return buildTree(flatRoutes);
}
