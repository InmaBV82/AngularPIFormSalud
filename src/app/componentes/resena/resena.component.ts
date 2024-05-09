import { Component, Input  } from '@angular/core';
import { ResenaDTO } from '../../modelos/ResenaDTO';
import { CommonModule, DatePipe } from '@angular/common';


@Component({
  selector: 'app-resena',
  standalone: true,
  imports: [DatePipe, CommonModule ],
  templateUrl: './resena.component.html',
  styleUrl: './resena.component.css'
})
export class ResenaComponent  {
  @Input() resenas: ResenaDTO[]=[];
  


}
