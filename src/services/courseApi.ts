import axios from 'axios';

import { CourseItemInterface } from '@/sharedInterfaces/sharedInterfaces';

const URL_TRACKS = 'https://wedev-api.sky.pro';

export function getAllCourses(): Promise<CourseItemInterface[]> {
  return axios(URL_TRACKS + '/api/fitness/courses').then((response) => {
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
