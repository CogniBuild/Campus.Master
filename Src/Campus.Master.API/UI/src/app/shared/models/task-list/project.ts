export class Project {
  id: number;
  name: string;
  color: string;
  status: number;

  constructor(id: number, title: string, color: string, status: number) {
    this.id = id;
    this.name = title;
    this.color = color;
    this.status = status;
  }
}
