import { Component, OnInit, ViewChild } from '@angular/core';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';
import { MatSidenav } from '@angular/material/sidenav';

import { MenuService } from './core/services/menu.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild(MatSidenav) private sidenav: MatSidenav;
  opened = true;
  mode = "side";

  constructor(private media: ObservableMedia,
    private menuService: MenuService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.media.subscribe((change: MediaChange) => {
      let screenSize = change.mqAlias
      if(screenSize == 'xs' || screenSize == 'sm') {
        this.opened = false
        this.mode = "over"
      } else {
        this.opened = true
        this.mode = "side"
      }
    })

    this.menuService.menutToggled$.subscribe((data: boolean) => {
      if(data) {
        this.sidenav.toggle()
      } else {
        if(this.media.isActive('xs') || this.media.isActive('sm'))
          this.sidenav.close()
      }
    })

    this.isLogin()
  }

  isLogin() {
    this.route.url.subscribe(path => console.log(path))
  }
}
