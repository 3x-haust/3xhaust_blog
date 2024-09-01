'use client';

import { AiOutlineSearch } from "react-icons/ai";
import { PiSunDimFill } from "react-icons/pi";
import { TbMoonFilled } from "react-icons/tb";
import styled from "styled-components";
import useDarkModeState from "../stores/darkmode";

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: .0625rem solid ${({ theme }) => theme.colors.text};
  padding-left: 1.25rem;
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
  color: ${({ theme }) => theme.colors.text};
`;

const Logo = styled.h1`
  font-size: 1.5em;
  font-weight: 600;
  font-style: italic;
  color: ${({ theme }) => theme.colors.text};
`;

export default function Header() {
  const { isDark, toggleDarkMode } = useDarkModeState();

  return (
    <Nav>
      <Logo>3xhaust.</Logo>
      <NavMenu>
        <Item>
          <AiOutlineSearch size={23} />
        </Item>
        <Item onClick={toggleDarkMode}>
          {isDark ? <PiSunDimFill size={23} /> : <TbMoonFilled size={23} />}
        </Item>
      </NavMenu>
    </Nav>
  );
}