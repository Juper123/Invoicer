import { NgModule } from "@angular/core";
import { ProgressBarComponent } from "./progress-bar.component";
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
    declarations: [ProgressBarComponent],
    imports: [MatProgressBarModule],
    exports: [ProgressBarComponent],
})
export class ProgressBarModule { }