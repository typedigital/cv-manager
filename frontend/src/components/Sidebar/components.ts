import styled from 'styled-components';

export const Nav = styled.nav<{ $isOpen: boolean }>`
  position: fixed;
  left: ${props => props.$isOpen ? '0' : '-300px'};
  top: 0;
  width: 280px;
  height: 100%;
  background: #2c3e50;
  color: white;
  transition: left 0.3s ease;
  z-index: 2000;
  display: flex;
  flex-direction: column;
  box-shadow: 2px 0 10px rgba(0,0,0,0.3);
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

export const Header = styled.div`
  padding: 20px;
  background: rgba(0,0,0,0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CloseButton = styled.span`
  cursor: pointer;
  font-weight: bold;
  
  &:hover {
    opacity: 0.8;
  }
`;

export const CVList = styled.ul`
  list-style: none;
  overflow-y: auto;
  flex: 1;
  padding: 0;
  margin: 0;
`;

export const ListItem = styled.li<{ $active: boolean }>`
  padding: 15px 20px;
  border-bottom: 1px solid rgba(255,255,255,0.05);
  cursor: pointer;
  background: ${props => props.$active ? 'rgba(0,0,0,0.2)' : 'transparent'};
  border-left: ${props => props.$active ? '4px solid #FF5959' : 'none'};
  transition: background 0.2s;

  &:hover {
    background: rgba(255,255,255,0.1);
  }
`;

export const CVName = styled.span`
  display: block;
  font-weight: 700;
`;

export const CVLabel = styled.span`
  display: block;
  font-size: 0.8em;
  opacity: 0.7;
`;

export const LogoutButton = styled.button`
  margin: 5%;
  background-color: #666;
  font-size: 0.9em;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #555;
  }
`;
