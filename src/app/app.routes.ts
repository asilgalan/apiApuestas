import { Routes } from '@angular/router';

export const routes: Routes = [

    {
        path:'',
        loadComponent:() => import('./components/home/home').then(h => h.Home)
    },
    {
        path:'equipo/:idEquipo',
        loadComponent:()=> import('./components/equipo/equipo').then(r => r.Equipos)

    },
    {
        path:'jugadores/:nombre',
        loadComponent:()=> import('./components/lista-jugadores/lista-jugadores').then(r => r.ListaJugadores)

    }
];
