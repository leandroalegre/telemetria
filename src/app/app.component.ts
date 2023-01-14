import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Gestion Municipal';
  mobileQuery: MediaQueryList;
  showHead: boolean = false;
  showLogin: boolean = false;
  showNewPass: boolean = false;

  ngOnInit() {
  }
  private _mobileQueryListener: () => void;
  constructor(private router: Router, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 1000px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  // on route change to '/login', set the variable showHead to false
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (event['url'] == '/') {
          this.showHead = false;
          this.showLogin= true;
          this.showNewPass=false;

        } else if(event['url'] == '/login'){
          this.showHead = false;
          this.showLogin= true;
          this.showNewPass=false;
        }else if(event['url'] == '/login/nwpass'){
          this.showHead = false;
          this.showLogin= false;
          this.showNewPass=true;

        }else{
          this.showNewPass=false;
          this.showHead = true;
          this.showLogin= false;
        }
      }
    });
  }
}
