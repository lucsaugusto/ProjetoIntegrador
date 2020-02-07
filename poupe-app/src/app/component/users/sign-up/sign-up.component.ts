import { UsersService } from './../../../service/users/users.service';
import { Component, OnInit } from '@angular/core';
import { Users } from 'src/app/model/users';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})

export class SignUpComponent implements OnInit {
  public user: Users = new Users(0, "", "", "", "", null, null, null, null);
  public users: Users[];
  senhaConf: string;
  filtro: any = /^([a-zA-zà-úÀ-Ú]|\s+)+$/;
  num: any = /^[0-9]+$/;
  verfSenha: any = /^([@#$%&a-zA-zà-úÀ-Ú0-9])+$/;
  verfCaractere: any = /([@#$%&])/;

  _msgErroNome: string = null;
  _msgErroSobrenome: string = null;
  _msgErroEmail: string = null;
  _msgErroTel: string = null;
  _msgErroCel: string = null;
  _msgErroSenha: string = null;
  _msgSenhaForte: string = null;
  _msgSenhaFraca: string = null;
  _msgConfirmaSenha: string = null;
  _msgExisteEmail: string = null;
  _msgEnvioDados: string = null;
  _msgErroE: string = null;
  _msgErroT: string = null;
  _msgCampoVazio: string;

  constructor(private usersService: UsersService, private router: Router) { }

  ngOnInit() {
    window.scrollTo(0, 0);
  }

  verificarForca() {
    if (this.user.senha.length < 10 || !this.verfSenha.test(this.user.senha)) {
      this.user.senha = "";
      this.senhaConf = "";
      this._msgErroSenha = `Senha inválida, digite uma senha com pelo menos 10 dígitos(Letras, Números e '@ # $ % &').`;
      this._msgSenhaForte = "";
      this._msgSenhaFraca = "";
      this._msgConfirmaSenha = "";
    }
    else if (!this.verfCaractere.test(this.user.senha)) {
      this._msgErroSenha = "";
      this._msgSenhaForte = "";
      this._msgSenhaFraca = `Senha Fraca`;
    }
    else {
      this._msgErroSenha = "";
      this._msgSenhaForte = `Senha Forte`;
      this._msgSenhaFraca = "";
    }
  }

  validacao() {
    if (this.user.nome == "" || this.user.email == "" || this.user.telefone == null || this.user.senha == "" || this.senhaConf == "") {
      this._msgCampoVazio = "Atenção! Preencha Todos os campos";
      this._msgEnvioDados = "";
    }
    if (!this.filtro.test(this.user.nome) || this.user.nome.indexOf(" ") < 1) {
      this.user.nome = "";
      this._msgErroNome = `Dado inválido`;
    }
    else {
      this._msgErroNome = null;
    }

    if (this.user.email.indexOf("@") == -1 && this.user.email.indexOf("@") > 1 || this.user.email.indexOf(".") == -1) {
      this.user.email = "";
      this._msgErroEmail = `Dado inválido`;
    }
    else {
      this._msgErroEmail = null;
    }

    if (this.user.telefone.length < 10 || !this.num.test(this.user.telefone)) {
      this.user.telefone = null;
      this._msgErroTel = `Insira um número válido`;
    }
    else {
      this._msgErroTel = "";
    }

    if (this.user.senha === this.senhaConf) {
      this._msgConfirmaSenha = "";
    }
    else if (this.senhaConf !== "") {
      this.senhaConf = "";
      this._msgConfirmaSenha = `Senhas diferentes, digite novamente`;
    }

    if (this.user.nome != "" && this.user.email != "" && this.user.telefone != null && this.user.senha != "" && this.senhaConf != "") {
      this.usersService.insert(this.user).subscribe(response => {
        this._msgEnvioDados = "Dados enviados com sucesso!";
        this.user.nome = "";
        this.user.email = "";
        this.user.telefone = null;
        this.user.senha = "";
        this.senhaConf = "";
        this._msgSenhaForte = "";
        this._msgSenhaFraca = "";
        this._msgErroEmail = "";
        alert("Cadastro realizado com sucesso!");
        this.router.navigate(['login']);
      },
        error => {
          console.log(`Erro cod: ${error.status}`);
          this._msgErroEmail = "O email já está cadastrado.";
        })
    }
  }

  limpar() {
    if (this._msgErroEmail != "") {
      this.user.email = "";
    }
    if (this._msgErroEmail != "" || this._msgEnvioDados != "" || this._msgCampoVazio != "") {
      this._msgCampoVazio = "";
      this._msgErroEmail = "";
      this._msgEnvioDados = "";
    }
  }
}
