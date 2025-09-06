import ThemeSwitcher from './ThemeSwitcher';
import Link from 'next/link';
import Image from 'next/image';
import { getUrlByKey } from '../utils/urlUtils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { iconMap } from '../utils/iconMap';

export default function Header({ siteData, onProfileClick, urlsData, iconsData, currentRole }) {
  const { name, image_url_key } = currentRole;
  const profileImageUrl = getUrlByKey(image_url_key, urlsData);

  return (
    <header className="sticky top-0 z-10 bg-surface/80 backdrop-blur-md border-b border-border h-20 flex justify-center px-4 sm:px-8 no-print">
      <div className="w-full max-w-5xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          {profileImageUrl && (
            <div onClick={onProfileClick} className="relative w-10 h-10 rounded-full border-2 border-primary lg:hidden cursor-pointer flex-shrink-0">
              <Image
                src={profileImageUrl}
                alt="Foto Profil Azis Nurhamid"
                fill
                sizes="40px"
                style={{ objectFit: 'cover' }}
                className="rounded-full"
                priority={true}
                placeholder="blur"
                blurDataURL={profileImageUrl}
              />
            </div>
          )}
          <Link href="/" className="text-fluid-lg font-bold text-text-primary">
              {name}
          </Link>
        </div>
        <div className="flex items-center gap-4">
            <button
                onClick={() => window.print()}
                className="text-text-secondary text-xl"
                title={siteData.ui_text.print_tooltip}
                aria-label={siteData.ui_text.print_tooltip}
            >
                <FontAwesomeIcon icon={iconMap[iconsData[siteData.ui_text.print_icon_key]]} />
            </button>
            <ThemeSwitcher settings={siteData.settings} ui={siteData.ui_text} iconsData={iconsData} />
        </div>
      </div>
    </header>
  );
}