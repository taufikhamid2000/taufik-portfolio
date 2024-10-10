import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const { selectedProject, pageName } = await request.json();

    // Check if project name and page name are provided
    if (!selectedProject || !pageName) {
      return NextResponse.json(
        { error: 'Project name and page name are required' },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const sanitizeInput = (input: string) => {
      return input
        .toLowerCase()
        .replace(/[^a-z0-9-_]/g, '') // Remove unwanted characters
        .replace(/\s+/g, '-'); // Replace spaces with hyphens
    };

    const sanitizedProjectName = sanitizeInput(selectedProject);
    const sanitizedPageName = sanitizeInput(pageName);

    const projectDir = path.join(process.cwd(), 'app', 'projects', sanitizedProjectName);

    // Check if project folder exists
    if (!fs.existsSync(projectDir)) {
      return NextResponse.json(
        { error: `Project "${sanitizedProjectName}" does not exist` },
        { status: 400 }
      );
    }

    const pageDir = path.join(projectDir, sanitizedPageName);

    // Check if page already exists
    if (fs.existsSync(pageDir)) {
      return NextResponse.json(
        { error: `Page "${sanitizedPageName}" already exists in project "${sanitizedProjectName}"` },
        { status: 400 }
      );
    }

    // Create the folder for the new page
    fs.mkdirSync(pageDir);

    // Create the page.tsx file inside the new folder
    const pageFilePath = path.join(pageDir, 'page.tsx');
    const defaultPageContent = `
      "use client";

      export default function ${sanitizedPageName.replace(/-/g, '')}() {
        return (
          <div className="min-h-screen flex items-center justify-center">
            <h1 className="text-3xl font-bold">Welcome to ${sanitizedPageName.replace(/-/g, ' ')}!</h1>
          </div>
        );
      }
    `;

    fs.writeFileSync(pageFilePath, defaultPageContent.trim());

    return NextResponse.json({
      message: `Page "${sanitizedPageName}" created successfully in project "${sanitizedProjectName}"`,
    });
  } catch (error) {
    console.error('Error creating page:', error);
    return NextResponse.json({ error: 'Failed to create page' }, { status: 500 });
  }
}