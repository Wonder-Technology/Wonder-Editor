open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open EventType;

let _ =
  describe("init event for inspector job", () => {
    let sandbox = getSandboxDefaultVal();

    beforeEach(() => sandbox := createSandbox());
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("bind dom event", () =>
      describe("bind mouse event", () =>
        describe("bind mousedrag event", () => {
          let _test =
              (
                (clickPageX, clickPageY),
                (movePageX, movePageY),
                (dropPageX, dropPageY),
                (dragStartLocationInViewX, dragStartLocationInViewY),
                (dragOverLocationInViewX, dragOverLocationInViewY),
                (dragDropLocationInViewX, dragDropLocationInViewY),
              ) => {
            let (x1, y1, x2, y2, x3, y3) = (
              ref(0),
              ref(0),
              ref(0),
              ref(0),
              ref(0),
              ref(0),
            );
            let engineState = StateInspectorEngineService.unsafeGetState();

            engineState
            |> EventTool.onMouseEvent(
                 MouseDragStart,
                 0,
                 (. event: mouseEvent, state) => {
                   let (x, y) = event.locationInView;
                   x1 := x;
                   y1 := y;
                   state;
                 },
               )
            |> EventTool.onMouseEvent(
                 MouseDragOver,
                 0,
                 (. event: mouseEvent, state) => {
                   let (x, y) = event.locationInView;
                   x2 := x;
                   y2 := y;
                   state;
                 },
               )
            |> EventTool.onMouseEvent(
                 MouseDragDrop,
                 0,
                 (. event: mouseEvent, state) => {
                   let (x, y) = event.locationInView;
                   x3 := x;
                   y3 := y;
                   state;
                 },
               )
            |> StateInspectorEngineService.setState
            |> ignore;

            EventTool.triggerDomEvent(
              "mousedown",
              EventTool.getBody(),
              MouseEventTool.buildMouseDomEvent(
                ~pageX=clickPageX,
                ~pageY=clickPageY,
                (),
              ),
            );
            EventTool.triggerFirstMouseDragOverEvent(
              MouseEventTool.buildMouseDomEvent(
                ~pageX=movePageX,
                ~pageY=movePageY,
                (),
              ),
            );
            EventTool.triggerDomEvent(
              "mouseup",
              EventTool.getBody(),
              MouseEventTool.buildMouseDomEvent(
                ~pageX=dropPageX,
                ~pageY=dropPageY,
                (),
              ),
            );
            EventTool.restore();

            ((x1^, y1^), (x2^, y2^), (x3^, y3^))
            |> expect
            == (
                 (dragStartLocationInViewX, dragStartLocationInViewY),
                 (dragOverLocationInViewX, dragOverLocationInViewY),
                 (dragDropLocationInViewX, dragDropLocationInViewY),
               );
          };

          describe("test event target is inspector", () =>
            describe("test locationInView", () =>
              test(
                "test trigger mousedragstart, mousedragover, mousedragdrop event",
                () => {
                InspectorCanvasEventTool.prepareMouseEvent(
                  ~sandbox,
                  ~offsetLeft=1,
                  ~offsetTop=2,
                  (),
                );

                _test(
                  (60, 20),
                  (20, 30),
                  (10, 22),
                  (60 - 1, 20 - 2),
                  (20 - 1, 30 - 2),
                  (10 - 1, 22 - 2),
                );
              })
            )
          );
        })
      )
    );

    describe("bind dom event to trigger point event", () =>
      describe("bind mouse event to trigger point event", () => {
        let _prepareAndExec = (pointEventName, (pageX, pageY)) => {
          let value = ref(0);

          EventTool.onCustomGlobalEvent(
            pointEventName,
            0,
            (. event, state) => {
              value := 1;
              (state, event);
            },
          )
          |> StateLogicService.getAndSetInspectorEngineState;

          EventTool.triggerDomEvent(
            "mousedown",
            EventTool.getBody(),
            MouseEventTool.buildMouseDomEvent(~pageX, ~pageY, ()),
          );
          EventTool.restore();

          value;
        };

        let _test = (pointEventName, (pageX, pageY)) => {
          let value = _prepareAndExec(pointEventName, (pageX, pageY));

          value^ |> expect == 1;
        };

        describe("test event target is Other", () =>
          describe("do nothing", () =>
            test("not trigger editor point event", () => {
              InspectorCanvasEventTool.prepareMouseEvent(~sandbox, ());

              let value =
                _prepareAndExec(
                  InspectorEventEditorService.getPointDragStartEventName(),
                  ((-1), 20),
                );

              value^ |> expect == 0;
            })
          )
        );

        describe("test event target is Inspector", () =>
          test("trigger editor point event", () => {
            InspectorCanvasEventTool.prepareMouseEvent(~sandbox, ());

            _test(
              InspectorEventEditorService.getPointDragStartEventName(),
              (10, 20),
            );
          })
        );
      })
    );
  });