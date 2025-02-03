import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { SidebarConfig } from './types/sidebar-config.interface';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  @Output() emitBtnClick = new EventEmitter<string>();

  @Input() set sidebarConfig(sidebarConfig: SidebarConfig) {
    if (sidebarConfig.enableClickedButtonHighlighting) {
      this.selectedButton = sidebarConfig?.initialButtonHighlighted as string
    }
    this._sidebarConfig = sidebarConfig
  }

  private _sidebarConfig: SidebarConfig = { buttons: [] }
  private _selectedButton: string

  get sidebarConfig(): SidebarConfig {
    return this._sidebarConfig
  }

  set selectedButton(selectedButton: string) {
    this._selectedButton = selectedButton
  }

  onBtnClickHandler(label: string): void {
    if (this.sidebarConfig.enableClickedButtonHighlighting) {
      this.selectedButton = label
    }
    this.emitBtnClick.emit(label)
  }

  isButtonSelected(label: string): boolean {
    return this._selectedButton === label
  }
}
