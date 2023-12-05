import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EventService } from '../event/event.service';
import { Router } from '@angular/router';
import { EventComponent } from '../event/event.component';
import { Events } from '../data.model';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent {
  constructor(private dialogRef: MatDialogRef<ViewComponent>,private service:EventService,private route:Router,private dialog:MatDialog) {}
  ngOnInit(){
    let i=Number(localStorage.getItem("current"))
    let a=JSON.parse(localStorage.getItem("Events")||"")
    const ans=a.filter((item:any)=>item.id===i)
    this.title=ans[0].title
    this.id=ans[0].id
    this.start=ans[0].startTime
    this.end=ans[0].endTime
  }
  title!:string
  start!:string
  end!:string
  id!:number
  close(){
    this.dialogRef.close()
 }
 edit(){
  const dialogRef = this.dialog.open( EventComponent, {
    width: '650px',
    height: '500px'
  });
  this.close()
 }
 delete(){
  const b:Events[]=[]
  var c=JSON.parse(localStorage.getItem("Events")||"")
  for(let i=0;i<c.length;i++){
    b.push(c[i])
  }
  for(let i=0;i<b.length;i++){
    if(b[i].id==this.id){
      b.splice(i,1);
    }
  }
  localStorage.setItem("Events",JSON.stringify(b))
  this.route.navigate([`/timeline/${localStorage.getItem("date")}`]).then(()=>window.location.reload())

 }
}
