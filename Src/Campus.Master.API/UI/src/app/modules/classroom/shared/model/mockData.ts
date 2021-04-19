import { Classroom, Grades, Modules, Student, Teacher } from './classrooms';

export let students: Student[] = [
  {
    id: '607d31501f81ef0e6cdf8b2b',
    name: 'Clarice Buck',
    position: 'student',
    picture: 'http://placehold.it/32x32',
    lastPublish: 'Wednesday, January 6, 2021 11:45 PM',
    avgGrade: 51
  },
  {
    id: '607d3150eed22f8c095a4a9d',
    name: 'Tami Norris',
    position: 'student',
    picture: 'http://placehold.it/32x32',
    lastPublish: 'Friday, March 12, 2021 5:30 PM',
    avgGrade: 68
  },
  {
    id: '607d31506a97d970f8369cfa',
    name: 'Kelly Farrell',
    position: 'student',
    picture: 'http://placehold.it/32x32',
    lastPublish: 'Thursday, January 28, 2021 7:14 AM',
    avgGrade: 59
  },
  {
    id: '607d3150c98f1018dfaa9141',
    name: 'Amelia Beck',
    position: 'student',
    picture: 'http://placehold.it/32x32',
    lastPublish: 'Sunday, February 7, 2021 5:17 AM',
    avgGrade: 85
  },
  {
    id: '607d31509d5f79ffe311272f',
    name: 'Claire Shepherd',
    position: 'student',
    picture: 'http://placehold.it/32x32',
    lastPublish: 'Monday, April 5, 2021 10:55 AM',
    avgGrade: 12
  },
  {
    id: '607d31500265e65c342f1526',
    name: 'Dixon Spears',
    position: 'student',
    picture: 'http://placehold.it/32x32',
    lastPublish: 'Thursday, February 18, 2021 11:58 AM',
    avgGrade: 94
  },
  {
    id: '607d31501e68c5f79a222c74',
    name: 'Elise Brock',
    position: 'student',
    picture: 'http://placehold.it/32x32',
    lastPublish: 'Tuesday, March 16, 2021 1:55 PM',
    avgGrade: 48
  },
  {
    id: '607d3150fc9e999837790ff4',
    name: 'Lula Chang',
    position: 'student',
    picture: 'http://placehold.it/32x32',
    lastPublish: 'Wednesday, March 10, 2021 12:42 AM',
    avgGrade: 30
  },
  {
    id: '607d31504866c9a62ffed81c',
    name: 'Alyce Hansen',
    position: 'student',
    picture: 'http://placehold.it/32x32',
    lastPublish: 'Thursday, March 25, 2021 9:32 PM',
    avgGrade: 97
  },
  {
    id: '607d3150a8c366551ac3b547',
    name: 'Brenda Herrera',
    position: 'student',
    picture: 'http://placehold.it/32x32',
    lastPublish: 'Sunday, January 3, 2021 12:34 PM',
    avgGrade: 94
  },
  {
    id: '607d3150a8cf6949116ed542',
    name: 'Lucy Rasmussen',
    position: 'student',
    picture: 'http://placehold.it/32x32',
    lastPublish: 'Tuesday, March 9, 2021 4:10 AM',
    avgGrade: 10
  },
  {
    id: '607d315095588a778a51f182',
    name: 'Dillon Leblanc',
    position: 'student',
    picture: 'http://placehold.it/32x32',
    lastPublish: 'Saturday, January 30, 2021 12:40 PM',
    avgGrade: 33
  },
  {
    id: '607d31505fbef2c1d6bce75c',
    name: 'Minerva Heath',
    position: 'student',
    picture: 'http://placehold.it/32x32',
    lastPublish: 'Sunday, April 11, 2021 12:09 AM',
    avgGrade: 89
  },
  {
    id: '607d31505ee4e8dfe166ea01',
    name: 'Francine Donaldson',
    position: 'student',
    picture: 'http://placehold.it/32x32',
    lastPublish: 'Saturday, January 2, 2021 1:33 PM',
    avgGrade: 59
  },
  {
    id: '607d3150583ee44934c4aa1d',
    name: 'Jeannie Ellison',
    position: 'student',
    picture: 'http://placehold.it/32x32',
    lastPublish: 'Sunday, January 3, 2021 1:59 AM',
    avgGrade: 62
  },
  {
    id: '607d31502a89ef0a8eaaa4dd',
    name: 'Janet Whitfield',
    position: 'student',
    picture: 'http://placehold.it/32x32',
    lastPublish: 'Wednesday, February 24, 2021 6:02 PM',
    avgGrade: 43
  },
  {
    id: '607d31504b180631542a1e5c',
    name: 'Lynda Cote',
    position: 'student',
    picture: 'http://placehold.it/32x32',
    lastPublish: 'Tuesday, March 23, 2021 1:37 PM',
    avgGrade: 17
  },
  {
    id: '607d31500b54d938a6a66ab3',
    name: 'Alford Mcconnell',
    position: 'student',
    picture: 'http://placehold.it/32x32',
    lastPublish: 'Sunday, February 21, 2021 6:33 PM',
    avgGrade: 38
  },
  {
    id: '607d3150a5a9c5aa1bc4390d',
    name: 'Judy Norman',
    position: 'student',
    picture: 'http://placehold.it/32x32',
    lastPublish: 'Sunday, February 14, 2021 7:07 PM',
    avgGrade: 60
  },
  {
    id: '607d315040688f16de6c519c',
    name: 'Crosby Moon',
    position: 'student',
    picture: 'http://placehold.it/32x32',
    lastPublish: 'Saturday, February 20, 2021 11:05 AM',
    avgGrade: 53
  },
  {
    id: '607d31506f21e18a4bbc700f',
    name: 'Craft Johns',
    position: 'student',
    picture: 'http://placehold.it/32x32',
    lastPublish: 'Tuesday, February 23, 2021 12:49 AM',
    avgGrade: 52
  },
  {
    id: '607d31502efc1ac381d10656',
    name: 'Sandoval Shannon',
    position: 'student',
    picture: 'http://placehold.it/32x32',
    lastPublish: 'Wednesday, February 10, 2021 10:35 PM',
    avgGrade: 16
  },
  {
    id: '607d315041bdd66f44eb364f',
    name: 'Saunders Stewart',
    position: 'student',
    picture: 'http://placehold.it/32x32',
    lastPublish: 'Sunday, January 24, 2021 10:06 PM',
    avgGrade: 33
  },
  {
    id: '607d3150e629bd83b9f422e2',
    name: 'Mann Cannon',
    position: 'student',
    picture: 'http://placehold.it/32x32',
    lastPublish: 'Wednesday, April 14, 2021 2:53 AM',
    avgGrade: 59
  },
  {
    id: '607d3150fc5ee448346a3f11',
    name: 'Dawson Horton',
    position: 'student',
    picture: 'http://placehold.it/32x32',
    lastPublish: 'Friday, March 26, 2021 3:26 PM',
    avgGrade: 19
  },
  {
    id: '607d315085641d26bbba6df8',
    name: 'Olsen William',
    position: 'student',
    picture: 'http://placehold.it/32x32',
    lastPublish: 'Monday, March 8, 2021 3:36 AM',
    avgGrade: 37
  },
  {
    id: '607d3150f4701afc7fc63e35',
    name: 'Finley Hess',
    position: 'student',
    picture: 'http://placehold.it/32x32',
    lastPublish: 'Monday, February 8, 2021 8:56 PM',
    avgGrade: 7
  },
  {
    id: '607d315031bae5adc74269c9',
    name: 'Banks Hood',
    position: 'student',
    picture: 'http://placehold.it/32x32',
    lastPublish: 'Thursday, March 25, 2021 8:27 AM',
    avgGrade: 98
  },
  {
    id: '607d3150e5014dec05d9e913',
    name: 'Newman Carroll',
    position: 'student',
    picture: 'http://placehold.it/32x32',
    lastPublish: 'Sunday, February 28, 2021 4:52 AM',
    avgGrade: 39
  }
];

export let lectures: Teacher[] = [
  {
    id: '607d30626a4c34f37522fe5a',
    name: 'Rhodes Battle',
    picture: 'http://placehold.it/32x32',
    lastTimeOnline: 'Saturday, February 27, 2021 5:44 PM'
  },
  {
    id: '607d30621f57ff6ed32ed602',
    name: 'Leann Castaneda',
    picture: 'http://placehold.it/32x32',
    lastTimeOnline: 'Thursday, March 11, 2021 5:01 PM'
  },
];

export let students2: Student[] = [
  {
    id: '607d3115334146aa4c2123df',
    name: 'Casey Rasmussen',
    position: 'student',
    picture: 'http://placehold.it/32x32',
    lastPublish: 'Wednesday, February 17, 2021 2:06 AM',
    avgGrade: 78
  },
  {
    id: '607d31150e5259271a6371dd',
    name: 'Mcintyre Peterson',
    position: 'student',
    picture: 'http://placehold.it/32x32',
    lastPublish: 'Sunday, March 14, 2021 3:24 AM',
    avgGrade: 27
  },
  {
    id: '607d3115b6d4368465094813',
    name: 'Beth Barrera',
    position: 'student',
    picture: 'http://placehold.it/32x32',
    lastPublish: 'Saturday, March 27, 2021 2:07 AM',
    avgGrade: 18
  },
  {
    id: '607d3115c5477ce710bcf4ea',
    name: 'Liza Ramos',
    position: 'student',
    picture: 'http://placehold.it/32x32',
    lastPublish: 'Monday, March 22, 2021 4:19 AM',
    avgGrade: 77
  },
  {
    id: '607d311578643b86b8959601',
    name: 'Leona Wallace',
    position: 'student',
    picture: 'http://placehold.it/32x32',
    lastPublish: 'Monday, March 22, 2021 11:47 AM',
    avgGrade: 71
  },
  {
    id: '607d31157a46685b8b384665',
    name: 'Shelby Barr',
    position: 'student',
    picture: 'http://placehold.it/32x32',
    lastPublish: 'Thursday, January 14, 2021 3:26 AM',
    avgGrade: 48
  },
  {
    id: '607d3115ce6060872811bd07',
    name: 'Marshall Mendez',
    position: 'student',
    picture: 'http://placehold.it/32x32',
    lastPublish: 'Thursday, March 11, 2021 11:53 PM',
    avgGrade: 82
  },
  {
    id: '607d3115d5122f0e5931bcef',
    name: 'Ware Bowman',
    position: 'student',
    picture: 'http://placehold.it/32x32',
    lastPublish: 'Sunday, February 14, 2021 5:03 AM',
    avgGrade: 31
  },
  {
    id: '607d3115a9543f8bf8aa3944',
    name: 'Leslie Young',
    position: 'student',
    picture: 'http://placehold.it/32x32',
    lastPublish: 'Wednesday, February 3, 2021 4:55 AM',
    avgGrade: 85
  },
  {
    id: '607d311556effead7130fe79',
    name: 'Velasquez Benton',
    position: 'student',
    picture: 'http://placehold.it/32x32',
    lastPublish: 'Monday, March 29, 2021 10:07 AM',
    avgGrade: 100
  },
  {
    id: '607d3115be3cb0d7cc1136d9',
    name: 'Muriel Hale',
    position: 'student',
    picture: 'http://placehold.it/32x32',
    lastPublish: 'Wednesday, April 7, 2021 6:12 AM',
    avgGrade: 15
  },
  {
    id: '607d3115354b73e4db68d26e',
    name: 'Hope Atkinson',
    position: 'student',
    picture: 'http://placehold.it/32x32',
    lastPublish: 'Monday, February 8, 2021 7:17 AM',
    avgGrade: 43
  },
  {
    id: '607d3115c068f43ff000353b',
    name: 'Edwards Copeland',
    position: 'student',
    picture: 'http://placehold.it/32x32',
    lastPublish: 'Monday, April 19, 2021 4:29 AM',
    avgGrade: 13
  },
  {
    id: '607d31158d4fff15c3efe2ba',
    name: 'Marva Rios',
    position: 'student',
    picture: 'http://placehold.it/32x32',
    lastPublish: 'Monday, April 12, 2021 11:50 PM',
    avgGrade: 37
  },
  {
    id: '607d311525a1c773899aed53',
    name: 'Mays Gordon',
    position: 'student',
    picture: 'http://placehold.it/32x32',
    lastPublish: 'Saturday, January 2, 2021 12:06 PM',
    avgGrade: 46
  },
  {
    id: '607d311596e886cc77b3bb9b',
    name: 'Ada Allen',
    position: 'student',
    picture: 'http://placehold.it/32x32',
    lastPublish: 'Saturday, April 17, 2021 12:14 PM',
    avgGrade: 50
  }
];

export let lectures2: Teacher[] = [
  {
    id: '607d306264ae763ff7bcae68',
    name: 'Lewis Fields',
    picture: 'http://placehold.it/32x32',
    lastTimeOnline: 'Tuesday, January 12, 2021 1:44 PM'
  }
];

export let modules: Modules[] = [
  {
    id: '1',
    title: 'Module 1 - Data types',
    lectures: [
      {
        id: '607d55c1ea66192e4bf67ef1',
        title: 'Lecture 1',
        subTitle: 'Lists',
        date: 'Wednesday, January 20, 2021 7:33 PM',
        status: 'Pending'
      },
      {
        id: '607d55c1f859e8875220bdc5',
        title: 'Lecture 2',
        subTitle: 'Linked List',
        date: 'Monday, February 15, 2021 1:30 AM',
        status: 'Pending'
      },
      {
        id: '607d55c19782c4e40a7c3520',
        title: 'Lecture 3',
        subTitle: 'Module 1 Summary',
        date: 'Friday, March 19, 2021 10:52 AM',
        status: 'Pending'
      }
    ],
    labs: [
      {
        id: '607d55c1ea66192e4bf67ef1',
        title: 'Lab 1',
        subTitle: 'List',
        date: 'Wednesday, January 20, 2021 7:33 PM',
        status: 'Pending'
      },
      {
        id: '607d55c1f859e8875220bdc5',
        title: 'Lab 2',
        subTitle: 'Linked List',
        date: 'Monday, February 15, 2021 1:30 AM',
        status: 'Pending'
      }
    ],
    practs: [
      {
        id: '607d55c1ea66192e4bf67ef1',
        title: 'Pract 1',
        subTitle: 'List',
        date: 'Wednesday, January 20, 2021 7:33 PM',
        status: 'Pending'
      },
      {
        id: '607d55c1f859e8875220bdc5',
        title: 'Pract 2',
        subTitle: 'Linked List',
        date: 'Monday, February 15, 2021 1:30 AM',
        status: 'Pending'
      }
    ]
  }
];

export let grades: Grades[] = [
  {
    id: '607d8959235b00ca8a8f9612',
    student: 'Huber Faulkner',
    picture: 'http://placehold.it/32x32',
    lab1: 83,
    pract1: 60,
    lab2: 98,
    pract2: 78,
    lab3: 3,
    pract3: 88,
    finalTest: 82,
    TotalScore: 44
  },
  {
    id: '607d8959395d9bd914f00870',
    student: 'Bertie Ramos',
    picture: 'http://placehold.it/32x32',
    lab1: 1,
    pract1: 0,
    lab2: 66,
    pract2: 41,
    lab3: 40,
    pract3: 4,
    finalTest: 10,
    TotalScore: 59
  },
  {
    id: '607d8959fafffd6c3e71f970',
    student: 'Zimmerman Farrell',
    picture: 'http://placehold.it/32x32',
    lab1: 46,
    pract1: 11,
    lab2: 88,
    pract2: 87,
    lab3: 23,
    pract3: 86,
    finalTest: 52,
    TotalScore: 73
  },
  {
    id: '607d8959ff566d31a241974a',
    student: 'Deleon Whitfield',
    picture: 'http://placehold.it/32x32',
    lab1: 76,
    pract1: 21,
    lab2: 81,
    pract2: 12,
    lab3: 35,
    pract3: 34,
    finalTest: 61,
    TotalScore: 81
  },
  {
    id: '607d895942dc4e7c6a91fa93',
    student: 'Farrell Simon',
    picture: 'http://placehold.it/32x32',
    lab1: 78,
    pract1: 39,
    lab2: 75,
    pract2: 94,
    lab3: 2,
    pract3: 26,
    finalTest: 56,
    TotalScore: 99
  },
  {
    id: '607d89596be885bfadc4e1ff',
    student: 'Tonya Herrera',
    picture: 'http://placehold.it/32x32',
    lab1: 63,
    pract1: 86,
    lab2: 36,
    pract2: 15,
    lab3: 38,
    pract3: 64,
    finalTest: 35,
    TotalScore: 88
  },
  {
    id: '607d8959dc49f5a5ca2d6ec9',
    student: 'Judith Weaver',
    picture: 'http://placehold.it/32x32',
    lab1: 14,
    pract1: 77,
    lab2: 78,
    pract2: 29,
    lab3: 43,
    pract3: 59,
    finalTest: 83,
    TotalScore: 37
  },
  {
    id: '607d89598d19be11486b0086',
    student: 'Mathis Baird',
    picture: 'http://placehold.it/32x32',
    lab1: 86,
    pract1: 19,
    lab2: 8,
    pract2: 92,
    lab3: 19,
    pract3: 50,
    finalTest: 32,
    TotalScore: 44
  },
  {
    id: '607d8959e8a560f391590702',
    student: 'Kirkland Reynolds',
    picture: 'http://placehold.it/32x32',
    lab1: 68,
    pract1: 97,
    lab2: 96,
    pract2: 1,
    lab3: 31,
    pract3: 63,
    finalTest: 68,
    TotalScore: 29
  },
  {
    id: '607d8959c7456f9a578bd965',
    student: 'Santana Head',
    picture: 'http://placehold.it/32x32',
    lab1: 42,
    pract1: 34,
    lab2: 77,
    pract2: 61,
    lab3: 38,
    pract3: 49,
    finalTest: 64,
    TotalScore: 17
  },
  {
    id: '607d89595a14dc77ace42a9a',
    student: 'Tisha Pratt',
    picture: 'http://placehold.it/32x32',
    lab1: 70,
    pract1: 35,
    lab2: 39,
    pract2: 16,
    lab3: 31,
    pract3: 27,
    finalTest: 77,
    TotalScore: 86
  },
  {
    id: '607d8959fa84d12480e1edf4',
    student: 'Foster Nolan',
    picture: 'http://placehold.it/32x32',
    lab1: 87,
    pract1: 83,
    lab2: 1,
    pract2: 2,
    lab3: 18,
    pract3: 69,
    finalTest: 67,
    TotalScore: 64
  },
  {
    id: '607d8959c903c710ee5a64bd',
    student: 'Lessie Gentry',
    picture: 'http://placehold.it/32x32',
    lab1: 55,
    pract1: 34,
    lab2: 89,
    pract2: 60,
    lab3: 73,
    pract3: 71,
    finalTest: 19,
    TotalScore: 12
  },
  {
    id: '607d89590ebbd10108b1b191',
    student: 'Bullock Schmidt',
    picture: 'http://placehold.it/32x32',
    lab1: 9,
    pract1: 72,
    lab2: 31,
    pract2: 20,
    lab3: 92,
    pract3: 6,
    finalTest: 53,
    TotalScore: 29
  },
  {
    id: '607d8959eb41e31465e1e995',
    student: 'Dillard Mcfadden',
    picture: 'http://placehold.it/32x32',
    lab1: 7,
    pract1: 28,
    lab2: 13,
    pract2: 75,
    lab3: 22,
    pract3: 44,
    finalTest: 3,
    TotalScore: 76
  },
  {
    id: '607d8959a635543ed66d74b7',
    student: 'Rollins Fitzpatrick',
    picture: 'http://placehold.it/32x32',
    lab1: 60,
    pract1: 87,
    lab2: 41,
    pract2: 6,
    lab3: 50,
    pract3: 55,
    finalTest: 16,
    TotalScore: 19
  },
  {
    id: '607d8959da782d1257fa1bbb',
    student: 'Collins Wheeler',
    picture: 'http://placehold.it/32x32',
    lab1: 20,
    pract1: 36,
    lab2: 86,
    pract2: 95,
    lab3: 73,
    pract3: 22,
    finalTest: 13,
    TotalScore: 75
  },
  {
    id: '607d895998f5ecf21008d735',
    student: 'Reva Eaton',
    picture: 'http://placehold.it/32x32',
    lab1: 98,
    pract1: 82,
    lab2: 97,
    pract2: 18,
    lab3: 93,
    pract3: 50,
    finalTest: 100,
    TotalScore: 90
  },
  {
    id: '607d8959e19440a82428f3ef',
    student: 'Michelle Knapp',
    picture: 'http://placehold.it/32x32',
    lab1: 29,
    pract1: 50,
    lab2: 86,
    pract2: 88,
    lab3: 35,
    pract3: 77,
    finalTest: 27,
    TotalScore: 3
  },
  {
    id: '607d8959e46b3ae2c2f6b135',
    student: 'Eddie Hess',
    picture: 'http://placehold.it/32x32',
    lab1: 49,
    pract1: 26,
    lab2: 71,
    pract2: 52,
    lab3: 80,
    pract3: 33,
    finalTest: 95,
    TotalScore: 64
  },
  {
    id: '607d8959ff9fc366875b5aa6',
    student: 'Garner Kinney',
    picture: 'http://placehold.it/32x32',
    lab1: 88,
    pract1: 43,
    lab2: 38,
    pract2: 39,
    lab3: 28,
    pract3: 2,
    finalTest: 20,
    TotalScore: 15
  },
  {
    id: '607d8959c295cfd15a33ba8a',
    student: 'Dennis Carter',
    picture: 'http://placehold.it/32x32',
    lab1: 26,
    pract1: 21,
    lab2: 71,
    pract2: 60,
    lab3: 37,
    pract3: 37,
    finalTest: 98,
    TotalScore: 39
  },
  {
    id: '607d89596b114aeea3952f21',
    student: 'Small Whitney',
    picture: 'http://placehold.it/32x32',
    lab1: 7,
    pract1: 89,
    lab2: 55,
    pract2: 91,
    lab3: 29,
    pract3: 0,
    finalTest: 70,
    TotalScore: 34
  },
  {
    id: '607d8959fc0814255f398113',
    student: 'Celina Hester',
    picture: 'http://placehold.it/32x32',
    lab1: 98,
    pract1: 76,
    lab2: 82,
    pract2: 3,
    lab3: 55,
    pract3: 21,
    finalTest: 8,
    TotalScore: 16
  },
  {
    id: '607d89594b3dce6af6a54fcd',
    student: 'Jordan Long',
    picture: 'http://placehold.it/32x32',
    lab1: 49,
    pract1: 33,
    lab2: 95,
    pract2: 99,
    lab3: 29,
    pract3: 54,
    finalTest: 17,
    TotalScore: 61
  },
  {
    id: '607d8959ab55174cafb8b8ca',
    student: 'Marsh Merritt',
    picture: 'http://placehold.it/32x32',
    lab1: 50,
    pract1: 62,
    lab2: 34,
    pract2: 10,
    lab3: 93,
    pract3: 98,
    finalTest: 67,
    TotalScore: 90
  },
  {
    id: '607d895947950d96aa580801',
    student: 'Kelly Rich',
    picture: 'http://placehold.it/32x32',
    lab1: 32,
    pract1: 94,
    lab2: 7,
    pract2: 59,
    lab3: 78,
    pract3: 1,
    finalTest: 56,
    TotalScore: 100
  }
];

export let classrooms: Classroom[] = [
  {
    id: '1',
    title: 'Math',
    students,
    lectures,
    modules,
    grades
  },
  {
    id: '2',
    title: 'History',
    students: students2,
    lectures: lectures2,
    modules,
    grades
  },
  {
    id: '3',
    title: 'ADS',
    students,
    lectures,
    modules,
    grades
  },
  {
    id: '4',
    title: 'C++',
    students: students2,
    lectures: lectures2,
    modules,
    grades
  }
];
