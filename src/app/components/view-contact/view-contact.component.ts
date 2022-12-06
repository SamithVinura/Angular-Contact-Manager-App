import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IContact } from 'src/app/models/Icontact';
import { ContactService } from 'src/app/services/contact.service';
import { IGroup } from '../../models/IGroup';

@Component({
  selector: 'app-view-contact',
  templateUrl: './view-contact.component.html',
  styleUrls: ['./view-contact.component.css']
})
export class ViewContactComponent implements OnInit {

  public contactId:string|null=null;
  public contact:IContact={} as IContact
  public group:IGroup ={} as IGroup
  public loading:boolean =false
  public errorMessage: string | null = null;

  constructor(private activatedRoute:ActivatedRoute,private contactService:ContactService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params)=>{
      this.contactId=params.get('contactId')
    })
    this.contactService.getContact(this.contactId).subscribe((data)=>{
      this.contact=data
      this.contactService.getGroup(data).subscribe((data)=>{
        this.group=data
      })
    },(error)=>{
      this.errorMessage=error
    })

  }

}
