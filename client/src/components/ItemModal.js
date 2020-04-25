import React, { useState } from 'react';
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
import {connect} from 'react-redux';
import {addItem} from '../actions/itemActions'
import { model } from 'mongoose';

function ItemModal() {
  const [modal, setModal] = useState({
    modalIsOpen: false,
    name: ''
  })

  const toggle = () => {
    setModal({
      modalIsOpen: !modal.modalIsOpen,
      name: ''
    })
    console.log('TOggle did');
  }

  const onChange = e =>{
    setModal({
      [e.target.name]: e.target.value 
    })
  }
  return (
    <div>
      <Button
        color="dark"
        style={{marginBottom: '2rem'}}
        onClick={toggle}
      >Add Item</Button>

    <Modal
      isOpen={modal.modalIsOpen}
      toggle={toggle}
    >
      <ModalHeader toggle={toggle}> Add to Shopping List </ModalHeader>
      <ModalBody>
        <Form /*onSubmit={onSubmit}*/>
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
          </FormGroup>
        </Form>
      </ModalBody>
    </Modal>
    </div>

  )
}

export default connect()(ItemModal);
