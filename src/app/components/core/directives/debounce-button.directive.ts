import { Directive, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { debounceTime, Subject, Subscription } from 'rxjs';

@Directive({
  standalone: true,
  selector: '[appDebounceButton]'
})
export class DebounceButtonDirective implements OnInit, OnDestroy {

  @Input() debounceTime = 500; 
  @Output() debounceClick = new EventEmitter<MouseEvent>(); 
  
  private clicks = new Subject<MouseEvent>();
  private subscription= new Subscription();
  constructor() { }

  ngOnInit() {
    console.log("avem subscribtie");
    this.subscription = this.clicks.pipe(
      debounceTime(this.debounceTime) 
    ).subscribe(e => this.debounceClick.emit(e));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  @HostListener('click', ['$event'])
  clickEvent(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.clicks.next(event); 
  }
}
