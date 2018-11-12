let component = ReasonReact.statelessComponent("MainEditorBottomComponents");

let render = ((store, dispatchFunc), _self) => {
  let currentComponentType = store |> StoreUtils.getBottomCurrentComponentType;

  <article
    key="MainEditorBottomComponents" className="wonder-bottom-component">
    <MainEditorBottomHeader store dispatchFunc />
    <article className="wonder-bottom-project"
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
      ) className="wonder-bottom-console">
      <MainEditorConsole store dispatchFunc />
    </article>
  </article>;
};

let make = (~store, ~dispatchFunc, _children) => {
  ...component,
  render: self => render((store, dispatchFunc), self),
};