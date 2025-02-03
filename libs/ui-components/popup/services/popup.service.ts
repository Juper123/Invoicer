import { inject, Injectable } from "@angular/core";
import { PopupComponent } from "../popup.component";
import { MatDialog } from "@angular/material/dialog";

@Injectable()
export class PopupService {

    readonly dialog = inject(MatDialog);

    showPopup(message: string) {
        this.dialog.open(PopupComponent, {
            data: message
        });
    }
}