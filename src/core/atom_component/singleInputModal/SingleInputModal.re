type state = {inputValue: string};

type action =
  | Change(string);

module Method = {
  let change = event => {
    let inputVal =
      ReactDOMRe.domElementToObj(ReactEventRe.Form.target(event))##value;

    Change(inputVal);
  };
};

let component = ReasonReact.reducerComponent("SingleInputModal");

let reducer = (action, state) =>
  switch (action) {
  | Change(value) => ReasonReact.Update({...state, inputValue: value})
  };

let _renderContent = ({state, send}: ReasonReact.self('a, 'b, 'c)) =>
  <div className="modal-item-content">
    <div className="content-field">
      <div className="field-title"> {DomHelper.textEl("name")} </div>
      <div className="field-content">
        <input
          className="input-component"
          type_="text"
          value={state.inputValue}
          onChange={_e => send(Method.change(_e))}
        />
      </div>
    </div>
  </div>;

let render =
    (
      title,
      (closeFunc, submitFunc),
      ({state, send}: ReasonReact.self('a, 'b, 'c)) as self,
    ) =>
  <article className="wonder-singleInput-modal">
    <div className="modal-item">
      <div className="modal-item-header">
        {DomHelper.textEl(title)}
        <img src="./public/img/close.png" onClick={_e => closeFunc()} />
      </div>
      {_renderContent(self)}
      <div className="modal-item-footer">
        <button
          className="footer-submit"
          onClick={_e => submitFunc(state.inputValue)}>
          {DomHelper.textEl("Submit")}
        </button>
      </div>
    </div>
  </article>;

let make =
    (
      ~closeFunc,
      ~title,
      ~submitFunc,
      ~defaultValue: option(string)=?,
      _children,
    ) => {
  ...component,
  initialState: () =>
    switch (defaultValue) {
    | None => {inputValue: ""}
    | Some(value) => {inputValue: value}
    },
  reducer,
  render: _self => render(title, (closeFunc, submitFunc), _self),
};