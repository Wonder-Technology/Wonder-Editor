let component = ReasonReact.statelessComponent("MainEditorBottomComponents");

let render = ((store, dispatchFunc), _self) => {
  let currentComponentType = store |> StoreUtils.getBottomCurrentComponentType;

  <article
    key="MainEditorBottomComponents" className="wonder-bottom-component">
    <MainEditorBottomHeader store dispatchFunc />
    <article
      style=(
        MainEditorBottomComponentUtils.isTypeEqualProject(
          currentComponentType,
        ) ?
          ReactDOMRe.Style.make() : ReactDOMRe.Style.make(~display="none", ())
      )>
      <MainEditorProject store dispatchFunc />
    </article>
    <article
      style=(
        MainEditorBottomComponentUtils.isTypeEqualConsole(
          currentComponentType,
        ) ?
          ReactDOMRe.Style.make() : ReactDOMRe.Style.make(~display="none", ())
      )>
      <MainEditorConsole store dispatchFunc />
    </article>
  </article>;
};

let make = (~store, ~dispatchFunc, _children) => {
  ...component,
  render: self => render((store, dispatchFunc), self),
};