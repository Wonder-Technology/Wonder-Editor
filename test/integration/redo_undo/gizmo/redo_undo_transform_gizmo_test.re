open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("redo_undo: transform gizmo", () => {
    let sandbox = getSandboxDefaultVal();

    let _prepareGameObject = sandbox =>
      InitTransformGizmosJobTool.prepareOneGameObject(
        ~sandbox,
        ~viewWidth=500,
        ~viewHeight=200,
        ~offsetLeft=0,
        ~offsetTop=0,
        ~cameraPos=(0., 0., 3.),
        ~gameObjectPos=(0., 0., 0.),
        ~gameObjectEulerAngles=(0., 0., 0.),
        ~createGameObjectFunc=InitPickingJobTool.createCube,
        (),
      );

    let _prepare = sandbox => {
      let gameObject = _prepareGameObject(sandbox);

      InitPickingJobTool.triggerPicking(~sandbox, ~pageX=250, ~pageY=100, ());

      EventTransformGizmosTool.triggerMouseDown(
        ~sandbox,
        ~pageX=250 + 10,
        ~pageY=100,
        (),
      );
      EventTransformGizmosTool.triggerMouseMove(
        ~sandbox,
        ~pageX=250 + 20,
        ~pageY=100,
        (),
      );
      EventTransformGizmosTool.triggerMouseUp(~sandbox, ());
      EventTool.restore();

      gameObject;
    };

    beforeEach(() => sandbox := createSandbox());
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test undo operate", () =>
      describe("test undo one step", () =>
        test(
          {|
            pick gameObject g1;
            drag translation gizmo to (0.173,0,0);
            undo;

            g1->localPosition should be (0,0,0);
            |},
          () => {
            let gameObject = _prepare(sandbox);

            RedoUndoTool.undoHistoryState();

            TransformGameObjectEngineService.getLocalPosition(gameObject)
            |> StateLogicService.getEngineStateToGetData
            |> Vector3Service.truncate(3)
            |> expect == (0., 0., 0.);
          },
        )
      )
    );

    describe("test redo operate", () =>
      describe("test redo one step", () =>
        test(
          {|
            pick gameObject g1;
            drag translation gizmo to (0.173,0,0);
            undo;
            redo

            g1->localPosition should be (0.173,0,0);
            |},
          () => {
            let gameObject = _prepare(sandbox);

            RedoUndoTool.undoHistoryState();
            RedoUndoTool.redoHistoryState();

            TransformGameObjectEngineService.getLocalPosition(gameObject)
            |> StateLogicService.getEngineStateToGetData
            |> Vector3Service.truncate(3)
            |> expect == (0.173, 0., 0.);
          },
        )
      )
    );
  });