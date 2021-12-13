import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Socket } from 'ngx-socket-io';
import { BotService } from './services/bot.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  socketId: any = null;
  logs: Array<any> = [];
  botRunning = false;
  sniperForm: FormGroup = new FormGroup({
    socketId: new FormControl('', Validators.required),
    rpc: new FormControl(
      'https://bsc-dataseed1.defibit.io/',
      Validators.required
    ),
    privateKey: new FormControl('', Validators.required),
    amountToBuy: new FormControl('', Validators.required),
    amountOutMin: new FormControl('', Validators.required),
    recipient: new FormControl('', Validators.required),
    gasLimit: new FormControl(450000, Validators.required),
    gasPrice: new FormControl(15, Validators.required),
    token: new FormControl('', Validators.required),
    decimals: new FormControl(18, Validators.required),
  });

  constructor(private socket: Socket, private botService: BotService) {}

  ngOnInit() {
    this.socket.fromEvent('socketId').subscribe((socketId: any) => {
      console.log('socketId', socketId);
      this.sniperForm.get('socketId')?.setValue(socketId);
    });
    this.socket.fromEvent('logs').subscribe((log: any) => {
      console.log('logs' + log);
      this.logs.push(log);
      let terminalContent: any = document.getElementById('terminal-content');
      terminalContent.scrollTop =
        (document.getElementById('terminal-content') as any)?.scrollHeight + 50;
    });
  }

  startBot() {
    console.log(this.sniperForm.value);
    if (this.sniperForm.valid) {
      this.botService
        .startPairCreatedListner(this.sniperForm.value)
        .subscribe((res) => {
          setTimeout(() => {
            this.botRunning = true;
          }, 0);
        });
    }
  }

  terminateBot() {
    console.log('stop');

    this.botService
      .removeAllListners(this.sniperForm.value.socketId)
      .subscribe((res) => {
        setTimeout(() => {
          this.botRunning = false;
        }, 0);
      });
  }
}
