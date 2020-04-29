import React, { useState, useEffect } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import { connect } from 'react-redux';
import { addItem } from '../actions/itemActions'
import { model, PromiseProvider } from 'mongoose';
import PropTypes from 'prop-types';
//import {v4 as uuid} from 'uuid';

function ItemModal(props) {
  const [modal, setModal] = useState({
    modalIsOpen: false,
    name: ''
  })

  // useEffect(()=>{

  // }, [props.isAuthenticated])
  console.log(props);
  ItemModal.propTypes = {
    [props.isAuthenticated]: PropTypes.bool
  }

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

    const newItem = {
      //id: uuid(),
      name: modal.name
    }

    //Add item via addItem action
    props.addItem(newItem);

    //Close modal
    toggle();
  }
  return (
    <div>
      {props.isAuthenticated
        ? <Button
          color="dark"
          style={{ marginBottom: '2rem' }}
          onClick={toggle}
        >Add Item</Button>
        : <h4 className="mb-3 ml-4">Please Log in to manage items</h4>
      }


      <Modal
        isOpen={modal.modalIsOpen}
        toggle={toggle}
      >
        <ModalHeader toggle={toggle}> Add to Shopping List </ModalHeader>
        <ModalBody>
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="item">
                Item
            </Label>

              <Input
                type="text"
                name={model.name}
                id="item"
                placeholder="Add Shopping Item"
                onChange={onChange}
              />
              <Button
                color="dark"
                style={{ marginTop: '2rem' }}
                //type="submit"
                block
              > Add Item</Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>

  )
}
const mapStateToProps = state => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated
})
export default connect(mapStateToProps, { addItem })(ItemModal);
