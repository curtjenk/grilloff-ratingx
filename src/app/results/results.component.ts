import { Component, OnInit, OnDestroy } from '@angular/core';
import { GrillOffService } from '../grill-off.service';
import { timer } from 'rxjs';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit, OnDestroy {
  loading = false;
  looper = null;
  results = [];
  constructor(private grillOffService: GrillOffService) { }

  ngOnInit() {
    this.getResults();
    this.startLoop();
  }

  ngOnDestroy() {
    this.stopLoop();
  }

  // Sends a request to delete the voting resutlts !!!
  deleteResults() {
    this.grillOffService.deleteResults()
    .subscribe( res => {});
  }

  private startLoop() {
    this.looper = setInterval(() => {
      this.loading = true; 
      timer(5000).subscribe( () => this.getResults() );
    }, 15000);
  }

  stopLoop() {
    clearInterval(this.looper);
    this.looper = null;
    console.log('stopped the looper');
  }
  getResults() {
    this.grillOffService.getResults()
        .subscribe( results => {this.results = results; this.loading = false; });
  }
}
