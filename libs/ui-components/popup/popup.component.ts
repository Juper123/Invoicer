import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ButtonType } from '../button';

@Component({
  selector: 'app-popup',
  standalone: false,

  templateUrl: './popup.component.html',
  styleUrl: './popup.component.scss'
})
export class PopupComponent {
  buttonConfig = {
    type: ButtonType.Raised,
    label: 'Ok',
    color: 'blue'
  }

  readonly dialogRef = inject(MatDialogRef<PopupComponent>);
  readonly data = inject<{ data: any }>(MAT_DIALOG_DATA);

  onOkClick(): void {
    this.dialogRef.close()
  }
}
