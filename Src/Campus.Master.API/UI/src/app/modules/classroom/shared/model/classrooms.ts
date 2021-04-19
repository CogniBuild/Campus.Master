export interface Classroom {
  id: string;
  title: string;
  students: Student[];
  lectures: Teacher[];
}

export interface Teacher {
  id: string;
  name: string;
  picture: string;
  lastTimeOnline: string;
}

export interface Student {
  id: string;
  name: string;
  position: string;
  picture: string;
  lastPublish: string;
  avgGrade: number;
}


export interface RouteState {
  id?: string;
}
