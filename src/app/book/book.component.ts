import { Component } from '@angular/core';
import { BookService } from './book.service';
import { AuthenticationService } from '../login/authentication.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent {
  searchQuery: string = '';
  books: any[] = []; 
  filteredBooks: any[] = [];
  userData: any;


  constructor(private bookService: BookService, private authenticationService: AuthenticationService) {}

  ngOnInit() {
    this.userData = this.authenticationService.userData;
    this.bookService.getBooks().subscribe(books => {
      this.books = books;
      this.filterBooks(); 
    });
  }

  filterBooks() {
    this.filteredBooks = this.books.filter(book =>
      book.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  onSearchChange(event: any) {
    this.searchQuery = event.target.value;
    this.filterBooks();
  }

  borrowBook(userId: number, bookId: number) {
    this.bookService.borrowBook(userId,bookId);
  }
  
  

}
