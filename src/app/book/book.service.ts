// book.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = 'http://localhost:3000/books'; 

  constructor(private http: HttpClient) { }

  getBooks(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  borrowBook(userId: number, bookId: number) {
    this.http.post<any>(`http://localhost:3000/borrows/${userId}/${bookId}`, {})
      .subscribe(
        response => {
          console.log('Book borrowed successfully:', response);
        },
        error => {
          console.error('Error borrowing book:', error);
        }
      );
  }
  
}
