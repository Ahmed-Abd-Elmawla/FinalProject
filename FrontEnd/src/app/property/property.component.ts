import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Property } from '../interfaces/property';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css']
})
export class PropertyComponent {
  @Input() propertyItem !: Property;
  
  @Output() emitFromChild = new EventEmitter()
}
