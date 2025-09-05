import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss']
})
export class DeleteModalComponent implements OnInit {
  @Input() isOpen = false;
  @Input() itemName: string = 'this item';
  @Output() confirmed = new EventEmitter<void>();
  @Output() closed = new EventEmitter<void>();

  constructor() {
    this.confirmed.emit();
    this.isOpen = false;
  }

  ngOnInit(): void {
  }
  close() {
    this.closed.emit();
    this.isOpen = false;
  }
  confirm(){
    this.confirmed.emit();
  }

}
