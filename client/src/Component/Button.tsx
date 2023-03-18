export interface ButtonProps {
  type?: "button" | "submit" | "reset" | undefined;
  color?: "default" | "primary" | "success";
  value?: string;
  disabled?: boolean;
}

const Button = (props: ButtonProps) => {
  return (
    <>
      <button
        type={props.type ?? "button"}
        disabled={props.disabled}
        className={`btn btn-${props.color ?? "default border"}`}
      >
        {props.value}
      </button>
    </>
  );
};

export default Button;
