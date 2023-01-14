import { LocalService } from './../../../../services/local.service';
import { PlantaService } from 'src/app/services/planta.service';
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

  displayedColumns: string[] = ['Ingreso', 'Egreso1', 'Egreso2', 'Turbidez' , 'PH' , 'Clorimetro', 'Cisterna', 'Presion', 'Bomba', 'fecReal','TIME'];
  dataSource = new MatTableDataSource()

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private plaSvc:PlantaService, private localService:LocalService) { }
  planta=this.localService.getJsonValue('planta')

  ngOnInit(): void {
    this.plaSvc.getLecturas().subscribe(res=>{
      this.dataSource.data=res
    })
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




}
