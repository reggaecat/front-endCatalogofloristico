import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Orden } from './orden';

@Injectable({
  providedIn: 'root'
})
export class ordenServiceService {

  private url:string="http://localhost:8080/orden";

  constructor(private http:HttpClient) { }

  //obtener floristica
  getAll():Observable<Orden[]>{
    return this.http.get<Orden[]>(this.url);
  }

  //crear floristica
  create(floristica:Orden):Observable<Orden>{
    return this.http.post<Orden>(this.url,floristica);
  }
  
  //obtener una planta
  get(id_floristica:number):Observable<Orden>{
    return this.http.get<Orden>(this.url+"/"+id_floristica);
  }

  //actualizar plantas
  update(floristica:Orden):Observable<Orden>{
    return this.http.put<Orden>(this.url, floristica);
  }

  delete(id_floristica:number):Observable<any>{
    return this.http.delete<Orden>(this.url+"/borrar/"+id_floristica);
  }

}
