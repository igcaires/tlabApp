import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/shared/event.service';
import { Event, EventDetail } from 'src/app/shared/event.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: []
})
export class EventsListComponent implements OnInit {

  constructor(public service: EventService, private toast: ToastrService) { }

  ngOnInit(): void {
  }

  populateForm(eventDetail: EventDetail) {
    let formData: Event = <Event>{
      Id: eventDetail.Id,
      Description: eventDetail.Description,
    };

    this.service.formData = Object.assign({}, formData);
  }

  onDelete(id) {
    if (confirm('Deseja realmente remover o evento?')) {
      this.service.deleteEvent(id)
      .subscribe(
        res => {
          this.service.refreshList();
          this.toast.success('Evento removido com sucesso', 'Sucesso!')
        },
        err => {
          console.log(err);
        },
      );
    }
  }
}
