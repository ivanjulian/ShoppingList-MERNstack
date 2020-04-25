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
import { model, PromiseProvider } from 'mongoose';
//import {v4 as uuid} from 'uuid';

function ItemModal(props) {
  const [modal, setModal] = useState({
    modalIsOpen: false,
    name: ''
  })

  const toggle = () => {
    setModal({
      ...modal,
      modalIsOpen: !modal.modalIsOpen
    })
    // console.log('TOggle did');
  }

  const onChange = e =>{
   // e.preventDefault();
    setModal({
      ...modal,
      name: e.target.value 
      // [e.target.name]: e.target.value 
    })
  }

  const onSubmit = e =>{
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
              style={{marginTop: '2rem'}}
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
  item: state.item
})
export default connect(mapStateToProps, {addItem})(ItemModal);
