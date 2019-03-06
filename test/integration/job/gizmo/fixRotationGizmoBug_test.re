open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open EventType;

let _ =
  describe("fix rotation gizmo bug", () => {
    let sandbox = getSandboxDefaultVal();

    beforeEach(() => {
      sandbox := createSandbox();

      MainEditorSceneTool.initState(~sandbox, ());

      MainEditorSceneTool.createDefaultScene(
        sandbox,
        MainEditorSceneTool.setFirstCubeToBeCurrentSceneTreeNode,
      );

      InitTransformGizmosJobTool.createTransformGizmos
      |> StateLogicService.getAndSetState;

      PrepareRenderViewJobTool.setViewRect();
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    test(
      {|
        load vc.glb;
        drag vc to scene tree to be v1;
        select v1 and rotate it by rotation gizmo;

        the local euler angle should be correct.
        |},
      () => {
        let currentSceneTreeNode =
          GameObjectTool.unsafeGetCurrentSceneTreeNode();
        let engineState = StateEngineService.unsafeGetState();
        let localRotation = (
          (-0.02508343756198883),
          0.,
          0.,
          0.5063101649284363,
        );
        let localEulerAngles =
          QuaternionToolEngine.getEulerAngles(localRotation);
        let engineState =
          TransformGameObjectTool.setLocalRotation(
            currentSceneTreeNode,
            localRotation,
            engineState,
          );

        let editorState = StateEditorService.getState();
        let (editorState, engineState) =
          BindRotationGizmoEventUtils.handleDragStartEvent(
            EventToolEngine.buildCustomEvent(
              ~userData=Some(MouseEventTool.buildMouseEvent() |> Obj.magic),
              (),
            ),
            (editorState, engineState),
          );
        let angle = 45.;
        let engineState =
          TransformEngineService.rotateWorldOnAxis(
            GameObjectComponentEngineService.unsafeGetTransformComponent(
              currentSceneTreeNode,
              engineState,
            ),
            (angle, (1., 0., 0.)),
            engineState,
          );

        TransformGameObjectTool.getLocalEulerAngles(
          currentSceneTreeNode,
          engineState,
        )
        |> Vector3Service.truncate(3)
        |> expect
        == (
             Vector3ToolEngine.add(
               Wonderjs.Vector3Type.Float,
               localEulerAngles,
               (angle, 0., 0.),
             )
             |> Vector3Service.truncate(3)
           );
      },
    );
  });