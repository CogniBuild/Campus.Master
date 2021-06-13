export interface Classroom {
  id: string | number;
  title: string;
  students: Student[];
  lectures: Teacher[];
  modules?: Modules[];
  grades?: Grades[];
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

export interface Lectures {
  id?: string;
  title: string;
  subTitle: string;
  date: string;
  status: string;
}

export interface Labs {
  id?: string;
  title: string;
  subTitle: string;
  date: string;
  status: string;
}

export interface Practs {
  id?: string;
  title: string;
  subTitle: string;
  date: string;
  status: string;
}

export interface Modules {
  id?: string;
  title: string;
  lectures?: Lectures[];
  labs?: Labs[];
  practs?: Practs[];
}

export interface Grades {
  id?: string;
  student?: string;
  picture?: string;
  lab1?: number;
  pract1?: number;
  lab2?: number;
  pract2?: number;
  lab3?: number;
  pract3?: number;
  finalTest?: number;
  TotalScore?: number;
}
