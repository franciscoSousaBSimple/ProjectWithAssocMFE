export class Projeto{
  id: number;
  name: string;
  startDate: string;
  endDate: string;

  constructor(id: number, nome: string, starDate: string, endDate: string){
      this.id = id;
      this.name = nome;
      this.startDate = starDate;
      this.endDate = endDate;
  }
}