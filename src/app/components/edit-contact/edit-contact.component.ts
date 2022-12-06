import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IContact } from 'src/app/models/Icontact';
import { IGroup } from 'src/app/models/IGroup';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {

  public contactId:string|null=null;
  public contact:IContact={} as IContact
  public groups:IGroup[] =[]
  public loading:boolean =false
  public errorMessage: string | null = null;

  constructor(private activatedRoute:ActivatedRoute ,private contactService:ContactService,private router:Router) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params)=>{
      this.contactId=params.get('contactId')
    })
    this.contactService.getContact(this.contactId).subscribe((data)=>{
      this.contact=data
      this.contactService.getAllGroups().subscribe((data)=>{
        this.groups=data
      })
    },(error)=>{
      this.errorMessage=error
    })
  }




  public submitUpdate(){
    if(this.contactId){
      this.contactService.updateContact(this.contact,this.contactId).subscribe((data)=>{
        this.router.navigate(['/']).then()
      },(error)=>{
        this.errorMessage=error
        this.router.navigate([`/contact/edit/${this.contactId}`]).then()
      })
    }

  }
}
