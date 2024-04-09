import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }
  username: string = '';
  userId: string = '';
  userData: any;
  async login(username: string, password: string): Promise<any> {
    try {
      this.username = username;
      const response = await this.http.post<any>('http://localhost:3000/auth/login', { username, password }).toPromise();
      this.userId = response.payload.userId;
      this.userData = response;
      localStorage.setItem("sub", JSON.stringify(response.payload.sub));
      localStorage.setItem("name", JSON.stringify(response.payload.username));
      localStorage.setItem("email", JSON.stringify(response.payload.email));
      return response;
    } catch (error) {
      console.error('Error logging in:', error);
      throw error; 
    }
  }

  async signUp(name: string, email: string, password: string): Promise<any> {
    try {
        console.log(name);
        console.log(email);

      const response = await this.http.post<any>('http://localhost:3000/users', { name, email, password }).toPromise();
      return response;
    } catch (error) {
      console.error('Error signing up in:', error);
      throw error; 
    }
  }


  logout() {
    // Clear any stored user data (if any)
    // Optionally, you may want to clear tokens or other user information
    // For simplicity, we'll leave this empty in this example
  }
}