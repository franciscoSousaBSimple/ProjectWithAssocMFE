import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Projeto } from '../IProjeto';
import { Observable, catchError, map, of} from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  
  export class ProjetosService {
  
    constructor(private http: HttpClient) {}
    url = 'http://localhost:5186';
    urlC = 'http://localhost:5188';
  
    httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
  
    /** GET heroes from the server */
    getProjeto(): Observable<Projeto[]> {
      return this.http
        .get<Projeto[]>(this.url + '/api/Project')
        .pipe(catchError(this.handleError<Projeto[]>('getProject', []))
      );
    }
  
    /** POST: add a new project to the server */
    addProject(projetos: Projeto): Observable<Projeto> {
      return this.http.post<Projeto>(this.urlC + '/api/Project', projetos, this.httpOptions).pipe(
        catchError(this.handleError<Projeto>('addProject'))
      );
    }
  
    private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
        // TODO: send the error to remote logging infrastructure
        console.error(error); // log to console instead
        // Let the app keep running by returning an empty result.
        return of(result as T);
      };
    }
  
    filterProjetoByName(name: string): Observable<Projeto[]> {
      return this.getProjeto().pipe(
        map(projetos => projetos.filter(projeto =>
          projeto.name.toLowerCase().includes(name.toLowerCase())
        ))
      );
    }
  
  }