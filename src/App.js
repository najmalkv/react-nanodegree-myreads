import React from 'react'



// Common css file
import './App.css'

//React router module
import { Route } from 'react-router-dom'

// List page container
import ListPage from './Containers/ListPage'

// Search page container
import SearchPage from './Containers/SearchPage'


class BooksApp extends React.Component {

  render() {
    return (
      <div className="app">
          <Route exact path="/" render={({ history }) => (<ListPage  history={history}/>)} />
          <Route  path="/Search" render={({ history }) => (<SearchPage  history={history}/>)} />

      </div>
    )
  }
}

export default BooksApp
