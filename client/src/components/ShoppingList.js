import React, { useState, useEffect } from 'react';
import {
  Container,
  ListGroup,
  ListGroupItem,
  Button
} from 'reactstrap';
import {
  CSSTransition,
  TransitionGroup
} from 'react-transition-group';
import { v4 as uuid } from 'uuid';
import { connect } from 'react-redux';
import { getItems, deleteItem } from '../actions/itemActions';
import PropTypes from 'prop-types'
function ShoppingList(props) {

  // такие же данные в props.item.items
  // const [items, setItems] = useState([
  //   { id: uuid(), name: "Eggs" },
  //   { id: uuid(), name: "Milk" },
  //   { id: uuid(), name: "Apples" },
  //   { id: uuid(), name: "Water" }
  // ])

  const [items, setItems] = useState(props.item.items);

  useEffect(() => {
    props.getItems();
    console.log(props.item.items.length);
    setItems(props.item.items)
  }, [props.item.items])

  const onDeleteClick = (event, id) => {
    event.preventDefault();
    props.deleteItem(id);
  }

  return (
    <Container>
      <Button
        color="dark"
        style={{ marginBottom: '2rem' }}
        onClick={() => {
          const name = prompt('Enter Item');
          if (name) {
            setItems([
              ...items,
              { id: uuid(), name }
            ])
          }
        }}
      >Add Item</Button>
      <ListGroup>
        <TransitionGroup className="shopping-list">
          {items.map(({ id, name }) => (
            <CSSTransition key={id} timeout={500} classNames="fade">
              <ListGroupItem>
                <Button
                  className="remove-btn"
                  color="danger"
                  size="sm"
                  onClick={event => onDeleteClick(event,id)}
                >&times;</Button>
                {name}
              </ListGroupItem>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </ListGroup>
    </Container>
  )
}

ShoppingList.propTypes = {
  getItems: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  item: state.item
})


export default connect(mapStateToProps, { getItems, deleteItem })(ShoppingList);
