open WonderBsMost;

open Wonderjs;

open EventType;

type action =
  | ChangePercent(int);

type state = {
  style: ReactDOMRe.Style.t,
  percent: int,
};

module Method = {
  let buildWidthPercentStr = percent => (percent |> string_of_int) ++ "%";

  let willUnmount = () =>
    ManageEventEngineService.offCustomGlobalEventByEventName(
      ~eventName=ProgressUtils.getProgressChangePercentCustomGlobalEventName(),
      ~state=StateEngineService.unsafeGetState(),
    )
    |> StateEngineService.setState
    |> ignore;
};

let component = ReasonReact.reducerComponent("Progress");

let reducer = (action, state) =>
  switch (action) {
  | ChangePercent(value) =>
    ReasonReact.Update({
      ...state,
      style:
        ReactUtils.addStyleProp(
          "width",
          Method.buildWidthPercentStr(value),
          state.style,
        ),
      percent: value,
    })
  };

let render = ({state, send}: ReasonReact.self('a, 'b, 'c)) =>
  <article className="wonder-progress" key="WonderProgress">
    <div className="progress-content">
      <div className="content-percent" style={state.style}>
        {DomHelper.textEl(Method.buildWidthPercentStr(state.percent))}
      </div>
    </div>
    <div className="progress-bg" />
  </article>;

let make = (~percent: int, ~completeFunc, _children) => {
  ...component,
  initialState: () => {
    percent,
    style:
      ReactDOMRe.Style.make(~width=Method.buildWidthPercentStr(percent), ()),
  },
  reducer,
  render: _self => render(_self),
  didUpdate: ({oldSelf, newSelf}: ReasonReact.oldNewSelf('a, 'b, 'c)) =>
    newSelf.state.percent === 100 ? completeFunc(.) : (),
  didMount: ({state, send}: ReasonReact.self('a, 'b, 'c)) => {
    let engineState = StateEngineService.unsafeGetState();

    ManageEventEngineService.onCustomGlobalEvent(
      ~eventName=ProgressUtils.getProgressChangePercentCustomGlobalEventName(),
      ~handleFunc=
        (. event, engineState) => {
          send(
            ChangePercent(
              event.userData
              |> OptionService.unsafeGet
              |> WonderEditor.EventType.convertUserDataToInt,
            ),
          );

          (engineState, event);
        },
      ~state=engineState,
      (),
    )
    |> StateEngineService.setState
    |> ignore;
  },
  willUnmount: ({state, send}: ReasonReact.self('a, 'b, 'c)) =>
    Method.willUnmount(),
};