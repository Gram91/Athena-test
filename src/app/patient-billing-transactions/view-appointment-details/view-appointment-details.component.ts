import { Component, OnInit } from '@angular/core';
import {SelectItem} from 'primeng/api';
import {AppService} from '../../app.service';
import{Bill} from '../../bill';
import { ActivatedRoute,Router } from '@angular/router';
@Component({
  selector: 'app-view-appointment-details',
  templateUrl: './view-appointment-details.component.html',
  styleUrls: ['./view-appointment-details.component.css']
})
export class ViewAppointmentDetailsComponent implements OnInit {
  fromDate:Date;
  toDate:Date;
  status:SelectItem[];
selectedStatus:SelectItem;
searchPattern:any;
appointmentData = [];
selectedId:any;
tempData = [];
showTransactionData=false;
  constructor(private appService:AppService,private route: ActivatedRoute,
    private router: Router) { }
bills :Bill []=[]
  ngOnInit() {
    this.status = [
      {label:'partial', value:"Due Billed"},
      {label:'full', value:"Fully Billed"},
      {label:'unpaid', value:"Not Yet Billed"}
  ];
  // this.appointmentData = [{vin:12345,year:2012,brand:"Audi",color:"red"}];
  this.appService.getAll().subscribe((val: Bill[])=>{
    console.log(val);
    this.appointmentData  = val;
    this.tempData = val;
    
  })
  }

  searchData(data)
  {
    this.tempData = this.appointmentData;
    
    if((this.selectedStatus!==undefined && this.selectedStatus!=null) || ( this.fromDate!==undefined && this.fromDate!==null) || (this.toDate!==undefined && this.toDate!==null) || (this.searchPattern!==undefined && this.searchPattern!==null && this.searchPattern!==''))
    {
if(this.selectedStatus!==undefined && this.selectedStatus!=null)
{
this.tempData = this.appointmentData.filter(obj=>obj.billingData.status===this.selectedStatus)
}

if(this.fromDate!==undefined && this.fromDate!==null){
  

  var record=[];
  for(let i=0;i<this.appointmentData.length;i++)
  {
    let formattedDate = new Date(this.appointmentData[i].appointmentDate);
    if(formattedDate.getTime()>this.fromDate.getTime())
    {
      record.push(this.appointmentData[i]);
    }
  }
  this.tempData = record;
  
}

if(this.toDate!==undefined && this.toDate!==null)
{
 // let tempToDate = this.toDate;
  var record=[];
  for(let i=0;i<this.appointmentData.length;i++)
  {
    let formattedToDate = new Date(this.appointmentData[i].appointmentDate);
    if(formattedToDate.getTime()<this.toDate.getTime())
    {
      record.push(this.appointmentData[i]);
    }
  }
  this.tempData = record;
}

if(this.searchPattern!==undefined && this.searchPattern!==null && this.searchPattern!=='')
{
  if(this.searchPattern.includes("male") || this.searchPattern.includes("female") )
  {
    
    this.tempData = this.appointmentData.filter(data=> this.searchPattern.toUpperCase() === data.gender.toUpperCase());
  }
  else if(typeof this.searchPattern==="string")
  {
    this.tempData = this.appointmentData.filter(data=> this.searchPattern.toUpperCase().includes(data.name.toUpperCase()));
  }
}
  }

  else{
    this.tempData = this.appointmentData;
  }
}

  routeTransaction(data)
  {
    this.showTransactionData = true
    this.selectedId = data.id;
    this.router.navigate(["/billing/patientBillingTransactions/transactions"],{ queryParams: { id: this.selectedId} })
    console.log("clicked");
  }

}
