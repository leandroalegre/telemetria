import { PersonasService } from './../../../../services/personas.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-por-persona',
  templateUrl: './por-persona.component.html',
  styleUrls: ['./por-persona.component.scss']
})
export class PorPersonaComponent implements OnInit {

  displayedColumns: string[] = ['dni', 'nombre_completo', 'voto'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private perSvc: PersonasService) { }

  ngOnInit(): void {
    this.perSvc.getVotoPadron().subscribe(res=>{
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


}
