open WonderBsMost;

open Wonderjs;

open EventType;

type action =
  | ChangePercent(int)
  | Show
  | Hide;

type state = {
  percent: int,
  style: ReactDOMRe.Style.t,
  visibleStyle: ReactDOMRe.Style.t,
};

module Method = {
  let buildWidthPercentStr = percent => (percent |> string_of_int) ++ "%";

  let didMount = send => {
    let eventEngineState = StateEditorService.getEventEngineState();

    let eventEngineState =
      ManageEventEngineService.onCustomGlobalEvent(
        ~eventName=
          ProgressUtils.getProgressChangePercentCustomGlobalEventName(),
        ~handleFunc=
          (. event, eventEngineState) => {
            send(
              ChangePercent(
                event.userData
                |> OptionService.unsafeGet
                |> WonderEditor.EventType.convertUserDataToInt,
              ),
            );

            (eventEngineState, event);
          },
        ~state=eventEngineState,
        (),
      );

    let eventEngineState =
      ManageEventEngineService.onCustomGlobalEvent(
        ~eventName=ProgressUtils.getProgressShowCustomGlobalEventName(),
        ~handleFunc=
          (. event, eventEngineState) => {
            send(Show);

            (eventEngineState, event);
          },
        ~state=eventEngineState,
        (),
      );

    let eventEngineState =
      ManageEventEngineService.onCustomGlobalEvent(
        ~eventName=ProgressUtils.getProgressHideCustomGlobalEventName(),
        ~handleFunc=
          (. event, eventEngineState) => {
            send(Hide);

            (eventEngineState, event);
          },
        ~state=eventEngineState,
        (),
      );

    eventEngineState |> StateEngineService.setState |> ignore;
  };

  let willUnmount = () => {
    let eventengineState =
      ManageEventEngineService.offCustomGlobalEventByEventName(
        ~eventName=
          ProgressUtils.getProgressChangePercentCustomGlobalEventName(),
        ~state=StateEngineService.unsafeGetState(),
      );
    let eventengineState =
      ManageEventEngineService.offCustomGlobalEventByEventName(
        ~eventName=ProgressUtils.getProgressShowCustomGlobalEventName(),
        ~state=eventengineState,
      );
    let eventengineState =
      ManageEventEngineService.offCustomGlobalEventByEventName(
        ~eventName=ProgressUtils.getProgressHideCustomGlobalEventName(),
        ~state=eventengineState,
      );

    eventengineState |> StateEngineService.setState |> ignore;
  };
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
  | Show =>
    ReasonReact.Update({
      ...state,
      visibleStyle:
        ReactUtils.addStyleProp("display", "flex", state.visibleStyle),
    })
  | Hide =>
    ReasonReact.Update({
      ...state,
      visibleStyle:
        ReactUtils.addStyleProp("display", "none", state.visibleStyle),
    })
  };

let render = ({state, send}: ReasonReact.self('a, 'b, 'c)) =>
  <article
    id="wonder-progress"
    className="wonder-progress"
    key="WonderProgress"
    style={state.visibleStyle}>
    <div className="progress-content">
      <div className="content-percent" style={state.style}>
        {DomHelper.textEl(Method.buildWidthPercentStr(state.percent))}
      </div>
    </div>
    <div className="progress-bg" />
  </article>;

let make = _children => {
  ...component,
  initialState: () => {
    percent: 0,
    style: ReactDOMRe.Style.make(~width=Method.buildWidthPercentStr(0), ()),
    visibleStyle: ReactDOMRe.Style.make(~display="none", ()),
  },
  reducer,
  render: _self => render(_self),
  didMount: ({state, send}: ReasonReact.self('a, 'b, 'c)) =>
    Method.didMount(send),
  /* willUnmount: ({state, send}: ReasonReact.self('a, 'b, 'c)) =>
     Method.willUnmount(), */
};