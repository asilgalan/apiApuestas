import { inject, Injectable } from '@angular/core';
import { Jugadores } from '../interface/jugadores.interface';
import { HttpClient } from '@angular/common/http';
import { Observable, pipe, tap } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Equipo } from '../interface/equipos.interface';

@Injectable({
  providedIn: 'root',
})
export class EquipoService {

  private http=inject(HttpClient)



    getJugadoresEquipo(idEquipo: number): Observable<Jugadores[]> { 

       let request = "api/jugadores/jugadoresequipos/" + idEquipo; 

      return this.http.get<Jugadores[]>(environment.url+request).pipe(
        tap((response)=> console.log(response)
        )
      )
  } 

 

 

    findEquipo(idEquipo: number): Observable<Equipo> { 

    let request = "api/equipos/" + idEquipo; 

   

    return this.http.get<Equipo>(environment.url+request).pipe(
      tap(response => console.log(response)
      )
    ); 

    } 

 

 

    getEquipos(): Observable<Equipo[]> { 

    let request = "api/equipos"; 
    return this.http.get<Equipo[]>(environment.url+request).pipe(
      tap(response => console.log(response)
      )
    ); 

    } 
      
}
