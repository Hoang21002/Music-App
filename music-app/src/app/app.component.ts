import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ModalController } from '@ionic/angular';
import { register } from 'swiper/element/bundle';
register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent implements OnInit {
  showTabs: boolean = true;
  excludedPaths: string[] = ['start']; // Hide Tabs

  constructor(private modalController: ModalController,private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.updateShowTabsState(event.url);
      });
  }

  private updateShowTabsState(url: string): void {
    // Kiểm tra nếu đường dẫn nằm trong danh sách đường dẫn cần chặn thì ẩn tabs
    this.showTabs = !this.isExcludedPath(url);
  }

  private isExcludedPath(url: string): boolean {
    return this.excludedPaths.some(path => url.includes(path));
  }
}


