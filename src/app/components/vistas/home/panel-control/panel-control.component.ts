import { Component, OnInit } from '@angular/core';
import { PanelControlService } from 'src/app/services/panel-control.service';
import { Personas } from 'src/app/models/Personas';
import { Relacion_referente } from 'src/app/models/RelacionReferente'
import { Users } from 'src/app/models/Users';
import sweetalert2 from 'sweetalert2'
import Swal from 'sweetalert2';
import { LocalService } from 'src/app/services/local.service';
import { PersonasService } from 'src/app/services/personas.service';

@Component({
  selector: 'app-panel-control',
  templateUrl: './panel-control.component.html',
  styleUrls: ['./panel-control.component.scss']
})
export class PanelControlComponent implements OnInit {
  userrol: string;
  Votantes: Personas[] = [];
  Referentes: Personas[] = [];
  Rreferente: Relacion_referente[] = [];
  relacion_referido: Relacion_referente = {};
  user: Users = {};
  fiscal: Users;
  opositor: Personas;
  flagfiscal: boolean;
  keyword = 'nombre_completo';
  userr = this.localService.getJsonValue('user');

  constructor(private PanelSvc: PanelControlService, private localService:LocalService, private PerSvc: PersonasService) { }
  ngOnInit(): void {
    this.userrol = this.userr.role;
    this.flagfiscal = false;
    this.opositor = null;
    this.fiscal = null;
    this.PanelSvc.getAllvotantes().subscribe(
      res => {
        this.Votantes = res;
        this.PanelSvc.getAllreferentes().subscribe(
          res => {
            this.Referentes = res;
          }
        )
      }
    )
  }

  selectEvent(item) {
    this.PanelSvc.getRolebypersona(item.id_persona).subscribe(
      res => {
        if(res == false || res[0].role == 'sin rol'){
          Swal.fire({
            title: '¿Desea asignar a '+item.nombre_completo+' como referente?',
            text: 'La persona tendrá un nuevo rol en el sistema.',
            icon: 'info',
            showCancelButton: true,
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar'
          }).then(async (result) => {
            if(result.value){
              this.PanelSvc.nuevoReferente(item.id_persona).subscribe(
                res => {
                  Swal.fire(
                    'Listo!',
                    'Usuario actualizado.',
                    'success'
                  )
                  setTimeout(() =>
                  {
                    this.ngOnInit();
                    Swal.close();
                  },
                  2000);
                }
              )
            }
          })
        }else if(res[0].role == 'referente' || res[0].role == 'fiscal referente' || res[0].role == 'fiscal'){
          let rol;
          rol = res[0].role;
          Swal.fire({
            title: '¡Esta persona ya tiene el rol de "'+rol+'"!',
            text: '¿Desea quitar a '+item.nombre_completo+' como "'+rol+'"?.',
            icon: 'info',
            showCancelButton: true,
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar'
          }).then(async (result) => {
            if(result.value){
              this.user.role = 'sin rol';
              this.PanelSvc.quitarReferente(item.id_persona, this.user).subscribe(
                res => {
                  Swal.fire(
                    'Listo!',
                    'Usuario actualizado.',
                    'success'
                  )
                  setTimeout(() =>
                  {
                    this.ngOnInit();
                    Swal.close();
                  },
                  2000);
                }
              )
            }
          })
        }
      }
    )
  }

  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  guardarreferenciado(){
    if(this.Rreferente[1] == null){
      Swal.fire(
        'Acción bloqueada!',
        'Seleccionar un votante para referenciar.',
        'error'
      )
    }else{
      Swal.fire({
        title: '¿Desea referenciar esta persona?',
        text: 'Su referente quedará como responsable.',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar'
      }).then(async (result) => {
        if(result.value){
          if(this.Rreferente[0] == null){
            this.relacion_referido.id_persona_referente = 0;
            this.relacion_referido.id_persona = this.Rreferente[1].id_persona;
          }else{
            this.relacion_referido.id_persona_referente = this.Rreferente[0].id_persona;
            this.relacion_referido.id_persona = this.Rreferente[1].id_persona;
          }
          this.PanelSvc.referenciarPersona(this.relacion_referido, 0).subscribe(
            res => {
              if(res == true) {
                Swal.fire(
                  'Listo!',
                  'Persona referenciada.',
                  'success'
                )
                setTimeout(() =>
                {
                  // this.ngOnInit();
                  Swal.close();
                },
                2000);
              }else if(res == false){
                Swal.fire(
                  'Listo!',
                  'Atención: La persona ya poseía un referente, por lo tanto se actualizo su referente.',
                  'success'
                )
                setTimeout(() =>
                {
                  // this.ngOnInit();
                  Swal.close();
                },
                2000);
              }
            }
          )
        }
      })
    }
  }

  guardarfiscal(){
    if(this.fiscal == null){
      Swal.fire(
        'Acción bloqueada!',
        'Seleccionar una persona primero.',
        'error'
      )
    }else{
      this.PanelSvc.getRolebypersona(this.fiscal.id_persona).subscribe(
        res => {
          if(res == false || res[0].role == 'referente'){
            Swal.fire({
              title: '¡Atención! La persona ya posee rol de Referente',
              text: '¿Desea asignar de todas maneras un nuevo rol?',
              icon: 'info',
              showCancelButton: true,
              confirmButtonText: 'Confirmar',
              cancelButtonText: 'Cancelar'
            }).then(async (result) => {
              if(result.value){
                if(this.flagfiscal == false){
                  Swal.fire({
                    title: '¿Desea asignar esta persona como fiscal?',
                    text: 'La persona tendrá un nuevo rol en el sistema.',
                    icon: 'info',
                    showCancelButton: true,
                    confirmButtonText: 'Confirmar',
                    cancelButtonText: 'Cancelar'
                  }).then(async (result) => {
                    if(result.value){
                      this.fiscal.role = 'fiscal';
                      this.PanelSvc.nuevoFiscal(this.fiscal, this.fiscal.id_persona).subscribe(
                        res => {
                          Swal.fire(
                            'Listo!',
                            'Usuario actualizado.',
                            'success'
                          )
                          setTimeout(() =>
                          {
                            this.ngOnInit();
                            Swal.close();
                          },
                          2000);
                        }
                      )
                    }
                  })
                }else{
                  Swal.fire({
                    title: '¿Desea asignar esta persona como fiscal y referente?',
                    text: 'La persona tendrá ambos roles en el sistema.',
                    icon: 'info',
                    showCancelButton: true,
                    confirmButtonText: 'Confirmar',
                    cancelButtonText: 'Cancelar'
                  }).then(async (result) => {
                    if(result.value){
                      this.fiscal.role = 'fiscal referente';
                      this.PanelSvc.nuevoFiscal(this.fiscal, this.fiscal.id_persona).subscribe(
                        res => {
                          Swal.fire(
                            'Listo!',
                            'Usuario actualizado.',
                            'success'
                          )
                          setTimeout(() =>
                          {
                            this.ngOnInit();
                            Swal.close();
                          },
                          2000);
                        }
                      )
                    }
                  })
                }
              }
            })
          }
        }
      )
    }
  }

  guardaropositor(){
    if(this.opositor == null){
      Swal.fire(
        'Acción bloqueada!',
        'Seleccionar una persona primero.',
        'error'
      )
    }else{
      this.opositor.oposicion = 1;
      Swal.fire({
        title: '¿Desea asignar esta persona como oposición?',
        text: 'Su voto se contará como parte de la oposición.',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar'
      }).then(async (result) => {
        if(result.value){
          this.PanelSvc.nuevaOposicion(this.opositor, this.opositor.id_persona).subscribe(
            res => {
              if(res == false){
                Swal.fire({
                  title: '¡Atencion! Esta persona ya está registrada como oposición',
                  text: '¿Desea quitarla de la oposición?.',
                  icon: 'info',
                  showCancelButton: true,
                  confirmButtonText: 'Confirmar',
                  cancelButtonText: 'Cancelar'
                }).then(async (result) => {
                  if(result.value){
                    this.opositor.oposicion = 0;
                    this.PanelSvc.nuevaOposicion(this.opositor, this.opositor.id_persona).subscribe(
                      res => {
                        Swal.fire(
                          'Listo!',
                          'Persona retirada de la oposición.',
                          'success'
                        )
                        setTimeout(() =>
                        {
                          this.ngOnInit();
                          Swal.close();
                        },
                        2000);
                      }
                    )
                  }
                })
              }else{
                Swal.fire(
                  'Listo!',
                  'Persona registrada como oposición.',
                  'success'
                )
                setTimeout(() =>
                {
                  // this.ngOnInit();
                  Swal.close();
                },
                2000);
              }
            }
          )
        }
      })
    }
  }
}
