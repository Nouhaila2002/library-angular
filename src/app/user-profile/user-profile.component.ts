import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../login/authentication.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit{
  books: any[] = [];
  userData: any;

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.userData = this.authenticationService.userData;
    this.http.get<any[]>(`http://localhost:3000/borrows/${localStorage.getItem("sub")}/borrows`)
      .subscribe(data => {
        this.books = data; 
        this.userData.payload.sub = localStorage.getItem("sub");
        this.userData.payload.username = localStorage.getItem("name")
        this.userData.payload.email= localStorage.getItem("email")
    }, error => {
      console.error('Error fetching data:', error);
    });
    console.log(this.userData);
  }


  returnBook(userId: number, borrowId: number) {
    this.http.post<any>(`http://localhost:3000/borrows/${userId}/return/${borrowId}`, {})
      .subscribe(
        response => {
          console.log('Book returned successfully:', response);
        },
        error => {
          console.error('Error returning book:', error);
        }
      );
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
