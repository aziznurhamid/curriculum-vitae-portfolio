import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import { iconMap } from '../utils/iconMap';

export default function ProfileModal({ imageUrl, onClose, name, ui, iconsData }) {
  if (!imageUrl) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative bg-surface rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-hidden p-2"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white text-2xl bg-black bg-opacity-50 hover:bg-opacity-75 rounded-full w-8 h-8 flex items-center justify-center transition-colors z-10"
          aria-label={ui.profile_modal_close_label}
        >
          <FontAwesomeIcon icon={iconMap[iconsData[ui.profile_modal_close_icon_key]]} />
        </button>
        <Image
          src={imageUrl}
          alt={name ? `${name} - ${ui.profile_modal_alt_text}` : ui.profile_modal_alt_text}
          width={800}
          height={800}
          style={{
            objectFit: 'contain',
            width: '100%',
            height: '100%',
            maxHeight: 'calc(90vh - 1rem)'
          }}
          className="rounded-lg"
        />
      </div>
    </div>
  );
}