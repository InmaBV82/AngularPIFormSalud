import { Component, inject} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PieComponent } from '../app/componentes/pie/pie.component';
import { NavegacionComponent } from '../app/componentes/navegacion/navegacion.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavegacionComponent, PieComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor(private http: HttpClient) {
  }
}
