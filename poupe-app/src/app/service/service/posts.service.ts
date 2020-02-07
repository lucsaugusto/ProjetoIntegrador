import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Posts } from './../../model/posts';
@Injectable({
  providedIn: 'root'
})
export class PostsService {
  
  constructor(private http: HttpClient) { }
  
  getAll(){
    return this.http.get(`http://poupeapp.com:8080/postagem`);
  }

  getById(idPostagem: number){
    return this.http.get(`http://poupeapp.com:8080/postagem/${idPostagem}`);
  }

  insert(post: Posts){
    return this.http.post(`http://poupeapp.com:8080/postagem`, post);
  }

  update(post: Posts){
    return this.http.put(`http://poupeapp.com:8080/postagem`, post);
  }
}