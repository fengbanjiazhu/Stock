export type Stock = {
  symbol?: string;
  name: string;
  exchange?: string;
  mic_code?: string;
  currency?: string;
  datetime?: string;
  timestamp?: number;
  open?: string;
  high?: string;
  low?: string;
  close: string;
  volume?: string;
  percent_change: string;
};

export type StockListItem = {
  stock: Stock;
};
