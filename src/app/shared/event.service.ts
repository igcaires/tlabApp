import { Injectable } from '@angular/core';
import { Event, EventDetail } from './event.model';
import { HttpClient } from "@angular/common/http";
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  formData: Event;
  list: EventDetail[];

  constructor(private http: HttpClient) { }
  readonly baseUrl = 'http://localhost:62999/api';

  postEvent() {
    return this.http.post(`${this.baseUrl}/Event`, this.formData);
  }

  putEvent() {
    return this.http.put(`${this.baseUrl}/Event/${this.formData.Id}`, this.formData);
  }

  deleteEvent(id) {
    return this.http.delete(`${this.baseUrl}/Event/${id}`);
  }

  refreshList() {
    this.http.get(`${this.baseUrl}/Event`)
    .toPromise()
    .then((res) => {
      let formatedList: EventDetail[] = [];

      const responseList: Event[] = res as Event[]

      responseList.forEach((e) => {
        formatedList.push(
          <EventDetail>{
            Description: e.Description,
            StartDate: moment(e.StartDate).format('DD/MM/YYYY HH:mm:ss'),
            EndDate: moment(e.EndDate).format('DD/MM/YYYY HH:mm:ss'),
            Id: e.Id,
          }
        );
      });

      this.list = formatedList;
    })
  }
}
