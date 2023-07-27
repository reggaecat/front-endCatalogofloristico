import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Floristica } from './floristica';

@Injectable({
  providedIn: 'root'
})
export class FloristicaServiceService {

  private url:string="http://localhost:8080/plantas";

  constructor(private http:HttpClient) { }

  //obtener floristica
  getAll():Observable<Floristica[]>{
    return this.http.get<Floristica[]>(this.url);
  }

  //crear floristica
  create(floristica:any):Observable<any>{
    return this.http.post(this.url,floristica);
  }
  
  //obtener una planta
  get(id_floristica:number):Observable<Floristica>{
    return this.http.get<Floristica>(this.url+"/"+id_floristica);
  }

  //actualizar plantas
  update(floristica:Floristica):Observable<Floristica>{
    return this.http.put<Floristica>(this.url, floristica);
  }

  delete(id_floristica:number):Observable<any>{
    return this.http.delete<Floristica>(this.url+"/"+id_floristica);
  }

  getImagen(id_floristica:any){
    return this.http.get(this.url+"/"+id_floristica+"/imagen",{ responseType: 'blob' });
  }

  

}
