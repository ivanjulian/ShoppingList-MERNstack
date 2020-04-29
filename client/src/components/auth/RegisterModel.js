import React, { useState, useEffect } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  Alert
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions'

function RegisterModal(props) {
  const [modal, setModal] = useState({
    modalIsOpen: false,
    name: '',
    email: '',
    password: '',
    msg: null
  })

  RegisterModal.propTypes = {
    [props.isAuthenticated]: PropTypes.bool,
    [props.error]: PropTypes.object.isRequired,
    [props.register]: PropTypes.func.isRequired,
    [props.clearErrors]: PropTypes.func.isRequired
  }

  useEffect(() => {
    if (props.error.id == 'REGISTER_FAIL') {
      setModal({
        ...modal,
        msg: props.error.msg.msg
      })
    } else {
      setModal({
        ...modal,
        msg: null
      })
    }

    //If authenticated - close modal
    if (modal.modalIsOpen) {
      if (props.isAuthenticated) {
        toggle();
      }
    }
  }, [props.error, props.isAuthenticated])

  const toggle = () => {
    //Clear errors
    props.clearErrors();

    setModal({
      ...modal,
      modalIsOpen: !modal.modalIsOpen
    })
  }

  const onChange = e => {
    setModal({
      ...modal,
      [e.target.id]: e.target.value
    })
  }

  const onSubmit = e => {
    e.preventDefault();


    const newUser = {
      name: modal.name,
      email: modal.email,
      password: modal.password
    }

    //Attempt to register
    props.register(newUser);
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
        <ModalHeader toggle={toggle}> 
          <span style={{ color: '#F15440',textShadow: '1px 1px 2px #CCCECF'}}>Register</span>
        </ModalHeader>
        <ModalBody>
          {modal.msg ? <Alert color="danger">{modal.msg}</Alert> : null}
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
export default connect(mapStateToProps, { register, clearErrors })(RegisterModal);
