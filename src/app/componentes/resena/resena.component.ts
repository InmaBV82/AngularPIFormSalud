import { Component, Input  } from '@angular/core';
import { ResenaDTO } from '../../modelos/ResenaDTO';
import { CommonModule, DatePipe } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-resena',
  standalone: true,
  imports: [DatePipe, CommonModule ],
  templateUrl: './resena.component.html',
  styleUrl: './resena.component.css'
})
export class ResenaComponent {
  @Input() resenas: ResenaDTO[]=[];
  @Input() mostrarResenas: boolean = false;  // Nueva entrada para controlar la visualización

  constructor(private router: Router) {}

  editarResena(id:number){
    this.router.navigate(['/editResena', id]);

  }

}
  


