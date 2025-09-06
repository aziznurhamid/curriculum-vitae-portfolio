import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Section from '../components/Section';
import TimelineItem from '../components/TimelineItem';
import Skill from '../components/Skill';
import { getUrlByKey } from '../utils/urlUtils';
import { loadAllData } from '../utils/dataLoader';

export default function HomePage({ siteData, headerData, contentData, portfolioData, urlsData }) {
  const router = useRouter();
  
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
  
  const currentRole = headerData.personal_info.roles[selectedRoleKey];
  const ui = contentData.ui_text;
  const faviconUrl = getUrlByKey(siteData.settings.favicon_url_key, urlsData);
  const lcpImageUrl = getUrlByKey(currentRole.image_url_key, urlsData);
  const canonicalUrl = `${siteData.settings.base_url}${selectedRoleKey !== 'main' ? `/?${selectedRoleKey}` : ''}`;
  
  const isMainRole = selectedRoleKey === 'main';

  const filteredExperience = contentData.experience.filter(item => 
    isMainRole || !item.roles || item.roles.length === 0 || item.roles.includes(selectedRoleKey)
  );
  
  const filteredSkills = contentData.skills.filter(item => 
    isMainRole || (item.roles && item.roles.includes(selectedRoleKey))
  );

  const filteredCertifications = contentData.certifications.filter(item => 
    isMainRole || !item.roles || item.roles.length === 0 || item.roles.includes(selectedRoleKey)
  );
  const filteredProjects = portfolioData.projects.filter(project =>
    isMainRole || !project.roles || project.roles.length === 0 || project.roles.includes(selectedRoleKey)
  );

  return (
    <>
      <Head>
        <title>{siteData.settings.title}</title>
        <meta name="description" content={siteData.settings.meta_description} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href={faviconUrl} />
        <link rel="preload" href={lcpImageUrl} as="image" fetchPriority="high" />
        <link rel="canonical" href={canonicalUrl} />
      </Head>

      <Section id="home">
        <div className="text-center">
          <h1 className="text-fluid-3xl font-bold text-text-primary">{currentRole.name}</h1>
          <p className="text-fluid-xl text-primary mt-2">{currentRole.title}</p>
          <p className="mx-auto mt-4 text-text-secondary text-fluid-base">{currentRole.bio}</p>
        </div>
      </Section>

      {filteredExperience.length > 0 && (
        <Section id="experience" title={ui.experience_title}>
          <div className="mx-auto grid gap-8">{filteredExperience.map((item, i) => <TimelineItem key={i} item={item} />)}</div>
        </Section>
      )}

      <Section id="education" title={ui.education_title}>
        <div className="mx-auto grid gap-8">{contentData.education.map((item, i) => <TimelineItem key={i} item={item} />)}</div>
      </Section>

      {filteredSkills.length > 0 && (
        <Section id="skills" title={ui.skills_title}>
          <div className="grid md:grid-cols-2 gap-8 mx-auto">
            {filteredSkills.map((item, i) => (
              <Skill key={i} skill={item} urlsData={urlsData} />
            ))}
          </div>
        </Section>
      )}

      {filteredCertifications.length > 0 && (
        <Section id="certifications" title={ui.certifications_title}>
          <div className="grid md:grid-cols-2 gap-6 mx-auto">
            {filteredCertifications.map((cert, i) => (
              <a 
                href={getUrlByKey(cert.url_key, urlsData)} 
                key={i} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="block p-fluid-base bg-surface rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all"
                title={`Lihat Sertifikat: ${cert.name}`}
              >
                <h4 className="font-bold text-text-primary text-fluid-base">{cert.name}</h4>
                <p className="text-fluid-sm text-text-secondary">{cert.issuer}</p>
              </a>
            ))}
          </div>
        </Section>
      )}

      {filteredProjects.length > 0 && (
        <section className="py-fluid-lg text-center bg-surface border-y border-border no-print">
          <h2 className="text-fluid-2xl font-bold mb-4">{ui.portfolio_summary_title}</h2>
          <Link href={selectedRoleKey !== 'main' ? `/portfolio?${selectedRoleKey}` : "/portfolio"} className="inline-block bg-primary text-white font-bold py-3 px-8 rounded-full transition-opacity hover:opacity-90 text-fluid-base">
            {ui.portfolio_summary_button}
          </Link>
        </section>
      )}
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