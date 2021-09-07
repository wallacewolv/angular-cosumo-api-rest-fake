import { Component, OnInit } from '@angular/core';
import { CarService } from './services/car.service';
import { Car } from './models/car';
import { MotorcycleService } from './services/motorcycle.service';
import { Motorcycle } from './models/motorcycle';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  title = 'angular-http app is running!';

  public car = {} as Car;
  public cars!: Car[];

  public motorcycle = {} as Motorcycle;
  public motorcycles!: Motorcycle[];

  constructor(
    private carService: CarService,
    private motorcycleService: MotorcycleService
  ) { }

  ngOnInit() {
    this.getCars();
    this.getMotorcycles();
  }

  // define se um carro será criado ou atualizado
  saveCar(form: NgForm) {
    if (this.car.id !== undefined) {
      this.carService.updateCar(this.car).subscribe(() => {
        this.cleanFormCar(form);
      });
    } else {
      this.carService.saveCar(this.car).subscribe(() => {
        this.cleanFormCar(form);
      });
    }
  }

  // Chama o serviço para obtenção de todos os carros
  getCars() {
    this.carService.getCars().subscribe((cars: Car[]) => {
      this.cars = cars;
    });
  }

  // deleta um carro
  deleteCar(car: Car) {
    this.carService.deleteCar(car).subscribe(() => {
      this.getCars();
    });
  }

  // copia o carro para ser editado.
  editCar(car: Car) {
    this.car = { ...car };
  }

  // limpa o formulario dos carros
  cleanFormCar(form: NgForm) {
    this.getCars();
    form.resetForm();
    this.car = {} as Car;
  }


  // define se uma moto será criado ou atualizado
  saveMotorcycle(form: NgForm) {
    if (this.motorcycle.id !== undefined) {
      this.motorcycleService.updateMotorcycle(this.motorcycle).subscribe(() => {
        this.cleanFormMotorcycle(form);
      });
    } else {
      this.motorcycleService.saveMotorcycle(this.motorcycle).subscribe(() => {
        this.cleanFormMotorcycle(form);
      });
    }
  }

  // Chama o serviço para obtenção de todos as motos
  getMotorcycles() {
    this.motorcycleService.getMotorcycles().subscribe((motorcycles: Motorcycle[]) => {
      this.motorcycles = motorcycles;
    });
  }

  // deleta uma moto
  deleteMotorcycle(motorcycle: Motorcycle) {
    this.motorcycleService.deleteMotorcycle(motorcycle).subscribe(() => {
      this.getMotorcycles();
    });
  }

  // copia a moto para ser editada.
  editMotorcycle(motorcycle: Motorcycle) {
    this.motorcycle = { ...motorcycle };
  }

  // limpa o formulario das motos
  cleanFormMotorcycle(form: NgForm) {
    this.getMotorcycles();
    form.resetForm();
    this.motorcycle = {} as Motorcycle;
  }
}
