import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
  try {
    const { projectName, description } = await req.json();

    if (!projectName) {
      return NextResponse.json({ error: 'Project name is required' }, { status: 400 });
    }

    // Normalize project name to be URL-friendly
    const normalizedProjectName = projectName.toLowerCase().replace(/\s+/g, '-');

    const projectsDir = path.join(process.cwd(), 'app', 'projects');
    const projectDir = path.join(projectsDir, normalizedProjectName);

    if (fs.existsSync(projectDir)) {
      return NextResponse.json({ error: 'Project folder already exists' }, { status: 400 });
    }

    // Create the new project directory
    fs.mkdirSync(projectDir, { recursive: true });

    // Create page.tsx file with content
    const pageContent = `"use client";

import TemplateProjectPage from '../../../components/TemplateProjectPage';

export default function ${normalizedProjectName.replace(/-/g, '_')}() {
  return (
    <TemplateProjectPage
      title="${projectName}"
      description="${description || 'This is a new project page.'}"
    />
  );
}
`;
    fs.writeFileSync(path.join(projectDir, 'page.tsx'), pageContent, 'utf8');

    // Create metadata.json file
    const metadataContent = {
      description: description || 'This is a new project page.',
    };
    fs.writeFileSync(path.join(projectDir, 'metadata.json'), JSON.stringify(metadataContent, null, 2), 'utf8');

    return NextResponse.json({ message: 'Project created successfully' });
  } catch {
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}