import { memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Komponen FontAwesomeIcon dibungkus dengan memo.
// Ini akan mencegah ikon di-render ulang jika props-nya (icon, className, dll.) tidak berubah.
const MemoizedFontAwesomeIcon = memo(function MemoizedFontAwesomeIcon(props) {
  return <FontAwesomeIcon {...props} />;
});

export default MemoizedFontAwesomeIcon;