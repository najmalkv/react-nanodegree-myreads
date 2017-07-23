import React from 'react'

// API fetch methods from the BooksAPI
import * as BooksAPI from '../BooksAPI'

// Common css file
import '../App.css'

// link component from the react router module
import { Link } from 'react-router-dom'

// Book component that displays the book details
import Book from '../components/book'

class ListPage extends React.Component {

  // constructor method for the class
	constructor() {
		super()
		this.state = {
			books: []
		}
	}

  // React lifcycle method that is executed after the component is mounted
	componentDidMount() {

		BooksAPI.getAll()
    .then((books)=> {
			this.setState({books})})
    .catch((error) => alert(error))
	}

  // function that handles updating the status of book on user selection
	handleChangeShelf = (book,shelf) => {

		BooksAPI.update(book, shelf)
    .then((shelf)=> {

			this.books = this.state.books;

			this.books.map((book) => book.shelf = 'none');

			shelf.currentlyReading.map((bookId) => {
				this.books.filter((book) => book.id === bookId).map((book) => book.shelf = 'currentlyReading')
			})

			shelf.wantToRead.map((bookId) => {
				this.books.filter((book) => book.id === bookId).map((book) => book.shelf = 'wantToRead')
			})

			shelf.read.map((bookId) => {
				this.books.filter((book) => book.id === bookId).map((book) => book.shelf = 'read')
			})


			this.setState({books: this.books})
		})
    .catch((error) => alert(error))

	}

	render() {
		const {books} = this.state;

		return (
		<div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {books.filter((book) => book.shelf === 'currentlyReading').map((book)=> (
                      	<li key={book.id} >
							<Book book={book} changeShelf={this.handleChangeShelf}/>
                      </li>))}

                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {books.filter((book) => book.shelf === 'wantToRead').map((book)=> (
                      <li key={book.id}>
                       	<Book book={book} changeShelf={this.handleChangeShelf}/>
                      </li>))}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {books.filter((book) => book.shelf === 'read').map((book)=> (
                      <li key={book.id}>
                        <Book book={book} changeShelf={this.handleChangeShelf}/>
                      </li>))}
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
			)
	}
}

export default ListPage;