import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BotService {

  constructor(private http: HttpClient) {}

  startFastBuy(request: any) {
    return this.http.post(
      `${environment.BE_ENDPOINT}/fast-buy`,
      request
    );
  }

  startFastSell(request: any) {
    return this.http.post(
      `${environment.BE_ENDPOINT}/fast-sell`,
      request
    );
  }

  startPairCreatedListner(request: any) {
    return this.http.post(
      `${environment.BE_ENDPOINT}/pair-created-listner`,
      request
    );
  }

  approve(request: any) {
    return this.http.post(
      `${environment.BE_ENDPOINT}/approve`,
      request
    );
  }

  removeAllListners(socketId: string) {
    return this.http.post(
      `${environment.BE_ENDPOINT}/remove-all-listners`,
      socketId
    );
  }
}
