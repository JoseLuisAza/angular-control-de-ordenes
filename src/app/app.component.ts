import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit { 
  title = 'control-de-ordenes';

  constructor(public auth: AuthService) {
    
  }
  
  ngOnInit(): void {
    let params = new URLSearchParams(location.search);
    var contract = params.get('code');
    console.log(contract);
   this.auth.handleRedirectCallback().subscribe(
     data=>{
       console.log(data);
     },
     error=>{
       console.error(error);
     }
   );
  }

}
