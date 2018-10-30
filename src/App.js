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
    books : [
  { title: 'To Kill a Mockingbird', author: 'Harper Lee', status: 'wantToRead', cover: 'http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api' },
  { title: 'Enders Game', author: 'Orson Scott Card', status: 'wantToRead', cover: 'http://books.google.com/books/content?id=yDtCuFHXbAYC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72RRiTR6U5OUg3IY_LpHTL2NztVWAuZYNFE8dUuC0VlYabeyegLzpAnDPeWxE6RHi0C2ehrR9Gv20LH2dtjpbcUcs8YnH5VCCAH0Y2ICaKOTvrZTCObQbsfp4UbDqQyGISCZfGN&source=gbs_api' },
  { title: '1776', author: 'David McCullough', status: 'Want to Read', cover: 'http://books.google.com/books/content?id=uu1mC6zWNTwC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73pGHfBNSsJG9Y8kRBpmLUft9O4BfItHioHolWNKOdLavw-SLcXADy3CPAfJ0_qMb18RmCa7Ds1cTdpM3dxAGJs8zfCfm8c6ggBIjzKT7XR5FIB53HHOhnsT7a0Cc-PpneWq9zX&source=gbs_api' },
  { title: 'Harry Potter and the Sorcerers Stone', author: 'J.K. Rowling', status: 'currentlyReading', cover: 'http://books.google.com/books/content?id=wrOQLV6xB-wC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72G3gA5A-Ka8XjOZGDFLAoUeMQBqZ9y-LCspZ2dzJTugcOcJ4C7FP0tDA8s1h9f480ISXuvYhA_ZpdvRArUL-mZyD4WW7CHyEqHYq9D3kGnrZCNiqxSRhry8TiFDCMWP61ujflB&source=gbs_api' },
  { title: 'The Hobbit', author: 'J.R.R. Tolkien', status: 'wantToRead', cover: 'http://books.google.com/books/content?id=pD6arNyKyi8C&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE70Rw0CCwNZh0SsYpQTkMbvz23npqWeUoJvVbi_gXla2m2ie_ReMWPl0xoU8Quy9fk0Zhb3szmwe8cTe4k7DAbfQ45FEzr9T7Lk0XhVpEPBvwUAztOBJ6Y0QPZylo4VbB7K5iRSk&source=gbs_api' },
  { title: 'Oh, the Places Youll Go!', author: 'Seuss', status: 'read', cover: 'http://books.google.com/books/content?id=1q_xAwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE712CA0cBYP8VKbEcIVEuFJRdX1k30rjLM29Y-dw_qU1urEZ2cQ42La3Jkw6KmzMmXIoLTr50SWTpw6VOGq1leINsnTdLc_S5a5sn9Hao2t5YT7Ax1RqtQDiPNHIyXP46Rrw3aL8&source=gbs_api' },
  { title: 'The Adventures of Tom Sawyer', author: 'Mark Twain', status: 'currentlyReading', cover: 'http://books.google.com/books/content?id=32haAAAAMAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72yckZ5f5bDFVIf7BGPbjA0KYYtlQ__nWB-hI_YZmZ-fScYwFy4O_fWOcPwf-pgv3pPQNJP_sT5J_xOUciD8WaKmevh1rUR-1jk7g1aCD_KeJaOpjVu0cm_11BBIUXdxbFkVMdi&source=gbs_api' },
],
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
