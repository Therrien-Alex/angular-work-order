import { Injectable, signal, computed } from '@angular/core';
import { WorkOrder } from './models';

const KEY = 'wo:data';
const KEY_SEQ = 'wo:seq';

@Injectable({ providedIn: 'root' })
export class WorkOrderService {
  private _orders = signal<WorkOrder[]>(this.load());
  orders = computed(() => this._orders());

  add(partial: Omit<WorkOrder, 'id' | 'createdAt'>) {
    const id = this.nextId();
    const wo: WorkOrder = { ...partial, id, createdAt: Date.now() };
    this.set([...this._orders(), wo]);
  }

  remove(id: string) { this.set(this._orders().filter(o => o.id !== id)); }

  private set(next: WorkOrder[]) {
    this._orders.set(next);
    localStorage.setItem(KEY, JSON.stringify(next));
  }
  private load(): WorkOrder[] {
    try { return JSON.parse(localStorage.getItem(KEY) || '[]'); } catch { return []; }
  }
  private nextId(): string {
    const n = (parseInt(localStorage.getItem(KEY_SEQ) || '0', 10) || 0) + 1;
    localStorage.setItem(KEY_SEQ, String(n));
    return `WO-${String(n).padStart(4, '0')}`;
  }
}
