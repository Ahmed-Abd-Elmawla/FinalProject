import { Component, OnInit } from '@angular/core';
import Pusher from 'pusher-js';
import { ChatService } from '../services/chat.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  logoUrl: string = 'assets/images/logo.png';
  messages: { message: string }[] = [
    { message: 'Hello! How are you?' }
  ];
  message = '';

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    Pusher.logToConsole = true;

    const pusher = new Pusher('e41f286dcd02aa5445fe', {
      cluster: 'eu'
    });

    const channel = pusher.subscribe('chat');
    channel.bind('NewChatMessage', (data: { message: string }) => {
      this.messages.push(data);
    });
  }

  submit(): void {
    console.log('Submit button clicked');
    console.log('Message:', this.message);

    this.chatService.postMessage(this.message).subscribe(() => {
      console.log('Message sent successfully');
      this.message = '';
    });
  }


}
