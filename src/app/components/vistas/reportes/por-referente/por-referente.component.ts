import { LocalService } from './../../../../services/local.service';
import { PersonasService } from 'src/app/services/personas.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-por-referente',
  templateUrl: './por-referente.component.html',
  styleUrls: ['./por-referente.component.scss']
})

export class PorReferenteComponent implements OnInit {

  displayedColumns: string[] = ['dni', 'nombre_completo', 'acciones'];
  dataSource = new MatTableDataSource()

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
seccionpersonas=false;
personas:any[]=[]
nombre_completo;
totalpersonas;
votaron=0;
novotaron=0;
tabla:boolean=true;
  constructor(private perSvc:PersonasService, private localService:LocalService) { }
user=this.localService.getJsonValue('user')
  ngOnInit(): void {
    if(this.user.role=='referente' || this.user.role=='fiscal referente'){
      this.perSvc.getReferenteUser(this.user.id_persona).subscribe(res=>{
        this.tabla=false
        this.getPersonasByReferente(res[0].id_persona, res[0].nombre_completo)
      })
    }else{
      this.tabla=true
      this.perSvc.getReferentes().subscribe(res=>{
      this.dataSource.data=res
    })
    }
  }

  ngAfterViewInit() {
    this.paginator._intl.itemsPerPageLabel = 'Resultados por pagina';
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getPersonasByReferente(id_persona, nombre_completo){
    this.nombre_completo=nombre_completo
    this.perSvc.getPersonasbyReferente(id_persona).subscribe(res=>{
      this.totalpersonas=res.length
      this.personas=res;
      this.seccionpersonas=true
      this.perSvc.getVotosByReferentes(id_persona).subscribe(per=>{
        this.votaron=per[0].votaron
        this.novotaron=per[0].novotaron
      })
    })
  }


}
