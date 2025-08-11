import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { WorkOrderService } from './work-order.service';
import { WorkOrder } from './models';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    MatCardModule, MatFormFieldModule, MatInputModule,
    MatSelectModule, MatButtonModule, MatTableModule, MatIconModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  packagingTypes = ['Bottle', 'Jar', 'Pouch', 'Blister'];
  provinces = ['QC', 'ON', 'BC', 'AB', 'MB', 'SK', 'NB', 'NS', 'NL', 'PE', 'YT', 'NT', 'NU'];
  hcCategories = ['Cannabis - Dried', 'Cannabis - Oil', 'Natural Health Product', 'Cosmetic'];
  products = ['Product A', 'Product B', 'Product C'];

  model = {
    packagingType: '', province: '', hcCategory: '',
    product: '', lot: '', quantity: 0, comments: '',
    requestedBy: '', dateISO: new Date().toISOString().slice(0,10)
  };

  displayedColumns = ['id','product','lot','qty','pkg','prov','date','actions'];
  selected = signal<WorkOrder | null>(null);

  constructor(public store: WorkOrderService) {}

  get valid(): boolean {
    const m = this.model;
    return !!(m.packagingType && m.province && m.hcCategory && m.product && m.lot && m.quantity > 0 && m.requestedBy && m.dateISO);
  }

  submit() {
    if (!this.valid) return;
    this.store.add({ ...this.model, comments: this.model.comments?.trim() || undefined });
    this.model.lot = ''; this.model.quantity = 0; this.model.comments = '';
  }

  preview(wo: WorkOrder) { this.selected.set(wo); }
  closePreview() { this.selected.set(null); }
  print() { window.print(); }
  remove(id: string) { this.store.remove(id); }
}
