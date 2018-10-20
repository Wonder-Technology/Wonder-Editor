module Method = {};

let component = ReasonReact.statelessComponent("Modal");

let render = (title, closeFunc, content, _self) =>
  <article className="wonder-modal">
    <div className="modal-item">
      <div className="modal-item-header"> (DomHelper.textEl(title)) </div>
      <div className="modal-item-content"> content </div>
      <div className="modal-item-footer">
        <button className="footer-close" onClick=(_e => closeFunc())>
          (DomHelper.textEl("Close"))
        </button>
      </div>
    </div>
  </article>;

let make = (~closeFunc, ~title, ~content, _children) => {
  ...component,
  render: _self => render(title, closeFunc, content, _self),
};