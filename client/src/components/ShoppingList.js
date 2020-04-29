import React, { useEffect } from 'react';
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
import { connect } from 'react-redux';
import { getItems, deleteItem } from '../actions/itemActions';
import PropTypes from 'prop-types'
function ShoppingList(props) {
  const { items } = props.item;

  useEffect(() => {
    props.getItems();
    console.log(items);
  }, [])

  ShoppingList.propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool
  }

  const onDeleteClick = (event, id) => {
    event.preventDefault();
    props.deleteItem(id);
  }

  return (
    <Container>
      <ListGroup>
        <TransitionGroup className="shopping-list">
          {items.map(({ _id, name }) => (
            <CSSTransition key={_id} timeout={500} classNames="fade">
              <ListGroupItem>
                {props.isAuthenticated
                  ? <Button
                    className="remove-btn"
                    color="danger"
                    size="sm"
                    onClick={event => onDeleteClick(event, _id)}
                  >&times;</Button>
                  : null
                }
                {props.isAuthenticated
                  ? name
                  : <span style={{filter: 'blur(3px)'}}>{name}</span>
                }
              </ListGroupItem>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </ListGroup>
    </Container>
  )
}



const mapStateToProps = (state) => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated
})


export default connect(mapStateToProps, { getItems, deleteItem })(ShoppingList);
