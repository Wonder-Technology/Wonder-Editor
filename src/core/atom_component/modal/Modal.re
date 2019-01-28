let component = ReasonReact.statelessComponent("Modal");

let _renderFooter = submitFunc =>
  switch (submitFunc) {
  | None => ReasonReact.null
  | Some(submitFunc) =>
    <div className="modal-item-footer">
      <button className="footer-submit" onClick=(_e => submitFunc())>
        (DomHelper.textEl("Submit"))
      </button>
    </div>
  };

let render = (title, content, (closeFunc, submitFunc), _self) =>
  <article className="wonder-modal">
    <div className="modal-item">
      <div className="modal-item-header">
        (DomHelper.textEl(title))
        <img src="./public/img/close.png" onClick=(_e => closeFunc()) />
      </div>
      <div className="modal-item-content"> (ReasonReact.array(content)) </div>
      (_renderFooter(submitFunc))
    </div>
  </article>;

let make =
    (
      ~closeFunc,
      ~title,
      ~content,
      ~submitFunc: option(unit => unit)=?,
      _children,
    ) => {
  ...component,
  render: _self => render(title, content, (closeFunc, submitFunc), _self),
};