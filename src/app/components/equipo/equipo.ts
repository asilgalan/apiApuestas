import { Component, inject, OnInit, signal } from '@angular/core';
import { EquipoService } from '../../services/equipo.service';
import { ActivatedRoute } from '@angular/router';
import { Equipo } from '../../interface/equipos.interface';
import { Jugadores } from '../../interface/jugadores.interface';
import { delay, forkJoin, pipe, tap } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-equipo',
  imports: [DatePipe],
  templateUrl: './equipo.html',
  styleUrl: './equipo.css',
})
export class Equipos implements OnInit {
 
  private equiposervice=inject(EquipoService)
  private acitvateRouter=inject(ActivatedRoute)
   equipo=signal<Equipo |null>(null)
   jugadores=signal<Jugadores[]>([])
   cargando=signal(false)

 ngOnInit(): void {
      this.acitvateRouter.paramMap.subscribe(params =>{

        const idEquipo=params.get('idEquipo')??'0'

        forkJoin({
          equipo: this.equiposervice.findEquipo(parseInt(idEquipo)).pipe(tap(()=> this.cargando.set(true)),delay(4000)),
          jugadores:this.equiposervice.getJugadoresEquipo(parseInt(idEquipo)).pipe(tap(()=> this.cargando.set(true)),delay(4000))
      
        })
      
        .subscribe({
          
          next: ({ equipo, jugadores }) => {
          this.equipo.set(equipo)
         
          this.jugadores.set(jugadores)
        },
        })

       


      })
  }


   


}
