import { NgModule } from "@angular/core";
import { SidebarComponent } from "./sidebar.component";
import { ButtonModule } from "../button";
import { CommonModule } from "@angular/common";


@NgModule({
    declarations: [SidebarComponent],
    imports: [CommonModule, ButtonModule],
    exports: [SidebarComponent],
})
export class SidebarModule { }