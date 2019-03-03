open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("test pick imgui gameObject", () => {
    let sandbox = getSandboxDefaultVal();

    let _test =
        (
          ~imguiGameObject,
          ~imguiPos=(2., 1., (-1.)),
          ~pageX=350,
          ~pageY=50,
          (),
        ) => {
      let editorState = StateEditorService.getState();
      let engineState = StateEngineService.unsafeGetState();

      let engineState =
        engineState
        |> TransformGameObjectEngineService.setLocalPosition(
             imguiGameObject,
             imguiPos,
           );

      let engineState =
        SceneEngineService.addSceneChild(imguiGameObject, engineState);

      InitPickingJobTool.triggerPicking(~sandbox, ~pageX, ~pageY, ());

      InitPickingJobTool.pickOne(imguiGameObject);
    };

    beforeEach(() => {
      sandbox := createSandbox();

      let _ =
        InitPickingJobTool.prepareOneGameObject(
          ~sandbox,
          ~viewWidth=500,
          ~viewHeight=200,
          ~offsetLeft=10,
          ~offsetTop=20,
          ~cameraPos=(0., 1., 3.),
          ~gameObjectPos=(0., 0., 0.),
          ~gameObjectEulerAngles=(45., 0., 0.),
          ~createGameObjectFunc=InitPickingJobTool.createCube,
          (),
        );
      ();
    });
    afterEach(() => {
      restoreSandbox(refJsObjToSandbox(sandbox^));

      EventTool.restore();
    });

    test("test pick direction light gameObject", () => {
      let engineState = StateEngineService.unsafeGetState();

      let (engineState, directionLightGameObject, _) =
        DirectionLightToolEngine.createGameObject(engineState);

      _test(~imguiGameObject=directionLightGameObject, ());
    });
    test("test pick point light gameObject", () => {
      let engineState = StateEngineService.unsafeGetState();

      let (engineState, pointLightGameObject, _) =
        PointLightToolEngine.createGameObject(engineState);

      _test(~imguiGameObject=pointLightGameObject, ());
    });
    test("test pick camera gameObject", () => {
      let engineState = StateEngineService.unsafeGetState();

      let (engineState, cameraGameObject, _, _) =
        CameraToolEngine.createCameraGameObject(engineState);

      _test(~imguiGameObject=cameraGameObject, ());
    });

    test(
      "if imgui gameObject and other gameObject is in the same pos, pick the imgui one",
      () => {
        let engineState = StateEngineService.unsafeGetState();

        let (engineState, cameraGameObject, _, _) =
          CameraToolEngine.createCameraGameObject(engineState);

        _test(
          ~imguiGameObject=cameraGameObject,
          ~imguiPos=(0., 0., 0.),
          ~pageX=250 + 10,
          ~pageY=100 + 20,
          (),
        );
      },
    );
  });