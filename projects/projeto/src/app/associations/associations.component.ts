import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AddAssociationsComponent } from '../add-associations/add-associations.component';
import { Projeto } from '../IProjeto';
import { IAssociation } from '../IAssociation';
import { IColaborator } from '../IColaborator';
import { ProjetosService } from '../services/projetos.service';
import { AssociationServiceService } from '../services/association-service.service';
import { ColaboratorServiceService } from '../services/colaborator-service.service';
import { NgToastService } from 'ng-angular-popup';



@Component({
  selector: 'app-associations',
  standalone: true,
  imports: [AssociationsComponent, HttpClientModule, CommonModule, FormsModule, AddAssociationsComponent],
  templateUrl: './associations.component.html',
  styleUrl: './associations.component.css'
})
export class AssociationsComponent implements OnInit, OnChanges{
  associationsLista: IAssociation[] = [];
  filteredAssociations: IAssociation[] = [];
  searchQuery: string = ''; // Definindo a propriedade 'searchQuery'
  showCreateAssociation: boolean = false;
  showEditAssociation: boolean = false;
  addAssociation: boolean = false;
  getAssociation: boolean = false;
  pollingInterval: any;
  pollingCount: number = 0;
  maxPollingCount: number = 3;
  successMessageVisible: boolean = false;
  colaboratorsIdLista: number[] = [];
  colaboratorsLista: IColaborator[] = [];
  colaboradoresAssocLista: IColaborator[] = [];
  projectsLista: Projeto[] = [];
  projectsAssocLista: Projeto[] = [];
  @Output() fecharAssociationEvent = new EventEmitter<void>();
  @Input() selectedProject!: Projeto;

  constructor(private projService: ProjetosService, private associationService: AssociationServiceService,private colabService: ColaboratorServiceService, private router: Router, private location: Location, private toast: NgToastService) { }
  
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedProject'] && this.selectedProject) {
      this.getAssociations();
  }
  }


  ngOnInit(): void {
    this.getAssociations();
    this.getColabs();
    this.getProjects();
  }

  onAssociationAdded(): void {
    this.pollingInterval = setInterval(() => {
      if (this.pollingCount >= this.maxPollingCount) {
        this.pollingCount = 0;
        clearInterval(this.pollingInterval);
        return;
      }
      this.pollingCount++;
      this.refreshAssociations();
    }, 5000);
  }

  refreshAssociations(): void {
    let previousCount = this.associationsLista.length;
    this.associationService.getAssociations().subscribe((associations: IAssociation[]) => {
      this.associationsLista = associations;
      // this.filteredAssociations = associations;
      this.filteredAssociations = this.associationsLista.filter(assoc => assoc.projectId === this.selectedProject.id);

      const currentCount = this.associationsLista.length;
      if (currentCount > previousCount) {
        this.toast.success({
          detail: 'New Association added!',
          summary: 'Success',
          duration: 5000,
        });
        previousCount = currentCount;
        this.pollingCount = this.maxPollingCount;
      }
    });
    this.showCreateAssociation = false;
  }

  getColaboratorName(colaboratorId: number): string {
    const colaborator = this.colaboradoresAssocLista.find(colab => colab.id === colaboratorId);
    return colaborator ? colaborator.name : 'Nome não encontrado'; // Retorna o nome do colaborador se encontrado, senão retorna uma mensagem padrão
  }
  getColaboratorEmail(colaboratorId: number): string {
    const colaborator = this.colaboradoresAssocLista.find(colab => colab.id === colaboratorId);
    return colaborator ? colaborator.email : 'Email não encontrado'; // Retorna o nome do colaborador se encontrado, senão retorna uma mensagem padrão
  }

  getProjectName(projectId: number): string {
    const project = this.projectsAssocLista.find(proj => proj.id === projectId);
    return project ? project.name : 'Nome não encontrado'; // Retorna o nome do colaborador se encontrado, senão retorna uma mensagem padrão
  }

  getProjects(): void {
    this.projService.getProjeto().subscribe((list: Projeto[]) => {
      this.projectsLista = list;
      this.projectsAssocLista = [];
      this.projectsLista.forEach(proj => {
        this.projectsAssocLista.push(proj)
      });
    });
  }

  getColabs(): void {
    this.colabService.getColabs().subscribe((list: IColaborator[]) => {
      this.colaboratorsLista = list;
      this.colaboradoresAssocLista = [];

      // Percorre a lista de associações
      this.colaboratorsLista.forEach(colaborator => {
        // Busca o colaborador na lista de colaboradores usando o ID da associação
        // const colaborator = this.colaboratorsLista.find(colab => colab.id === association.colaboratorId);
        // if (colaborator && !this.colaboradoresAssocLista.some(colab => colab.id === colaborator.id)) {
        // Se encontrado e não estiver na lista, adiciona à lista de colaboradores associados
        this.colaboradoresAssocLista.push(colaborator);
      });
    });
  }

  editAssociation(): void {
    this.showEditAssociation = !this.showEditAssociation;
  }

  fecharComponente(): void {
    this.fecharAssociationEvent.emit();
  }

  getAssociations(): void {
    this.associationService.getAssociations().subscribe((associations: IAssociation[]) => {
        this.associationsLista = associations;
        // Filtra para mostrar apenas as associações do projeto selecionado
        if (this.selectedProject) {
            this.filteredAssociations = this.associationsLista.filter(
                association => association.projectId === this.selectedProject.id
            );
        } else {
            this.filteredAssociations = [];
        }
    });
}


  listAssociations(): void {
    this.getAssociation = true;
  }

  toggleCreateAssociation(): void {
    this.showCreateAssociation = !this.showCreateAssociation;
  }

  createProject(): void {
    this.addAssociation = true;
  }

  goBack(): void {
    this.location.back();
  }

  search(): void {
    if (this.searchQuery.trim() === '') {
        // Quando não há texto de busca, ainda limita as associações ao projeto selecionado
        this.filteredAssociations = this.associationsLista.filter(assoc => assoc.projectId === this.selectedProject.id);
    } else {
        this.filteredAssociations = this.associationsLista.filter(
            (assoc) => {
                const startDateIncluded = assoc.startDate && assoc.startDate.includes(this.searchQuery);
                const endDateIncluded = assoc.endDate && assoc.endDate.includes(this.searchQuery);
                const projectMatches = assoc.projectId === this.selectedProject.id; // Checa se a associação é do projeto selecionado
                return projectMatches && (startDateIncluded || endDateIncluded ||
                    this.isSearchQueryInDate(assoc.startDate, this.searchQuery) ||
                    this.isSearchQueryInDate(assoc.endDate, this.searchQuery) ||
                    this.isSearchQueryInColaboratorName(assoc.colaboratorId, this.searchQuery) ||
                    this.isSearchQueryInProjectName(assoc.projectId, this.searchQuery));
            }
        );
    }
}




  isSearchQueryInProjectName(projectId: number, searchQuery: string): boolean {
    const project = this.projectsAssocLista.find(proj => proj.id === projectId);
    return project ? project.name.toLowerCase().includes(searchQuery.toLowerCase()) : false;
  }

  isSearchQueryInColaboratorName(colaboratorId: number, searchQuery: string): boolean {
    const colaborator = this.colaboradoresAssocLista.find(colab => colab.id === colaboratorId);
    return colaborator ? colaborator.name.toLowerCase().includes(searchQuery.toLowerCase()) : false;
  }

  isSearchQueryInDate(dateString: string, searchQuery: string): boolean {
    // Formate a data para torná-la mais flexível na pesquisa
    const formattedDate = this.formatDateForSearch(dateString);
    // Verifique se a pesquisa está presente na data formatada
    return formattedDate.includes(searchQuery);
  }

  formatDateForSearch(dateString: string): string {
    // Verifique se a string da data é definida
    if (!dateString) {
        return '';
    }
    return dateString.replace(/-/g, '');
}

}
