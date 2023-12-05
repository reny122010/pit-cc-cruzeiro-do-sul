interface Event {
  amount: number;
}

export interface Note {
  _id: string;
  name: string;
  events: Event[];
}
