import { execSync } from "child_process";

export default function remarkLastUpdated() {
  return function (tree: any, file: any) {
    const filepath = file.history[0];
    const result = execSync(`git log -1 --pretty="format:%cI" "${filepath}"`);
    file.data.astro.frontmatter.lastUpdated = result.toString();
  };
}
