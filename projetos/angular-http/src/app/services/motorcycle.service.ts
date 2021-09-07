import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { urlConfig } from './../config/url.config';
import { Motorcycle } from '../models/motorcycle';

@Injectable({
  providedIn: 'root'
})
export class MotorcycleService {

  // url = 'http://localhost:3000/motorcycle'; // api rest fake de motos

  // injetando o HttpClient
  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  // Obtem todas as motos
  getMotorcycles(): Observable<Motorcycle[]> {
    return this.httpClient.get<Motorcycle[]>(urlConfig.getUrlMotorcycle)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  // Obtem uma moto pelo id
  getMotorcycleById(id: number): Observable<Motorcycle> {
    return this.httpClient.get<Motorcycle>(urlConfig.getUrlMotorcycle + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // Salva uma moto
  saveMotorcycle(motorcycle: Motorcycle): Observable<Motorcycle> {
    return this.httpClient.post<Motorcycle>(urlConfig.getUrlMotorcycle, JSON.stringify(motorcycle), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // Atualiza uma moto
  updateMotorcycle(motorcycle: Motorcycle): Observable<Motorcycle> {
    return this.httpClient.put<Motorcycle>(urlConfig.getUrlMotorcycle + '/' + motorcycle.id, JSON.stringify(motorcycle), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // Deleta uma moto pelo id
  deleteMotorcycle(motorcycle: Motorcycle) {
    return this.httpClient.delete<Motorcycle>(urlConfig.getUrlMotorcycle + '/' + motorcycle.id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // Manipulação de erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `mensagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };

  /**
   * Metodos get, post, put e delete para manipulação dos carros
   *
   * this.httpClient.get<Car[]>(this.url)
   * this.httpClient.post<Car>(this.url, JSON.stringify(car), this.httpOptions)
   * this.httpClient.put<Car>(this.url + '/' + car.id, JSON.stringify(car), this.httpOptions)
   * this.httpClient.delete<Car>(this.url + '/' + car.id, this.httpOptions)
   *
   */
}
