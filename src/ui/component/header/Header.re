Css.importCss("./css/header.css");

module Method = {
  let getStorageParentKey = () => "userExtension";
  let addExtension = (text) =>
    /* TODO use extension names instead of the name */
    AppExtensionView.setExtension(getStorageParentKey(), text);
};

let component = ReasonReact.statelessComponent("Header");

let render = (store, dispatch, _self) =>
  <article key="header" className="header-component">
    <div className="component-item">
      <button onClick=((_e) => StateHistoryView.undoHistoryState(store, dispatch))>
        (DomHelper.textEl("undo"))
      </button>
    </div>
    <div className="component-item">
      <button onClick=((_e) => StateHistoryView.redoHistoryState(store, dispatch))>
        (DomHelper.textEl("redo"))
      </button>
    </div>
    <div className="component-item">
      <FileInput buttonText="show Input" onSubmit=((value) => Method.addExtension(value)) />
    </div>
  </article>;

  
let make = (~store: AppStore.appState, ~dispatch, _children) => {
  ...component,
  render: (self) => render(store, dispatch, self)
};