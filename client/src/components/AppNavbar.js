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
import image from '../List-PNG.png'
import {logout} from '../actions/authActions';//to logout on reload

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
          <strong>
            {user?<span>
              Welcome, <span style={{color: '#f15440'}}>{user.name}</span>!
            </span> : ''}
            {/* {user? `Welcome, ${user.name}!`: ''}*/}
          </strong>
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
            <img src={image} style={{width: 50, height: 50}} className="mr-3" />
            <span style={{color: '#F15440', textShadow: ' 1px 1px 1px black'}} >Shopping List</span>
          </NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar className="mt-auto">
            <Nav className="ml-auto mt-auto" navbar>
              {isAuthenticated ? authLinks : guestLinks}
              <NavItem>
                <NavLink target="_blink" href="https://ivanjulian.github.io/">
                  <p style={{color: '#f15440'}}>About the Author</p>
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
