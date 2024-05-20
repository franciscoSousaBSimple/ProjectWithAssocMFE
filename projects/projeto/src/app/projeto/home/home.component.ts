import { Component } from '@angular/core';
import { ProjetoComponent } from '../projeto.component';
import { AddProjetosComponent } from '../add-projetos/add-projetos.component';
import { NgToastModule } from 'ng-angular-popup';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProjetoComponent, AddProjetosComponent, NgToastModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
