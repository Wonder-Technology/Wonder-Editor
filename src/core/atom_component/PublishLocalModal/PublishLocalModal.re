type state = {
  name: string,
  useWorker: bool,
};

type action =
  | ChangeName(string)
  | ChangeUseWorker(bool);

module Method = {
  let changeName = event => {
    let inputVal = ReactDOMRe.domElementToObj(
                     ReactEventRe.Form.target(event),
                   )##value;

    ChangeName(inputVal);
  };

  let changeUseWorker = event => {
    let checked = ReactDOMRe.domElementToObj(
                    ReactEventRe.Mouse.target(event),
                  )##checked;

    ChangeUseWorker(checked);
  };
};

let component = ReasonReact.reducerComponent("PublishLocalModal");

let reducer = (action, state) =>
  switch (action) {
  | ChangeName(value) => ReasonReact.Update({...state, name: value})
  | ChangeUseWorker(value) =>
    ReasonReact.Update({...state, useWorker: value})
  };

let render =
    (
      title,
      (closeFunc, submitFunc),
      {state, send}: ReasonReact.self('a, 'b, 'c),
    ) =>
  <article className="wonder-singleInput-modal">
    <div className="modal-item">
      <div className="modal-item-header">
        (DomHelper.textEl(title))
        <img src="./public/img/close.png" onClick=(_e => closeFunc()) />
      </div>
      <div className="modal-item-content">
        <div className="content-field">
          <div className="field-title"> (DomHelper.textEl("name:")) </div>
          <div className="field-content">
            <input
              className="input-component"
              _type="text"
              value=state.name
              onChange=(_e => send(Method.changeName(_e)))
            />
          </div>
        </div>
        <div className="content-field">
          <div className="field-title">
            (DomHelper.textEl("useWorker:"))
          </div>
          <div className="field-content">
            <input
              _type="checkbox"
              defaultChecked=state.useWorker
              onClick=(_e => send(Method.changeUseWorker(_e)))
            />
          </div>
        </div>
      </div>
      <div className="modal-item-footer">
        <button
          className="footer-submit"
          onClick=(_e => submitFunc(state.name, state.useWorker))>
          (DomHelper.textEl("Submit"))
        </button>
      </div>
    </div>
  </article>;

let make =
    (
      ~closeFunc,
      ~title,
      ~submitFunc,
      /* ~defaultName: option(string)=?, */
      ~defaultName: string="",
      ~defaultUseWorker: bool=false,
      _children,
    ) => {
  ...component,
  initialState: () => {
    name: defaultName,
    useWorker: defaultUseWorker,
    /* switch (defaultName) {
       | None => {name: "",
       |
       | }
       | Some(defaultName) => {name: defaultName}
       } */
  },
  reducer,
  render: _self => render(title, (closeFunc, submitFunc), _self),
};