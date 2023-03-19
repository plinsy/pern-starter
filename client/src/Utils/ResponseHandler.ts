export const handleError = (err: any, setAlert: Function): void => {
  setAlert({
    color: "danger",
    message:
      err.response.data.error ?? err.response.data.message ?? err.message,
    shown: true,
  });
};

export const handleSuccess = (setAlert: Function, msg: string): void => {
  setAlert({
    color: "success",
    message: msg,
    shown: true,
  });
};
