import React from 'react';
import styled from 'styled-components';
import media from "@/lib/styles/Media";

interface HeadingItem {
  id: string;
  level: number;
  text: string;
}

const SidebarContainer = styled.div`
  position: fixed;
  top: 10rem;
  right: 0;
  width: 240px;
  max-height: calc(-128px + 100vh);
  padding: 0.25rem 1rem;
  background-color: var(--color-background);
  color: var(--color-sidebar-text);
  border-left: 2px solid var(--color-sidebar);
  overflow-y: auto;

  ${media.medium} {
    display: none;
  }
`;

const SidebarList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const SidebarItem = styled.li<{ level: number }>`
  margin-bottom: 0.4rem;
  cursor: pointer;
  font-size: 0.875rem;
  margin-left: ${props => `${(props.level - 1) * 1}rem`};
  
  &.active {
    color: var(--color-text);
  }

  &:hover {
    color: var(--color-text);
  }
`;

const Sidebar: React.FC<{ headings: HeadingItem[] }> = ({ headings }) => {
  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    const headerHeight = document.querySelector('nav')?.offsetHeight || 0; 

    if (element) {
      window.scrollTo({
        top: element.offsetTop - (headerHeight + 10),
        behavior: 'smooth',
      });
    }
  }

  return (
    <SidebarContainer>
      <SidebarList>
        {headings.map((heading, index) => (
          <SidebarItem
            key={index}
            level={heading.level}
            data-id={heading.id}
            onClick={() => scrollToHeading(heading.id)}
          >
            {heading.text}
          </SidebarItem>
        ))}
      </SidebarList>
    </SidebarContainer>
  );
};

export default Sidebar;