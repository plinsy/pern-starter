import { SyntheticEvent } from "react";

export interface ButtonProps {
  type?: "button" | "submit" | "reset" | undefined;
  color?:
    | "default"
    | "primary"
    | "success"
    | "warning"
    | "danger"
    | "outline-danger"
    | "outline-primary"
    | "outline-success"
    | "outline-info"
    | "outline-warning"
    | "outline-danger"
    | "outline-secondary";
  value?: string;
  disabled?: boolean;
  className?: string;
  onClick?: (event: SyntheticEvent<HTMLButtonElement>) => void;
}

const Button = (props: ButtonProps) => {
  return (
    <>
      <button
        type={props.type ?? "button"}
        disabled={props.disabled}
        onClick={props.onClick}
        className={
          `btn btn-${props.color ?? "default border "} ` + props.className
        }
      >
        {props.value}
      </button>
    </>
  );
};

export default Button;
