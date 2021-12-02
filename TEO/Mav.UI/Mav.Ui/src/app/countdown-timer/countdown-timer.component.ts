import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserAssessmentSectionService } from '../services/user-assessment-section.service';

@Component({
  selector: 'countdown-timer',
  templateUrl: './countdown-timer.component.html',
  styleUrls: ['./countdown-timer.component.css']
})

export class CountdownTimerComponent implements OnInit {

  // Taken from the user section timer
  @Input() TIME_LIMIT: number;
  @Input() TIME_PASSED: number;

  @Output() timerComponent: EventEmitter<any> = new EventEmitter<any>();

  public ID: number;
  //public TIME_LIMIT;
  //public TIME_PASSED;
  public WARNING_THRESHOLD = 60;
  public ALERT_THRESHOLD = 30;
  public FULL_DASH_ARRAY = 283;
  public timeLeft = this.TIME_LIMIT;
  public timerInterval = null;
  public COLOR_CODES = { info: { color: "green" }, warning: { color: "orange", threshold: this.WARNING_THRESHOLD }, alert: { color: "red", threshold: this.ALERT_THRESHOLD }};

  constructor(
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit() {

    //NEED CALL HERE TO GET THE TIME LIMIT AND TIME PASSED THEN PLACE THEM IN VARIABLES BELOW
    //IF TIMER IS NEW SET TIME_PASSED TO 0.
    const routeParams = this.activeRoute.snapshot.params;
    this.ID = routeParams.id; //Unique Section ID



    console.log("Time limit:", this.TIME_LIMIT); 
    console.log("Time passed: ", this.TIME_PASSED);

    this.timerInterval = setInterval(() => {
        this.TIME_PASSED = this.TIME_PASSED += 1;
        this.timeLeft = this.TIME_LIMIT - this.TIME_PASSED;
        document.getElementById("base-timer-label").innerHTML = this.formatTime(this.timeLeft);
        this.setCircleDasharray();
        this.setRemainingPathColor(this.timeLeft);
        this.getTime(this.TIME_LIMIT, this.TIME_PASSED);
        if (this.timeLeft === 0) {
          this.onTimesUp();
        }
    }, 1000);
  }

  
  public onTimesUp() {
    clearInterval(this.timerInterval);
    var endCover = document.getElementById("endModal");
    endCover.style.display = "block";
  // document.getElementById("base-timer-label").innerHTML = "Done";
  }

  public formatTime(time) {
    let minutes: any;
    let seconds: any;
    minutes = Math.floor(time / 60);
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    seconds = time % 60;
    if (seconds < 10) {
        seconds = `0${seconds}`;
    }
    return `${minutes}:${seconds}`;
  }

  public setRemainingPathColor(timeLeft) {
    const { alert, warning, info } = this.COLOR_CODES;
      if (timeLeft <= alert.threshold) {
          document.getElementById("base-timer-path-remaining").classList.remove(warning.color);
          document.getElementById("base-timer-path-remaining").classList.add(alert.color);
          (<HTMLElement>document.getElementsByClassName("base-timer__label")[0]).style.color = `${alert.color}`;
      } else if (timeLeft <= warning.threshold) {
          document.getElementById("base-timer-path-remaining").classList.remove(info.color);
          document.getElementById("base-timer-path-remaining").classList.add(warning.color);
          (<HTMLElement>document.getElementsByClassName("base-timer__label")[0]).style.color = `${warning.color}`;
      }
  }

  public calculateTimeFraction() {
    const rawTimeFraction = this.timeLeft / this.TIME_LIMIT;
    return rawTimeFraction - (1 / this.TIME_LIMIT) * (1 - rawTimeFraction);
  }

  public setCircleDasharray() {
    const circleDasharray = `${(this.calculateTimeFraction() * this.FULL_DASH_ARRAY).toFixed(0)} 283`;
    document.getElementById("base-timer-path-remaining").setAttribute("stroke-dasharray", circleDasharray);
  }

  public getTime(timeLimit, timePassed): void {
     this.timerComponent.emit({timeLimit, timePassed});
  }

  public ngOnDestroy() {
    // alert(this.ID + " " + this.TIME_LIMIT + " " + this.TIME_PASSED);
    clearInterval(this.timerInterval);
  }

}


