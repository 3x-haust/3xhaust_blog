'use client';

import { AiOutlineSearch } from "react-icons/ai";
import { PiSunDimFill } from "react-icons/pi";
import { TbMoonFilled } from "react-icons/tb";
import styled from "styled-components";
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: .0625rem solid var(--color-text);
  padding-left: 1.25rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: rgba(var(--color-background), 0.8);
  backdrop-filter: blur(10px);
  z-index: 10px;
`;

const NavMenu = styled.ul`
  list-style: none;
  display: flex;
  margin: 0;
  padding-left: 0;
`;

const Item = styled.li`
  padding: 0rem 1.25rem;
  cursor: pointer;
  color: var(--color-text);
  user-select: none;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const Logo = styled.h1`
  font-size: 1.5em;
  font-weight: 600;
  font-style: italic;
  color: var(--color-text);
  user-select: none;
  &:hover {
    text-decoration: underline;
  }
`;

export default function Header() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Nav>
      <StyledLink href='/'><Logo>3xhaust.</Logo></StyledLink>
      <NavMenu>
        <Item>
          <AiOutlineSearch size={23} />
        </Item>
        <Item onClick={() => setTheme(resolvedTheme === 'light' ? 'dark' : 'light')}>
          {resolvedTheme === 'dark' ? <PiSunDimFill size={23} /> : <TbMoonFilled size={23} />}
        </Item>
      </NavMenu>
    </Nav>
  );
}