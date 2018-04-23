import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';                

  alertText: string;
  
  closeAlert(e) {
    const div = e.currentTarget.parentElement;
    div.style.opacity = "0";   
  }

  showAlert(message: string, color: string) {
    this.alertText = message;
    const alert = document.getElementById('alert');    
    alert.style.opacity = "1";        
    alert.style.backgroundColor =  color;
    setTimeout(() => (alert.style.opacity = "0"), 2000);
  }
}

