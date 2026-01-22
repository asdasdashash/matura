export interface Card {
  id: number;
  cardType: string;
  cardSymbol: string;
  cardValue: number;
  clicked?: boolean;
}