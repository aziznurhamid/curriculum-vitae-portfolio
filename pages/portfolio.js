import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Section from '../components/Section';
import ProjectCard from '../components/ProjectCard';
import { getUrlByKey } from '../utils/urlUtils';
import { loadAllData } from '../utils/dataLoader';

export default function PortfolioPage({ portfolioData, siteData, headerData, urlsData }) {
  const router = useRouter();

  // --- PERBAIKAN HYDRATION ERROR DIMULAI ---
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
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
  // --- PERBAIKAN HYDRATION ERROR SELESAI ---

  const ui = portfolioData.ui_text;
  const siteTitle = headerData.personal_info.roles[selectedRoleKey].name;
  const faviconUrl = getUrlByKey(siteData.settings.favicon_url_key, urlsData);
  
  const metaDescription = ui.meta_description.replace('%s', siteTitle);
  const canonicalUrl = `${siteData.settings.base_url}/portfolio${selectedRoleKey !== 'main' ? `?${selectedRoleKey}` : ''}`;
  
  const isMainRole = selectedRoleKey === 'main';
  const filteredProjects = portfolioData.projects.filter(project =>
    isMainRole || !project.roles || project.roles.length === 0 || project.roles.includes(selectedRoleKey)
  );

  const lcpImageUrl = filteredProjects.length > 0 ? filteredProjects[0].image : '';

  return (
    <>
      <Head>
        <title>{ui.page_title} | {siteTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href={faviconUrl} />
        {lcpImageUrl && <link rel="preload" href={lcpImageUrl} as="image" fetchPriority="high" />}
        <link rel="canonical" href={canonicalUrl} />
      </Head>

      <Section id="portfolio" >
        <div className="text-center">
            <h1 className="text-fluid-3xl font-bold">{ui.page_title}</h1>
            <p className="text-fluid-lg text-text-secondary mt-2 mb-12">{ui.page_subtitle}</p>
        </div>

        {filteredProjects.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
            {filteredProjects.map((project, i) => (
              <ProjectCard
                key={project.title}
                project={project}
                ui={ui}
                urlsData={urlsData}
                isFirst={i === 0}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-text-secondary">Tidak ada proyek yang tersedia untuk peran ini.</p>
        )}
      </Section>
    </>
  );
}

export async function getStaticProps() {
  const allData = loadAllData();
  return {
    props: {
      ...allData,
    }
  };
}