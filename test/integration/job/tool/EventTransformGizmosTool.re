let triggerMouseDown = (~eventButton=1, ~sandbox, ~pageX, ~pageY, ()) => {
  let target = EventTool.buildCanvasTarget();

  EventTool.triggerDomEvent(
    "mousedown",
    EventTool.getBody(),
    MouseEventTool.buildMouseDomEvent(
      ~pageX,
      ~pageY,
      ~target,
      ~which=eventButton,
      (),
    ),
  );
};

let triggerMouseMove = (~eventButton=1, ~sandbox, ~pageX, ~pageY, ()) => {
  let target = EventTool.buildCanvasTarget();

  EventTool.triggerDomEvent(
    "mousemove",
    EventTool.getBody(),
    MouseEventTool.buildMouseDomEvent(
      ~pageX,
      ~pageY,
      ~target,
      ~which=eventButton,
      (),
    ),
  );
};

let triggerMouseUp = (~eventButton=1, ~pageX=0, ~pageY=0, ~sandbox, ()) => {
  let target = EventTool.buildCanvasTarget();

  EventTool.triggerDomEvent(
    "mouseup",
    EventTool.getBody(),
    MouseEventTool.buildMouseDomEvent(
      ~pageX,
      ~pageY,
      ~target,
      ~which=eventButton,
      (),
    ),
  );
};