module Method = {
  let onSelect = (dispatch, id, _event) => AssetTreeUtils.onSelect(dispatch, id);
};

let component = ReasonReact.statelessComponent("FileBox");

let render = (store, dispatch, imgSrc, folderId, name, sign, isSelected, _self) => {
  let className = "file-item " ++ (isSelected ? "item-active" : "");
  <article className onClick=((_event) => Method.onSelect(dispatch, folderId, _event))>
    <img src=imgSrc onDragStart=(EventUtils.dragStart(folderId, sign)) />
    <span className="item-text"> (DomHelper.textEl(name)) </span>
  </article>
};

let make = (~store, ~dispatch, ~imgSrc, ~folderId, ~name, ~sign, ~isSelected, _children) => {
  ...component,
  render: (self) => render(store, dispatch, imgSrc, folderId, name, sign, isSelected, self)
};