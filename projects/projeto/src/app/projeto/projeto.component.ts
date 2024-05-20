import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AddProjetosComponent } from './add-projetos/add-projetos.component';
import { Projeto } from '../IProjeto';
import { ProjetosService } from '../services/projetos.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AssociationsComponent } from '../associations/associations.component';
import { AddAssociationsComponent } from '../add-associations/add-associations.component';

@Component({
  selector: 'app-projeto',
  standalone: true,
  templateUrl: './projeto.component.html',
  styleUrl: './projeto.component.css',
  imports: [CommonModule, AddProjetosComponent, FormsModule, HttpClientModule, AssociationsComponent, AddAssociationsComponent]
})
export class ProjetoComponent {
  projetos: Projeto[] = [];
  nomeFiltro: string = '';
  showAddForm: boolean = false;
  selectedProject!: Projeto;
  showProjectDetails: boolean = false;

  // Função para exibir o componente app-associations
  projectDetails(proj: Projeto) {
    if (this.selectedProject === proj) {
      // Se o projeto já está selecionado e os detalhes estão sendo mostrados, esconda-os
      this.showProjectDetails = !this.showProjectDetails;
    } else {
      // Se é um projeto diferente ou nenhum projeto está atualmente selecionado
      this.selectedProject = proj;  
      this.showProjectDetails = true;  
    }
  }


  constructor(
    private projetoService: ProjetosService,
    private router: Router,
    private toast: NgToastService
  ) { }

  ngOnInit(): void {
    this.getProjetos();
  }

  getProjetos(): void {
    this.projetoService.getProjeto().subscribe((projetos) => (this.projetos = projetos));
  }

  // toggleAddForm() {
  //   this.showAddForm = !this.showAddForm;
  // }

  hideAddProjectPopup() {
    this.showAddForm = false;
  }


  onProjetoAdded(newProjeto: Projeto): void {
    this.hideAddProjectPopup();
    this.projetos.push(newProjeto);
    this.toast.success({ detail: 'Success Message', summary: 'Holiday added sucefully', duration: 5000 })
  }

  // Método para filtrar colaboradores por nome
  filtrarPorNome() {
    if (this.nomeFiltro.trim() !== '') {
      this.projetoService.filterProjetoByName(this.nomeFiltro).subscribe(
        projetosFiltrados => {
          this.projetos = projetosFiltrados;
        }
      );
    } else {
      // Se o campo de filtro estiver vazio, carregue todos os colaboradores
      this.getProjetos();
    }
  }
}


