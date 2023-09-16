import {AfterViewInit, Directive, ElementRef, HostListener, Input, Renderer2} from '@angular/core';

@Directive({
  selector: '[highlight]'
})
export class HighlightDirective implements AfterViewInit{

  @Input() color = 'yellow';

  constructor(private _el : ElementRef, //référence l'element, contient un active element sur lequel la directive est posé
              private _renderer : Renderer2 //permet d'intéragir avec le native element -> surtout pour les test unitaires
  ) { }

  ngAfterViewInit(): void {
    this.setBackgroundColor(this.color);
  }

  setBackgroundColor( color : string){
    this._renderer.setStyle(this._el.nativeElement, 'background-color', color);
  }

  @HostListener('mouseenter') onMouseEnter(){
    this.setBackgroundColor('lightgreen');
  }

  @HostListener('mouseleave') onMouseLeave(){
    this.setBackgroundColor(this.color);
  }

  @HostListener('click') onClick(){
    this.color = "lightpink";
  }
}
