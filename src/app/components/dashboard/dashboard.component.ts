import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private translate: TranslateService) { }

  ngOnInit(): void {
  }
  change(){
    
    this.translate.use(this.translate.currentLang == 'de'?'en':'de')
  }
}
