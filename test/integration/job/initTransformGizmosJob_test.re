open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open EventType;

let _ =
  describe("init transform gizmos job", () => {
    let sandbox = getSandboxDefaultVal();

    beforeEach(() => sandbox := createSandbox());
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("create transform gizmos", () => {
      let _prepareState = sandbox => {
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
              "name": "init_transform_gizmos"
            }
          ]
        }
      ]
            |},
              (),
            ),
          (),
        );

        MainEditorSceneTool.prepareGl(sandbox);

        StateLogicService.getAndSetEngineState(MainUtils._handleEngineState);
      };

      let _getArrow = (axisGameObject, engineState) =>
        TransformGizmosTool.getArrowFromAxisGameObject(
          axisGameObject,
          engineState,
        );

      let _getLine = (axisGameObject, engineState) =>
        TransformGizmosTool.getLineFromAxisGameObject(
          axisGameObject,
          engineState,
        );

      beforeEach(() => _prepareState(sandbox));

      describe("create translation gizmos", () =>
        describe("create three axis gizmos", () => {
          test("translation whole gizmo has three axis gizmos", () => {
            let editorState = StateEditorService.getState();
            let engineState = StateEngineService.unsafeGetState();

            TransformGizmoSceneViewEditorService.unsafeGetTranslationWholeGizmo(
              editorState,
            )
            |> GameObjectTool.getChildren(_, engineState)
            |> Js.Array.length
            |> expect == 3;
          });

          describe("test each axis gizmo", () =>
            describe("test y axis gizmo", () => {
              test(
                "contain two gameObjects: cone gameObject as arrow and cylinder gameObject as line",
                () => {
                  let editorState = StateEditorService.getState();
                  let engineState = StateEngineService.unsafeGetState();

                  let translationYAxisGizmo =
                    TransformGizmoSceneViewEditorService.unsafeGetTranslationYAxisGizmo(
                      editorState,
                    );

                  (
                    translationYAxisGizmo
                    |> _getArrow(_, engineState)
                    |> GameObjectEngineService.unsafeGetGameObjectName(
                         _,
                         engineState,
                       ),
                    translationYAxisGizmo
                    |> _getLine(_, engineState)
                    |> GameObjectEngineService.unsafeGetGameObjectName(
                         _,
                         engineState,
                       ),
                  )
                  |> expect == ("arrow", "line");
                },
              );

              test(
                "set arrow and cylinder->meshRenderer->isRender to false", () => {
                let editorState = StateEditorService.getState();
                let engineState = StateEngineService.unsafeGetState();

                let translationYAxisGizmo =
                  TransformGizmoSceneViewEditorService.unsafeGetTranslationYAxisGizmo(
                    editorState,
                  );

                (
                  translationYAxisGizmo
                  |> _getArrow(_, engineState)
                  |> GameObjectComponentEngineService.unsafeGetMeshRendererComponent(
                       _,
                       engineState,
                     )
                  |> MeshRendererEngineService.getMeshRendererIsRender(
                       _,
                       engineState,
                     ),
                  translationYAxisGizmo
                  |> _getLine(_, engineState)
                  |> GameObjectComponentEngineService.unsafeGetMeshRendererComponent(
                       _,
                       engineState,
                     )
                  |> MeshRendererEngineService.getMeshRendererIsRender(
                       _,
                       engineState,
                     ),
                )
                |> expect == (false, false);
              });

              test("test arrow and cylinder->local position", () => {
                let editorState = StateEditorService.getState();
                let engineState = StateEngineService.unsafeGetState();

                let translationYAxisGizmo =
                  TransformGizmoSceneViewEditorService.unsafeGetTranslationYAxisGizmo(
                    editorState,
                  );

                (
                  translationYAxisGizmo
                  |> _getArrow(_, engineState)
                  |> TransformGameObjectEngineService.getLocalPosition(
                       _,
                       engineState,
                     ),
                  translationYAxisGizmo
                  |> _getLine(_, engineState)
                  |> TransformGameObjectEngineService.getLocalPosition(
                       _,
                       engineState,
                     ),
                )
                |> expect == ((0., 5.5, 0.), (0., 2.5, 0.));
              });
            })
          );

          describe("test axis gizmo color", () => {
            test("x axis gizmo is red", () => {
              let editorState = StateEditorService.getState();
              let engineState = StateEngineService.unsafeGetState();

              let translationXAxisGizmo =
                TransformGizmoSceneViewEditorService.unsafeGetTranslationXAxisGizmo(
                  editorState,
                );

              (
                translationXAxisGizmo
                |> _getArrow(_, engineState)
                |> GameObjectComponentEngineService.unsafeGetBasicMaterialComponent(
                     _,
                     engineState,
                   )
                |> BasicMaterialEngineService.getColor(_, engineState),
                translationXAxisGizmo
                |> _getArrow(_, engineState)
                |> GameObjectComponentEngineService.unsafeGetBasicMaterialComponent(
                     _,
                     engineState,
                   )
                |> BasicMaterialEngineService.getColor(_, engineState),
              )
              |> expect == ([|1., 0., 0.|], [|1., 0., 0.|]);
            });
            test("y axis gizmo is green", () => {
              let editorState = StateEditorService.getState();
              let engineState = StateEngineService.unsafeGetState();

              let translationYAxisGizmo =
                TransformGizmoSceneViewEditorService.unsafeGetTranslationYAxisGizmo(
                  editorState,
                );

              (
                translationYAxisGizmo
                |> _getArrow(_, engineState)
                |> GameObjectComponentEngineService.unsafeGetBasicMaterialComponent(
                     _,
                     engineState,
                   )
                |> BasicMaterialEngineService.getColor(_, engineState),
                translationYAxisGizmo
                |> _getArrow(_, engineState)
                |> GameObjectComponentEngineService.unsafeGetBasicMaterialComponent(
                     _,
                     engineState,
                   )
                |> BasicMaterialEngineService.getColor(_, engineState),
              )
              |> expect == ([|0., 1., 0.|], [|0., 1., 0.|]);
            });
            test("z axis gizmo is blue", () => {
              let editorState = StateEditorService.getState();
              let engineState = StateEngineService.unsafeGetState();

              let translationZAxisGizmo =
                TransformGizmoSceneViewEditorService.unsafeGetTranslationZAxisGizmo(
                  editorState,
                );

              (
                translationZAxisGizmo
                |> _getArrow(_, engineState)
                |> GameObjectComponentEngineService.unsafeGetBasicMaterialComponent(
                     _,
                     engineState,
                   )
                |> BasicMaterialEngineService.getColor(_, engineState),
                translationZAxisGizmo
                |> _getArrow(_, engineState)
                |> GameObjectComponentEngineService.unsafeGetBasicMaterialComponent(
                     _,
                     engineState,
                   )
                |> BasicMaterialEngineService.getColor(_, engineState),
              )
              |> expect == ([|0., 0., 1.|], [|0., 0., 1.|]);
            });
          });

          test("x axis gizmo should rotate -90 by z", () => {
            let editorState = StateEditorService.getState();
            let engineState = StateEngineService.unsafeGetState();

            let translationXAxisGizmo =
              TransformGizmoSceneViewEditorService.unsafeGetTranslationXAxisGizmo(
                editorState,
              );

            translationXAxisGizmo
            |> TransformGameObjectTool.getLocalEulerAngles(_, engineState)
            |> expect == (0., 0., (-90.));
          });
          test("z axis gizmo should rotate 90 by x", () => {
            let editorState = StateEditorService.getState();
            let engineState = StateEngineService.unsafeGetState();

            let translationZAxisGizmo =
              TransformGizmoSceneViewEditorService.unsafeGetTranslationZAxisGizmo(
                editorState,
              );

            translationZAxisGizmo
            |> TransformGameObjectTool.getLocalEulerAngles(_, engineState)
            |> expect == (90., 0., 0.);
          });

          describe("test axis gizmos->draw order", () =>
            describe("should draw z->y->x axis gizmo", () =>
              test(
                "translation whole gizmo->children order should be: z,y,x axis gizmo",
                () => {
                let editorState = StateEditorService.getState();
                let engineState = StateEngineService.unsafeGetState();

                let translationWholeGizmo =
                  TransformGizmoSceneViewEditorService.unsafeGetTranslationWholeGizmo(
                    editorState,
                  );

                (
                  translationWholeGizmo
                  |> GameObjectTool.getChild(_, 0, engineState),
                  translationWholeGizmo
                  |> GameObjectTool.getChild(_, 1, engineState),
                  translationWholeGizmo
                  |> GameObjectTool.getChild(_, 2, engineState),
                )
                |>
                expect == (
                            TransformGizmoSceneViewEditorService.unsafeGetTranslationZAxisGizmo(
                              editorState,
                            ),
                            TransformGizmoSceneViewEditorService.unsafeGetTranslationYAxisGizmo(
                              editorState,
                            ),
                            TransformGizmoSceneViewEditorService.unsafeGetTranslationXAxisGizmo(
                              editorState,
                            ),
                          );
              })
            )
          );
        })
      );
    });

    describe("bind event", () => {
      afterEach(() => EventTool.restore());

      describe("bind point down event", () => {
        let prepareGameObject = sandbox =>
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

        describe("if mouse button isn't left button", () =>
          test("if point down x axis, still not select x axis", () => {
            let gameObject1 = prepareGameObject(sandbox);

            InitPickingJobTool.triggerPicking(
              ~sandbox,
              ~pageX=250,
              ~pageY=100,
              (),
            );
            EventTransformGizmosTool.triggerMouseDown(
              ~sandbox,
              ~eventButton=2,
              ~pageX=250 + 10,
              ~pageY=100,
              (),
            );

            SelectTransformGizmoSceneViewEditorService.isTranslationXAxisGizmoSelected
            |> StateLogicService.getEditorState
            |> expect == false;
          })
        );

        describe("if translation gizmo isn't render, not select gizmo", () =>
          describe("if not has current scene tree node", () =>
            test("not render translation gizmo", () => {
              let gameObject1 = prepareGameObject(sandbox);

              EventTransformGizmosTool.triggerMouseDown(
                ~sandbox,
                ~pageX=250 + 10,
                ~pageY=100,
                (),
              );

              SelectTransformGizmoSceneViewEditorService.isTranslationXAxisGizmoSelected
              |> StateLogicService.getEditorState
              |> expect == false;
            })
          )
        );

        describe("else", () => {
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

          describe("if point down any axis, select that axis", () =>
            describe("test point down x axis", () =>
              describe("should mark x axis selected", () => {
                test("test point down arrow", () => {
                  let gameObject1 = _prepare(sandbox);

                  EventTransformGizmosTool.triggerMouseDown(
                    ~sandbox,
                    ~pageX=250 + 30,
                    ~pageY=100,
                    (),
                  );

                  SelectTransformGizmoSceneViewEditorService.isTranslationXAxisGizmoSelected
                  |> StateLogicService.getEditorState
                  |> expect == true;
                });
                test("test point down line", () => {
                  let gameObject1 = _prepare(sandbox);

                  EventTransformGizmosTool.triggerMouseDown(
                    ~sandbox,
                    ~pageX=250 + 2,
                    ~pageY=100,
                    (),
                  );

                  SelectTransformGizmoSceneViewEditorService.isTranslationXAxisGizmoSelected
                  |> StateLogicService.getEditorState
                  |> expect == true;
                });
                test("if not point down arrow or line, not mark", () => {
                  let gameObject1 = _prepare(sandbox);

                  EventTransformGizmosTool.triggerMouseDown(
                    ~sandbox,
                    ~pageX=250 + 20,
                    ~pageY=100 + 30,
                    (),
                  );

                  SelectTransformGizmoSceneViewEditorService.isTranslationXAxisGizmoSelected
                  |> StateLogicService.getEditorState
                  |> expect == false;
                });
              })
            )
          );

          test("else, mark not select any axis", () => {
            let gameObject1 = _prepare(sandbox);

            EventTransformGizmosTool.triggerMouseDown(
              ~sandbox,
              ~pageX=250 + 40,
              ~pageY=100 - 30,
              (),
            );

            (
              SelectTransformGizmoSceneViewEditorService.isTranslationXAxisGizmoSelected
              |> StateLogicService.getEditorState,
              SelectTransformGizmoSceneViewEditorService.isTranslationYAxisGizmoSelected
              |> StateLogicService.getEditorState,
              SelectTransformGizmoSceneViewEditorService.isTranslationZAxisGizmoSelected
              |> StateLogicService.getEditorState,
            )
            |> expect == (false, false, false);
          });
        });
      });

      describe("bind point drag event", () => {
        test("if mouse button isn't left button, not affect gizmo", () => {
          let _ =
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
          EventTransformGizmosTool.triggerMouseMove(
            ~sandbox,
            ~eventButton=2,
            ~pageX=250 + 20,
            ~pageY=100,
            (),
          );

          InitTransformGizmosJobTool.getCurrentSceneTreeNodePosition()
          |> expect == (0., 0., 0.);
        });

        describe("else", () =>
          describe("affect gizmo", () =>
            describe("affect translation gizmo", () => {
              let _prepare = (sandbox, prepareGameObjectFunc) => {
                let gameObject1 = prepareGameObjectFunc(sandbox);

                InitPickingJobTool.triggerPicking(
                  ~sandbox,
                  ~pageX=250,
                  ~pageY=100,
                  (),
                );

                gameObject1;
              };

              describe("test affect x axis", () => {
                describe(
                  "should move current scene tree node along the x axis", () => {
                  describe("test current scene tree node not rotate", () => {
                    let prepareGameObject = sandbox =>
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

                    test(
                      {|
            pick gameObject;
            select x axis;
            mouse move (10px, 0px);

            gameObject should move (10px, 0px);
            |},
                      () => {
                        let gameObject1 =
                          _prepare(sandbox, prepareGameObject);

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

                        InitTransformGizmosJobTool.getCurrentSceneTreeNodePosition()
                        |> expect == (0.173, 0., 0.);
                      },
                    );
                    test(
                      {|
            pick gameObject;
            select x axis;
            mouse move (10px, 20px);

            gameObject should move (10px, 0px);
            |},
                      () => {
                        _prepare(sandbox, prepareGameObject);

                        EventTransformGizmosTool.triggerMouseDown(
                          ~sandbox,
                          ~pageX=250 + 10,
                          ~pageY=100,
                          (),
                        );
                        EventTransformGizmosTool.triggerMouseMove(
                          ~sandbox,
                          ~pageX=250 + 20,
                          ~pageY=100 + 20,
                          (),
                        );

                        InitTransformGizmosJobTool.getCurrentSceneTreeNodePosition()
                        |> expect == (0.173, 0., 0.);
                      },
                    );
                    test(
                      {|
            pick gameObject;
            select x axis;
            mouse move (10px, 0px);
            mouse move (10px, 0px);

            gameObject should move (20px, 0px);
            |},
                      () => {
                        _prepare(sandbox, prepareGameObject);

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
                        EventTransformGizmosTool.triggerMouseMove(
                          ~sandbox,
                          ~pageX=250 + 30,
                          ~pageY=100,
                          (),
                        );

                        InitTransformGizmosJobTool.getCurrentSceneTreeNodePosition()
                        |> expect == (0.173 *. 2., 0., 0.);
                      },
                    );
                  });

                  describe("test current scene tree node rotate", () => {
                    let prepareGameObject = sandbox =>
                      InitTransformGizmosJobTool.prepareOneGameObject(
                        ~sandbox,
                        ~viewWidth=500,
                        ~viewHeight=200,
                        ~offsetLeft=0,
                        ~offsetTop=0,
                        ~cameraPos=(0., 0., 3.),
                        ~gameObjectPos=(0., 0., 0.),
                        ~gameObjectEulerAngles=(12., 45., 22.),
                        ~createGameObjectFunc=InitPickingJobTool.createCube,
                        (),
                      );

                    test(
                      {|
            pick gameObject;
            select x axis;
            mouse move (10px, 0px);

            gameObject should move along +x axis;
            |},
                      () => {
                        _prepare(sandbox, prepareGameObject);

                        EventTransformGizmosTool.triggerMouseDown(
                          ~sandbox,
                          ~pageX=250 + 20,
                          ~pageY=100 - 10,
                          (),
                        );
                        EventTransformGizmosTool.triggerMouseMove(
                          ~sandbox,
                          ~pageX=250 + 30,
                          ~pageY=100 - 10,
                          (),
                        );

                        InitTransformGizmosJobTool.getCurrentSceneTreeNodePosition()
                        |> expect == (0.224, 0.09, (-0.241));
                      },
                    );
                  });
                });

                describe(
                  "should move translation whole gizmo along the x axis", () => {
                  let prepareGameObject = sandbox =>
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

                  test(
                    {|
            pick gameObject;
            select x axis;
            mouse move (10px, 0px);

            whole gizmo should move (10px, 0px);
            |},
                    () => {
                      let gameObject1 = _prepare(sandbox, prepareGameObject);

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

                      let editorState = StateEditorService.getState();
                      let engineState = StateEngineService.unsafeGetState();
                      TransformGameObjectEngineService.getPosition(
                        TransformGizmoSceneViewEditorService.unsafeGetTranslationWholeGizmo(
                          editorState,
                        ),
                        engineState,
                      )
                      |> Vector3Service.truncate(3)
                      |> expect == (0.173, 0., 0.);
                    },
                  );
                });
              });

              describe("test current scene tree node has parent", () => {
                let prepareGameObject = sandbox =>
                  InitTransformGizmosJobTool.prepareOneGameObject(
                    ~sandbox,
                    ~viewWidth=500,
                    ~viewHeight=200,
                    ~offsetLeft=0,
                    ~offsetTop=0,
                    ~cameraPos=(0., 0., 3.),
                    ~gameObjectPos=((-1.), 0., 0.),
                    ~gameObjectEulerAngles=(0., 23., 22.),
                    ~createGameObjectFunc=InitPickingJobTool.createCube,
                    (),
                  );

                let createParentGameObject =
                    (
                      gameObjectPos,
                      gameObjectEulerAngles,
                      childGameObject,
                      engineState,
                    ) => {
                  let (engineState, parentGameObject) =
                    InitPickingJobTool.prepareGameObject(
                      gameObjectPos,
                      gameObjectEulerAngles,
                      InitPickingJobTool.createCube,
                      engineState,
                    );

                  let engineState =
                    GameObjectTool.addChild(
                      parentGameObject,
                      childGameObject,
                      engineState,
                    );

                  (engineState, parentGameObject);
                };

                test(
                  {|
            create parent gameObject p1;
            set p1->local position to (1.0, 0.0, 0.0);
            set p1->local eulerAngles to (12.0, 22.0, 0.0);
            add child gameObject c1;
            set c1->local position to (-1.0, 0.0, 0.0);
            set c1->local eulerAngles to (0.0, 23.0, 22.0);
            pick c1;
            select axis;
            mouse move (10px, 0px);

            c1 should move along axis in world coordinate system;
            |},
                  () => {
                    let gameObject1 = prepareGameObject(sandbox);

                    let engineState = StateEngineService.unsafeGetState();
                    let (engineState, parent) =
                      createParentGameObject(
                        (1., 0., 0.),
                        (12., 45., 22.),
                        gameObject1,
                        engineState,
                      );
                    engineState |> StateEngineService.setState |> ignore;

                    InitPickingJobTool.triggerPicking(
                      ~sandbox,
                      ~pageX=250,
                      ~pageY=100,
                      (),
                    );
                    EventTransformGizmosTool.triggerMouseDown(
                      ~sandbox,
                      ~pageX=250 + 20,
                      ~pageY=100 - 10,
                      (),
                    );
                    EventTransformGizmosTool.triggerMouseMove(
                      ~sandbox,
                      ~pageX=250 + 30,
                      ~pageY=100 - 10,
                      (),
                    );

                    InitTransformGizmosJobTool.getCurrentSceneTreeNodePosition()
                    |> expect == (0.344, (-0.265), 0.707);
                  },
                );
              });
            })
          )
        );

        describe("test refresh inspector", () => {
          let _prepare = sandbox => {
            let dispatchFuncStub = ReactTool.createDispatchFuncStub(sandbox);
            let _ =
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

            InitPickingJobTool.triggerPicking(
              ~sandbox,
              ~pageX=250,
              ~pageY=100,
              (),
            );

            dispatchFuncStub;
          };

          test("if select any gizmo, refresh", () => {
            let dispatchFuncStub = _prepare(sandbox);

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

            dispatchFuncStub
            |> expect
            |> toCalledWith([|
                 AppStore.UpdateAction(Update([|UpdateStore.Inspector|])),
               |]);
          });
          test("else, not refresh inspector", () => {
            let dispatchFuncStub = _prepare(sandbox);

            EventTransformGizmosTool.triggerMouseDown(
              ~sandbox,
              ~pageX=250 + 50,
              ~pageY=100 - 50,
              (),
            );
            EventTransformGizmosTool.triggerMouseMove(
              ~sandbox,
              ~pageX=250 + 20,
              ~pageY=100,
              (),
            );

            dispatchFuncStub
            |> expect
            |> not_
            |> toCalledWith([|
                 AppStore.UpdateAction(Update([|UpdateStore.Inspector|])),
               |]);
          });
        });
      });
    });
  });