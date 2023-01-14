import { LocalService } from './../../../../services/local.service';
import { Persona } from './../../../../models/persona';
import { PersonasService } from './../../../../services/personas.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ingresar-votos',
  templateUrl: './ingresar-votos.component.html',
  styleUrls: ['./ingresar-votos.component.scss']
})
export class IngresarVotosComponent implements OnInit {

  constructor(private fb:FormBuilder, private perSvc:PersonasService, private localService:LocalService) { }
errorMessage;
datospersona=false;
dni;
nombre_completo;
id_persona;
estadoVoto;
  ingresarVoto = this.fb.group({
    dni:['', [Validators.required, Validators.minLength(7)]]
  })

  user = this.localService.getJsonValue('user');
  ngOnInit(): void {
  }

  isValidField(field: string): boolean {
    this.getErrorMessage(field);
    return (
      (this.ingresarVoto.get(field).touched || this.ingresarVoto.get(field).dirty) &&
      !this.ingresarVoto.get(field).valid
    );
  }

  checkField(field: string): boolean {
    return this.isValidField(field);
  }

  private getErrorMessage(field: string): void {
    const { errors } = this.ingresarVoto.get(field);

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

  onSave(){
    if(this.ingresarVoto.valid){
      this.perSvc.findPersonbyDNI(this.ingresarVoto.value).subscribe(res=>{
        if(res==false){
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'No se encontró persona con el DNI ingresado.',
          })
        }else{
          this.perSvc.verificarVoto(res.id_persona).subscribe(voto=>{
            this.estadoVoto=voto.estado_voto
          })
          this.datospersona=true
          this.dni=res.dni
          this.id_persona=res.id_persona
          this.nombre_completo=res.nombre_completo

        }
      })
    }else{

    }
  }

  confirmaVoto(id_persona){
          this.perSvc.confirmarVoto(id_persona, this.user.userId).subscribe(res=>{
          if(res==true){
        Swal.fire('Confirmado!', '', 'success')
        setTimeout(() => {
          Swal.close();
          this.ingresarVoto.patchValue({dni:['']});
          this.datospersona=false;
          this.estadoVoto=null
        }, 2000);
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Ocurrio un error!',
          text: 'Voto no confirmado.',
        })
      }
      })



  }

}
