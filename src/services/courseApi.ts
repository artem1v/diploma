import axios from 'axios';

import {
  CourseItemInterface,
  UserDataInterface,
  WorkoutsListInterface,
  CourseProgressInterface,
} from '@/sharedInterfaces/sharedInterfaces';

const URL_TRACKS = 'https://wedev-api.sky.pro';

export function getAllCourses(): Promise<CourseItemInterface[]> {
  return axios(URL_TRACKS + '/api/fitness/courses').then((response) => {
    return response.data;
  });
}

export function getUserData(token: string): Promise<UserDataInterface> {
  return axios(URL_TRACKS + '/api/fitness/users/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    return response.data.user;
  });
}

export function addCourse(courseId: string, token: string) {
  return axios
    .post(
      URL_TRACKS + '/api/fitness/users/me/courses',
      {
        courseId: courseId,
      },
      {
        headers: {
          'Content-Type': '',
          Authorization: `Bearer ${token}`,
        },
      },
    )
    .then((response) => {
      return response.data.message;
    });
}

export function removeCourse(courseId: string, token: string) {
  return axios
    .delete(URL_TRACKS + `/api/fitness/users/me/courses/${courseId}`, {
      headers: {
        'Content-Type': '',
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response.data.message;
    });
}

export function getWorkoutsList(
  courseId: string,
  token: string,
): Promise<WorkoutsListInterface[]> {
  return axios(URL_TRACKS + `/api/fitness/courses/${courseId}/workouts`, {
    headers: {
      'Content-Type': '',
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    return response.data;
  });
}

export function getCourseProgress(
  courseId: string,
  token: string,
): Promise<CourseProgressInterface> {
  return axios(
    URL_TRACKS + `/api/fitness/users/me/progress?courseId=${courseId}`,
    {
      headers: {
        'Content-Type': '',
        Authorization: `Bearer ${token}`,
      },
    },
  ).then((response) => {
    return response.data;
  });
}

// export function getSelectionById(
//   id: string,
// ): Promise<SelectionByIdPromiseInterface> {
//   return axios(URL_TRACKS + `/catalog/selection/${id}/`).then((response) => {
//     return response.data;
//   });
// }
