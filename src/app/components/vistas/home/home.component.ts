import { PersonasService } from 'src/app/services/personas.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  totalvotos:number=0;
  votaron:number=0;
  novotaron:number=0;
  porcentajevoto;
  porcentajenovoto;

  totalvotosOp:number=0;
  votaronOp:number=0;
  novotaronOp:number=0;
  porcentajevotoOp;
  porcentajenovotoOp;

  totalvotosRef:number=0;
  votaronRef:number=0;
  novotaronRef:number=0;
  porcentajevotoRef;
  porcentajenovotoRef;


  referentes:any[]=[]
  constructor(private perSvc:PersonasService) { }

  ngOnInit(): void {
    this.perSvc.getTotalVotos().subscribe(res=>{
      this.totalvotos=res[0].total
      this.votaron=res[0].voto
      this.novotaron=res[0].novoto
      this.porcentajevoto=((res[0].voto*100)/this.totalvotos).toFixed(2)
      this.porcentajenovoto=((res[0].novoto*100)/this.totalvotos).toFixed(2)
    })

    this.perSvc.getTotalVotosOposicion().subscribe(res=>{
      this.totalvotosOp=res[0].total
      this.votaronOp=res[0].voto
      this.novotaronOp=res[0].novoto
      this.porcentajevotoOp=((res[0].voto*100)/this.totalvotosOp).toFixed(2)
      this.porcentajenovotoOp=((res[0].novoto*100)/this.totalvotosOp).toFixed(2)
    })

    this.perSvc.getTotalVotosReferentes().subscribe(res=>{
      this.totalvotosRef=res[0].total
      this.votaronRef=res[0].voto
      this.novotaronRef=res[0].novoto
      this.porcentajevotoRef=((res[0].voto*100)/this.totalvotosRef).toFixed(2)
      this.porcentajenovotoRef=((res[0].novoto*100)/this.totalvotosRef).toFixed(2)
    })



    this.perSvc.getReferentes().subscribe(res=>{
      for (let i = 0; i < res.length; i++) {
        this.perSvc.getVotosByReferentes(res[i].id_persona).subscribe(votos=>{

          this.referentes[i]=votos
        })
      }
    })
    this.actualizar();
  }

  actualizar(){
    setTimeout(() => {
      this.ngOnInit()
    }, 2000);

  }
}
