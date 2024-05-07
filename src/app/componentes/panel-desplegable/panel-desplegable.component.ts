import { Component } from '@angular/core';

@Component({
  selector: 'app-panel-desplegable',
  standalone: true,
  imports: [],
  templateUrl: './panel-desplegable.component.html',
  styleUrl: './panel-desplegable.component.css'
})
export class PanelDesplegableComponent {
  panelVisible: boolean = false;

mostrarPanel(): void {
    this.panelVisible = !this.panelVisible;
  }

}
