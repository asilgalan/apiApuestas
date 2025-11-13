import { Component, HostListener, inject, OnInit, signal } from '@angular/core';

import { EquipoService } from '../../services/equipo.service';
import { Equipo } from '../../interface/equipos.interface';
import { Router, RouterLink, RouterOutlet } from "@angular/router";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  imports: [RouterOutlet,RouterLink, ReactiveFormsModule],
  templateUrl: './navbar.html',
})
export class Navbar implements OnInit {
 
isDropdownOpen = false;
  private equiposervice=inject(EquipoService);

  private router=inject(Router)
  equipos=signal<Equipo[]>([]);
  fb=inject(FormBuilder)

  buscador:FormGroup=this.fb.group({
    nombre:['',[Validators.required, Validators.minLength(1)]]
  })

   ngOnInit(): void {

     this.equiposervice.getEquipos().subscribe(response=>{

      this.equipos.set(response)

     })
  }

  onSubmit(){
    if(this.buscador.invalid){
      return;
    }

    const {nombre}=this.buscador.value

    this.router.navigateByUrl('/jugadores/'+nombre);

  }



// Método para manejar el toggle del dropdown
onDropdownToggle(event: any) {
  this.isDropdownOpen = event.target.open;
}

// Método para cerrar el dropdown
closeDropdown() {
  this.isDropdownOpen = false;
  // También puedes cerrar el elemento details si es necesario
  const detailsElement = document.querySelector('.dropdown details');
  if (detailsElement) {
    (detailsElement as HTMLDetailsElement).open = false;
  }
}

// Método para manejar clics fuera del dropdown
@HostListener('document:click', ['$event'])
onDocumentClick(event: MouseEvent) {
  const dropdownElement = document.querySelector('.dropdown');
  const target = event.target as HTMLElement;
  
  if (this.isDropdownOpen && dropdownElement && !dropdownElement.contains(target)) {
    this.closeDropdown();
  }
}
}