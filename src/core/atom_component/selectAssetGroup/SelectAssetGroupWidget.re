module Method = {
  let showItems =
      ((getAllItemsFunc, isItemFunc, changeItemFunc, getTextFunc), sendFunc) =>
    getAllItemsFunc()
    |> Js.Array.map(item => {
         let className =
           isItemFunc(item) ?
             "select-item-content select-item-active" : "select-item-content";

         <div
           className
           key={DomHelper.getRandomKey()}
           onClick={_e => changeItemFunc(item, sendFunc)}>
           {DomHelper.textEl(getTextFunc(item))}
         </div>;
       });
};

let component = ReasonReact.statelessComponent("SelectAssetGroupWidget");

let render =
    (
      headerText,
      (clickHideGroupButtonFunc, sendFunc),
      (getAllItemsFunc, isItemFunc, changeItemFunc, getTextFunc),
    ) =>
  <div className="select-component-content">
    <div className="select-component-item">
      <div className="select-item-header">
        {DomHelper.textEl(headerText)}
      </div>
      <div className="select-item-body">
        {
          ReasonReact.array(
            Method.showItems(
              (getAllItemsFunc, isItemFunc, changeItemFunc, getTextFunc),
              sendFunc,
            ),
          )
        }
      </div>
    </div>
    <div
      className="select-component-bg"
      onClick={_e => clickHideGroupButtonFunc(sendFunc)}
    />
  </div>;

let make =
    (
      ~headerText,
      ~clickHideGroupButtonFunc,
      ~sendFunc,
      ~getAllItemsFunc,
      ~isItemFunc,
      ~changeItemFunc,
      ~getTextFunc,
      _children,
    ) => {
  ...component,
  render: _self =>
    render(
      headerText,
      (clickHideGroupButtonFunc, sendFunc),
      (getAllItemsFunc, isItemFunc, changeItemFunc, getTextFunc),
    ),
};