import { Component, OnInit, ViewChild } from "@angular/core";
import { MediaChange, MediaObserver } from "@angular/flex-layout";
import { MatSidenav } from "@angular/material/sidenav";

import { MenuService } from "./core/services/menu.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  @ViewChild(MatSidenav, {static: false}) private sidenav: MatSidenav;
  opened = true;
  mode = "side";

  constructor(
    private mediaObserver: MediaObserver,
    private menuService: MenuService
  ) {}

  ngOnInit() {
    this.mediaObserver.media$.subscribe((change: MediaChange) => {
      const screenSize = change.mqAlias;
      if (screenSize === "xs" || screenSize === "sm") {
        this.opened = false;
        this.mode = "over";
      } else {
        this.opened = true;
        this.mode = "side";
      }
    });

    this.menuService.menutToggled$.subscribe((data: boolean) => {
      if (data) {
        this.sidenav.toggle();
      } else {
        if (this.mediaObserver.isActive("xs") || this.mediaObserver.isActive("sm")) {
          this.sidenav.close();
        }
      }
    });
  }

  isLoginPath() {
    return window.location.pathname === "/login";
  }
}
