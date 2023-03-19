const Field = (props: any) => {
  return (
    <>
      <div className={`form-group ${props.type !== "hidden" ? "mb-4" : ""}`}>
        {props.type !== "hidden" ? (
          <label className="mb-1" htmlFor={`id_${props.name}`}>
            {props.label}
          </label>
        ) : (
          <></>
        )}
        {props.type === "select" ? (
          <select
            id={`id_${props.name}`}
            name={props.name}
            value={props.value ?? ""}
            className="form-control"
            onChange={(event) => {
              props.setValue(event.target.value);
            }}
          >
            {props.options.map((opt: string, key: number) => (
              <option key={key} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        ) : (
          <input
            onChange={(event) => {
              props.setValue
                ? props.setValue(event.target.value)
                : props.handleChange(event);
            }}
            id={`id_${props.name}`}
            type={props.type ?? "text"}
            name={props.name}
            value={props.value ?? ""}
            className="form-control"
            required={props.required}
            placeholder={props.placeholder ?? ""}
            autoComplete={props.autoComplete ?? props.name}
          />
        )}
      </div>
    </>
  );
};

export default Field;
