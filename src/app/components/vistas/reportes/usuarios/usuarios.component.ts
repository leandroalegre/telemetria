import { UsersService } from './../../../../services/users.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  displayedColumns: string[] = ['username','nombre_completo',  'role', 'acciones'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private usersSvc: UsersService) { }

  ngOnInit(): void {
    this.usersSvc.getUsers().subscribe(res=>{
      this.dataSource.data=res
    })
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  blanquear(id_persona, nombre_completo) {
    var txt = '{"password":""}'
    var password = JSON.parse(txt);
    Swal.fire({
      icon: 'warning',
      title: 'Desea blanquear la contraseña para ' + nombre_completo + '?',
      text: 'Esta acción no se puede deshacer.',
      showCancelButton: true,
      confirmButtonText: `Blanquear`,
    }).then((result) => {

      if (result.isConfirmed) {
        this.usersSvc.blanquear(id_persona, password).subscribe(res => {

          if (res.message == 'actualizado') {
            Swal.fire('Contraseña blanqueada!', '', 'success')
            setTimeout(() => {
              Swal.close()
            }, 2000);
          } else if (res.message == 'vacia') {
            Swal.fire('El usuario ya posee la contraseña blanqueada.', '', 'info')
          } else {
            Swal.fire('La contraseña no fue blanqueada.', '', 'info')
          }
        })

      } else {
        Swal.fire('La contraseña no fue blanqueada.', '', 'info')
      }
    })
  }


}
