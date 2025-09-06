import Image from 'next/image';
import { getUrlByKey } from '../utils/urlUtils';

export default function ProjectCard({ project, ui, urlsData, isFirst }) {
  return (
    <div className="bg-surface rounded-lg shadow-lg overflow-hidden flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="relative w-full h-48 bg-gray-200">
        <Image
          src={project.image}
          alt={`Gambar pratinjau untuk proyek ${project.title}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: 'cover' }}
          priority={isFirst}
          loading={isFirst ? 'eager' : 'lazy'}
        />
      </div>
      <div className="p-4 flex flex-col flex-1">
        <p className="text-fluid-sm font-semibold text-text-secondary mb-1">{project.category}</p> {/* REVISI */}
        <h3 className="text-fluid-lg font-bold text-text-primary mb-2">{project.title}</h3> {/* REVISI */}
        <p className="text-text-secondary text-fluid-sm mb-4 flex-1">{project.description}</p> {/* REVISI */}
        <div className="grid grid-cols-2 auto-rows-fr gap-2 mb-4">
          {project.technologies.map((tech) => {
            const logoUrl = getUrlByKey(`skills.${tech.logo_key}`, urlsData);
            return (
              <div
                key={tech.name}
                className="flex items-center bg-primary/10 text-primary text-fluid-sm font-semibold px-2 py-1 rounded-full space-x-1" /* REVISI */
                title={tech.name}
              >
                {logoUrl && (
                  <div className="relative w-4 h-4 flex-shrink-0">
                    <Image
                      src={logoUrl}
                      alt={`Logo ${tech.name}`}
                      fill
                      sizes="16px"
                      style={{ objectFit: 'contain' }}
                      loading="lazy"
                    />
                  </div>
                )}
                <span className="truncate">{tech.name}</span>
              </div>
            );
          })}
        </div>
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-auto bg-primary text-white font-bold py-2 px-4 rounded-md hover:bg-primary/90 transition-colors text-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          aria-label={`Lihat proyek ${project.title}`}
          title={`Lihat proyek ${project.title}`}
        >
          {ui.project_button_text}
        </a>
      </div>
    </div>
  );
}