import React, {Component} from 'react';
import * as BooksAPI from './BooksAPI'
import Book from './Book';
import {Link} from 'react-router-dom';

class Search extends Component {
  state = {
          query: "",
          searchBooks: []
      };
      changeQueryValue=(query)=>{
        this.setState({query: query});
        setTimeout(this.search, 250);;
      }
      search =() =>{
        if(this.state.query !==""){
        BooksAPI.search(this.state.query).then(response => {
            let bookList = [];
             if (response !== undefined && response.length) {
               const list = {};
                this.props.books.forEach(book => list[book.id] = book.shelf);
                response.forEach(book => {
                    book.shelf = list[book.id] || 'none';
                });
               bookList = response;
              }
              this.setState({searchBooks: bookList});
          })
        }
        else{
          this.setState({searchBooks: []});
        }
      }
    componentWillReceiveProps = (props) => {
      this.props = props;
      let bookList = this.props.selectedBooks;
      this.setState({books: bookList});
  }
    render(){
    return   <div className="search-books">
          <div className="search-books-bar">
            <Link className="close-search" to='/'>Close</Link>
            <div className="search-books-input-wrapper">
              {/*
                NOTES: The search from BooksAPI is limited to a particular set of search terms.
                You can find these search terms here:
                https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                you don't find a specific author or title. Every search is limited by search terms.
              */}
              <input type="text" placeholder="Search by title or author"
                                 onChange={(e) => this.changeQueryValue(e.target.value)}/>

            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
            {this.state.searchBooks.map(book => (
              <li key={book.id}>
              <Book updateBookStatus={this.props.updateBookStatus} book={book}/>
              </li>
              ))}
            </ol>
          </div>
        </div>
    }

}

export default Search
