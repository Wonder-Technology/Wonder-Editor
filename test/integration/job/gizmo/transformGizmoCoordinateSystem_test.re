open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open EventType;

let _ =
  describe("test transform gizmo coordinate system job", () => {
    let sandbox = getSandboxDefaultVal();

    let prepareGameObject = sandbox =>
      InitTransformGizmosJobTool.prepareOneGameObject(
        ~sandbox,
        ~viewWidth=500,
        ~viewHeight=400,
        ~offsetLeft=0,
        ~offsetTop=0,
        ~cameraPos=(0.1, 16.180339813232422, 11.755704879760742),
        ~gameObjectPos=(0., 0., 0.),
        ~gameObjectEulerAngles=(12., 45., 22.),
        ~createGameObjectFunc=InitPickingJobTool.createCube,
        (),
      );

    let _prepare = (sandbox, coordinateSystem, markCurrentTransformGizmoFunc) => {
      let gameObject1 = prepareGameObject(sandbox);

      markCurrentTransformGizmoFunc |> StateLogicService.getAndSetEditorState;
      TransformGizmosTool.setCoordinateSystem(coordinateSystem);

      InitPickingJobTool.triggerPicking(~sandbox, ~pageX=250, ~pageY=200, ());

      gameObject1;
    };

    beforeEach(() => sandbox := createSandbox());
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test world coordinate system", () => {
      describe("test translation gizmo", () => {
        let _prepare = sandbox =>
          _prepare(
            sandbox,
            SceneViewType.World,
            CurrentTransformGizmoSceneViewEditorService.markTranslation,
          );

        describe("axis gizmos should be aligned with world axis", () =>
          test(
            {|
            pick gameObject;
            select x axis;
            mouse move (10px, 0px);

            gameObject should move along +x axis;
            |},
            () => {
              _prepare(sandbox);

              EventTransformGizmosTool.triggerMouseDown(
                ~sandbox,
                ~pageX=250 + 40,
                ~pageY=200,
                (),
              );
              EventTransformGizmosTool.triggerFirstMouseDragOverEvent(
                ~sandbox,
                ~pageX=250 + 40 + 10,
                ~pageY=200,
                (),
              );

              InitTransformGizmosJobTool.getCurrentSceneTreeNodePosition()
              |> expect == (0.577, 0., 0.);
            },
          )
        );

        describe("plane gizmos should be aligned with world axis", () =>
          test(
            {|
            pick gameObject;
            select xy plane;
            mouse move (10px, 10px);

            gameObject should move along xy plane;
            |},
            () => {
              _prepare(sandbox);

              EventTransformGizmosTool.triggerMouseDown(
                ~sandbox,
                ~pageX=264,
                ~pageY=194,
                (),
              );
              EventTransformGizmosTool.triggerFirstMouseDragOverEvent(
                ~sandbox,
                ~pageX=264 + 10,
                ~pageY=194 + 10,
                (),
              );

              InitTransformGizmosJobTool.getCurrentSceneTreeNodePosition()
              |> expect == (0.618, (-0.967), 0.);
            },
          )
        );
      });

      describe("test rotation gizmo", () => {
        let _prepare = sandbox =>
          _prepare(
            sandbox,
            SceneViewType.World,
            CurrentTransformGizmoSceneViewEditorService.markRotation,
          );

        describe("circle gizmos should be aligned with world axis", () =>
          test(
            {|
            pick gameObject;
            select xy circle;
            mouse move (10px, 0px);

            gameObject should rotate along z axis;
            |},
            () => {
              _prepare(sandbox);

              let (eulerAngleX, eulerAngleY, eulerAngleZ) =
                InitTransformGizmosJobTool.getCurrentSceneTreeNodeEulerAngles();

              EventTransformGizmosTool.triggerMouseDown(
                ~sandbox,
                ~pageX=277,
                ~pageY=172,
                (),
              );
              EventTransformGizmosTool.triggerFirstMouseDragOverEvent(
                ~sandbox,
                ~pageX=277 + 10,
                ~pageY=172,
                (),
              );

              InitTransformGizmosJobTool.getCurrentSceneTreeNodeEulerAngles()
              |> expect == (eulerAngleX, eulerAngleY, eulerAngleZ -. 8.2);
            },
          )
        );
      });

      describe("test scale gizmo", () => {
        let _prepare = sandbox =>
          _prepare(
            sandbox,
            SceneViewType.World,
            CurrentTransformGizmoSceneViewEditorService.markScale,
          );

        describe("axis gizmos should be aligned with local axis", () =>
          test(
            {|
            pick gameObject;
            select x axis;
            mouse move (5px, 0px);

            gameObject should scale bigger in the x axis;
            |},
            () => {
              _prepare(sandbox);

              EventTransformGizmosTool.triggerMouseDown(
                ~sandbox,
                ~pageX=283,
                ~pageY=162,
                (),
              );
              EventTransformGizmosTool.triggerFirstMouseDragOverEvent(
                ~sandbox,
                ~pageX=283 + 5,
                ~pageY=162,
                (),
              );

              InitTransformGizmosJobTool.getCurrentSceneTreeNodeLocalScale()
              |> expect == (1.1, 1., 1.);
            },
          )
        );
      });
    });

    describe("test local coordinate system", () => {
      describe("test translation gizmo", () => {
        let _prepare = sandbox =>
          _prepare(
            sandbox,
            SceneViewType.Local,
            CurrentTransformGizmoSceneViewEditorService.markTranslation,
          );

        describe("axis gizmos should be aligned with local axis", () =>
          test(
            {|
            pick gameObject;
            select x axis;
            mouse move (10px, 0px);

            gameObject should move along +x axis;
            |},
            () => {
              _prepare(sandbox);

              EventTransformGizmosTool.triggerMouseDown(
                ~sandbox,
                ~pageX=268,
                ~pageY=182,
                (),
              );
              EventTransformGizmosTool.triggerFirstMouseDragOverEvent(
                ~sandbox,
                ~pageX=268 + 10,
                ~pageY=182,
                (),
              );

              InitTransformGizmosJobTool.getCurrentSceneTreeNodePosition()
              |> expect == (0.224, 0.091, (-0.242));
            },
          )
        );

        describe("plane gizmos should be aligned with local axis", () =>
          test(
            {|
            pick gameObject;
            select xy plane;
            mouse move (10px, 10px);

            gameObject should move along xy plane;
            |},
            () => {
              _prepare(sandbox);

              EventTransformGizmosTool.triggerMouseDown(
                ~sandbox,
                ~pageX=240,
                ~pageY=199,
                (),
              );
              EventTransformGizmosTool.triggerFirstMouseDragOverEvent(
                ~sandbox,
                ~pageX=240 + 10,
                ~pageY=199 + 10,
                (),
              );

              InitTransformGizmosJobTool.getCurrentSceneTreeNodePosition()
              |> expect == (0.548, (-1.575), (-0.419));
            },
          )
        );
      });

      describe("test rotation gizmo", () => {
        let _prepare = sandbox =>
          _prepare(
            sandbox,
            SceneViewType.Local,
            CurrentTransformGizmoSceneViewEditorService.markRotation,
          );

        describe("circle gizmos should be aligned with local axis", () =>
          test(
            {|
            pick gameObject;
            select xy circle;
            mouse move (0px, 10px);

            gameObject should rotate;
            |},
            () => {
              _prepare(sandbox);

              EventTransformGizmosTool.triggerMouseDown(
                ~sandbox,
                ~pageX=220,
                ~pageY=206,
                (),
              );
              EventTransformGizmosTool.triggerFirstMouseDragOverEvent(
                ~sandbox,
                ~pageX=220,
                ~pageY=206 + 10,
                (),
              );

              InitTransformGizmosJobTool.getCurrentSceneTreeNodeEulerAngles()
              |> expect == (26.8, 39.2, 43.8);
            },
          )
        );
      });

      describe("test scale gizmo", () => {
        let _prepare = sandbox =>
          _prepare(
            sandbox,
            SceneViewType.Local,
            CurrentTransformGizmoSceneViewEditorService.markScale,
          );

        describe("axis gizmos should be aligned with local axis", () =>
          test(
            {|
            pick gameObject;
            select x axis;
            mouse move (5px, 0px);

            gameObject should scale bigger in the x axis;
            |},
            () => {
              _prepare(sandbox);

              EventTransformGizmosTool.triggerMouseDown(
                ~sandbox,
                ~pageX=283,
                ~pageY=162,
                (),
              );
              EventTransformGizmosTool.triggerFirstMouseDragOverEvent(
                ~sandbox,
                ~pageX=283 + 5,
                ~pageY=162,
                (),
              );

              InitTransformGizmosJobTool.getCurrentSceneTreeNodeLocalScale()
              |> expect == (1.1, 1., 1.);
            },
          )
        );
      });
    });
  });