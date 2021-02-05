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
  objLink = {
    longLink: '',
    shortLink: ''
  }
  objLinks = new Array();

  constructor(private http: HttpClient) { }

  getShortLinks(link: string) {
    if (link.length != 0) {
      this.objLink.longLink = link;
      var data = this.http.get(`https://api.shrtco.de/v2/shorten?url=${this.objLink.longLink}`)
        .subscribe(res => {
          let data: any = res;
          this.objLink.shortLink = data.result.short_link;
          this.objLinks.push(this.objLink);
          (<HTMLInputElement>document.getElementById('link')).value ='';
        });
    }
  }
}
