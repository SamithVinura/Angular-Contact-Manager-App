import { Component, OnInit } from '@angular/core';
import { IContact } from 'src/app/models/Icontact';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact-manager',
  templateUrl: './contact-manager.component.html',
  styleUrls: ['./contact-manager.component.css'],
})
export class ContactManagerComponent implements OnInit {
  public loading: boolean = false;
  public contacts: IContact[] = [];
  public errorMessage: string | null = null;
  public searchValue :string =''
  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.getAllContactsFromServer()
  }

  public getAllContactsFromServer(){
    this.loading = true;
    this.contactService.getAllContacts().subscribe((data: IContact[]) => {
      this.contacts = data;
      this.loading = false;
    },(error)=>{
      this.errorMessage =error
      this.loading=false
    });
  }
  public deleteContact(conatctId:string|undefined){
    if(conatctId){
      this.contactService.deleteContact(conatctId).subscribe((data)=>{
        this.getAllContactsFromServer()
      },(error)=>{
        this.errorMessage=error
      })
    }
  }


}
