export interface Products {
  id: number;
  name: string;
  img: string;
  price: number;
  description: {
    size: string;
    from: string;
    type: string;
    note: string;
  }
  qty?: number;
}