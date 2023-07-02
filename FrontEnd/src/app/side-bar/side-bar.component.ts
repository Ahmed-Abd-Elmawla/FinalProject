import { Component } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent {

  constructor(config: NgbModalConfig, private modalService: NgbModal){
		config.backdrop = 'static';
		config.keyboard = false;
  }

  ngOnInit(){

  }

  open(content:any) {
		this.modalService.open(content);
	}
}
