open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open EventType;

let _ =
  describe("set current transform gizmo color", () => {
    let sandbox = getSandboxDefaultVal();

    let _isGameObjectAndItsChildrenTargetColor =
        (gameObject, targetColor, engineState) =>
      GameObjectEngineService.getAllBasicMaterials(
        HierarchyGameObjectEngineService.getAllGameObjects(
          gameObject,
          engineState,
        ),
        engineState,
      )
      |> WonderCommonlib.ArrayService.reduceOneParam(
           (. isTargetColor, material) =>
             isTargetColor ?
               isTargetColor :
               JudgeTool.isEqual(
                 BasicMaterialEngineService.getColor(material, engineState),
                 targetColor,
               ),
           false,
         );

    beforeEach(() => sandbox := createSandbox());
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test translation gizmo", () => {
      let prepareGameObject = sandbox =>
        InitTransformGizmosJobTool.prepareOneGameObject(
          ~sandbox,
          ~viewWidth=500,
          ~viewHeight=200,
          ~offsetLeft=0,
          ~offsetTop=0,
          ~cameraPos=(0.1, 0.1, 3.),
          ~gameObjectPos=(0., 0., 0.),
          ~gameObjectEulerAngles=(0., 0., 0.),
          ~createGameObjectFunc=InitPickingJobTool.createCube,
          (),
        );

      let _prepare = sandbox => {
        let gameObject1 = prepareGameObject(sandbox);

        InitPickingJobTool.triggerPicking(
          ~sandbox,
          ~pageX=250,
          ~pageY=100,
          (),
        );

        gameObject1;
      };

      describe("set current gizmo color when drag start", () => {
        describe("test axis gizmo", () =>
          test("test current gizmo is x axis", () => {
            let gameObject1 = _prepare(sandbox);

            EventTransformGizmosTool.triggerMouseDown(
              ~sandbox,
              ~pageX=250 + 30,
              ~pageY=100,
              (),
            );

            _isGameObjectAndItsChildrenTargetColor(
              OperateTranslationGizmoSceneViewEditorService.unsafeGetTranslationXAxisGizmo
              |> StateLogicService.getEditorState,
              DataTransformGizmoSceneViewEditorService.getColorForCurrentGizmo(),
            )
            |> StateLogicService.getEngineStateToGetData
            |> expect == true;
          })
        );

        describe("test plane gizmo", () =>
          test("test current gizmo is xy plane", () => {
            let gameObject1 = _prepare(sandbox);

            EventTransformGizmosTool.triggerMouseDown(
              ~sandbox,
              ~pageX=250 + 10,
              ~pageY=100 - 10,
              (),
            );

            _isGameObjectAndItsChildrenTargetColor(
              OperateTranslationGizmoSceneViewEditorService.unsafeGetTranslationXYPlaneGizmo
              |> StateLogicService.getEditorState,
              DataTransformGizmoSceneViewEditorService.getColorForCurrentGizmo(),
            )
            |> StateLogicService.getEngineStateToGetData
            |> expect == true;
          })
        );
      });

      describe("restore current gizmo color when drag drop", () =>
        test("test current gizmo is xy plane", () => {
          let gameObject1 = _prepare(sandbox);

          EventTransformGizmosTool.triggerMouseDown(
            ~sandbox,
            ~pageX=250 + 10,
            ~pageY=100 - 10,
            (),
          );
          EventTransformGizmosTool.triggerMouseUp(~sandbox, ());

          _isGameObjectAndItsChildrenTargetColor(
            OperateTranslationGizmoSceneViewEditorService.unsafeGetTranslationXYPlaneGizmo
            |> StateLogicService.getEditorState,
            DataTransformGizmoSceneViewEditorService.getColorForCurrentGizmo(),
          )
          |> StateLogicService.getEngineStateToGetData
          |> expect == false;
        })
      );
    });

    describe("test rotation gizmo", () => {
      let prepareGameObject = sandbox =>
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

      let _prepare = sandbox => {
        let gameObject1 = prepareGameObject(sandbox);

        CurrentTransformGizmoSceneViewEditorService.markRotation
        |> StateLogicService.getAndSetEditorState;

        InitPickingJobTool.triggerPicking(
          ~sandbox,
          ~pageX=250,
          ~pageY=200,
          (),
        );

        gameObject1;
      };

      describe("set current gizmo color when drag start", () =>
        test("test current gizmo is xy circle", () => {
          let gameObject1 = _prepare(sandbox);

          EventTransformGizmosTool.triggerMouseDown(
            ~sandbox,
            ~pageX=226,
            ~pageY=172,
            (),
          );

          _isGameObjectAndItsChildrenTargetColor(
            OperateRotationGizmoSceneViewEditorService.unsafeGetRotationXYCircleGizmo
            |> StateLogicService.getEditorState,
            DataTransformGizmoSceneViewEditorService.getColorForCurrentGizmo(),
          )
          |> StateLogicService.getEngineStateToGetData
          |> expect == true;
        })
      );

      describe("restore current gizmo color when drag drop", () =>
        test("test current gizmo is xy circle", () => {
          let gameObject1 = _prepare(sandbox);

          EventTransformGizmosTool.triggerMouseDown(
            ~sandbox,
            ~pageX=226,
            ~pageY=172,
            (),
          );
          EventTransformGizmosTool.triggerMouseUp(~sandbox, ());

          _isGameObjectAndItsChildrenTargetColor(
            OperateRotationGizmoSceneViewEditorService.unsafeGetRotationXYCircleGizmo
            |> StateLogicService.getEditorState,
            DataTransformGizmoSceneViewEditorService.getColorForCurrentGizmo(),
          )
          |> StateLogicService.getEngineStateToGetData
          |> expect == false;
        })
      );
    });

    describe("test scale gizmo", () => {
      let prepareGameObject = sandbox =>
        InitTransformGizmosJobTool.prepareOneGameObject(
          ~sandbox,
          ~viewWidth=500,
          ~viewHeight=200,
          ~offsetLeft=0,
          ~offsetTop=0,
          ~cameraPos=(0.1, 0.1, 3.),
          ~gameObjectPos=(0., 0., 0.),
          ~gameObjectEulerAngles=(0., 0., 0.),
          ~createGameObjectFunc=InitPickingJobTool.createCube,
          (),
        );

      let _prepare = sandbox => {
        let gameObject1 = prepareGameObject(sandbox);

        CurrentTransformGizmoSceneViewEditorService.markScale
        |> StateLogicService.getAndSetEditorState;

        InitPickingJobTool.triggerPicking(
          ~sandbox,
          ~pageX=250,
          ~pageY=100,
          (),
        );

        gameObject1;
      };

      describe("set current gizmo color when drag start", () => {
        describe("test axis gizmo", () =>
          test("test current gizmo is x axis", () => {
            let gameObject1 = _prepare(sandbox);

            EventTransformGizmosTool.triggerMouseDown(
              ~sandbox,
              ~pageX=250 + 30,
              ~pageY=100,
              (),
            );

            _isGameObjectAndItsChildrenTargetColor(
              OperateScaleGizmoSceneViewEditorService.unsafeGetScaleXAxisGizmo
              |> StateLogicService.getEditorState,
              DataTransformGizmoSceneViewEditorService.getColorForCurrentGizmo(),
            )
            |> StateLogicService.getEngineStateToGetData
            |> expect == true;
          })
        );

        test("test center box gizmo", () => {
          let gameObject1 = _prepare(sandbox);

          EventTransformGizmosTool.triggerMouseDown(
            ~sandbox,
            ~pageX=250,
            ~pageY=100,
            (),
          );

          _isGameObjectAndItsChildrenTargetColor(
            OperateScaleGizmoSceneViewEditorService.unsafeGetScaleCenterBoxGizmo
            |> StateLogicService.getEditorState,
            DataTransformGizmoSceneViewEditorService.getColorForCurrentGizmo(),
          )
          |> StateLogicService.getEngineStateToGetData
          |> expect == true;
        });
      });

      describe("restore current gizmo color when drag drop", () =>
        test("test current gizmo is center box", () => {
          let gameObject1 = _prepare(sandbox);

          EventTransformGizmosTool.triggerMouseDown(
            ~sandbox,
            ~pageX=250,
            ~pageY=100,
            (),
          );
          EventTransformGizmosTool.triggerMouseUp(~sandbox, ());

          _isGameObjectAndItsChildrenTargetColor(
            OperateScaleGizmoSceneViewEditorService.unsafeGetScaleCenterBoxGizmo
            |> StateLogicService.getEditorState,
            DataTransformGizmoSceneViewEditorService.getColorForCurrentGizmo(),
          )
          |> StateLogicService.getEngineStateToGetData
          |> expect == false;
        })
      );
    });
  });