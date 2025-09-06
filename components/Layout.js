import Header from './Header';
import { useRouter } from 'next/router';
import { useState, useEffect, useCallback } from 'react';
import { getUrlByKey } from '../utils/urlUtils';
import dynamic from 'next/dynamic';
import Head from 'next/head';

const Sidebar = dynamic(() => import('./Sidebar'));
const BottomNavbar = dynamic(() => import('./BottomNavbar'));
const ProfileModal = dynamic(() => import('./ProfileModal'));
const Footer = dynamic(() => import('./Footer'));

export default function Layout({ children, siteData, headerData, navigationData, contentData, footerData, urlsData, iconsData }) {
  const router = useRouter();
  const { pathname } = router;
  const [isCollapsed, setCollapsed] = useState(true);
  const [showProfileModal, setShowProfileModal] = useState(false);
  
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        
        const locationData = { latitude, longitude };

        fetch('/api/track', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(locationData),
        }).catch((error) => {
          console.error('Gagal mengirim lokasi:', error);
        });
      });
    }
  }, []);

  const getRoleKey = () => {
    if (!isClient || !router.isReady) {
      return headerData?.personal_info?.default_role || 'main';
    }
    const queryKey = Object.keys(router.query)[0];
    const validRoles = Object.keys(headerData.personal_info.roles);
    if (queryKey && validRoles.includes(queryKey)) {
      return queryKey;
    }
    return headerData.personal_info.default_role;
  };

  const selectedRoleKey = getRoleKey();
  const currentRole = headerData?.personal_info?.roles[selectedRoleKey];

  const handleProfileClick = useCallback(() => {
    setShowProfileModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowProfileModal(false);
  }, []);

  if (!siteData || !currentRole || !urlsData || !iconsData || !navigationData) {
    return <div className="flex items-center justify-center min-h-screen" role="status" aria-live="polite">Loading...</div>;
  }
  
  const profileImage = getUrlByKey(currentRole.image_url_key, urlsData);
  const largeProfileImage = getUrlByKey('personal.profile_image_large', urlsData);
  const siteTitle = siteData.settings.title;
  const metaDescription = siteData.settings.meta_description;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: currentRole.name,
    url: siteData.settings.base_url,
    image: profileImage,
    jobTitle: currentRole.title,
    description: currentRole.bio,
  };

  return (
    <div className="flex min-h-screen bg-bg-primary">
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content={currentRole.name} />
        <meta property="og:title" content={siteTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteData.settings.base_url} />
        <meta property="og:image" content={profileImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={siteTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={profileImage} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      {pathname !== '/portfolio' && (
        <Sidebar
          siteData={siteData}
          navigationData={navigationData}
          contentData={contentData}
          isCollapsed={isCollapsed}
          setCollapsed={setCollapsed}
          onProfileClick={handleProfileClick}
          urlsData={urlsData}
          iconsData={iconsData}
          currentRole={currentRole}
          selectedRoleKey={selectedRoleKey} 
        />
      )}

      <div className={`flex-1 flex flex-col ${pathname !== '/portfolio' ? (isCollapsed ? 'lg:ml-20' : 'lg:ml-64') : ''} transition-all duration-300 pb-20 lg:pb-0`}>
        <Header
          siteData={siteData}
          onProfileClick={handleProfileClick}
          urlsData={urlsData}
          iconsData={iconsData}
          currentRole={currentRole}
        />
        <main id="main-content" className="flex-1 px-4 sm:px-8 xl:px-12 pb-fluid-lg">
          {children}
        </main>
        <Footer footerData={footerData} iconsData={iconsData} />
      </div>

      {pathname !== '/portfolio' && (
        <BottomNavbar 
          navigationData={navigationData} 
          contentData={contentData} 
          iconsData={iconsData}
          selectedRoleKey={selectedRoleKey}
        />
      )}

      {showProfileModal && (
        <ProfileModal
          imageUrl={largeProfileImage}
          onClose={handleCloseModal}
          name={currentRole.name}
          ui={siteData.ui_text}
          iconsData={iconsData}
        />
      )}
    </div>
  );
}