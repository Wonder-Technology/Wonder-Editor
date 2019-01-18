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
          |> GameObjectEngineService.setGameObjectName("gameObject", obj)
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
          GeometryEngineService.createCubeGeometry(engineState);

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

        SceneTreeEditorService.clearCurrentSceneTreeNode
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

      let _pickOne = gameObject => {
        let editorState = StateEditorService.getState();

        SceneTreeEditorService.unsafeGetCurrentSceneTreeNode(editorState)
        |> expect == gameObject;
      };

      let _notPick = () => {
        let editorState = StateEditorService.getState();

        SceneTreeEditorService.getCurrentSceneTreeNode(editorState)
        |> Js.Option.isNone
        |> expect == true;
      };

      let _prepareEventAndCamera =
          (~viewWidth, ~viewHeight, ~offsetLeft, ~offsetTop, ~cameraPos, ()) => {
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

        /* let (gameObject1, engineState) =
             _prepareGameObject(
               gameObjectPos,
               gameObjectEulerAngles,
               createGameObjectFunc,
               engineState,
             );

           _prepareState(editorState, engineState);

           gameObject1; */
        (editorState, engineState);
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
        let (editorState, engineState) =
          _prepareEventAndCamera(
            ~viewWidth,
            ~viewHeight,
            ~offsetLeft,
            ~offsetTop,
            ~cameraPos,
            (),
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

      describe("test pick", () => {
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
                ~createGameObjectFunc1=_createSphere,
                ~createGameObjectFunc2=_createSphere,
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
            let (editorState, engineState) =
              _prepareEventAndCamera(
                ~viewWidth,
                ~viewHeight,
                ~offsetLeft,
                ~offsetTop,
                ~cameraPos,
                (),
              );

            let (gameObject1, engineState) =
              _prepareGameObject(
                gameObject1Pos,
                gameObject1EulerAngles,
                createGameObjectFunc1,
                engineState,
              );

            let (gameObject2, engineState) =
              _prepareGameObject(
                gameObject2Pos,
                gameObject2EulerAngles,
                createGameObjectFunc2,
                engineState,
              );

            _prepareState(editorState, engineState);

            (gameObject1, gameObject2);
          };

          describe(
            "find the top one whose distance between intersected point and the camera position is nearest",
            () => {
              describe("test cube", () => {
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
                    ~createGameObjectFunc1=_createCube,
                    ~createGameObjectFunc2=_createCube,
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

              describe("test triangle", () => {
                let _createTriangleInPositiveYAxis = engineState => {
                  open Js.Typed_array;

                  let (engineState, geometry) =
                    GeometryEngineService.create(engineState);

                  let vertices1 =
                    Float32Array.make([|
                      1.,
                      0.,
                      3.,
                      0.,
                      1.,
                      3.,
                      (-1.),
                      0.,
                      3.,
                    |]);
                  let indices1 = Uint16Array.make([|0, 1, 2|]);

                  let engineState =
                    engineState
                    |> GeometryEngineService.setGeometryVertices(
                         geometry,
                         vertices1,
                       )
                    |> GeometryEngineService.setGeometryIndices(
                         geometry,
                         indices1,
                       );

                  _createGameObject(geometry, engineState);
                };

                let _prepare = (gameObject1Pos, gameObject2Pos) =>
                  _prepare(
                    ~viewWidth=500,
                    ~viewHeight=200,
                    ~offsetLeft=0,
                    ~offsetTop=0,
                    ~cameraPos=(0., 0., 5.),
                    ~gameObject1Pos,
                    ~gameObject1EulerAngles=(0., 0., 0.),
                    ~gameObject2Pos,
                    ~gameObject2EulerAngles=(0., 0., 0.),
                    ~createGameObjectFunc1=_createCube,
                    ~createGameObjectFunc2=_createTriangleInPositiveYAxis,
                    (),
                  );

                test("test find", () => {
                  let (gameObject1, gameObject2) =
                    _prepare((0., 0., 3.), (0., 0., 1.));

                  _triggerPickingAndRestore(250, 100);

                  _pickOne(gameObject2);
                });
                test("test not find", () => {
                  let (gameObject1, gameObject2) =
                    _prepare((0., 0., 4.1), (0., 0., 1.));

                  _triggerPickingAndRestore(250, 100);

                  _pickOne(gameObject1);
                });
              });
            },
          );
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

            SceneTreeEditorService.clearCurrentSceneTreeNode
            |> StateLogicService.getAndSetEditorState;

            _changePoints(gameObject);

            _triggerPickingAndRestore(255 + 10, 100 + 20);

            _notPick();
          });
        });
      });

      describe(
        "should set the whole one of the finded one to current scene tree node",
        () => {
        let _createParentGameObject = engineState => {
          let (engineState, parent) =
            engineState |> GameObjectEngineService.create;
          let engineState =
            engineState
            |> GameObjectEngineService.setGameObjectName("parent", parent);

          (engineState, parent);
        };

        let _prepare = () => {
          let viewWidth = 500;
          let viewHeight = 200;
          let offsetLeft = 10;
          let offsetTop = 20;
          let cameraPos = (0., 0., 2.);

          let (editorState, engineState) =
            _prepareEventAndCamera(
              ~viewWidth,
              ~viewHeight,
              ~offsetLeft,
              ~offsetTop,
              ~cameraPos,
              (),
            );

          (editorState, engineState);
        };

        let _triggerPicking = () =>
          _triggerPickingAndRestore(250 + 10, 100 + 20);

        test(
          "else if the finded one's parent is scene, set it to current scene tree node",
          () => {
          let _prepare = () => {
            let gameObjectEulerAngles = (0., 0., 0.);

            let (editorState, engineState) = _prepare();

            let (gameObject1, engineState) =
              _prepareGameObject(
                (0., 0., 0.),
                gameObjectEulerAngles,
                _createCube,
                engineState,
              );

            let engineState =
              engineState |> SceneEngineService.addSceneChild(gameObject1);

            _prepareState(editorState, engineState);

            gameObject1;
          };

          let gameObject1 = _prepare();

          _triggerPicking();

          _pickOne(gameObject1);
        });

        test(
          "else if the finded one's parent has no siblings, recursively judge the parent of the parent",
          () => {
            let _prepare = () => {
              let gameObjectEulerAngles = (0., 0., 0.);

              let (editorState, engineState) = _prepare();

              let (gameObject1, engineState) =
                _prepareGameObject(
                  (0., 0., 0.),
                  gameObjectEulerAngles,
                  _createCube,
                  engineState,
                );

              let (gameObject2, engineState) =
                _prepareGameObject(
                  ((-200.), 0., (-2.)),
                  gameObjectEulerAngles,
                  _createCube,
                  engineState,
                );

              let (engineState, parent1) =
                _createParentGameObject(engineState);
              let (engineState, parent2) =
                _createParentGameObject(engineState);
              let engineState =
                engineState
                |> SceneEngineService.addSceneChild(parent1)
                |> GameObjectUtils.addChild(parent1, parent2)
                |> GameObjectUtils.addChild(parent2, gameObject1)
                |> GameObjectUtils.addChild(parent2, gameObject2);

              _prepareState(editorState, engineState);

              ((parent1, parent2), (gameObject1, gameObject2));
            };

            let ((parent1, parent2), (gameObject1, gameObject2)) =
              _prepare();

            _triggerPicking();

            _pickOne(parent1);
          },
        );
        test(
          "else, set the finded one's parent to current scene tree node", () => {
          let _prepare = () => {
            let gameObjectEulerAngles = (0., 0., 0.);

            let (editorState, engineState) = _prepare();

            let (gameObject1, engineState) =
              _prepareGameObject(
                (0., 0., 0.),
                gameObjectEulerAngles,
                _createCube,
                engineState,
              );

            let (gameObject2, engineState) =
              _prepareGameObject(
                ((-200.), 0., (-2.)),
                gameObjectEulerAngles,
                _createCube,
                engineState,
              );

            let (engineState, parent1) =
              _createParentGameObject(engineState);
            let (engineState, parent2) =
              _createParentGameObject(engineState);
            let engineState =
              engineState
              |> SceneEngineService.addSceneChild(parent1)
              |> GameObjectUtils.addChild(parent1, parent2)
              |> GameObjectUtils.addChild(parent1, gameObject2)
              |> GameObjectUtils.addChild(parent2, gameObject1);

            _prepareState(editorState, engineState);

            ((parent1, parent2), (gameObject1, gameObject2));
          };

          let ((parent1, parent2), (gameObject1, gameObject2)) = _prepare();

          _triggerPicking();

          _pickOne(parent2);
        });
      });

      describe("test if find one", () => {
        let _prepare = () =>
          _prepareOneGameObject(
            ~viewWidth=500,
            ~viewHeight=200,
            ~offsetLeft=10,
            ~offsetTop=20,
            ~cameraPos=(0., 0., 2.),
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

        describe("trigger pickSuccess event", () => {
          test("test trigger", () => {
            let _ = _prepare();
            let a = ref(0);
            ManageEventEngineService.onCustomGlobalEvent(
              ~eventName=EventEditorService.getPickSuccessEventName(),
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
              ~eventName=EventEditorService.getPickSuccessEventName(),
              ~handleFunc=
                (. event, engineState) => {
                  let editorState = StateEditorService.getState();

                  pickedGameObject :=
                    SceneTreeEditorService.unsafeGetCurrentSceneTreeNode(
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
          test("the picked gameObject's all parents should show children", () => {
            let _createParentGameObject = engineState => {
              let (engineState, parent) =
                engineState |> GameObjectEngineService.create;
              let engineState =
                engineState
                |> GameObjectEngineService.setGameObjectName("parent", parent);

              (engineState, parent);
            };

            let _prepare = () => {
              let viewWidth = 500;
              let viewHeight = 200;
              let offsetLeft = 10;
              let offsetTop = 20;
              let cameraPos = (0., 0., 2.);
              let gameObject1Pos = (0., 0., 0.);
              let gameObjectEulerAngles = (0., 0., 0.);

              let (editorState, engineState) =
                _prepareEventAndCamera(
                  ~viewWidth,
                  ~viewHeight,
                  ~offsetLeft,
                  ~offsetTop,
                  ~cameraPos,
                  (),
                );

              let (gameObject1, engineState) =
                _prepareGameObject(
                  (0., 0., 0.),
                  gameObjectEulerAngles,
                  _createCube,
                  engineState,
                );

              let (gameObject2, engineState) =
                _prepareGameObject(
                  ((-200.), 0., (-2.)),
                  gameObjectEulerAngles,
                  _createCube,
                  engineState,
                );

              let (gameObject3, engineState) =
                _prepareGameObject(
                  ((-10.), 0., 0.),
                  gameObjectEulerAngles,
                  _createCube,
                  engineState,
                );

              let (engineState, parent1) =
                _createParentGameObject(engineState);
              let (engineState, parent2) =
                _createParentGameObject(engineState);
              let engineState =
                engineState
                |> SceneEngineService.addSceneChild(parent1)
                |> GameObjectUtils.addChild(parent1, parent2)
                |> GameObjectUtils.addChild(parent1, gameObject2)
                |> GameObjectUtils.addChild(parent2, gameObject1)
                |> GameObjectUtils.addChild(parent2, gameObject3);

              _prepareState(editorState, engineState);

              ((parent1, parent2), (gameObject1, gameObject2, gameObject3));
            };

            let (
              (parent1, parent2),
              (gameObject1, gameObject2, gameObject3),
            ) =
              _prepare();

            _triggerPicking();

            let editorState = StateEditorService.getState();
            let engineState = StateEngineService.unsafeGetState();
            let sceneGameObject =
              SceneEngineService.getSceneGameObject(engineState);
            (
              SceneTreeEditorService.getIsShowChildern(
                parent1,
                sceneGameObject,
                editorState,
              ),
              SceneTreeEditorService.getIsShowChildern(
                parent2,
                sceneGameObject,
                editorState,
              ),
            )
            |> expect == (true, true);
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

            RayUtils.checkIntersectTriangle(cullType, va, vb, vc, ray)
            |> Js.Option.isSome;
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
                ~cameraPos=(0., 0., 2.),
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
                ~cameraPos=(0., 0., 2.),
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
                ~cameraPos=(0., 0., 2.),
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
                ~cameraPos=(0., 0., 2.),
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
                ~cameraPos=(0., 0., 2.),
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
                ~cameraPos=(0., 0., 2.),
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
                ~cameraPos=(0., 0., 2.),
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
                ~cameraPos=(0., 0., 2.),
              )
              |> expect == false
            );
          });
        })
      );

      describe("fix bug", () =>
        describe("can pick the geometry which has indices32 data", () => {
          let _createIndices32Triangle = engineState => {
            open Js.Typed_array;

            let (engineState, geometry) =
              GeometryEngineService.create(engineState);

            let vertices1 =
              Float32Array.make([|1., 0., 0., 0., 1., 0., (-1.), 0., 0.|]);
            let indices1 = Uint32Array.make([|0, 1, 2|]);

            let engineState =
              engineState
              |> GeometryEngineService.setGeometryVertices(
                   geometry,
                   vertices1,
                 )
              |> GeometryEngineService.setGeometryIndices32(
                   geometry,
                   indices1,
                 );

            _createGameObject(geometry, engineState);
          };
          let _prepare = () =>
            _prepareOneGameObject(
              ~viewWidth=500,
              ~viewHeight=200,
              ~offsetLeft=0,
              ~offsetTop=0,
              ~cameraPos=(0., 0., 3.),
              ~gameObjectPos=(0., 0., 0.),
              ~gameObjectEulerAngles=(0., 0., 0.),
              ~createGameObjectFunc=_createIndices32Triangle,
              (),
            );

          test("test pick", () => {
            let gameObject1 = _prepare();

            _triggerPickingAndRestore(250, 100);

            _pickOne(gameObject1);
          });
        })
      );
    });
  });