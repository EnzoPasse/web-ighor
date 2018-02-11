import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-breadcrums',
  templateUrl: './breadcrums.component.html',
  styles: []
})
export class BreadcrumsComponent implements OnInit {
  label = '';

  constructor(public router: Router, private title: Title, private meta: Meta) {
    this.getDataRoute().subscribe(data => {
      this.label = data.titulo;

      // agregando metaTags a la pagina
      let metaTag: MetaDefinition = {
        name: 'definition',
        desciption: this.label
      };
      this.meta.updateTag(metaTag);

      // agregando titulos a la pagina
      this.title.setTitle(this.label);
    });
  }

  getDataRoute() {
    return this.router.events
      .filter(evento => evento instanceof ActivationEnd)
      .filter((evento: ActivationEnd) => evento.snapshot.firstChild === null)
      .map((evento: ActivationEnd) => evento.snapshot.data);
  }

  ngOnInit() {}
}
