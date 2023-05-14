import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';
import { Sort } from '../util/sort';

@Directive({
  selector: '[appSort]'
})
export class SortDirective {
  @Input() appSort: Array<any> | undefined;

  constructor(private renderer: Renderer2, private targetElem: ElementRef) { }

  @HostListener("click") sortDate() {
    const sort = new Sort();
    const elem = this.targetElem.nativeElement;
    const order = elem.getAttribute("dataOrder");
    const type = elem.getAttribute("dataType");
    const property = elem.getAttribute("dataName");
    if(order === "desc"){
      this.appSort?.sort(sort.startSort(property, order, type));
      elem.setAttribute("dataOrder", "asc");
    } else {
      this.appSort?.sort(sort.startSort(property, order, type));
      elem.setAttribute("dataOrder", "desc");
    }
  }
}
