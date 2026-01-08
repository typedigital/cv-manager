import React, { forwardRef } from 'react';
import type { CVData } from '../../types'; // Pfad ggf. anpassen
import {
  Container,
  BrowserSpacer,
  Sidebar,
  ProfileImage,
  SectionTitleSidebar,
  ContactInfo,
  ContactItem,
  TagCloud,
  Tag,
  SkillGroup,
  SkillItem,
  SkillHeader,
  ProgressBar,
  ProgressFill,
  MainContent,
  Header,
  HeaderFirstName,
  HeaderLastName,
  HeaderLabel,
  ProfileSummary,
  SectionTitleMain,
  CardList,
  JobCard,
  JobRole,
  JobMeta,
  TechStack,
  JobTasks,
  CompanySize
} from './components';

interface ResumeProps {
  data: CVData;
}

export const Resume = forwardRef<HTMLDivElement, ResumeProps>(({ data }, ref) => {
  const { basics, skills, work, education, style } = data;

  const customStyles = {
    '--primary-color': style?.colors?.primary || '#171D26',
    '--accent-color': style?.colors?.accent || '#FF5959',
    '--sidebar-bg': style?.colors?.background || '#FFFFFF',
    '--bg-color': style?.colors?.secondaryBackground || '#E3E5E5',
  } as React.CSSProperties;

  return (
    <Container ref={ref} style={customStyles}>
      <BrowserSpacer className="no-print" />

      <Sidebar>
        <ProfileImage>
            {basics.image && !basics.image.includes('path/to') ? (
                <img src={basics.image} alt={basics.name.first} />
            ) : (
                <span>{basics.name.first.charAt(0)}</span>
            )}
        </ProfileImage>

        <SectionTitleSidebar>Kontakt</SectionTitleSidebar>
        <ContactInfo>
          <ContactItem><div className='contact-icon'>✉️</div> {basics.email}</ContactItem>
          <ContactItem><div className='contact-icon'>🌐</div>{basics.website}</ContactItem>
          <ContactItem><div className='contact-icon'>📍</div> {basics.location.address}, {basics.location.city}</ContactItem>
        </ContactInfo>

        {skills.map((cat, idx) => (
            <div key={idx}>
                <SectionTitleSidebar>{cat.category}</SectionTitleSidebar>
                {cat.category.includes('Tools') || cat.category.includes('Programme') ? (
                    <TagCloud>
                        {cat.items.map((item, i) => <Tag key={i}>{item.name}</Tag>)}
                    </TagCloud>
                ) : (
                    <SkillGroup>
                        {cat.items.map((item, i) => (
                            <SkillItem key={i}>
                                <SkillHeader>
                                    <span>{item.name}</span><span>{item.level}</span>
                                </SkillHeader>
                                {item.level && (
                                    <ProgressBar>
                                        <ProgressFill $level={item.level} />
                                    </ProgressBar>
                                )}
                            </SkillItem>
                        ))}
                    </SkillGroup>
                )}
            </div>
        ))}
      </Sidebar>

      <MainContent>
        <Header>
          <h1>
            <HeaderFirstName>{basics.name.first} </HeaderFirstName>
            <HeaderLastName>{basics.name.last}</HeaderLastName>
          </h1>
          <HeaderLabel>{basics.label}</HeaderLabel>
        </Header>

        <ProfileSummary>
          <p>{basics.summary}</p>
        </ProfileSummary>

        <section>
          <SectionTitleMain>Projekterfahrung</SectionTitleMain>
          <CardList>
          {work.map((job, idx) => (
            <JobCard key={idx}>
              <JobRole>{job.position}</JobRole>
              <JobMeta>
                  {job.company} / {job.location} | {job.startDate} - {job.current ? 'heute' : job.endDate}
              </JobMeta>
              {job.techStack && (
                  <TechStack>{job.techStack.join(', ')}</TechStack>
              )}
              <JobTasks>{job.summary}</JobTasks>
              {job.companySize && <CompanySize>Unternehmensgröße: {job.companySize}</CompanySize>}
            </JobCard>
          ))}
          </CardList>
        </section>

        <section>
          <SectionTitleMain>Ausbildung</SectionTitleMain>
          {education.map((edu, idx) => (
            <JobCard key={idx}>
              <JobRole>{edu.studyType} - {edu.area}</JobRole>
              <JobMeta>{edu.institution}</JobMeta>
              <JobTasks>{edu.summary}</JobTasks>
            </JobCard>
          ))}
        </section>
      </MainContent>
    </Container>
  );
});