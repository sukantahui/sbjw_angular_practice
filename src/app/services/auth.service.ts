import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {BehaviorSubject, Subject, throwError} from 'rxjs';
import {User} from '../models/user.model';
import {Router} from '@angular/router';

export interface AuthResponseData {
  token: {headers: object, original: {access_token: string, token_type: string, expires_in: number}, exception: object };
  user: {id: number, person_name: string,  person_type_id: number};
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient, private router: Router) { }
  isAuthenticated(){

    if (this.user.value){
      return true;
    }else{
      return false;
    }
  }
  autoLogin(){
    const userData: {id: number, personName: string, _authKey: string, personTypeId: number} = JSON.parse(localStorage.getItem('user'));
    if (!userData){
      return;
    }
    const loadedUser = new User(userData.id, userData.personName, userData._authKey, userData.personTypeId);
    if (loadedUser.authKey){
      this.user.next(loadedUser);
      //  if (loadedUser.isOwner){
      //   this.router.navigate(['/owner']);
      // }
    }
  }
  login(loginData){
    return this.http.post<AuthResponseData>('http://127.0.0.1:8000/api/login', loginData)
      .pipe(catchError(this.handleError), tap(resData => {
        // tslint:disable-next-line:max-line-length
          const user = new User(resData.user.id,
                  resData.user.person_name,
                  resData.token.original.access_token,
                  resData.user.person_type_id);
          this.user.next(user); // here two user is used one is user and another user is subject of rxjs
          localStorage.setItem('user', JSON.stringify(user));
      }));  // this.handleError is a method created by me
  }

  private handleError(errorResponse: HttpErrorResponse){
    console.log('Login Failed');
    console.log(errorResponse);
    return throwError(errorResponse.error.message);
  }

  logout(){
    this.user.next(null);
    localStorage.removeItem('user');
    this.router.navigate(['/auth']);
  }


}
