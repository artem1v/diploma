import { FormErrorsInterface } from '@/sharedInterfaces/sharedInterfaces';

export function pictureDefiner(name: string, size: string) {
  switch (name) {
    case 'Stretching':
      return `/img/blue-${size}.png`;
    case 'StepAirobic':
      return `/img/peach-${size}.png`;
    case 'Yoga':
      return `/img/yellow-${size}.png`;
    case 'BodyFlex':
      return `/img/violet-${size}.png`;
    case 'Fitness':
      return `/img/orange-${size}.png`;
    default:
      return `/img/no-photo-${size}.png`;
  }
}

export function formErrors({
  loginAndSignupData,
  passwordCheck,
  setErrors,
  setErrorMessage,
  isSignup,
}: FormErrorsInterface): boolean {
  let isCorrect: boolean = true;
  setErrorMessage('');
  const clearedErrors = {
    email: false,
    password: false,
    passwordCheck: false,
  };

  if (
    !loginAndSignupData.email.trim() ||
    !loginAndSignupData.password.trim() ||
    isSignup
      ? !passwordCheck.trim()
      : false
  ) {
    console.log(
      !loginAndSignupData.email.trim(),
      !loginAndSignupData.password.trim(),
    );
    setErrorMessage('Пожалуйста, заполните все поля');
    isCorrect = false;

    if (!loginAndSignupData.email.trim()) {
      clearedErrors.email = true;
    }

    if (!loginAndSignupData.password.trim()) {
      clearedErrors.password = true;
    }

    if (isSignup ? !passwordCheck.trim() : false) {
      clearedErrors.passwordCheck = true;
    }

    setErrors(clearedErrors);
    return isCorrect;
  }

  if (isSignup) {
    if (loginAndSignupData.password !== passwordCheck) {
      setErrorMessage('Пароли не совпадают');
      isCorrect = false;

      clearedErrors.password = true;
      clearedErrors.passwordCheck = true;
    }

    setErrors(clearedErrors);
    return isCorrect;
  } else {
    return isCorrect;
  }
}
