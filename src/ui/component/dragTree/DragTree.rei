module Method: {
  let handleDragOver: ReactEventRe.Mouse.t => unit;
  let handleDrop: ('a, (('a, int)) => 'b, ReactEventRe.Mouse.t) => 'b;
};

type state;

type action;

let render:
  (
    array(ReasonReact.reactElement),
    'a,
    (('a, int)) => unit,
    ReasonReact.self(state, 'b, action)
  ) =>
  ReasonReact.reactElement;

let make:
  (
    ~treeArrayData: array(ReasonReact.reactElement),
    ~rootUid: int,
    ~onDropFinish: ((Wonderjs.GameObjectType.gameObject, int)) => unit,
    'a
  ) =>
  ReasonReact.component(state, ReasonReact.noRetainedProps, action);