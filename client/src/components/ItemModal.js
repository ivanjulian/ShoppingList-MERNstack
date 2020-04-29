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
import { connect } from 'react-redux';
import { addItem } from '../actions/itemActions'
import PropTypes from 'prop-types';

function ItemModal(props) {
  const [modal, setModal] = useState({
    modalIsOpen: false,
    name: ''
  })

  console.log(props);
  ItemModal.propTypes = {
    [props.isAuthenticated]: PropTypes.bool
  }

  const toggle = () => {
    setModal({
      ...modal,
      modalIsOpen: !modal.modalIsOpen
    })
  }

  const onChange = e => {
    setModal({
      ...modal,
      name: e.target.value
    })
  }

  const onSubmit = e => {
    e.preventDefault();

    const newItem = {
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
        : <h3
          className="mb-3 ml-4"
          style={{
            color: '#F15440',
            textAlign: 'center',
            textShadow: ' 1px 1px 2px #CCCECF'
          }}>
          Please, login to manage items
        </h3>
      }


      <Modal
        isOpen={modal.modalIsOpen}
        toggle={toggle}
      >
        <ModalHeader toggle={toggle}>
         <span style={{ color: '#F15440', textShadow: ' 1px 1px 2px #CCCECF'}}>Add to Shopping List</span>
         </ModalHeader>
        <ModalBody>
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="item">
                Item:
            </Label>

              <Input
                type="text"
                name={modal.name}
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
