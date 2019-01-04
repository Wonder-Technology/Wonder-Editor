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
      let _prepareStateAndView = (~sandbox, ~viewWidth, ~viewHeight) => {
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

        PrepareRenderViewJobTool.setViewRect(
          ~width=viewWidth * 2,
          ~height=viewHeight,
          (),
        );
      };

      let _prepareMouseEvent =
          (
            ~sandbox,
            ~viewWidth,
            ~viewHeight,
            ~offsetLeft,
            ~offsetTop,
            ~offsetParent=Js.Nullable.undefined,
            (),
          ) => {
        _prepareStateAndView(~sandbox, ~viewWidth, ~viewHeight);

        MouseEventTool.prepareWithState(
          ~sandbox,
          ~canvasWidth=viewWidth,
          ~canvasHeight=viewHeight,
          ~offsetLeft,
          ~offsetTop,
          ~offsetParent,
          ~engineState=StateEngineService.unsafeGetState(),
          (),
        );
        MouseEventTool.prepareForPointerLock(sandbox);

        MouseEventTool.setPointerLocked(.);

        ((viewWidth, viewHeight), (offsetLeft, offsetTop));
      };

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

      let _prepareCamera =
          (cameraPos, (viewWidth, viewHeight), (editorState, engineState)) => {
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
               (viewWidth |> NumberType.convertIntToFloat)
               /. (viewHeight |> NumberType.convertIntToFloat),
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
          editorState |> SceneViewEditorService.setEditCamera(editCamera);

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

        let engineState =
          engineState
          |> TransformEngineService.lookAt(editCameraTransform, (0., 0., 0.));

        (editCamera, (editorState, engineState));
      };

      let _prepareGameObject =
          (
            gameObjectPos,
            gameObjectEulerAngles,
            createGameObjectFunc,
            engineState,
          ) => {
        let (engineState, gameObject) = createGameObjectFunc(engineState);

        let gameObjectTransform =
          GameObjectComponentEngineService.unsafeGetTransformComponent(
            gameObject,
            engineState,
          );

        let sceneGameObject =
          SceneEngineService.getSceneGameObject(engineState);

        let engineState =
          engineState |> GameObjectUtils.addChild(sceneGameObject, gameObject);

        let engineState =
          engineState
          |> TransformEngineService.setLocalPosition(
               gameObjectPos,
               gameObjectTransform,
             )
          |> TransformEngineService.setLocalEulerAngles(
               gameObjectEulerAngles,
               gameObjectTransform,
             );

        (gameObject, engineState);
      };

      let _prepareState = (editorState, engineState) => {
        editorState |> StateEditorService.setState |> ignore;
        engineState |> StateEngineService.setState |> ignore;

        StateLogicService.getAndSetEngineState(MainUtils._handleEngineState);

        StateLogicService.getAndRefreshEngineState();

        SceneEditorService.clearCurrentSceneTreeNode
        |> StateLogicService.getAndSetEditorState;
      };

      let _triggerPickingAndNotRestore = (pageX, pageY) => {
        let target = EventTool.buildCanvasTarget();

        EventTool.triggerDomEvent(
          "mousedown",
          EventTool.getBody(),
          MouseEventTool.buildMouseEvent(~pageX, ~pageY, ~target, ()),
        );
      };

      let _triggerPickingAndRestore = (pageX, pageY) => {
        _triggerPickingAndNotRestore(pageX, pageY);

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

      let _prepareOneGameObject =
          (
            ~createGameObjectFunc=_createSphere,
            ~viewWidth,
            ~viewHeight,
            ~offsetLeft,
            ~offsetTop,
            ~cameraPos,
            ~gameObjectPos,
            ~gameObjectEulerAngles,
            (),
          ) => {
        let ((viewWidth, viewHeight), (offsetLeft, offsetTop)) =
          _prepareMouseEvent(
            ~sandbox,
            ~viewWidth,
            ~viewHeight,
            ~offsetLeft,
            ~offsetTop,
            (),
          );

        let editorState = StateEditorService.getState();
        let engineState = StateEngineService.unsafeGetState();

        let (editCamera, (editorState, engineState)) =
          _prepareCamera(
            cameraPos,
            (viewWidth, viewHeight),
            (editorState, engineState),
          );

        let (gameObject1, engineState) =
          _prepareGameObject(
            gameObjectPos,
            gameObjectEulerAngles,
            createGameObjectFunc,
            engineState,
          );

        _prepareState(editorState, engineState);

        gameObject1;
      };

      describe("should set finded one to current scene tree node", () => {
        describe("test only pick one", () =>
          describe("test cube", () => {
            let _prepare = () =>
              _prepareOneGameObject(
                ~viewWidth=510,
                ~viewHeight=200,
                ~offsetLeft=10,
                ~offsetTop=20,
                ~cameraPos=(
                  6.986046314239502,
                  0.43706008791923523,
                  (-0.06429910659790039),
                ),
                ~gameObjectPos=(3., 0., 0.),
                ~gameObjectEulerAngles=(45., 0., 0.),
                ~createGameObjectFunc=_createCube,
                (),
              );

            test("test find", () => {
              let gameObject1 = _prepare();

              _triggerPickingAndRestore(233 + 10, 119 + 20);

              _pickOne(gameObject1);
            });
            test("test not find", () => {
              let gameObject1 = _prepare();

              _triggerPickingAndRestore(225 + 10, 124 + 20);

              _notPick();
            });
          })
        );

        describe("test pick multi ones", () => {
          let _prepare =
              (
                ~createGameObjectFunc=_createSphere,
                ~viewWidth,
                ~viewHeight,
                ~offsetLeft,
                ~offsetTop,
                ~cameraPos,
                ~gameObject1Pos,
                ~gameObject1EulerAngles,
                ~gameObject2Pos,
                ~gameObject2EulerAngles,
                (),
              ) => {
            let ((viewWidth, viewHeight), (offsetLeft, offsetTop)) =
              _prepareMouseEvent(
                ~sandbox,
                ~viewWidth,
                ~viewHeight,
                ~offsetLeft,
                ~offsetTop,
                (),
              );

            let editorState = StateEditorService.getState();
            let engineState = StateEngineService.unsafeGetState();

            let (editCamera, (editorState, engineState)) =
              _prepareCamera(
                cameraPos,
                (viewWidth, viewHeight),
                (editorState, engineState),
              );

            let (gameObject1, engineState) =
              _prepareGameObject(
                gameObject1Pos,
                gameObject1EulerAngles,
                createGameObjectFunc,
                engineState,
              );

            let (gameObject2, engineState) =
              _prepareGameObject(
                gameObject2Pos,
                gameObject2EulerAngles,
                createGameObjectFunc,
                engineState,
              );

            _prepareState(editorState, engineState);

            (gameObject1, gameObject2);
          };

          describe("find the top one which nearest the camera position", () => {
            let _prepare = () =>
              _prepare(
                ~viewWidth=510,
                ~viewHeight=200,
                ~offsetLeft=10,
                ~offsetTop=20,
                ~cameraPos=(
                  2.2987656593322754,
                  8.099184036254883,
                  1.1699984073638916,
                ),
                ~gameObject1Pos=(0., 0., 0.),
                ~gameObject1EulerAngles=(0., 0., 0.),
                ~gameObject2Pos=(1., 2., 0.),
                ~gameObject2EulerAngles=(0., 0., 0.),
                ~createGameObjectFunc=_createCube,
                (),
              );

            test("test find gameObject1", () => {
              let (gameObject1, gameObject2) = _prepare();

              _triggerPickingAndRestore(251 + 10, 91 + 20);

              _pickOne(gameObject1);
            });
            test("test find gameObject2", () => {
              let (gameObject1, gameObject2) = _prepare();

              _triggerPickingAndRestore(257 + 10, 100 + 20);

              _pickOne(gameObject2);
            });
            test("test not find", () => {
              let (gameObject1, gameObject2) = _prepare();

              _triggerPickingAndRestore(241 + 10, 120 + 20);

              _notPick();
            });
          });
        });

        describe("test sphere shape cache", () => {
          let _changePoints = gameObject => {
            let editorState = StateEditorService.getState();
            let engineState = StateEngineService.unsafeGetState();

            let geometry =
              GameObjectComponentEngineService.unsafeGetGeometryComponent(
                gameObject,
                engineState,
              );

            let (editorState, engineState) =
              (editorState, engineState)
              |> GeometryLogicService.setGeometryPoints(
                   geometry,
                   Js.Typed_array.Float32Array.make([|
                     2.5,
                     0.,
                     0.,
                     0.,
                     0.5,
                     0.,
                     1.5,
                     0.,
                     0.,
                   |]),
                   GeometryEngineService.setGeometryVertices,
                 )
              |> GeometryLogicService.setGeometryPoints(
                   geometry,
                   Js.Typed_array.Uint16Array.make([|0, 1, 2|]),
                   GeometryEngineService.setGeometryIndices,
                 );

            editorState |> StateEditorService.setState |> ignore;
            engineState |> StateEngineService.setState |> ignore;
          };

          test(
            "if change geometry points, the intersect should be correct", () => {
            let gameObject =
              _prepareOneGameObject(
                ~viewWidth=510,
                ~viewHeight=200,
                ~offsetLeft=10,
                ~offsetTop=20,
                ~cameraPos=(0., 0., 2.5),
                ~gameObjectPos=(0., 0., 0.),
                ~gameObjectEulerAngles=(0., 0., 0.),
                ~createGameObjectFunc=_createCube,
                (),
              );

            _triggerPickingAndNotRestore(255 + 10, 100 + 20);

            SceneEditorService.clearCurrentSceneTreeNode
            |> StateLogicService.getAndSetEditorState;

            _changePoints(gameObject);

            _triggerPickingAndRestore(255 + 10, 100 + 20);

            _notPick();
          });
        });
      });

      describe("if find one", () => {
        let _prepare = () =>
          _prepareOneGameObject(
            ~viewWidth=500,
            ~viewHeight=200,
            ~offsetLeft=10,
            ~offsetTop=20,
            ~cameraPos=(0., 0., 0.),
            ~gameObjectPos=(0., 0., 0.),
            ~gameObjectEulerAngles=(0., 0., 0.),
            ~createGameObjectFunc=_createCube,
            (),
          );

        let _triggerPicking = () =>
          _triggerPickingAndRestore(250 + 10, 100 + 20);

        test("set current select source to scene tree", () => {
          let _ = _prepare();

          CurrentSelectSourceEditorService.clearCurrentSelectSource
          |> StateLogicService.getAndSetEditorState;

          _triggerPicking();

          let editorState = StateEditorService.getState();

          CurrentSelectSourceEditorService.getCurrentSelectSource(editorState)
          |> expect == Some(SceneTreeWidgetService.getWidget());
        });

        describe("trigger refreshSceneTreeAndInspector event", () => {
          test("test trigger", () => {
            let _ = _prepare();
            let a = ref(0);
            ManageEventEngineService.onCustomGlobalEvent(
              ~eventName=
                EventEditorService.getRefreshSceneTreeAndInspectorEventName(),
              ~handleFunc=
                (. event, engineState) => {
                  a := 1;

                  (engineState, event);
                },
              ~state=StateEngineService.unsafeGetState(),
              (),
            )
            |> StateEngineService.setState
            |> ignore;

            _triggerPicking();

            a^ |> expect == 1;
          });
          test("can get picked gameObject in event handle func", () => {
            let gameObject = _prepare();
            let pickedGameObject = ref(0);
            ManageEventEngineService.onCustomGlobalEvent(
              ~eventName=
                EventEditorService.getRefreshSceneTreeAndInspectorEventName(),
              ~handleFunc=
                (. event, engineState) => {
                  let editorState = StateEditorService.getState();

                  pickedGameObject :=
                    SceneEditorService.unsafeGetCurrentSceneTreeNode(
                      editorState,
                    );

                  (engineState, event);
                },
              ~state=StateEngineService.unsafeGetState(),
              (),
            )
            |> StateEngineService.setState
            |> ignore;

            _triggerPicking();

            pickedGameObject^ |> expect == gameObject;
          });
        });
      });

      describe("isIntersectTriangle", () =>
        describe("test cull", () => {
          let _isIntersectTriangle =
              (
                ~sandbox,
                ~cullType,
                ~va,
                ~vb,
                ~vc,
                ~locationInView,
                ~viewWidth,
                ~viewHeight,
                ~cameraPos,
              ) => {
            _prepareStateAndView(~sandbox, ~viewWidth, ~viewHeight);

            let editorState = StateEditorService.getState();
            let engineState = StateEngineService.unsafeGetState();

            let (editCamera, (editorState, engineState)) =
              _prepareCamera(
                cameraPos,
                (viewWidth, viewHeight),
                (editorState, engineState),
              );

            let cameraGameObject =
              SceneViewEditorService.unsafeGetEditCamera(editorState);

            let ray =
              RayUtils.createPerspectiveCameraRay(
                InitPickingJobUtil._convertMouselocationInViewToNDC(
                  locationInView,
                  InitPickingJobUtil._getSceneViewSize(editorState),
                ),
                InitPickingJobUtil._getPerspectiveCameraData(
                  cameraGameObject,
                  (editorState, engineState),
                ),
              );

            RayUtils.isIntersectTriangle(cullType, va, vb, vc, ray);
          };

          describe("test back cull", () => {
            test("test intersect front side", () =>
              _isIntersectTriangle(
                ~sandbox,
                ~cullType=InitPickingJobType.Back,
                ~viewWidth=500,
                ~viewHeight=200,
                ~va=(1., 0., 0.),
                ~vb=(0., 1., 0.),
                ~vc=((-1.), 0., 0.),
                ~locationInView=(250, 100),
                ~cameraPos=(0., 0., 0.),
              )
              |> expect == true
            );
            test("test not intersect back side", () =>
              _isIntersectTriangle(
                ~sandbox,
                ~cullType=InitPickingJobType.Back,
                ~viewWidth=500,
                ~viewHeight=200,
                ~va=((-1.), 0., 0.),
                ~vb=(0., 1., 0.),
                ~vc=(1., 0., 0.),
                ~locationInView=(250, 100),
                ~cameraPos=(0., 0., 0.),
              )
              |> expect == false
            );
          });

          describe("test front cull", () => {
            test("test intersect back side", () =>
              _isIntersectTriangle(
                ~sandbox,
                ~cullType=InitPickingJobType.Front,
                ~viewWidth=500,
                ~viewHeight=200,
                ~va=((-1.), 0., 0.),
                ~vb=(0., 1., 0.),
                ~vc=(1., 0., 0.),
                ~locationInView=(250, 100),
                ~cameraPos=(0., 0., 0.),
              )
              |> expect == true
            );
            test("test not intersect front side", () =>
              _isIntersectTriangle(
                ~sandbox,
                ~cullType=InitPickingJobType.Front,
                ~viewWidth=500,
                ~viewHeight=200,
                ~va=(1., 0., 0.),
                ~vb=(0., 1., 0.),
                ~vc=((-1.), 0., 0.),
                ~locationInView=(250, 100),
                ~cameraPos=(0., 0., 0.),
              )
              |> expect == false
            );
          });
          describe("test not cull", () => {
            test("test intersect back side", () =>
              _isIntersectTriangle(
                ~sandbox,
                ~cullType=InitPickingJobType.None,
                ~viewWidth=500,
                ~viewHeight=200,
                ~va=((-1.), 0., 0.),
                ~vb=(0., 1., 0.),
                ~vc=(1., 0., 0.),
                ~locationInView=(250, 100),
                ~cameraPos=(0., 0., 0.),
              )
              |> expect == true
            );
            test("test intersect front side", () =>
              _isIntersectTriangle(
                ~sandbox,
                ~cullType=InitPickingJobType.None,
                ~viewWidth=500,
                ~viewHeight=200,
                ~va=(1., 0., 0.),
                ~vb=(0., 1., 0.),
                ~vc=((-1.), 0., 0.),
                ~locationInView=(250, 100),
                ~cameraPos=(0., 0., 0.),
              )
              |> expect == true
            );
          });
          describe("test both cull", () => {
            test("test not intersect back side", () =>
              _isIntersectTriangle(
                ~sandbox,
                ~cullType=InitPickingJobType.Both,
                ~viewWidth=500,
                ~viewHeight=200,
                ~va=((-1.), 0., 0.),
                ~vb=(0., 1., 0.),
                ~vc=(1., 0., 0.),
                ~locationInView=(250, 100),
                ~cameraPos=(0., 0., 0.),
              )
              |> expect == false
            );
            test("test not intersect front side", () =>
              _isIntersectTriangle(
                ~sandbox,
                ~cullType=InitPickingJobType.Both,
                ~viewWidth=500,
                ~viewHeight=200,
                ~va=(1., 0., 0.),
                ~vb=(0., 1., 0.),
                ~vc=((-1.), 0., 0.),
                ~locationInView=(250, 100),
                ~cameraPos=(0., 0., 0.),
              )
              |> expect == false
            );
          });
        })
      );
    });
  });