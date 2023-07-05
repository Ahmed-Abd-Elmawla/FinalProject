
import { Component, OnInit , ViewChild, ElementRef } from '@angular/core';
import Pusher from 'pusher-js';
import { ChangeDetectorRef } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { UserService } from '../services/user.service';
import  'jquery';
import 'bootstrap';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})



export class ChatComponent implements OnInit {
  @ViewChild('chatContainer', { static: false }) chatContainer!: ElementRef;
  logoUrl: string = 'assets/images/logo.png';
  messages: any[] = [];
  message = '';
  authUser: any;
  username: string = '';
  users: any[] = [];
  selectedUser: any;
  currentUserId!: number ; 
 
 
  constructor(
    private chatService: ChatService,
    private userService: UserService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const users = localStorage.getItem('user');
    if (users) {
      this.authUser = JSON.parse(users);
      this.username = this.authUser.name;
      this.currentUserId = this.authUser.id;
    }

    Pusher.logToConsole = true;

    const pusher = new Pusher('e41f286dcd02aa5445fe', {
      cluster: 'eu'
    });

       const channel = pusher.subscribe('chat');
      channel.bind('NewChatMessage', (data: { message: string, sender_id: number, receiver_id: number }) => {
        this.handleNewChatMessage(data);
  
      });
      
      
  
   

    this.checkOnlineStatus();
    this.loadUsers();
  }

 

  selectUser(user: any): void {
    this.selectedUser = user;
    if (this.chatContainer && this.chatContainer.nativeElement) {
      this.chatContainer.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
  }
  


  handleNewChatMessage(data: { message: string, sender_id: number, receiver_id: number }): void {
    this.messages.push(data.message);
    this.cdr.detectChanges();
  }
  

  submit(): void {
    if (this.selectedUser) {
      console.log('Submit button clicked');
      console.log('Message:', this.message);
  
      this.chatService.postMessage(this.message, this.selectedUser.id).subscribe(() => {
        console.log('Message sent successfully');
        this.message = '';
      });
    }
  }
  

  loadUsers(): void {
    this.userService.getAllUsers().subscribe((data: any) => {
      this.users = data;
    });
  }

  checkOnlineStatus(): void {
    setInterval(() => {
      this.users.forEach(user => {
        const threshold = new Date().getTime() - 1 * 60 * 1000; 
        const lastSeenAt = new Date(user.last_seen_at).getTime();
        user.isOnline = lastSeenAt > threshold;
      });
    }, 5000); 
  }

}
