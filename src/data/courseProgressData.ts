import { CourseProgressInterface } from '../sharedInterfaces/sharedInterfaces';

const courseProgressData: CourseProgressInterface[] = [
  // no exercises course completed
  {
    courseId: '6i67sm',
    courseCompleted: true,
    workoutsProgress: [
      {
        workoutId: 'a1rqtt',
        workoutCompleted: true,
        progressData: [],
        _id: '68d439fd66c07586f57b9b59',
      },
      {
        workoutId: 'e9ghsb',
        workoutCompleted: true,
        progressData: [],
        _id: '68d43a0466c07586f57b9cda',
      },
      {
        workoutId: 'mstcbg',
        workoutCompleted: true,
        progressData: [],
        _id: '68d43a0a66c07586f57b9e63',
      },
      {
        workoutId: 't3cpno',
        workoutCompleted: true,
        progressData: [],
        _id: '68d43a1066c07586f57b9ff4',
      },
    ],
    _id: '68d439fd66c07586f57b9b58',
  },

  // no exercises course not completed
  {
    courseId: 'ypox9r',
    courseCompleted: false,
    workoutsProgress: [
      {
        workoutId: 'gh7bd5',
        workoutCompleted: true,
        progressData: [],
        _id: '68d1e190fdc4e8f2885db3fb',
      },
    ],
    _id: '68d1e190fdc4e8f2885db3fa',
  },

  // with exercises course completed
  {
    courseId: 'kfpq8e',
    courseCompleted: true,
    workoutsProgress: [
      {
        workoutId: '9mefwq',
        workoutCompleted: true,
        progressData: [20, 10, 10, 20],
        _id: '68d3095d66c07586f57b953b',
      },
      {
        workoutId: '9yolz2',
        workoutCompleted: true,
        progressData: [15, 10, 5],
        _id: '68d43bba66c07586f57ba77d',
      },
      {
        workoutId: 'pi5vtr',
        workoutCompleted: true,
        progressData: [15, 5, 20],
        _id: '68d43bcc66c07586f57ba8fa',
      },
    ],
    _id: '68d3095d66c07586f57b953a',
  },

  // with exercises course not completed
  {
    courseId: 'ab1c3f',
    courseCompleted: false,
    workoutsProgress: [
      {
        workoutId: '3yvozj',
        workoutCompleted: true,
        progressData: [10],
        _id: '68cdb08df71a72cde4e23a4b',
      },
      {
        workoutId: 'hfgxlo',
        workoutCompleted: true,
        progressData: [10, 10, 5],
        _id: '68d43b1c66c07586f57ba2cc',
      },
      {
        workoutId: 'kcx5ai',
        workoutCompleted: false,
        progressData: [10, 10, 5, 0, 0],
        _id: '68d43b3b66c07586f57ba489',
      },
    ],
    _id: '68c1c0688253bbbd33e9dc42',
  },
];

export default courseProgressData;
