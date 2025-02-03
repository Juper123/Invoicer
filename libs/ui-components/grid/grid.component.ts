import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GridConfig } from './types';


@Component({
  selector: 'app-grid',
  standalone: false,

  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss'
})
export class GridComponent {

  @Output() selectedRowChange = new EventEmitter<any>();
  @Output() onGridButtonClick = new EventEmitter<any>();

  @Input() set dataSource(value: any[]) {
    this._dataSource = value
    this.setSelectedRow(null)
  }

  @Input() set config(value: GridConfig) {
    this._config = value
  }

  @Input() set selectedRow(selectedRow: any) {
    this._selectedRow = selectedRow
  }

  private _config: GridConfig = { columns: [] }
  private _dataSource: any[] = []
  private _selectedRow: any = null

  get selectedRow(): any {
    return this._selectedRow
  }

  get dataSource(): any[] {
    return this._dataSource
  }

  get config(): GridConfig {
    return this._config
  }

  get columnPropertyNames(): string[] {
    let result: string[] = []
    this.config?.columns?.forEach(column => {
      result.push(column.property)
    })
    return result
  }

  isRowSelected(row: any): boolean {
    return this.selectedRow === row
  }

  setSelectedRow(row: any) {
    this.selectedRow = row
    this.selectedRowChange.emit(row)
  }
}

