import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ajuda } from 'src/app/model/ajuda';


@Injectable({
  providedIn: 'root'
})

export class AjudaService {

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get(`http://localhost:8080/ajuda`);
  }

  getById(id: number){
    return this.http.get(`http://localhost:8080/ajuda/${id}`);
  }

  insert(ajuda: Ajuda){
    return this.http.post(`http://localhost:8080/ajuda`, ajuda);
  }

  update(ajuda: Ajuda){
    return this.http.put(`http://localhost:8080/ajuda`, ajuda);
  }

  delete(id: number){
    return this.http.delete(`http://localhost:8080/ajuda/${id}`);
  }
}