let component = ReasonReact.statelessComponent("SelectAssetGroupBar");

let render =
    ((headerText, headerTitle, itemText), (selectItemFunc, sendFunc)) =>
  <div className="inspector-item">
    <div className="item-header" title=headerTitle>
      {DomHelper.textEl(headerText)}
    </div>
    <div className="item-content">
      <div className="inspector-select">
        <div className="select-name" onClick={_e => selectItemFunc(sendFunc)}>
          {DomHelper.textEl(itemText)}
        </div>
        <div className="select-img" onClick={_e => selectItemFunc(sendFunc)}>
          <img src="./public/img/select.png" />
        </div>
      </div>
    </div>
  </div>;

let make =
    (
      ~headerText,
      ~headerTitle,
      ~itemText,
      ~selectItemFunc,
      ~sendFunc,
      _children,
    ) => {
  ...component,
  render: _self =>
    render((headerText, headerTitle, itemText), (selectItemFunc, sendFunc)),
};