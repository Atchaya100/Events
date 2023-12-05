import { Component } from '@angular/core';
import { MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Events } from '../data.model';
import { EventService } from './event.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent {
constructor(private dialogRef: MatDialogRef<EventComponent>,private service:EventService,private route:Router) {
  this.route.routeReuseStrategy.shouldReuseRoute = function () {
    return false;
    };
}
title!:string
date!:string
start!:string
end!:string;
id!:number;
ngOnInit(){
  if(localStorage.getItem("new")=="false"){
  let i=Number(localStorage.getItem("current"))
  let a=JSON.parse(localStorage.getItem("Events")||"")
  const ans=a.filter((item:any)=>item.id===i)
  this.title=ans[0].title
  const d=new Date(ans[0].startTime.slice(0,15))
  this.date=`${d.getDate()}-${d.getMonth()}-${d.getFullYear()}`
  console.log(this.date)
  this.start=ans[0].startTime.slice(16,21)
  this.end=ans[0].endTime.slice(16,21)
  this.id=ans[0].id
  }
}
add(formValue:any){
  const d=new Date(formValue.date).toDateString()
  const a={
    startTime:d+" "+formValue.start+":00 GMT+0530 (IST)",
    endTime:d+" "+formValue.end+":00 GMT+0530 (IST)",
    title:formValue.title,
    id:Number(localStorage.getItem("id"))+1,
  }
  const b:Events[]=[]
  if(localStorage.getItem("Events")!=null){
  var c=JSON.parse(localStorage.getItem("Events")||"")
  for(let i=0;i<c.length;i++){
    b.push(c[i])
  }
}
if(localStorage.getItem("new")=="true"){
  let i=Number(localStorage.getItem("id"))+1
  localStorage.setItem("id",`${i}`)
  b.push(a)
}
else{
  a.id=this.id
  for(let i=0;i<b.length;i++){
    if(b[i].id==a.id){
      b.splice(i,1);
    }
  }
  b.push(a)
}
  localStorage.setItem("Events",JSON.stringify(b))
  this.dialogRef.close()
  localStorage.setItem("date",`${d}`)
  this.route.navigate([`/timeline/${d}`]).then(()=>window.location.reload())
  localStorage.setItem("new","false")
 
}



close(){
  localStorage.setItem("new","false")
   this.dialogRef.close()
}
}
