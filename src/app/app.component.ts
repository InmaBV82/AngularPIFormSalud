import { Component, inject} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent  } from './componentes/footer/footer.component';
import { NavegacionComponent } from '../app/componentes/navegacion/navegacion.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavegacionComponent, FooterComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor(private http: HttpClient) {
  }
}
