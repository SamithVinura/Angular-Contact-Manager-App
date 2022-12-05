import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { IContact } from '../models/Icontact';
import { IGroup } from '../models/IGroup';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private serverUrl: string = `http://localhost:9000`;

  constructor(private httpClient: HttpClient) {}

  public getAllContacts(): Observable<IContact[]> {
    let dataUrl: string = `${this.serverUrl}/contacts`;
    return this.httpClient.get<IContact[]>(dataUrl).pipe(catchError(this.handleError));
  }


  public getContact(contactId:String):Observable<IContact>{
    let dataUrl:string =`${this.serverUrl}/contacts/${contactId}`
    return this.httpClient.get<IContact>(dataUrl).pipe(catchError(this.handleError));
  }

  public createContact(contact:IContact):Observable<IContact>{
    let dataUrl: string = `${this.serverUrl}/contacts`;
    return this.httpClient.post<IContact>(dataUrl,contact).pipe(catchError(this.handleError));
  }

  public updateContact(contact:IContact,contactId:string):Observable<IContact>{
    let dataUrl: string = `${this.serverUrl}/contacts/${contactId}`;
    return this.httpClient.put<IContact>(dataUrl,contact).pipe(catchError(this.handleError));
  }

  public deleteContact(contactId:string):Observable<{}>{
    let dataUrl: string = `${this.serverUrl}/contacts/${contactId}`;
    return this.httpClient.delete<{}>(dataUrl).pipe(catchError(this.handleError));
  }

  public getAllGroups(): Observable<IGroup[]> {
    let dataUrl: string = `${this.serverUrl}/groups`;
    return this.httpClient.get<IGroup[]>(dataUrl).pipe(catchError(this.handleError));
  }

  public getGroup(contact:IContact):Observable<IGroup>{
    let dataUrl:string =`${this.serverUrl}/groups/${contact.groupId}`
    return this.httpClient.get<IGroup>(dataUrl).pipe(catchError(this.handleError));
  }

  public handleError(error: HttpErrorResponse) {
    let errorMessage: string = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Status : ${error.status} \n Message: ${error.message}`;
    }

    return throwError(errorMessage);
  }
}
