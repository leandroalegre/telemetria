import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  errorMessage = null;
  hide=true

  private subscription:Subscription = new Subscription();
  constructor(private fb:FormBuilder, private authSvc:AuthService, private router:Router) { }
  loginForm = this.fb.group({
    username: [
      '',
      [Validators.required, Validators.minLength(6)],
    ],
    password: ['']
  });

  ngOnInit(): void {
  }


  isValidField(field: string): boolean {
    this.getErrorMessage(field);
    return (
      (this.loginForm.get(field).touched || this.loginForm.get(field).dirty) &&
      !this.loginForm.get(field).valid
    );
  }

  checkField(field: string): boolean {
    return this.isValidField(field);
  }

  private getErrorMessage(field: string): void {
    const { errors } = this.loginForm.get(field);

    if (errors) {
      const messages = {
        required: 'Este campo no puede estar vacío.',
      };

      const errorKey = Object.keys(errors).find(Boolean);
      this.errorMessage = messages[errorKey];
    }
  }


  onLogin():void{

    if(this.loginForm.invalid){
      return;
    }
    const formValue = this.loginForm.value;
    this.subscription.add(
     this.authSvc.login(formValue).subscribe((res)=>{
    if(res.role=="fiscal"){
      this.router.navigate(['/home/ingresar-votos']);
    }else if(res.role=="referente") {
      this.router.navigate(['/reportes/por-referente']);
    }else if(res.role=="operador") {
      this.router.navigate(['/home/panel']);
    }else if(res.role=="fiscal referente"){
      this.router.navigate(['/home/ingresar-votos']);
    }else if(res.role=="admin"){
      this.router.navigate(['/home']);
    }
  })
  );
  }

}
