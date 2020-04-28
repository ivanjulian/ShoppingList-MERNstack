import React, { useState, Fragment, useEffect } from 'react';
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
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RegisterModel from '../components/auth/RegisterModel';
import LoginModel from '../components/auth/LoginModel';
import Logout from '../components/auth/Logout';

import {logout} from '../actions/authActions';//to logout on reload, maybe need to delete this

function AppNavbar(props) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(()=>{
    props.logout();
  }, [])

  AppNavbar.propTypes = {
    [props.auth]: PropTypes.object.isRequired
  }

  const toggle = () => {
    setIsOpen(!isOpen);
  }


  const { isAuthenticated, user } = props.auth;
  const authLinks = (
    <Fragment>
      <NavItem>
        <span className="navbar-text mr-3">
          <strong>{user? `Welcome ${user.name}`: ''}</strong>
        </span>
      </NavItem>
      <NavItem>
        <Logout />
      </NavItem>
    </Fragment>
  )

  const guestLinks = (
    <Fragment>
      <NavItem>
        <LoginModel />
      </NavItem>
      <NavItem>
        <RegisterModel />
      </NavItem>
    </Fragment>
  )
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
              {isAuthenticated ? authLinks : guestLinks}
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

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps, {logout})(AppNavbar);
