import { Directive, HostListener, HostBinding, Output, EventEmitter, Input } from '@angular/core';

@Directive({
  selector: '[fileDragDrop]'
})

export class FileDragNDropDirective {
  @Output() private filesChangeEmiter : EventEmitter<File[]> = new EventEmitter();
  @HostBinding('style.background') private background = '#1A1C21';
  @HostBinding('style.border-style') private background_border_style = 'dashed';
  @HostBinding('style.border-width') private background_border_width = '0.5px';
  @HostBinding('style.border-radius') private background_border_radius = '10px';

  constructor() { }

  @HostListener('dragover', ['$event']) public onDragOver(e){
    e.preventDefault();
    e.stopPropagation();
    this.background = '#999';
  }

  @HostListener('dragleave', ['$event']) public onDragLeave(e){
    e.preventDefault();
    e.stopPropagation();
    this.background = '#1A1C21'
  }

  @HostListener('drop', ['$event']) public onDrop(e){
    e.preventDefault();
    e.stopPropagation();
    this.background = '#1A1C21';

    let files = e.dataTransfer.files;
    this.filesChangeEmiter.emit(files);
  }
}