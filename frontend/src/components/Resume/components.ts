import styled from 'styled-components';

export const Container = styled.div`
  width: 210mm;
  min-height: 297mm;
  background: var(--white, #FFFFFF);
  box-shadow: 0 0 25px rgba(0,0,0,0.1);
  display: grid;
  grid-template-columns: 32% 68%;
  
  @media print {
    box-shadow: none;
    margin: 0;
    width: 100%;
  }
`;

export const BrowserSpacer = styled.div`
  grid-column: 1 / -1;
  height: 50px;
  background: var(--white, #FFFFFF);
  
  &.no-print {
    @media print {
      display: none !important;
    }
  }
`;

export const Sidebar = styled.aside`
  background-color: var(--sidebar-bg, #FFFFFF);
  color: var(--sidebar-text, #171D26);
  padding: 0 25px 30px 25px;
`;

export const ProfileImage = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin: 0 auto 25px;
  overflow: hidden;
  border: 4px solid var(--accent-color);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 800;
  font-size: 1em;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const SectionTitleSidebar = styled.h3`
  color: var(--accent-color);
  text-transform: uppercase;
  letter-spacing: 1.5px;
  margin-bottom: 12px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 5px;
  font-size: 0.75rem;
  font-weight: 800;
  margin-top: 30px;
`;

export const ContactInfo = styled.div`
  font-size: x-small;
  font-weight: 300;
`;

export const ContactItem = styled.div`
  margin-bottom: 6px;
  display: flex;
  align-items: center;
  word-break: break-word;
  line-height: 1.3;
  
  .contact-icon {
    margin-right: 8px;
    min-width: 16px;
    font-size: 1.1em;
  }
`;

export const TagCloud = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

export const Tag = styled.span`
  background: #f4f4f4;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 0.75em;
  border: 1px solid #e0e0e0;
  display: inline-block;
  font-weight: 350;
`;

export const SkillGroup = styled.div``;

export const SkillItem = styled.div`
  margin-bottom: 8px;
  break-inside: avoid;
`;

export const SkillHeader = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.75em;
  margin-bottom: 3px;
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 5px;
  background: #eee;
  border-radius: 2px;
  margin-top: 2px;
`;

export const ProgressFill = styled.div<{ $level: string }>`
  height: 100%;
  background: var(--accent-color);
  border-radius: 2px;
  width: ${props => props.$level};
`;

export const MainContent = styled.main`
  padding: 0 40px 35px 40px;
`;

export const Header = styled.header`
  margin-bottom: 5px;
  
  h1 {
    line-height: 0.9;
    margin-bottom: 5px;
  }
`;

export const HeaderFirstName = styled.span`
  font-size: 2.4em;
  text-transform: uppercase;
  color: var(--primary-color);
  font-weight: 500;
  letter-spacing: -0.5px;
`;

export const HeaderLastName = styled(HeaderFirstName)`
  font-weight: 900;
`;

export const HeaderLabel = styled.h2`
  font-size: 1.1em;
  color: var(--accent-color);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  margin-top: 5px;
`;

export const ProfileSummary = styled.section`
  margin-bottom: 35px;
  color: var(--light-text, #555);
  background: rgba(0,0,0, 0.03);
  padding: 20px;
  border-left: 4px solid var(--accent-color);
  font-family: 'Merriweather', serif;
  font-style: italic;
  font-size: 0.85em;
  line-height: 1.6;
`;

export const SectionTitleMain = styled.h3`
  font-size: 1em;
  color: var(--primary-color);
  border-bottom: 3px solid var(--primary-color);
  padding-bottom: 8px;
  margin-bottom: 30px;
  text-transform: uppercase;
  font-weight: 800;
  letter-spacing: 2px;
  margin-top: 10px;
`;

export const CardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export const JobCard = styled.article`
  margin-bottom: 25px;
  position: relative;
  padding-left: 18px;
  border-left: 1px solid #eee;
  break-inside: avoid;
  page-break-inside: avoid;

  &::before {
    content: '';
    position: absolute;
    left: -5px;
    top: 6px;
    width: 9px;
    height: 9px;
    background: var(--accent-color);
    border-radius: 50%;
  }
`;

export const JobRole = styled.div`
  font-weight: 900;
  color: var(--primary-color);
  text-transform: uppercase;
  font-size: 0.75em;
  margin-bottom: 2px;
`;

export const JobMeta = styled.div`
  font-weight: 350;
  color: #666;
  font-size: 0.65em;
`;

export const TechStack = styled.span`
  font-size: 0.65em;
  color: var(--accent-color);
  font-weight: 800;
  text-transform: uppercase;
  display: block;
  margin-bottom: 8px;
  letter-spacing: 0.5px;
`;

export const JobTasks = styled.div`
  font-family: var(--font-secondary);
  font-weight: 400;
  font-size: 0.75em;
  line-height: normal;
  color: #333;
`;

export const CompanySize = styled.div`
  font-size: 0.65em;
  color: #aaa;
  font-style: italic;
`;
