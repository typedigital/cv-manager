import React from 'react';
import type { CVData } from '../../types'; // Pfad ggf. anpassen
import {
  Nav,
  Wrapper,
  Header,
  CloseButton,
  CVList,
  ListItem,
  CVName,
  CVLabel,
  LogoutButton,
  AdminLink,
} from './components';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  cvList: { file: string; data: CVData }[];
  onSelect: (data: CVData) => void;
  activeCVName?: CVData['basics']['name'];
  onLogout: () => void;
  isStaff: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  setIsOpen,
  cvList,
  onSelect,
  activeCVName,
  onLogout,
  isStaff,
}) => {
  return (
    <Nav $isOpen={isOpen}>
      <Wrapper>
        <Header>
          <h3>CV Auswahl</h3>
          <CloseButton onClick={() => setIsOpen(false)}>✖</CloseButton>
        </Header>

        <CVList>
          {cvList.map((item, index) => (
            <ListItem
              key={index}
              $active={activeCVName?.first === item.data.basics.name.first}
              onClick={() => {
                onSelect(item.data);
                if (window.innerWidth < 800) setIsOpen(false);
              }}
            >
              <CVName>{item.data.basics.name.first} {item.data.basics.name.last}</CVName>
              <CVLabel>{item.data.basics.label}</CVLabel>
            </ListItem>
          ))}
        </CVList>

        {isStaff && <AdminLink href="/admin/">Admin</AdminLink>}
        <LogoutButton onClick={onLogout}>Abmelden</LogoutButton>
      </Wrapper>
    </Nav>
  );
};