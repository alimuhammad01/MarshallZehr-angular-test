import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Children Routes Specified
const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./conversion/conversion.module').then((m) => m.ConversionModule),
  },
//  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
