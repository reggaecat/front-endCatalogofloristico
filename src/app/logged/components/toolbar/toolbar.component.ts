import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {

  @Output() disparador=new EventEmitter<void>()
  constructor(){}

  disparar(){
    this.disparador.emit();
  }

}
