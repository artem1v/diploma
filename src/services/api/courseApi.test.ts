import axios from 'axios';

import { userLogin } from './authApi';
import {
  getAllCourses,
  getWorkoutsList,
  getUserData,
  getCourseProgress,
} from './courseApi';

import coursesData from '../../data/coursesData';
import workoutsData from '../../data/workoutsData';
import userData from '../../data/userData';
import courseProgressData from '../../data/courseProgressData';

import {
  CourseItemInterface,
  WorkoutsListInterface,
  UserDataInterface,
  CourseProgressInterface,
} from '@/sharedInterfaces/sharedInterfaces';

jest.mock('axios');

const mockAxios = axios as jest.Mocked<typeof axios>;

const URL_TRACKS = 'https://wedev-api.sky.pro';
const loginData = {
  email: 'asdzxcqwe@example.com',
  password: 'Asdzxcqwe@@!',
};

mockAxios.post = jest.fn().mockResolvedValue({
  data: { token: 'jwt-token' },
});

describe('courseApi', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // -=-=-==-=-==-=-=-=-==-=-==-=-=-

  // -=-=-==-=-==-=-=-=-==-=-==-=-=-

  // -=-=-==-=-==-=-=-=-==-=-==-=-=-

  it('getAllCourses', async () => {
    const mockData: CourseItemInterface[] = coursesData;

    mockAxios.get = jest.fn().mockResolvedValue({ data: mockData });

    const result = await getAllCourses();

    expect(mockAxios.get).toHaveBeenCalledWith(
      expect.stringContaining(URL_TRACKS + '/api/fitness/courses'),
    );
    expect(result).toEqual(mockData);
  });

  it('getAllCourses error', async () => {
    (mockAxios.get as jest.Mock).mockRejectedValue(new Error('Error'));

    await expect(getAllCourses()).rejects.toThrow('Error');
  });

  // -=-=-==-=-==-=-=-=-==-=-==-=-=-

  // -=-=-==-=-==-=-=-=-==-=-==-=-=-

  // -=-=-==-=-==-=-=-=-==-=-==-=-=-

  it('getWorkoutsList', async () => {
    const loginResult = await userLogin(loginData);

    for (const workoutsEl of workoutsData) {
      const mockData: WorkoutsListInterface[] = workoutsEl.workoutsList;

      mockAxios.get = jest.fn().mockResolvedValue({ data: mockData });

      const result = await getWorkoutsList(
        workoutsEl.courseId,
        loginResult.token,
      );

      expect(mockAxios.get).toHaveBeenCalledWith(
        URL_TRACKS + `/api/fitness/courses/${workoutsEl.courseId}/workouts`,
        {
          headers: {
            'Content-Type': '',
            Authorization: `Bearer ${loginResult.token}`,
          },
        },
      );

      expect(result).toEqual(mockData);

      mockAxios.get.mockClear();
    }
  });

  it('getWorkoutsList error', async () => {
    const loginResult = await userLogin(loginData);

    for (const workoutsEl of workoutsData) {
      mockAxios.get = jest.fn().mockRejectedValue(new Error('Error'));

      try {
        await getWorkoutsList(workoutsEl.courseId, loginResult.token);
        fail('Error');
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect((error as Error).message).toBe('Error');
      }

      (mockAxios.get as jest.Mock).mockClear();
    }
  });

  // -=-=-==-=-==-=-=-=-==-=-==-=-=-

  // -=-=-==-=-==-=-=-=-==-=-==-=-=-

  // -=-=-==-=-==-=-=-=-==-=-==-=-=-

  it('getUserData', async () => {
    const loginResult = await userLogin(loginData);

    const mockData: UserDataInterface = userData;

    mockAxios.get = jest.fn().mockResolvedValue({
      data: {
        user: mockData,
      },
    });

    const result = await getUserData(loginResult.token);

    expect(mockAxios.get).toHaveBeenCalledWith(
      URL_TRACKS + '/api/fitness/users/me',
      {
        headers: {
          Authorization: `Bearer ${loginResult.token}`,
        },
      },
    );

    expect(result).toEqual(mockData);
  });

  it('getUserData error', async () => {
    const loginResult = await userLogin(loginData);

    mockAxios.get = jest.fn().mockRejectedValue(new Error('Error'));

    await expect(getUserData(loginResult.token)).rejects.toThrow('Error');
  });

  // -=-=-==-=-==-=-=-=-==-=-==-=-=-

  // -=-=-==-=-==-=-=-=-==-=-==-=-=-

  // -=-=-==-=-==-=-=-=-==-=-==-=-=-

  it('getCourseProgress', async () => {
    const loginResult = await userLogin(loginData);

    for (const courseProgressEl of courseProgressData) {
      const mockData: CourseProgressInterface = courseProgressEl;

      mockAxios.get = jest.fn().mockResolvedValue({ data: mockData });

      const result = await getCourseProgress(
        courseProgressEl.courseId,
        loginResult.token,
      );

      expect(mockAxios.get).toHaveBeenCalledWith(
        URL_TRACKS +
          `/api/fitness/users/me/progress?courseId=${courseProgressEl.courseId}`,
        {
          headers: {
            'Content-Type': '',
            Authorization: `Bearer ${loginResult.token}`,
          },
        },
      );

      expect(result).toEqual(mockData);

      mockAxios.get.mockClear();
    }
  });

  it('getCourseProgress error', async () => {
    const loginResult = await userLogin(loginData);

    for (const courseProgressEl of courseProgressData) {
      mockAxios.get = jest.fn().mockRejectedValue(new Error('Error'));

      const result = getCourseProgress(
        courseProgressEl.courseId,
        loginResult.token,
      );

      await expect(result).rejects.toThrow('Error');

      (mockAxios.get as jest.Mock).mockClear();
    }
  });
});
