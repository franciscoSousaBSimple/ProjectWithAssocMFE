import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { IAssociation } from '../IAssociation';

@Injectable({
  providedIn: 'root'
})
export class AssociationServiceService {

  public urlGet = 'https://localhost:5041';
  public urlPost = 'https://localhost:5031';
  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  /** GET associations from the server */
  getAssociations(): Observable<IAssociation[]> {
    return this.httpClient
      .get<IAssociation[]>(this.urlGet + '/api/Association')
      .pipe(catchError(this.handleError));
  }

  /** POST: add a new project to the server */
  addAssociation(IAssociation: IAssociation): Observable<IAssociation> {
    return this.httpClient.post<IAssociation>(this.urlPost + '/api/Association', IAssociation, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  editAssociation(association: IAssociation): Observable<IAssociation> {
    const id = association.id
    const url = this.urlPost + '/api/Association/' + id; // URL incluindo o ID do projeto
    return this.httpClient.put<IAssociation>(url, association, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  handleError(error: HttpErrorResponse) {
    return throwError(() => {
      console.log("error: " + error.message)
      return error;
    });
  }
}
