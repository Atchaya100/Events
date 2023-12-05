import { Injectable } from "@angular/core";
import { Events } from "../data.model";
@Injectable({
    providedIn: 'root'
  })
  export class  EventService {
    events:Events[]=[]
    i=0
  }