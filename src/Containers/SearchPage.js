import React from 'react'

// API fetch methods from the BooksAPI
import * as BooksAPI from '../BooksAPI'

// Common css file
import '../App.css'

// link component from the react router module
import { Link } from 'react-router-dom'

// Book component that displays the book details
import Book from '../components/book'


class SearchPage extends React.Component{

	// constructor method for the class
	constructor() {
		super();

		this.state = {
			books: [],
			booksOnShelf: []

		}
	}


	// React lifcycle method that is executed after the component is mounted
	componentDidMount() {
		BooksAPI.getAll()
		.then((books)=> {

			this.setState({booksOnShelf: books})
		})
		.catch((error) => alert(error))
	}

	// function that handles searching for books based on user input
	handleSearch = (query, maxResults) => {

		BooksAPI.search(query.trim(), maxResults)
		.then((books) => {
			books.map((book) => {

				book.shelf = 'none'

				this.state.booksOnShelf.filter((bookOnShelf) => book.id === bookOnShelf.id).map((bookOnShelf) => book.shelf = bookOnShelf.shelf)
			});


			this.setState({books})
		})
		.catch((error) => alert(error))
	}

  // function that handles updating the status of book on user selection

	handleChangeShelf = (book,shelf) => {

		BooksAPI.update(book, shelf).then((shelf)=> {

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
	}


	render() {

		const {books, query} = this.state


		return (
			<div className="search-books">
	         <div className="search-books-bar">
              <Link to="/" className="close-search" >Close</Link>
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author" onChange={(event) => this.handleSearch(event.target.value, 35)}/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
				{books && books.length? books.map((book)=> (
                      	<li key={book.id} >

							<Book book={book} changeShelf={this.handleChangeShelf}/>

						</li>))
						: <div>No books</div>
				}
              </ol>
            </div>
          </div>
			)
	}
}

export default SearchPage;