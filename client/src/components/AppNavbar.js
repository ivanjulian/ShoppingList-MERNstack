import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container
} from 'reactstrap';
import RegisterModel from '../components/auth/RegisterModel';
import LoginModel from '../components/auth/LoginModel'
import Logout from '../components/auth/Logout'

function AppNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  }
  return (
    <div>
      <Navbar color="dark" dark expand="sm" className="mb-5">
        <Container>
          <NavbarBrand href="/">
            Shopping List
          </NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar >
            <Nav className="ml-auto" navbar>
              <NavItem>
                <LoginModel />
              </NavItem>
              <NavItem>
                <RegisterModel />
              </NavItem>
              <NavItem>
                <Logout/>
              </NavItem>
              <NavItem>
                <NavLink href="https://ivanjulian.github.io/">
                  About the Author
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

export default AppNavbar
