import Image from 'next/image';
import { getUrlByKey } from '../utils/urlUtils';
import { memo } from 'react'; // Impor 'memo'

// Bungkus komponen dengan memo untuk mencegah re-render yang tidak perlu
const Skill = memo(function Skill({ skill, urlsData }) {
  return (
    <div className="bg-surface p-6 rounded-lg shadow-md">
      <h4 className="text-fluid-lg font-bold text-text-primary mb-4">{skill.category}</h4>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {skill.list.map(item => {
          const logoUrl = getUrlByKey(`skills.${item.logo_key}`, urlsData);
          
          return (
            <div 
              key={item.name} 
              className="flex items-center bg-primary/10 text-primary text-fluid-sm font-semibold px-3 py-1 rounded-full space-x-2"
              title={item.name}
            >
              {logoUrl && (
                <div className="relative w-5 h-5 flex-shrink-0">
                  <Image
                    src={logoUrl}
                    alt={`${item.name} logo`}
                    fill
                    sizes="20px"
                    style={{ objectFit: 'contain' }}
                    priority={false}
                  />
                </div>
              )}
              <span className="truncate">{item.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
});

export default Skill;