import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Posts } from './../model/posts';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  
  constructor(private http: HttpClient) { }
  
  getAll(){
    return this.http.get(`http://poupeapp.com/postagem`); 
  }

  getById(idPostagem: number){
    return this.http.get(`http://poupeapp.com/postagem/${idPostagem}`);
  }

  getByPalavra(palavra: string){
    return this.http.get(`http://poupeapp.com/postagem/busca?palavra=`+ palavra);
  }

  insert(post: Posts){
    return this.http.post(`http://poupeapp.com/postagem`, post);
  }

  update(post: Posts){
    return this.http.put(`http://poupeapp.com/postagem`, post);
  }
}