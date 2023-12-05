import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EventService } from '../event/event.service';
import { Events } from '../data.model';
import { EventComponent } from '../event/event.component';
import { ViewComponent } from '../view/view.component';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent {
  constructor(private route:ActivatedRoute,private dialog:MatDialog,private service:EventService,private routes:Router,private cdr: ChangeDetectorRef){
    this.routes.routeReuseStrategy.shouldReuseRoute = () => false;
  }
 
  ngOnInit(){
      if(this.route.snapshot.paramMap.get("id")==localStorage.getItem("date")){
        if(localStorage.getItem("Events")!=null){
        this.a=JSON.parse(localStorage.getItem("Events")||"")
        this.getEvents()
        }
       }
       
    
  }
  a:any
  createDoc(a:Events){
      var n=document.createElement("p")
      n.style.backgroundColor="rgb(176, 176, 195)";
      n.style.height="30px"
      n.style.fontSize="16px"
      n.style.width="80%"
      n.style.textAlign="center"
      n.style.color="white"
      n.style.borderRadius="8px"
      n.onclick=()=>{
        const dialogRef = this.dialog.open(ViewComponent, {
          width: '650px',
          height: '300px'
        });
      }
      n.innerHTML+=`<p>${a.startTime.slice(15,21)}-${a.endTime.slice(15,21)} Event : ${a.title}</p>`;
      return n
      
      
     } 
  
  getEvents(){
    this.a=JSON.parse(localStorage.getItem("Events")||"")
   
    const events:Events[]=[]
    for(let i of this.a){
        if(i.startTime.slice(0,15)==localStorage.getItem("date")){
          events.push(i)
        }
        
      }
      console.log(events)
        for(let i of events){
          var h1=Number(i.startTime.slice(16,18))
          var h2=Number(i.endTime.slice(16,18))
          var m1=Number(i.startTime.slice(19,21))
          var m2=Number(i.endTime.slice(19,21))
          if(h1==h2 ||(h2==h1+1 && m1-m2<=30)){
           var c= document.getElementById(`${i.startTime.slice(16,18)}`)
          if(c!=null){
            c.style.backgroundColor="white";
            var n=this.createDoc(i)
            localStorage.setItem("current",`${i.id}`)
            c.appendChild(n)
           } 
           
          }
          else{
            var c= document.getElementById(i.endTime.slice(16,18))
            if(c!=null){
              c.style.backgroundColor="white";
              var n=this.createDoc(i)
              c.appendChild(n)
            }
            localStorage.setItem("current",`${i.id}`)
            for(let j=h1;j<h2+1;j++){
            var k=j.toString().padStart(2,'0')
            var d= document.getElementById(k)
            console.log(d,k)
            if(d!=null){
            console.log(j)
            d.style.backgroundColor="white";
            d.style.margin="0px"
            d.style.marginLeft="10px"
            }
            }
            
          }
        }
       
        
     
  }
   
   
  }

