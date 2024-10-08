import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const projectsDir = path.join(process.cwd(), 'app', 'projects');
    const projectFolders = fs.readdirSync(projectsDir).filter((folder) =>
      fs.statSync(path.join(projectsDir, folder)).isDirectory()
    );

    const projects = projectFolders.map((folder) => {
      const metadataPath = path.join(projectsDir, folder, 'metadata.json');
      let description = 'No description available';

      // Check if metadata.json exists and read it
      if (fs.existsSync(metadataPath)) {
        const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
        description = metadata.description || description;
      }

      // Look for available pages
      const projectPath = path.join(projectsDir, folder);
      const pageFiles = fs.readdirSync(projectPath);
      const pages = pageFiles
        .filter((subfolder) => fs.statSync(path.join(projectPath, subfolder)).isDirectory() || subfolder === 'page.tsx')
        .map((subfolder) => {
          if (subfolder === 'page.tsx') return 'Home';
          return subfolder.replace(/-/g, ' ');
        });

      return {
        name: folder,
        description,
        pages, // Add the pages to the response
      };
    });

    return NextResponse.json({ projects });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}