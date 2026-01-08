import React from 'react';
import type { CVData } from '../types';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  cvList: { file: string; data: CVData }[];
  onSelect: (data: CVData) => void;
  activeCVName?: CVData['basics']['name'];
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen, cvList, onSelect, activeCVName }) => {
  return (
    <nav style={{
      position: 'fixed', left: isOpen ? 0 : '-300px', top: 0, width: '280px', height: '100%',
      background: '#2c3e50', color: 'white', transition: 'left 0.3s ease', zIndex: 2000,
      display: 'flex', flexDirection: 'column', boxShadow: '2px 0 10px rgba(0,0,0,0.3)'
    }}>
      <div style={{ padding: '20px', background: 'rgba(0,0,0,0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3>CV Auswahl</h3>
        <span style={{ cursor: 'pointer' }} onClick={() => setIsOpen(false)}>✖</span>
      </div>
      <ul style={{ listStyle: 'none', overflowY: 'auto', flex: 1, padding: 0 }}>
        {cvList.map((item, index) => (
          <li
            key={index}
            onClick={() => {
              onSelect(item.data);
              if (window.innerWidth < 800) setIsOpen(false);
            }}
            style={{
              padding: '15px 20px', borderBottom: '1px solid rgba(255,255,255,0.05)', cursor: 'pointer',
              background: activeCVName?.first === item.data.basics.name.first ? 'rgba(0,0,0,0.2)' : 'transparent',
              borderLeft: activeCVName?.first === item.data.basics.name.first ? '4px solid #FF5959' : 'none'
            }}
          >
            <span style={{ display: 'block', fontWeight: 700 }}>{item.data.basics.name.first} {item.data.basics.name.last}</span>
            <span style={{ display: 'block', fontSize: '0.8em', opacity: 0.7 }}>{item.data.basics.label}</span>
          </li>
        ))}
      </ul>
    </nav>
  );
};