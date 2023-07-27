import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Familia } from './familia';

@Injectable({
  providedIn: 'root'
})
export class familiaServiceService {

  private url:string="http://localhost:8080/familia";

  constructor(private http:HttpClient) { }

  //obtener floristica
  getAll():Observable<Familia[]>{
    return this.http.get<Familia[]>(this.url);
  }

  //crear floristica
  create(floristica:Familia):Observable<Familia>{
    return this.http.post<Familia>(this.url,floristica);
  }
  
  //obtener una planta
  get(id_floristica:number):Observable<Familia>{
    return this.http.get<Familia>(this.url+"/"+id_floristica);
  }

  //actualizar plantas
  update(floristica:Familia):Observable<Familia>{
    return this.http.put<Familia>(this.url, floristica);
  }

  delete(id_floristica:number):Observable<any>{
    return this.http.delete<Familia>(this.url+"/"+id_floristica);
  }

}
