import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/shared/event.service';
import { NgForm } from '@angular/forms';
import { Event } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: []
})
export class EventsComponent implements OnInit {

  constructor(public service: EventService, private toast: ToastrService) { }

  ngOnInit(): void {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();

    this.service.formData = {
      Id: 0,
      Description: '',
      StartDate: new Date(),
      EndDate: new Date(),
    };

    this.service.refreshList();
  }

  onSubmit(form: NgForm) {
    if (this.service.formData.Id == 0)
      this.insert(form);
    else
      this.update(form);
  }

  insert(form: NgForm) {
    this.service.postEvent().subscribe(
      res => {
        this.resetForm(form);
        this.toast.success('Evento cadastrado com sucesso', 'Sucesso!')
      },
      err => {
        console.log(err);
      },
    );
  }

  update(form: NgForm) {
    this.service.putEvent().subscribe(
      res => {
        this.resetForm(form);
        this.toast.success('Evento alterado com sucesso', 'Sucesso!')
      },
      err => {
        console.log(err);
      },
    );
  }
}
