import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { iconMap } from '../utils/iconMap';

export default function Footer({ footerData, iconsData }) {
  const ui = footerData.ui_text;
  const contact = footerData.contact;
  const socialLinks = footerData.social_links;

  return (
    <footer className="bg-surface border-t border-border p-8 text-text-secondary">
      <div className="container mx-auto grid md:grid-cols-2 gap-8">
        <div>
          <h5 className="font-bold text-text-primary mb-4">{ui.contact_title}</h5>
          <ul className="space-y-2">
            <li>
              {/* --- REVISI FINAL: Menggunakan <div> dengan onClick --- */}
              <div
                onClick={() => window.location.href = contact.email.url}
                className="flex items-center gap-2 hover:text-primary transition-colors cursor-pointer"
                role="button"
                tabIndex="0"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    window.location.href = contact.email.url;
                  }
                }}
              >
                <FontAwesomeIcon icon={iconMap[iconsData[contact.email.icon_key]]} />
                <span>{contact.email.value}</span>
              </div>
            </li>
            <li>
              <a href={contact.whatsapp.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary transition-colors">
                <FontAwesomeIcon icon={iconMap[iconsData[contact.whatsapp.icon_key]]} />
                <span>{contact.whatsapp.value}</span>
              </a>
            </li>
            <li>
              <a href={contact.location.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary transition-colors">
                <FontAwesomeIcon icon={iconMap[iconsData[contact.location.icon_key]]} />
                <span>{contact.location.value}</span>
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h5 className="font-bold text-text-primary mb-4">{ui.social_title}</h5>
          <div className="flex flex-col space-y-2">
            {socialLinks.map(link => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                title={link.name}
                className="flex items-center gap-2 text-text-secondary hover:text-primary transition-colors"
                aria-label={`Visit my ${link.name} profile`}
              >
                <FontAwesomeIcon icon={iconMap[iconsData[link.icon_key]]} className="w-6 text-xl" />
                <span>{link.text}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}