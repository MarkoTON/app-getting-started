import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AddUserComponent } from './add-user/add-user.component';
import { HomeComponent } from './home/home.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  {path:'', component: HomeComponent, pathMatch: 'full'},
  {path:'home', component: HomeComponent},
  {path:'about/:id', component: AboutComponent},
  {path:'edit/:id', component: EditComponent},
  {path:'add-user', component: AddUserComponent},
  {path:'**', component: HomeComponent},
];

// Gard za about i resorver
// Ako nije prosao guard da idem na error stranicu

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
