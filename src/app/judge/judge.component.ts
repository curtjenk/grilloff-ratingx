import { Component, ChangeDetectionStrategy, OnInit, Inject, HostListener } from '@angular/core';
import { GrillOffService } from '../grill-off.service';
import { Person } from './../person';
import { Router, ActivatedRoute } from '@angular/router';
import { DOCUMENT } from '@angular/platform-browser';
// import { Observable, of } from 'rxjs';
import { first } from 'rxjs/operators';
import { Observable, pipe } from 'rxjs';

@Component({
  selector: 'app-judge',
  templateUrl: './judge.component.html',
  styleUrls: ['./judge.component.css']
})
export class JudgeComponent implements OnInit {
  windowScrolled: boolean;
  error = false;
  maxStars: Number = 5;
  contestants: Person[];
  results: any = {};
  tab = 0;

  constructor(@Inject(DOCUMENT) private document: Document,
      private grillOffService: GrillOffService,
      private router: Router) { }

  /*
   https://medium.com/@appl4e/scroll-to-top-button-for-angular-99ddeebb8c3a
  */
  @HostListener('window:scroll', [])

  onWindowScroll() {
    if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 100) {
      this.windowScrolled = true;
    } else if (this.windowScrolled && window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop < 10) {
      this.windowScrolled = false;
    }
  }
  scrollToTop() {
    (function smoothscroll() {
      const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo(0, currentScroll - (currentScroll / 8));
      }
    })();
  }

  ngOnInit() {
    this.results = {};
    this.getContestants();
  }

  getContestants() {
    this.grillOffService.getContestants().pipe(first())
      .subscribe( contestants =>  {
        this.contestants = contestants;
      });
  }

  rateChange(tab: string, contestant: Person, rate: number) {
    const ndx = this.contestants.findIndex(item => item.id === contestant.id);
    this.contestants[ndx][tab] = rate;
    contestant[tab] = rate;
    this.error = false;
  }

  // doneWithTab(tab: string) {
  //   const count = this.contestants.filter(c => c[tab]).length;
  //   if (count === this.contestants.length) {
  //     this.tab += 1;
  //     this.error = false;
  //   } else {
  //     this.error = true;
  //   }
  //   // console.log('count=', count);
  // }
  vote() {
    // TODO: Must vote for each person and category
    console.log(this.contestants);
    this.error = this.contestants.every( c => {
      return !c.hasOwnProperty('appear') ||
             !c.hasOwnProperty('taste') ||
             !c.hasOwnProperty('text');
    });
    if (this.error) {
      this.scrollToTop();
    }
    console.log(this.error);
    return;
    // TODO: handle the already voted case
    const person: Person = this.grillOffService.currentUserValue();
    this.grillOffService.vote(person, this.contestants)
      .subscribe(
        (p) => {
          // this.grillOffService.logout();
          this.router.navigate(['/admin/results']);
        },
      );
  }

}
