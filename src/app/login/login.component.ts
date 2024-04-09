import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  loginError: string = '';

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  login(): void {
    this.authenticationService.login(this.username, this.password)
      .then(
        (data) => {
          console.log('Login successful. Returned data:', data);
          this.router.navigate(['/profile']);
        },
        error => {
          console.error('Error logging in:', error);
          this.loginError = 'Invalid username or password.';
        }
      )
      .catch(error => {
        console.error('Error logging in:', error);
        this.loginError = 'An error occurred during login.';
      });    
  }

  signup(): void {
    this.authenticationService.signUp(this.username, this.email, this.password)
      .then(
        (data) => {
          this.router.navigate(['/login']);
        },
        error => {
          this.loginError = 'An error occurred during signup.';
        }
      )
      .catch(error => {
        this.loginError = 'An error occurred during signup.';
      });    
  }
  
  isSignUp: boolean = false;

  toggleSignUp() {
    this.isSignUp = true;
  }

  toggleSignIn() {
    this.isSignUp = false;
  }

}
