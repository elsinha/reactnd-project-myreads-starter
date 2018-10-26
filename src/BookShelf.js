import React, {Component} from 'react';
import Book from './Book';

class BookShelf extends Component {



  render(){
 return <div className="bookshelf">
    <h2 className="bookshelf-title">{this.props.shelf.name}</h2>
    <div className="bookshelf-books">
      <ol className="books-grid">
      {this.props.books.map((book, index) => (
          <li key={index}>
           <Book updateBookStatus={this.props.updateBookStatus} book={book}/>
          </li>
        ))}
      </ol>
    </div>
  </div>

}

}

export default BookShelf;
