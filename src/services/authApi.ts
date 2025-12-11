import axios from 'axios';

import {
  LoginAndSignupDataInterface,
  LoginPromiseInterface,
  SignupPromiseInterface,
} from '@/sharedInterfaces/sharedInterfaces';

const URL_AUTH = 'https://wedev-api.sky.pro';

export function userLogin(
  signinData: LoginAndSignupDataInterface,
): Promise<LoginPromiseInterface> {
  return axios
    .post(URL_AUTH + '/api/fitness/auth/login', signinData, {
      headers: {
        'Content-Type': '',
      },
    })
    .then((response) => {
      return response.data;
    });
}

export function userSignup(
  signupData: LoginAndSignupDataInterface,
): Promise<SignupPromiseInterface> {
  return axios
    .post(URL_AUTH + '/api/fitness/auth/register', signupData, {
      headers: {
        'Content-Type': '',
      },
    })
    .then((response) => {
      return response.data;
    });
}

// export function getBothTokens(
//   userData: SigninDataInterface,
// ): Promise<{ access: string; refresh: string }> {
//   return axios.post(URL_AUTH + '/token', userData).then((response) => {
//     return response.data;
//   });
// }

// export function refreshAccesToken(
//   refreshToken: string,
// ): Promise<{ access: string }> {
//   return axios
//     .post(URL_AUTH + '/token/refresh', { refresh: refreshToken })
//     .then((response) => {
//       return response.data;
//     });
// }
