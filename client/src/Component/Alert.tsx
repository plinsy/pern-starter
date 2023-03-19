import { useState, useEffect } from "react";

export interface AlertProps {
  message: string;
  color?: "info" | "success" | "danger" | "default" | string;
  shown?: boolean;
}

const Alert = (props: AlertProps) => {
  const [textColor, setTextColor] = useState("");
  const [isOpening, setIsOpening] = useState(true);
  const [isClosing, setIsClosing] = useState(false);

  const close = () => {
    setIsClosing(true);
  };

  useEffect(() => {
    switch (props.color) {
      case "danger":
        setTextColor("white");
        break;
      default:
        setTextColor("dark");
        break;
    }

    if (props.shown) {
      setIsOpening(true);
      setIsClosing(false);
    } else {
      setIsOpening(false);
      setIsClosing(true);
    }

    return () => {};
  }, [props]);

  if (!props.shown) {
    return <></>;
  }

  return (
    <>
      <div className="toast-container position-fixed p-3 end-0">
        <div
          className={`toast showing animate__animated ${
            isClosing ? "animate__backOutRight" : ""
          } ${isOpening ? "animate__backInRight" : ""}`}
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className={`toast-header bg-${props.color} text-${textColor}`}>
            {/* <img src="..." className="rounded me-2" alt="..." /> */}
            <strong className="text-capitalize me-auto">{props.color}</strong>
            {/* <small className="text-muted">a moment ago</small> */}
            <button
              onClick={close}
              type="button"
              className="btn-close"
              data-bs-dismiss="toast"
              aria-label="Close"
            ></button>
          </div>
          <div className="toast-body">{props.message}</div>
        </div>
      </div>
    </>
  );
};

export default Alert;
