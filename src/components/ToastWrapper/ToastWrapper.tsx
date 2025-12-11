import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import './toastwrapper.css';

export default function ToastWrapper() {
  return (
    <ToastContainer
      position="bottom-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  );
}
