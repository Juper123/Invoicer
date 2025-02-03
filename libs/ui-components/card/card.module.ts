import { NgModule } from "@angular/core";
import { CardComponent } from "./card.component";
import { MatCardModule } from '@angular/material/card';

const angularMaterialModules = [MatCardModule]

@NgModule({
    declarations: [CardComponent],
    imports: [angularMaterialModules],
    exports: [CardComponent],
})
export class CardModule { }