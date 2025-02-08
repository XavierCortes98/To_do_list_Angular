import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
} from '@angular/core';

@Directive({
  selector: '[clickOutside]',
})
export class ClickOutsideDirective {
  @Output() clickOutside = new EventEmitter<Event>();

  constructor(private elementRef: ElementRef) {}

  @HostListener('document:click', ['$event'])
  public onDocumentClick(event: Event): void {
    const targetElement = event.target as HTMLElement;
    // Verifica si el click se realizó fuera del elemento
    if (
      targetElement &&
      !this.elementRef.nativeElement.contains(targetElement)
    ) {
      this.clickOutside.emit(event);
    }
  }
}
