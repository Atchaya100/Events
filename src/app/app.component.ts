import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EventComponent } from './event/event.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'event';
  date=new Date();
  curdate!:string
  today=this.date.toDateString();
  dat=localStorage.getItem("date");
  i=0
  openDialog(): void {
    const dialogRef = this.dialog.open(EventComponent, {
      width: '650px',
      height: '500px'
    });
    localStorage.setItem("new","true")
  }
  constructor(private route: Router ,private dialog:MatDialog) {
   this.route.routeReuseStrategy.shouldReuseRoute = function () {
   return false;
   };
 }
  ngOnInit(){
    if(this.dat==null){
    localStorage.setItem("date",`${this.today}`)
    let i=0
    localStorage.setItem("id",`${i}`)
    this.route.navigate([`/timeline/${this.today}`]);
    }
    else{
     this.route.navigate([`/timeline/${this.dat}`]);
    }
  }

go(formValue:any){
  if(formValue.curdate==undefined){
       alert("Select date")
  }else{
   this.curdate=new Date(formValue.curdate).toDateString()
   localStorage.setItem("date",`${this.curdate}`)
   this.route.navigate([`/timeline/${this.curdate}`]).then(()=>window.location.reload())
  }
}

next(){
  var c
  if(this.dat!=null){
  c=new Date(`${this.dat}`);
  }
  else{
    c=new Date(`${this.today}`)
  }
  c.setDate(c.getDate()+1);
  localStorage.setItem("date",`${c.toDateString()}`)
  this.dat=localStorage.getItem("date")||"";
  this.route.navigate([`/timeline/${this.dat}`]).then(()=>window.location.reload())
}


prev(){
  var c
  if(this.dat!=null){
  c=new Date(`${this.dat}`);
  }
  else{
    c=new Date(`${this.today}`)
  }
    c.setDate(c.getDate()-1);
    localStorage.setItem("date",`${c.toDateString()}`);
    this.dat=localStorage.getItem("date")||"";
    this.route.navigate([`/timeline/${this.dat}`]).then(()=>window.location.reload())
}

}
