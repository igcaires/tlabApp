import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: []
})
export class RegistrationComponent implements OnInit {

  constructor(public service: UserService, private toast: ToastrService) { }

  ngOnInit(): void {
    this.service.formModel.reset();
  }

  onSubmit() {
    this.service.register().subscribe(
      (response: any) => {
        if (response.succeeded) {
          this.service.formModel.reset();
          this.toast.success('Usuário cadastrado com sucesso', 'Sucesso!')
        } else {
          response.errors.forEach(element => {
            switch (element.code) {
              case 'DuplicateUserName':
                this.toast.error('Usuário já cadastrado', 'Error!')
                break;
              default:
                this.toast.error(element.description, 'Error!')
                break;
            }
          });
        }
      },
      error => {
        console.log(error);
      },
    )
  }
}
