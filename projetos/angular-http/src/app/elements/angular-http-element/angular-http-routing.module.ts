import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes:Routes = [
  // {component: FundosAplicarComponent, path: 'fundos-aplicar', outlet: 'appOutlet'}
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
})
export class AngularHttpRoutingModule { }
