import { Component,EventEmitter,Input,Output } from '@angular/core';
import { Router } from '@angular/router';
import {Property} from '../interfaces/property'
@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css']
})
export class PropertyComponent {
  @Input() propertyItem !: Property;

  @Output() emitFromChild = new EventEmitter()
  constructor(private router: Router){}

  //REDIRECT TO post DETAILS PAGE
  redirectDetails(id : any)
  {console.log(id);
    this.router.navigate(['post-details',id])
}

}
