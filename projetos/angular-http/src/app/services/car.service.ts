import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { urlConfig } from './../config/url.config';
import { Car } from '../models/car';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  // url = 'http://localhost:3000/cars'; // api rest fake carros

  // injetando o HttpClient
  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  // Obtem todos os carros
  getCars(): Observable<Car[]> {
    return this.httpClient.get<Car[]>(urlConfig.getUrlCar)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  // Obtem um carro pelo id
  getCarById(id: number): Observable<Car> {
    return this.httpClient.get<Car>(urlConfig.getUrlCar + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // Salva um carro
  saveCar(car: Car): Observable<Car> {
    return this.httpClient.post<Car>(urlConfig.getUrlCar, JSON.stringify(car), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // Atualiza um carro
  updateCar(car: Car): Observable<Car> {
    return this.httpClient.put<Car>(urlConfig.getUrlCar + '/' + car.id, JSON.stringify(car), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // Deleta um carro pelo id
  deleteCar(car: Car) {
    return this.httpClient.delete<Car>(urlConfig.getUrlCar + '/' + car.id, this.httpOptions)
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
