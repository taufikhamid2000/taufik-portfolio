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

      return {
        name: folder,
        description,
      };
    });

    return NextResponse.json({ projects });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}
