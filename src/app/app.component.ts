import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from "ngx-spinner";
import { FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'shortly';
  objLinks = new Array();

  constructor(private http: HttpClient, private spinner: NgxSpinnerService) {
  }

  getShortLinks(link: string) {
    if (link.length != 0) {
      this.spinner.show();
      var data = this.http.get(`https://api.shrtco.de/v2/shorten?url=${link}`)
        .subscribe(res => {
          let data: any = res;
          this.objLinks.push({ long: link, short: data.result.short_link });
          (<HTMLInputElement>document.getElementById('link')).value = '';
          this.spinner.hide();
        });
    } else {
       
    }
  }

  copyShortLink(link: string, index: number) {
    navigator.clipboard.writeText(link).then(function () {
      var temp = document.querySelectorAll('.secondary')[index];
      (<HTMLInputElement>temp).textContent = 'Copied';
      (<HTMLInputElement>temp).style.backgroundColor = '#3b3054';
    }, function (err) {
      alert('Async: Could not copy text: ');
    });
  }
}
