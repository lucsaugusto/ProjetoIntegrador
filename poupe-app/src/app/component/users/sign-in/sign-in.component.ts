import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from './../../../service/login.service';
import { Users } from 'src/app/model/users';
import { Token } from 'src/app/model/token';
import { Globals } from 'src/app/model/globals';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  providers: [Globals]
})
export class SignInComponent implements OnInit {

  login: Users = new Users(0, "", "", "", "", null, null, null, null);
  _msgEnvioDados: string = null;
  _msgErroEmail: string = null;
  _msgCampoVazio: string = null;


  userLogado: any;
  constructor(private router: Router, private route: ActivatedRoute, private loginService: LoginService) { }

  ngOnInit() {
    if (localStorage.getItem("logado"))
      this.router.navigate(['home']);
    window.scrollTo(0, 0);
  }

  fazerLogin() {
    if (this.login.email == "" || this.login.senha == "" || this.login.email == null || this.login.senha == null) {
      this._msgCampoVazio = "Atenção! Preencha Todos os campos";
      this._msgErroEmail = "";
      this._msgEnvioDados = "";
    }
    else {
      this._msgCampoVazio = "";
      this.loginService.login(this.login).subscribe((res: Token) => {
        this._msgErroEmail = "";
        this._msgEnvioDados = "Sucesso! O usuário existe";
        this.login.email = "";
        this.login.senha = "";
        localStorage.setItem("token", res.token);
        localStorage.setItem("logado", "true");
        this.loginService.userChanged.next(true);
        this.loginService.logado.next(true);
        this.loginService.email.next("Minha Conta");
        this.router.navigate(['home']);
        
      },
        error => {
          this._msgErroEmail = "Falha! O usuário não existe";
          this._msgEnvioDados = "";
          this.login.email = "";
          this.login.senha = "";
          console.log(`Erro cod: ${error.status}`);
          this.router.navigate(['login']);
        });
    }
  }

  limpar() {
    if (this._msgErroEmail != "" || this._msgEnvioDados != "" || this._msgCampoVazio != "") {
      this.login.email = "";
      this.login.senha = "";
      this._msgCampoVazio = "";
      this._msgErroEmail = "";
      this._msgEnvioDados = "";
    }
  }
  emailEnviado() {
    alert("Em breve enviaremos um link para redefinir sua senha")
  }
}
