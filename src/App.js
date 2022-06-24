/* eslint-disable no-lone-blocks */
/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  Configure,
  Hits,
  SearchBox,
  DynamicWidgets,
  Panel,
  RefinementList,
  Pagination,
  Highlight,
} from 'react-instantsearch-dom';
import PropTypes, { func, object } from 'prop-types';
import './App.css';

const searchClient = algoliasearch(
  'B1G2GM9NG0',
  'aadef574be1f9252bb48d4ea09b5cfe5'
);

function App() {
  const [cart, setCart] = useState([]);
  function addItemToCart(e) {
    if (cart.filter(item => item.objectID === e.objectID)[0] === undefined) {
      const item = {
        name: e.name,
        description: e.description,
        vol: 1,
        objectID: e.objectID,
      };
      console.log(item);
      setCart([...cart, item]);
    } else {
      const newItems = cart.map(item => {
        if (e.objectID === item.objectID) {
          return { ...item, vol: item.vol + 1 };
        }
        return item;
      });
      setCart(newItems);
      // const newItems = items.map(item => {
      //   if (event.target.id == item.id) {
      //     return { ...item, name: event.target.value}
      //   }
      //   return item;
      // });
      // setItems(newItems);//чучуть доделать
    }
  }
  function Hit(props) {
    return (
      <article>
        <h1>
          <Highlight attribute="name" hit={props.hit} />
        </h1>
        <button onClick={() => addItemToCart(props.hit)}>add to chest</button>
      </article>
    );
  }
  Hit.propTypes = {
    hit: PropTypes.object.isRequired,
  };
  function del(objectID) {
    setCart(cart.filter(item => item.objectID !== objectID));//может быть добавить удаление 1 предмета вместо всех а так готово
  }
  return (
    <>
      <div>
        <header className="header">
          <h1 className="header-title">
            <a href="/">sever</a>
          </h1>
          <p className="header-subtitle">
            using{' '}
            <a href="https://github.com/algolia/react-instantsearch">
              React InstantSearch
            </a>
          </p>
        </header>
        <div className="container">
          <InstantSearch searchClient={searchClient} indexName="demo_ecommerce">
            <Configure hitsPerPage={8} />
            <div className="search-panel">
              <div className="search-panel__filters">
                <DynamicWidgets
                  fallbackWidget={RefinementList}
                ></DynamicWidgets>
              </div>

              <div className="search-panel__results">
                <SearchBox
                  className="searchbox"
                  translations={{
                    placeholder: '',
                  }}
                />
                <Hits hitComponent={Hit} />

                <div className="pagination">
                  <Pagination />
                </div>
              </div>
            </div>
          </InstantSearch>
        </div>
      </div>
      <>
        <div className="cart">
          Cart
          <ul>
            {cart.map(item => (
              <li key={item.objectID}>
                {item.name} : {item.vol}
                <br />
                {item.description}
                <br />
                <button onClick={() => del(item.objectID)}>delete</button>
              </li>
            ))}
          </ul>
        </div>
      </>
    </>
  );
}

export default App;
