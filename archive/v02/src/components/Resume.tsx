import React, { forwardRef } from 'react';
import type { CVData } from '../types';

interface ResumeProps {
  data: CVData;
}

// forwardRef wird benötigt, damit wir von App.tsx auf das DOM-Element zugreifen können (für PDF)
export const Resume = forwardRef<HTMLDivElement, ResumeProps>(({ data }, ref) => {
  const { basics, skills, work, education, style } = data;

  // Dynamische Styles aus JSON extrahieren
  const customStyles = {
    '--primary-color': style?.colors?.primary || '#171D26',
    '--accent-color': style?.colors?.accent || '#FF5959',
    '--sidebar-bg': style?.colors?.background || '#FFFFFF',
    '--bg-color': style?.colors?.secondaryBackground || '#E3E5E5',
  } as React.CSSProperties;

  return (
    <div ref={ref} className="container" style={customStyles}>
      {/* Spacer für Browser-Ansicht */}
      <div id="browserSpacer" style={{ gridColumn: '1 / -1', height: '50px', background: 'var(--white)' }} className="no-print"></div>

      {/* --- SIDEBAR --- */}
      <aside className="cv-sidebar">
        <div className="profile-img">
            {basics.image && !basics.image.includes('path/to') ? (
                <img src={basics.image} alt={basics.name.first} />
            ) : (
                <span>{basics.name.first.charAt(0)}</span>
            )}
        </div>

        <h3 className="section-title-sidebar">Kontakt</h3>
        <div className="contact-info">
          <div className="contact-item"><div className='contact-icon'>✉️</div> {basics.email}</div>
          <div className="contact-item"><div className='contact-icon'>🌐</div>{basics.website}</div>
          <div className="contact-item"><div className='contact-icon'>📍</div> {basics.location.address}, {basics.location.city}</div>
        </div>

        {skills.map((cat, idx) => (
            <div key={idx}>
                <h3 className="section-title-sidebar">{cat.category}</h3>
                {/* Check ob es "Tools" (Tags) oder "Skills" (Bars) sind */}
                {cat.category.includes('Tools') || cat.category.includes('Programme') ? (
                    <div className="tag-cloud">
                        {cat.items.map((item, i) => <span key={i} className="tag">{item.name}</span>)}
                    </div>
                ) : (
                    <div className="skill-group">
                        {cat.items.map((item, i) => (
                            <div className="skill-item" key={i}>
                                <div style={{display:'flex', justifyContent:'space-between', fontSize:'0.75em', marginBottom:'3px'}}>
                                    <span>{item.name}</span><span>{item.level}</span>
                                </div>
                                {item.level && (
                                    <div className="progress-bar">
                                        <div className="progress-fill" style={{ width: item.level }}></div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        ))}
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="main-content">
        <header className="header-name">
          <h1>
            <span className="header-first-name">{basics.name.first} </span>
            <span className="header-last-name">{basics.name.last}</span>
          </h1>
          <h2 className="header-company">{basics.label}</h2>
        </header>

        <section className="profile-summary" style={{
             marginBottom: '35px', color: 'var(--light-text)',
             background: 'rgba(0,0,0, 0.03)', padding: '20px',
             borderLeft: '4px solid var(--accent-color)',
             fontFamily: 'Merriweather, serif', fontStyle: 'italic', fontSize: '0.85em'
        }}>
          <p>{basics.summary}</p>
        </section>

        <section>
          <h3 className="section-title-main">Projekterfahrung</h3>
          <div className="card-list">
          {work.map((job, idx) => (
            <article key={idx} className="job-card">
              <div className="job-role">{job.position}</div>
              <div className="job-meta">
                  {job.company} / {job.location} | {job.startDate} - {job.current ? 'heute' : job.endDate}
              </div>
              {job.techStack && (
                  <span className="tech-stack-inline">{job.techStack.join(', ')}</span>
              )}
              <div className="job-tasks">{job.summary}</div>
              {job.companySize && <div className="company-size">Unternehmensgröße: {job.companySize}</div>}
            </article>
          ))}
          </div>
        </section>

        <section>
          <h3 className="section-title-main">Ausbildung</h3>
          {education.map((edu, idx) => (
            <article key={idx} className="job-card">
              <div className="job-role">{edu.studyType} - {edu.area}</div>
              <div className="job-meta">{edu.institution}</div>
              <div className="job-tasks">{edu.summary}</div>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
});