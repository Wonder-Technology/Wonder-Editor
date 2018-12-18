module Method = {
  let buildInputComponent = (inputId, inputType, value, onChange) =>
    switch (inputId) {
    | None =>
      <input
        type_=(
          switch (inputType) {
          | None => "text"
          | Some(inputType) => inputType
          }
        )
        className="input-component float-input"
        value
        onChange=(
          event =>
            onChange(
              ReactDOMRe.domElementToObj(ReactEventRe.Form.target(event))##value,
            )
        )
      />
    | Some(id) =>
      <input
        id
        type_=(
          switch (inputType) {
          | None => "text"
          | Some(inputType) => inputType
          }
        )
        className="input-component float-input"
        value
        onChange=(
          event =>
            onChange(
              ReactDOMRe.domElementToObj(ReactEventRe.Form.target(event))##value,
            )
        )
      />
    };
};

let component = ReasonReact.statelessComponent("FormItem");

let render = ((value, label, logMsg), (inputType, inputId), onChange, _self) =>
  <article className="form-item">
    <div className="item-header">
      <span className="component-label"> (DomHelper.textEl(label)) </span>
    </div>
    <div className="item-content">
      (Method.buildInputComponent(inputId, inputType, value, onChange))
      (
        switch (logMsg) {
        | None => ReasonReact.null
        | Some(logMsg) =>
          <span className="content-log"> (DomHelper.textEl(logMsg)) </span>
        }
      )
    </div>
  </article>;

let make =
    (
      ~value: string,
      ~logMsg: option(string)=?,
      ~label: string,
      ~onChange: string => unit,
      ~inputId: option(string)=?,
      ~inputType: option(string)=?,
      _children,
    ) => {
  ...component,
  render: self =>
    render((value, label, logMsg), (inputType, inputId), onChange, self),
};