import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Projeto } from '../../IProjeto';
import { ProjetosService } from '../../services/projetos.service';
import { CommonModule } from '@angular/common';
import { NgToastService } from 'ng-angular-popup';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-projetos',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-projetos.component.html',
  styleUrl: './add-projetos.component.css'
})
export class AddProjetosComponent {
  @Output() projectAdded : EventEmitter<Projeto> = new EventEmitter<Projeto>();

  projeto: Projeto[] = [];

  constructor(private projetosService: ProjetosService, private toast: NgToastService) {
  }

  
  add(name: string, startDateStr: string, endDateStr: string): void {
    name = name.trim();
    if (!name || !startDateStr || !endDateStr) {
      alert('All the fields required! ');
      return;
    }
  
  // Convertendo strings para objetos Date e extraindo apenas a parte da data
  const startDate: string = new Date(startDateStr).toISOString().split('T')[0];
  const endDate: string = new Date(endDateStr).toISOString().split('T')[0];

  // Verificando se as datas são válidas
  if (!startDate || !endDate ) {
    console.error('Invalid date');
    return;
  }

  if (endDate < startDate) {
    console.error('End date must be after start date');
    this.toast.error({detail: "Período inválido", summary: 'Info', duration: 5000});
    return;
  }

  this.projetosService.addProject({ name, startDate, endDate } as unknown as Projeto)
    .subscribe((proj) => {
      this.projectAdded.emit(proj);
      this.toast.success({ detail: "Project added! ", summary: 'Info', duration: 4000 });
    });

  }
}

