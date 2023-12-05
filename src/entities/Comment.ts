export interface Comment {
  _id: string;
  text: string;
  timestamp: Date;
  userId: {
    fullname: string;
  };
}
