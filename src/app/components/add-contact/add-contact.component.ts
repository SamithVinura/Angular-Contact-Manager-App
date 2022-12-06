import { Component, OnInit } from '@angular/core';
import { IGroup } from 'src/app/models/IGroup';
import { IContact } from '../../models/Icontact';
import { ContactService } from 'src/app/services/contact.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {

  public contact:IContact={} as IContact
  public groups:IGroup[]=[] as IGroup[]
  public loading:boolean =false
  public errorMessage: string | null = null;

  constructor(private contactService:ContactService,private router:Router) { }

  ngOnInit(): void {
    this.contactService.getAllGroups().subscribe((data)=>{
      this.groups = data
      console.log(data)
    },(error)=>{
      this.errorMessage=error
    })
  }

  public createSubmit(){
    this.contactService.createContact(this.contact).subscribe((data)=>{
      this.router.navigate(['/']).then()
    },(error)=>{
      this.errorMessage=error
      this.router.navigate(['/contact/add']).then()
    })
  }

}
