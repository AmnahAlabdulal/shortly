import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toEditorSettings } from 'typescript';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'shortly';
  objLinks = new Array();

  constructor(private http: HttpClient) {
  }

  getShortLinks(link: string) {
    if (link.length != 0) {
      var data = this.http.get(`https://api.shrtco.de/v2/shorten?url=${link}`)
        .subscribe(res => {
          let data: any = res;
          this.objLinks.push({ long: link, short: data.result.short_link });
          (<HTMLInputElement>document.getElementById('link')).value = '';
        });
    }
  }

  copyShortLink(link: string) {
    console.log(link);
  }
}
