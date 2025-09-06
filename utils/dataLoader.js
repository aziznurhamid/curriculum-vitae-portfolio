import fs from 'fs';
import path from 'path';

const readDataFile = (filename) => {
  const filePath = path.join(process.cwd(), 'data', filename);
  const fileContent = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(fileContent);
};

export const loadAllData = () => {
  const siteData = readDataFile('site.json');
  const headerData = readDataFile('header.json');
  const navigationData = readDataFile('navigation.json');
  const contentData = readDataFile('content.json');
  const footerData = readDataFile('footer.json');
  const portfolioData = readDataFile('portfolio.json');
  const urlsData = readDataFile('urls.json');
  const iconsData = readDataFile('icons.json');

  return {
    siteData,
    headerData,
    navigationData,
    contentData,
    footerData,
    portfolioData,
    urlsData,
    iconsData,
  };
};