import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddContactComponent } from './components/add-contact/add-contact.component';
import { ContactManagerComponent } from './components/contact-manager/contact-manager.component';
import { EditContactComponent } from './components/edit-contact/edit-contact.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ViewContactComponent } from './components/view-contact/view-contact.component';

const routes: Routes = [
  {path:'',redirectTo:'contacts/admin',pathMatch:'full'},
  {path:'contacts/admin',component:ContactManagerComponent},
  {path:'contact/add',component:AddContactComponent},
  {path:'contact/edit/:id',component:EditContactComponent},
  {path:'contact/view/:id',component:ViewContactComponent},
  {path:'**',component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
