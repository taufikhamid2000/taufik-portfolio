import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Project {
  name: string;
  description: string;
  pages: string[];
}

interface DropdownMenuProps {
  dropdownOpen: boolean;
  setDropdownOpen: (open: boolean) => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ dropdownOpen, setDropdownOpen }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeProject, setActiveProject] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects');
        const data = await response.json();
        if (response.ok) {
          setProjects(data.projects);
        } else {
          console.error('Failed to fetch projects:', data.error);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="relative dropdown-menu">
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="bg-blue-500 px-4 py-2 text-white rounded-lg"
      >
        Projects
      </button>
      {dropdownOpen && (
        <ul className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 text-black dark:text-white shadow-lg z-10">
          {projects.map((project) => (
            <li
              key={project.name}
              className="relative group cursor-pointer p-2 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <button
                onClick={() =>
                  setActiveProject((prev) =>
                    prev === project.name ? null : project.name
                  )
                }
                className="w-full text-left"
              >
                {project.name.replace(/-/g, ' ')}
              </button>
              {activeProject === project.name && (
                <ul className="absolute left-full top-0 mt-0 w-48 bg-white dark:bg-gray-800 text-black dark:text-white shadow-lg z-10">
                {['Home', ...project.pages.filter(page => page !== 'Home')].map((page, index) => (
                  <li key={index} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700">
                    <Link href={`/projects/${project.name}/${page === 'Home' ? '' : page}`}>
                      {typeof page === 'string' ? page : 'Unknown'}
                    </Link>
                  </li>
                ))}
              </ul>              
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropdownMenu;
