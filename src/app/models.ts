export interface WorkOrder {
  id: string;                 // e.g., WO-0001
  packagingType: string;
  province: string;
  hcCategory: string;
  product: string;
  lot: string;
  quantity: number;
  comments?: string;
  requestedBy: string;
  dateISO: string;            // yyyy-mm-dd
  createdAt: number;
}
