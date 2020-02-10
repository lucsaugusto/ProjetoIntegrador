import { Globals } from './../../model/globals';
import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';
import { Users } from 'src/app/model/users';
import * as $ from 'jquery';
import { Router } from '@angular/router';


@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css'],
  providers: [Globals]
})
export class TitleComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router ) { }
  username: string = "Minha Conta";
  user: Users;
  logado: boolean; // recebe o valor do log do login service,  sendo utilizado pelo button do menu component
  loginButton: boolean = true;
  cadButton: boolean = true;
  userButton: boolean = false;
  usersButton: boolean = false;
  inicioButton:  boolean = false;

  ngOnInit() {
    localStorage.clear();
    this.loginService.loginInfo(localStorage.getItem("token")).subscribe(
      (res: Users) => {
        Globals.user = res;
        this.user = res;
        this.username = this.user.nome.split(' ')[0];
      },
      (err) => {
        this.user = null;
      }
    );

    this.loginService.userChanged
      .asObservable()
      .subscribe(userValue => {
        if (userValue) {
          // this.logado = userValue.valueOf();
          this.logado = true;
          this.loginService.logado.next(true);
          this.loginButton = false;
          this.cadButton = false;
          this.userButton = true;
          this.usersButton = true;
          this.inicioButton = true;
          this.username = "Minha Conta";
          alert("user.nome = " + this.user.nome);
          alert("username = " + this.username);
          alert("Globals.user.nome = " + Globals.user.nome);
        }
      });
  }

  logout() {
    localStorage.clear();
    
    //this.loginService.logado.next(false);
    $('#logout').click();

    //this.loginService.userChanged.next(false);

    this.user = null;
    this.loginButton = true;
    this.cadButton = true;
    this.userButton = false;
    this.usersButton = false;
    this.inicioButton = false;

  }

  login(){
    if(localStorage.getItem("token")){
      this.loginService.logado.next(true);
    }
  }

  buscaInfo(){
    this.loginService.loginInfo(localStorage.getItem("token")).subscribe(
      (res: Users) => {
        Globals.user = res;
        this.user = res;
        this.username = this.user.nome.split(' ')[0];
      },
      (err) => {
        this.user = null;
      }
    );
  }

}
