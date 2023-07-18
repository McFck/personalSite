import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, skip, startWith } from 'rxjs/operators';
import { TranslateService } from './services/translate.service';
import { Title } from '@angular/platform-browser';
import { TranslatePipe } from './pipes/translate.pipe';
import { register } from 'swiper/element/bundle';
import { DEFAULT_LANGUAGE } from './constants/generalConsts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {
  title = 'personal';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private translationService: TranslateService,
    private translationPipe: TranslatePipe,
    private titleService: Title
  ) {
    register();
  }

  restoreContext(): void {
    const queryParams = (new URL(location.href)).searchParams;
    this.router.navigate([location.pathname], {
      relativeTo: this.activatedRoute,
      queryParams: {
        lang:
          queryParams.get("lang") === DEFAULT_LANGUAGE
            ? null
            : queryParams.get("lang")
      },
      queryParamsHandling: 'merge'
    });

    setTimeout(() => {
      this.titleService.setTitle(this.translationPipe.transform('TITLE'));
    });
  }

  ngOnInit() {
    this.restoreContext();

    this.translationService.localeChange.pipe(skip(1)).subscribe(() => {
      setTimeout(() => {
        this.titleService.setTitle(this.translationPipe.transform('TITLE'));
      });

      this.router.navigate([location.pathname], {
        relativeTo: this.activatedRoute,
        queryParams: {
          lang:
            this.translationService.getLanguage() === DEFAULT_LANGUAGE
              ? null
              : this.translationService.getLanguage(),
        },
        queryParamsHandling: 'merge'
      });
    });

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        setTimeout(() => {
          this.titleService.setTitle(this.translationPipe.transform('TITLE'));
        });

        const queryParams = this.router.parseUrl(event.url).queryParams;
        if (
          queryParams['lang'] &&
          queryParams['lang'] !== this.translationService.getLanguage()
        ) {
          this.translationService.use(queryParams['lang']);
        }
      });
  }
}
