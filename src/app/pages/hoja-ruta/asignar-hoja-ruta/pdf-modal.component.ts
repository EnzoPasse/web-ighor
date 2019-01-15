import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';


@Component({
  selector: 'app-pdf-modal',
  templateUrl: './pdf-modal.component.html',
  styleUrls: []
})
export class PdfModalComponent implements OnInit, OnChanges {

  @Input() pdfRuta: string;
  @Input() displayPDF: boolean;
  @Output() displayInfo: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit() {}
  ngOnChanges(): void {}

  hideDialog() {
       this.displayInfo.emit(false);
  }
}

