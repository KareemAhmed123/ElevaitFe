import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from './books/book.model';

@Injectable({
  providedIn: 'root',
})

export class ApiserviceService {
  constructor(private _http: HttpClient) {}


  apiUrl = 'http://localhost:8000/api/documents';

  book:any;

  getAllData(): Observable<any> {
    return this._http.get(`${this.apiUrl}`);
  }

  getDocument(id:any): Observable<any> {
    return this._http.get(`${this.apiUrl}/`+id);
  }

  addBook(book:any): Observable<any> {
    console.log(book);
    return this._http.post<Book>(`${this.apiUrl}`,book);
  }

  addPage(id:any,text:string,page:number): Observable<any> {
    return this._http.post<Book>(`${this.apiUrl}/`+id,{text:text,pageNr:page});
  }

  delete(id:any): Observable<any> {
    return this._http.delete(`${this.apiUrl}/`+id);
  }
}
