import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useEffect } from 'react';
import './App.css';
import AppNavbar from './components/AppNavbar';
import ShoppingList from './components/ShoppingList';

import { Provider } from 'react-redux';
import store from './store';
import {loadUser} from './actions/authActions';

import ItemModal from './components/ItemModal';
import {Container} from 'reactstrap';
function App() {
  useEffect(()=>{
    store.dispatch(loadUser())
  }, [])

  return (
    <Provider store={store}>
      <div className="App">
        <AppNavbar />
        <Container>
          <ItemModal/>
        </Container>
        <ShoppingList />
      </div>
    </Provider>

  );
}

export default App;
