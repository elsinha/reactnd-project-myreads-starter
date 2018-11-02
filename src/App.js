import React from 'react'
import * as BooksAPI from './BooksAPI';
import {Route} from 'react-router-dom';
import {Link} from 'react-router-dom';
// import * as BooksAPI from './BooksAPI'
import './App.css';
import BookShelf from './BookShelf.js'
import Search from './Search.js'

class BooksApp extends React.Component {
  state = {
    /**
     * Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books : [],
shelves : [
 {name:'Currently Reading', value:'currentlyReading'},
 {name:"Want to Read", value: 'wantToRead'},
  {name:"Read", value:'read'}
]
  };

  componentDidMount = () => {
    BooksAPI
        .getAll()
        .then((booksList) => {
          this.setState({
            books: booksList
          });
        });
  }

updateBookStatus = (book, shelfStatus) => {

  BooksAPI.update(book, shelfStatus).then(response => {
        let newBooks = this.state.books;
        let bk = this.state.books.filter((b)=> b.title === book.title);
        if(bk && bk.length > 0){
          bk[0].shelf = shelfStatus;
        } else{
          newBooks.push(book);
        }
        this.setState({ books: newBooks});
      });
}
  render() {
    return  <div className="app">
        <Route exact path='/' render={(props)=>(<div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
            {this.state.shelves.map((shelf, index)=>
              <div key={index}>
              <BookShelf  updateBookStatus={this.updateBookStatus} shelf={shelf} books={this.state.books.filter(book => book.shelf === shelf.value)}/>
              </div>
            )}
            </div>
          </div>
          <div className="open-search">
            <Link to='/search'>Add a book</Link>
          </div>
        </div>)} />
        <Route path='/search' render={()=>(<Search updateBookStatus={this.updateBookStatus} books={this.state.books}/>)} />
      </div>

  }
}

export default BooksApp
