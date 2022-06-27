import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input() title: any;
  @Input() value: any;
  keys: string[]=[];

  constructor(private _router: Router) { }

  ngOnInit(): void {    
    if (this.value) {
      console.log('VAL',this.value);
      
      this.keys = Object.keys(this.value[0])  
      this.keys.sort((a, b) => a.localeCompare(b)) 
    }
  }
  
  navigateToDetails(id: string) {
    if (this.title == 'Drivers') {
      this._router.navigate(['panel/driver-details/', JSON.stringify(id)])
    } else {
      this._router.navigate(['panel/vehicle-details/', JSON.stringify(id)])
    }
  }

  renameKey(key: string) {
    key = key.replace('_', ' ')
    return key;
  }

}
