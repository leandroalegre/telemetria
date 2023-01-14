import { LocalService } from './../../../../services/local.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nwpass',
  templateUrl: './nwpass.component.html',
  styleUrls: ['./nwpass.component.scss']
})
export class NwpassComponent implements OnInit, OnDestroy {
hide=true;
user = this.localService.getJsonValue('user');
errorMessage=null;
private subscription:Subscription = new Subscription();
  constructor(private router: ActivatedRoute, private fb: FormBuilder, private authSvc: AuthService, private Router: Router, private localService: LocalService) { }

  ngOnInit(): void {


  }

Nwform = this.fb.group({
    password: [
      '',
      [Validators.required, Validators.minLength(6)],
    ],
    passwordConfirm: [
      '',
      [Validators.required, Validators.minLength(6)],
    ],
    id: [
      this.user.id
    ]

  });

  isValidField(field: string): boolean {
    this.getErrorMessage(field);
    return (
      (this.Nwform.get(field).touched || this.Nwform.get(field).dirty) &&
      !this.Nwform.get(field).valid
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onNwpass():void{
    if(this.Nwform.invalid){
      return;
    }
    const formValue = this.Nwform.value;
    if(formValue.password!=formValue.passwordConfirm){
      Swal.fire('Ocurrio un error...', 'Las contraseñas no coinciden.', 'error')
    }else{
    this.subscription.add(
     this.authSvc.changePassword(formValue).subscribe((res)=>{
    if(res.message==='exito'){
      Swal.fire(
        'Exito!',
        'La contraseña fue ingresada.',
        'success'
      )
      this.localService.clearToken();
      setTimeout(() =>
          {
            this.Router.navigate(['/login']);
            Swal.close();
          },
          2000);

    }else{
      Swal.fire('Ocurrio un error...', 'No se ha ingresado la contraseña.', 'error')
    }
  })
  );
}
  }

  checkField(field:string):boolean{
    return this.isValidField(field);
      }

  private getErrorMessage(field: string): void {
    const { errors } = this.Nwform.get(field);

    if (errors) {
      const minlenght = errors?.minlength?.requiredLength;
      const messages = {
        required: 'Este campo no puede estar vacío.',
        minlength: `El campo no puede ser menor a ${minlenght} caracteres.`,
      };

      const errorKey = Object.keys(errors).find(Boolean);
      this.errorMessage = messages[errorKey];
    }
  }
}
