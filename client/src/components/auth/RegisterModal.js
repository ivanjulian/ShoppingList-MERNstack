import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink
} from 'reactstrap';
import { connect } from 'react-redux';
// import { model, PromiseProvider } from 'mongoose';
import PropTypes from 'prop-types';
import {register} from '../../actions/authActions';

function RegisterModal(props) {
  const [modal, setModal] = useState({
    modalIsOpen: false,
    name: '',
    email: '',
    password: '',
    msg: null
  })

  // const propTypes = {
  //   [props.isAuthenticated]: PropTypes.bool,
  //   [props.error]: PropTypes.object.isRequired,
  //   [props.register]: PropTypes.func.isRequired
  // }

  const toggle = () => {
    setModal({
      ...modal,
      modalIsOpen: !modal.modalIsOpen
    })
    // console.log('TOggle did');
  }

  const onChange = e => {
    // e.preventDefault();
    setModal({
      ...modal,
      name: e.target.value
      // [e.target.name]: e.target.value 
    })
  }

  const onSubmit = e => {
    e.preventDefault();

    // const newItem = {
    //   //id: uuid(),
    //   name: modal.name
    // }

    // //Add item via addItem action
    // props.addItem(newItem);
    // const {name, email, password} = modal;

    const newUser ={
      name: modal.name,
      email: modal.email,
      password: modal.password
    } 

    //Attempt to register
    props.register(newUser);

    //Close modal
    // toggle();
  }
  return (
    <div>
      <NavLink onClick={toggle} href="#">
        Register
      </NavLink>

      <Modal
        isOpen={modal.modalIsOpen}
        toggle={toggle}
      >
        <ModalHeader toggle={toggle}> Register </ModalHeader>
        <ModalBody>
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="name">
                Name
            </Label>

              <Input
                type="text"
                name={modal.name}
                id="name"
                placeholder="Name"
                className="mb-3"
                onChange={onChange}
              />

              <Label for="email">
                Email
            </Label>

              <Input
                type="email"
                name={modal.email}
                id="email"
                placeholder="Email"
                className="mb-3"
                onChange={onChange}
              />

              <Label for="password">
                Password
            </Label>

              <Input
                type="password"
                name={modal.password}
                id="password"
                placeholder="Password"
                className="mb-3"
                onChange={onChange}
              />

              <Button
                color="dark"
                style={{ marginTop: '2rem' }}
                //type="submit"
                block
              > Register</Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>

  )
}
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
})
export default connect(mapStateToProps, {register})(RegisterModal);
