import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Users } from '../model/users';
import { Posts } from 'src/app/model/posts';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public logado: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public email: BehaviorSubject<any> = new BehaviorSubject<any>(String);
  public userChanged = new Subject<boolean>();

  constructor(private http: HttpClient) { }

  login(login: Users){
    return this.http.post(`http://poupeapp.com:8080/usuario/login`, login);
  }

  loginInfo(token: string){
    return this.http.get(`http://poupeapp.com:8080/usuario/info?token=`+ token);
  }
}
