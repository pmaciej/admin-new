import React, {useState, useEffect} from 'react';
import './App.css';
import Nav from './Nav';
import Users from './Users';
import UserDetail from './UserDetail';
import UserCreate from './UserCreate';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
  const [items, setItems] = useState();
  const [idx, newIdx] = useState(0);
  const [sortType, setSortType] = useState(true);

  useEffect(() => {
    fetchItems();
  }, []);

  const deleteUser = (id) => {
    const newItems = [...items.filter((x) => x.id !== id)];
    setItems(newItems);
    fetch(
      `https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data/${id}`,
      {
        method: 'DELETE',
      }
    );
  };

  const editUser = (updatedItems) => {
    setItems(updatedItems);
  };
 
  const onEdit = () => {
    newIdx(idx + 1);
  };

  const sortItems = () => {
    if (sortType === true) {
      setItems([
        ...items.sort((a, b) => {    
          if (a.username && b.username) {
          if (a.username.toLowerCase() > b.username.toLowerCase()) return 1;
          if (a.username.toLowerCase() < b.username.toLowerCase()) return -1;
          }
          return 0;
        }),
      ]);
      setSortType(false);
    } else {
      setItems([
        ...items.sort((a, b) => {
          if (a.username  && b.username) {
          if (b.username.toLowerCase() > a.username.toLowerCase()) return 1;
          if (b.username.toLowerCase() < a.username.toLowerCase()) return -1;
          }
          return 0;
        }),
      ]);
      setSortType(true);
    }
  };

  const fetchItems = async () => {
    const data = await fetch(
      'https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data',
      {
        method: 'GET',
      }
    );
    const items = await data.json();
    newIdx(items.length + 1);
    setItems(items);
  };

  if (!items) {
    return <h1>Loading</h1>;
  }

  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <Users items={items} deleteUser={deleteUser} sortItems={sortItems} />
            )}
          />
          <Route
            exact
            path="/create"
            render={() => (
              <UserCreate items={items} idx={idx} onEdit={onEdit} />
            )}
          />
          <Route
            path="/:id"
            render={() => <UserDetail items={items} editUser={editUser} />}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
