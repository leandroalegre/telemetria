import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LocalService } from 'src/app/services/local.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss']
})
export class ReportesComponent implements OnInit {
  isAdmin=null;
  constructor(private authSvc: AuthService, private localService: LocalService) { }
  private destroy$ = new Subject<any>();
  ngOnInit(): void {
    this.authSvc.IsAdmin$.pipe(
      takeUntil(this.destroy$))
     .subscribe(res=>(this.isAdmin=res));
  }
  }


