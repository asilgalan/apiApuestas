import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Jugadores } from '../interface/jugadores.interface';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class JugadorService {

  private http=inject(HttpClient)

  finJugadoresByName(Nombre:string):Observable<Jugadores[]>{

    return this.http.get<Jugadores[]>(environment.url+"api/Jugadores/BuscarJugadores/"+Nombre).pipe(
      tap(response => console.log(response)
      )
    )
  }
  
}
