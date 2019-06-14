open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("redo_undo: transform gizmo", () => {
    let sandbox = getSandboxDefaultVal();

    beforeEach(() => sandbox := createSandbox());
    afterEach(() => {
      restoreSandbox(refJsObjToSandbox(sandbox^));

      EventTool.restore();
    });

    describe("test translation gizmo", () => {
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

        InitPickingJobTool.triggerPicking(
          ~sandbox,
          ~pageX=250,
          ~pageY=100,
          (),
        );

        EventTransformGizmosTool.triggerMouseDown(
          ~sandbox,
          ~pageX=250 + 10,
          ~pageY=100,
          (),
        );
        EventTransformGizmosTool.triggerFirstMouseDragOverEvent(
          ~sandbox,
          ~pageX=250 + 20,
          ~pageY=100,
          (),
        );
        EventTransformGizmosTool.triggerMouseUp(~sandbox, ());

        gameObject;
      };

      describe("test undo operate", () =>
        describe("test undo one step", () =>
          test(
            {|
            pick gameObject g1;
            drag gizmo to (0.173,0,0);
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
            drag gizmo to (0.173,0,0);
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

    describe("test rotation gizmo", () => {
      let _prepare = sandbox => {
        let gameObject1 =
          InitTransformGizmosJobTool.prepareOneGameObject(
            ~sandbox,
            ~viewWidth=500,
            ~viewHeight=400,
            ~offsetLeft=0,
            ~offsetTop=0,
            ~cameraPos=(0., 16.180339813232422, 11.755704879760742),
            ~gameObjectPos=(0., 0., 0.),
            ~gameObjectEulerAngles=(0., 0., 0.),
            ~createGameObjectFunc=InitPickingJobTool.createCube,
            (),
          );

        CurrentTransformGizmoSceneViewEditorService.markRotation
        |> StateLogicService.getAndSetEditorState;

        InitPickingJobTool.triggerPicking(
          ~sandbox,
          ~pageX=250,
          ~pageY=200,
          (),
        );

        EventTransformGizmosTool.triggerMouseDown(
          ~sandbox,
          ~pageX=226,
          ~pageY=172,
          (),
        );
        EventTransformGizmosTool.triggerFirstMouseDragOverEvent(
          ~sandbox,
          ~pageX=226 + 10,
          ~pageY=172,
          (),
        );
        RotationGizmosTool.refreshInspectorTransform();
        EventTransformGizmosTool.triggerMouseUp(~sandbox, ());

        EventTransformGizmosTool.triggerMouseDown(
          ~sandbox,
          ~pageX=226 + 10,
          ~pageY=172,
          (),
        );
        EventTransformGizmosTool.triggerFirstMouseDragOverEvent(
          ~sandbox,
          ~pageX=226 + 20,
          ~pageY=172,
          (),
        );
        RotationGizmosTool.refreshInspectorTransform();
        EventTransformGizmosTool.triggerMouseUp(~sandbox, ());

        gameObject1;
      };

      describe("test undo operate", () =>
        describe("test undo one step", () =>
          test(
            {|
               pick gameObject g1;
               drag rotate by xy circle gizmo to r1;
               drag rotate by xy circle gizmo to r2;
               undo;

               g1->localEulerAngle should be r1;
               |},
            () => {
              let gameObject = _prepare(sandbox);

              RedoUndoTool.undoHistoryState();

              InitTransformGizmosJobTool.getGameObjectLocalEulerAngles(
                gameObject,
              )
              |> expect == (0., 0., (-10.4));
            },
          )
        )
      );

      describe("test redo operate", () =>
        describe("test redo one step", () =>
          test(
            {|
            pick gameObject g1;
            drag rotate by xy circle gizmo to r1;
            drag rotate by xy circle gizmo to r2;
            undo;
            undo;
            redo;

            g1->localEulerAngle should be r1;
            |},
            () => {
              let gameObject = _prepare(sandbox);

              RedoUndoTool.undoHistoryState();
              RedoUndoTool.undoHistoryState();
              RedoUndoTool.redoHistoryState();

              InitTransformGizmosJobTool.getGameObjectLocalEulerAngles(
                gameObject,
              )
              |> expect == (0., 0., (-10.4));
            },
          )
        )
      );

      describe("fix bug", () =>
        test(
          {|
            pick gameObject g1;
            drag rotate by xy circle gizmo to r1;
            drag rotate by xy circle gizmo to r2;
            undo;

            ui->inspector->transform->g1->rotation should be r1
            |},
          () => {
            let gameObject = _prepare(sandbox);

            RedoUndoTool.undoHistoryState();

            BuildComponentForCurryTool.buildMainEditorTransformComponent()
            |> ReactTestTool.createSnapshotAndMatch;
          },
        )
      );
    });

    describe("test scale gizmo", () => {
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

        CurrentTransformGizmoSceneViewEditorService.markScale
        |> StateLogicService.getAndSetEditorState;

        InitPickingJobTool.triggerPicking(
          ~sandbox,
          ~pageX=250,
          ~pageY=100,
          (),
        );

        EventTransformGizmosTool.triggerMouseDown(
          ~sandbox,
          ~pageX=250 + 10,
          ~pageY=100,
          (),
        );
        EventTransformGizmosTool.triggerFirstMouseDragOverEvent(
          ~sandbox,
          ~pageX=250 + 20,
          ~pageY=100,
          (),
        );
        EventTransformGizmosTool.triggerMouseUp(~sandbox, ());

        EventTransformGizmosTool.triggerMouseDown(
          ~sandbox,
          ~pageX=250 + 20,
          ~pageY=100,
          (),
        );
        EventTransformGizmosTool.triggerFirstMouseDragOverEvent(
          ~sandbox,
          ~pageX=250 + 40,
          ~pageY=100,
          (),
        );
        EventTransformGizmosTool.triggerMouseUp(~sandbox, ());

        gameObject;
      };

      describe("test undo operate", () =>
        describe("test undo one step", () =>
          test(
            {|
            pick gameObject g1;
            drag gizmo->x axis over +x axis to s1;
            drag gizmo->x axis over +x axis to s2;
            undo;

            g1->localScale should be s1;
            |},
            () => {
              let gameObject = _prepare(sandbox);

              RedoUndoTool.undoHistoryState();

              TransformGameObjectEngineService.getLocalScale(gameObject)
              |> StateLogicService.getEngineStateToGetData
              |> Vector3Service.truncate(3)
              |> expect == (2., 1., 1.);
            },
          )
        )
      );

      describe("test redo operate", () =>
        describe("test redo one step", () =>
          test(
            {|
            pick gameObject g1;
            drag gizmo->x axis over +x axis to s1;
            drag gizmo->x axis over +x axis to s2;
            undo;
            undo;
            redo;

            g1->localScale should be s1;
            |},
            () => {
              let gameObject = _prepare(sandbox);

              RedoUndoTool.undoHistoryState();
              RedoUndoTool.undoHistoryState();
              RedoUndoTool.redoHistoryState();

              TransformGameObjectEngineService.getLocalScale(gameObject)
              |> StateLogicService.getEngineStateToGetData
              |> Vector3Service.truncate(3)
              |> expect == (2., 1., 1.);
            },
          )
        )
      );
    });
  });