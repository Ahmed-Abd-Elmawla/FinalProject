import { Component } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserData } from '../Model/user-data';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent {
  //global variables ---------------------------------------------------------------------------------
  user!:UserData;

  constructor(config: NgbModalConfig, private modalService: NgbModal){
		config.backdrop = 'static';
		config.keyboard = false;
  }

  ngOnInit(){
    this.user = JSON.parse(localStorage.getItem('user') || '[]');
  }

  open(content:any) {
		this.modalService.open(content);
	}
}
