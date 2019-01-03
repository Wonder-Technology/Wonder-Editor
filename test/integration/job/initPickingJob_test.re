open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("init picking job", () => {
    let sandbox = getSandboxDefaultVal();

    beforeEach(() => sandbox := createSandbox());
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test find picked one", () => {
      let _prepareMouseEvent =
          (
            ~sandbox,
            ~canvasWidth,
            ~canvasHeight,
            ~offsetLeft,
            ~offsetTop,
            /* ~offsetLeft=0,
               ~offsetTop=0, */
            ~offsetParent=Js.Nullable.undefined,
            (),
          ) => {
        MainEditorSceneTool.initStateWithJob(
          ~sandbox,
          ~isInitJob=false,
          ~noWorkerJobRecord=
            NoWorkerJobConfigToolEngine.buildNoWorkerJobConfig(
              ~initPipelines=
                {|
            [
        {
          "name": "default",
          "jobs": [
            {
              "name": "init_event_for_editor"
            },
            {
              "name": "init_camera"
            },
            {
              "name": "init_picking"
            }
          ]
        }
      ]
            |},
              ~initJobs=
                {j|
    [

        {
              "name": "init_event_for_editor"
        },
            {
              "name": "init_camera"
            },
            {
              "name": "init_picking"
            }
    ]
            |j},
              (),
            ),
          (),
        );

        /* _insertCanvasDomToBody(.); */

        MouseEventTool.prepareWithState(
          ~sandbox,
          ~canvasWidth,
          ~canvasHeight,
          ~offsetLeft,
          ~offsetTop,
          ~offsetParent,
          ~engineState=StateEngineService.unsafeGetState(),
          (),
        );
        MouseEventTool.prepareForPointerLock(sandbox);

        PrepareRenderViewJobTool.setViewRect(
          ~width=canvasWidth,
          ~height=canvasHeight,
          (),
        );

        MouseEventTool.setPointerLocked(.);

        ((canvasWidth, canvasHeight), (offsetLeft, offsetTop));
      };

      /* let _findPickedOne = () => {}; */

      /* describe
         ("skip gameObjects not has geometry or render group component",
         (
         () => {
         })
         ); */

      let _createGameObject = (geometry, engineState) => {
        let (engineState, lightMaterial) =
          LightMaterialEngineService.create(engineState);

        let (engineState, obj) =
          engineState |> GameObjectEngineService.create;

        let transform =
          GameObjectComponentEngineService.unsafeGetTransformComponent(
            obj,
            engineState,
          );

        let (engineState, meshRenderer) =
          MeshRendererEngineService.create(engineState);
        let renderGroup =
          RenderGroupEngineService.buildRenderGroup(
            meshRenderer,
            lightMaterial,
          );

        let engineState =
          engineState
          |> GameObjectComponentEngineService.addGeometryComponent(
               obj,
               geometry,
             )
          |> RenderGroupEngineService.addRenderGroupComponents(
               obj,
               renderGroup,
               (
                 GameObjectComponentEngineService.addMeshRendererComponent,
                 GameObjectComponentEngineService.addLightMaterialComponent,
               ),
             );

        (engineState, obj);
      };

      let _createSphere = engineState => {
        let (engineState, geometry) =
          GeometryEngineService.createSphereGeometry(1., 10, engineState);

        _createGameObject(geometry, engineState);
      };

      let _createCube = engineState => {
        let (engineState, geometry) =
          GeometryEngineService.createBoxGeometry(engineState);

        _createGameObject(geometry, engineState);
      };

      let _prepare =
          (
            ~canvasWidth=500,
            ~canvasHeight=200,
            ~offsetLeft=10,
            ~offsetTop=20,
            ~cameraPos=(0., 0., 5.),
            ~gameObjectPos=(0., 0., 0.),
            ~gameObjectEulerAngles=(0., 0., 0.),
            ~createGameObjectFunc=_createSphere,
            (),
          ) => {
        let ((canvasWidth, canvasHeight), (offsetLeft, offsetTop)) =
          _prepareMouseEvent(
            ~sandbox,
            /* ~canvasWidth=500,
               ~canvasHeight=200,
               ~offsetLeft=10,
               ~offsetTop=20, */
            ~canvasWidth,
            ~canvasHeight,
            ~offsetLeft,
            ~offsetTop,
            (),
          );

        let editorState = StateEditorService.getState();
        let engineState = StateEngineService.unsafeGetState();

        /* let (editorState, engineState, editCamera) =
           DefaultSceneUtils.prepareSpecificGameObjects(editorState, engineState); */

        let (editorState, engineState, editCamera) =
          CameraEngineService.createCamera(editorState, engineState);

        let editCameraPerspectiveCameraProjection =
          GameObjectComponentEngineService.unsafeGetPerspectiveCameraProjectionComponent(
            editCamera,
            engineState,
          );

        let engineState =
          engineState
          |> PerspectiveCameraProjectionEngineService.setPerspectiveCameraAspect(
               (canvasWidth |> NumberType.convertIntToFloat)
               /. 2.
               /. (canvasHeight |> NumberType.convertIntToFloat),
               editCameraPerspectiveCameraProjection,
             )
          |> PerspectiveCameraProjectionEngineService.setPerspectiveCameraFovy(
               60.,
               editCameraPerspectiveCameraProjection,
             )
          |> PerspectiveCameraProjectionEngineService.setPerspectiveCameraNear(
               0.1,
               editCameraPerspectiveCameraProjection,
             )
          |> PerspectiveCameraProjectionEngineService.setPerspectiveCameraFar(
               50000.,
               editCameraPerspectiveCameraProjection,
             );

        let editorState =
          editorState
          /* |> SceneViewEditorService.setGridPlane(gridPlane) */
          |> SceneViewEditorService.setEditCamera(editCamera);

        let editCameraTransform =
          GameObjectComponentEngineService.unsafeGetTransformComponent(
            editCamera,
            engineState,
          );

        let engineState =
          engineState
          |> TransformEngineService.setLocalPosition(
               cameraPos,
               editCameraTransform,
             );

        let (engineState, gameObject1) = createGameObjectFunc(engineState);

        let gameObject1Transform =
          GameObjectComponentEngineService.unsafeGetTransformComponent(
            gameObject1,
            engineState,
          );

        let sceneGameObject =
          SceneEngineService.getSceneGameObject(engineState);

        let engineState =
          engineState
          |> GameObjectUtils.addChild(sceneGameObject, gameObject1);

        let engineState =
          engineState
          |> TransformEngineService.setLocalPosition(
               gameObjectPos,
               gameObject1Transform,
             )
          |> TransformEngineService.setLocalEulerAngles(
               gameObjectEulerAngles,
               gameObject1Transform,
             );

        editorState |> StateEditorService.setState |> ignore;
        engineState |> StateEngineService.setState |> ignore;

        /* WonderLog.Log.print(("editCamera: ", editCamera)) |> ignore; */

        StateLogicService.getAndSetEngineState(MainUtils._handleEngineState);

        StateLogicService.getAndRefreshEngineState();

        SceneEditorService.clearCurrentSceneTreeNode
        |> StateLogicService.getAndSetEditorState;

        (
          (canvasWidth / 4 + offsetLeft, canvasHeight / 2 + offsetTop),
          gameObject1,
        );
      };

      let _triggerPicking = (pageX, pageY) => {
        let target = EventTool.buildCanvasTarget();
        /* 7 */
        /* let pageX = canvasWidth / 4 + offsetLeft + 20; */
        /* let pageX = canvasWidth / 4 + offsetLeft + 100;

           let pageY = canvasHeight / 2 + offsetTop - 0; */

        EventTool.triggerDomEvent(
          "mousedown",
          EventTool.getBody(),
          MouseEventTool.buildMouseEvent(~pageX, ~pageY, ~target, ()),
        );
        EventTool.restore();
      };

      let _pickOne = gameObject1 => {
        let editorState = StateEditorService.getState();

        SceneEditorService.unsafeGetCurrentSceneTreeNode(editorState)
        |> expect == gameObject1;
      };

      let _notPick = () => {
        let editorState = StateEditorService.getState();

        SceneEditorService.getCurrentSceneTreeNode(editorState)
        |> Js.Option.isNone
        |> expect == true;
      };

      describe("should set finded one to current scene tree node", () => {
        describe("test find success", () => {
          test("test1", () => {
            let ((centerPosX, centerPosY), gameObject1) =
              _prepare(
                ~canvasWidth=500,
                ~canvasHeight=200,
                ~offsetLeft=10,
                ~offsetTop=20,
                ~cameraPos=(0., 0., 5.),
                ~gameObjectPos=(0., 0., 0.),
                (),
              );

            _triggerPicking(centerPosX, centerPosY);

            _pickOne(gameObject1);
          });
          test("test2", () => {
            let ((centerPosX, centerPosY), gameObject1) =
              _prepare(
                ~canvasWidth=500,
                ~canvasHeight=200,
                ~offsetLeft=10,
                ~offsetTop=20,
                ~cameraPos=(0., 0., 5.),
                ~gameObjectPos=(0., 2., 0.),
                (),
              );

            _triggerPicking(centerPosX, centerPosY - 80);

            _pickOne(gameObject1);
          });
          test("test3", () => {
            /* let x = (-0.09176470588235297);
               let y = (-0.03664921465968596); */

            let ((centerPosX, centerPosY), gameObject1) =
              _prepare(
                ~canvasWidth=500,
                ~canvasHeight=200,
                ~offsetLeft=10,
                ~offsetTop=20,
                ~cameraPos=(
                  (-1.7738624811172485),
                  3.446659564971924,
                  2.2855961322784424,
                ),
                ~gameObjectPos=(0., 0., 0.),
                ~gameObjectEulerAngles=(45., 0., 0.),
                ~createGameObjectFunc=_createCube,
                (),
              );

            _triggerPicking(113 + 10, 103 + 20);

            _pickOne(gameObject1);
          });
        });

        describe("test not find", () =>
          test("test1", () => {
            let ((centerPosX, centerPosY), gameObject1) =
              _prepare(
                ~canvasWidth=500,
                ~canvasHeight=200,
                ~offsetLeft=10,
                ~offsetTop=20,
                ~cameraPos=(0., 0., 5.),
                ~gameObjectPos=(0., 2., 0.),
                (),
              );

            _triggerPicking(centerPosX, centerPosY + 80);

            _notPick();
          })
        );
      });
      /* describe
         ("find top one by check intersect hggo",
         (
         () => {

         })
         ); */
    });
  });