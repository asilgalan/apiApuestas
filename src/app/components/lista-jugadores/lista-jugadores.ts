import { Component, inject, OnInit, signal } from '@angular/core';
import { JugadorService } from '../../services/jugador.service';
import { Jugadores } from '../../interface/jugadores.interface';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';

@Component({
  selector: 'app-lista-jugadores',
  imports: [],
  templateUrl: './lista-jugadores.html',
  styleUrl: './lista-jugadores.css',
})
export class ListaJugadores implements OnInit {

  private jugdoresServicio=inject(JugadorService);
   jugadores=signal<Jugadores[]>([])
   private route=inject(ActivatedRoute)


  ngOnInit(): void {

    this.route.paramMap.subscribe(params =>{

      const nombre=params.get('nombre')??'';

      if(nombre!=''){
        this.jugdoresServicio.finJugadoresByName(nombre).pipe(
          tap((response ) => this.jugadores.set(response))
        ).subscribe()
      }

      


    })
    
  }



}
