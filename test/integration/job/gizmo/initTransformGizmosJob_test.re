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

      describe("create translation gizmos", () => {
        beforeEach(() => _prepareState(sandbox));

        describe("create three axis gizmos", () => {
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

          test("translation whole gizmo has three axis gizmos", () => {
            let editorState = StateEditorService.getState();
            let engineState = StateEngineService.unsafeGetState();

            GameObjectTool.hasTargetChildren(
              OperateTranslationGizmoSceneViewEditorService.unsafeGetTranslationWholeGizmo(
                editorState,
              ),
              [|
                OperateTranslationGizmoSceneViewEditorService.unsafeGetTranslationXAxisGizmo(
                  editorState,
                ),
                OperateTranslationGizmoSceneViewEditorService.unsafeGetTranslationYAxisGizmo(
                  editorState,
                ),
                OperateTranslationGizmoSceneViewEditorService.unsafeGetTranslationZAxisGizmo(
                  editorState,
                ),
              |],
              engineState,
            )
            |> expect == true;
          });

          describe("test each axis gizmo", () =>
            describe("test y axis gizmo", () => {
              test(
                "contain two gameObjects: cone gameObject as arrow and cylinder gameObject as line",
                () => {
                  let editorState = StateEditorService.getState();
                  let engineState = StateEngineService.unsafeGetState();

                  let translationYAxisGizmo =
                    OperateTranslationGizmoSceneViewEditorService.unsafeGetTranslationYAxisGizmo(
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
                  OperateTranslationGizmoSceneViewEditorService.unsafeGetTranslationYAxisGizmo(
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
                  OperateTranslationGizmoSceneViewEditorService.unsafeGetTranslationYAxisGizmo(
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
                OperateTranslationGizmoSceneViewEditorService.unsafeGetTranslationXAxisGizmo(
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
                OperateTranslationGizmoSceneViewEditorService.unsafeGetTranslationYAxisGizmo(
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
                OperateTranslationGizmoSceneViewEditorService.unsafeGetTranslationZAxisGizmo(
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

          test("x axis gizmo should rotate -90 by z axis", () => {
            let editorState = StateEditorService.getState();
            let engineState = StateEngineService.unsafeGetState();

            let translationXAxisGizmo =
              OperateTranslationGizmoSceneViewEditorService.unsafeGetTranslationXAxisGizmo(
                editorState,
              );

            translationXAxisGizmo
            |> TransformGameObjectTool.getLocalEulerAngles(_, engineState)
            |> expect == (0., 0., (-90.));
          });
          test("z axis gizmo should rotate 90 by x axis", () => {
            let editorState = StateEditorService.getState();
            let engineState = StateEngineService.unsafeGetState();

            let translationZAxisGizmo =
              OperateTranslationGizmoSceneViewEditorService.unsafeGetTranslationZAxisGizmo(
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
                  OperateTranslationGizmoSceneViewEditorService.unsafeGetTranslationWholeGizmo(
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
                            OperateTranslationGizmoSceneViewEditorService.unsafeGetTranslationZAxisGizmo(
                              editorState,
                            ),
                            OperateTranslationGizmoSceneViewEditorService.unsafeGetTranslationYAxisGizmo(
                              editorState,
                            ),
                            OperateTranslationGizmoSceneViewEditorService.unsafeGetTranslationXAxisGizmo(
                              editorState,
                            ),
                          );
              })
            )
          );
        });

        describe("create three plane gizmos", () => {
          /* TODO remove */
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

          test("translation whole gizmo has three plane gizmos", () => {
            let editorState = StateEditorService.getState();
            let engineState = StateEngineService.unsafeGetState();

            GameObjectTool.hasTargetChildren(
              OperateTranslationGizmoSceneViewEditorService.unsafeGetTranslationWholeGizmo(
                editorState,
              ),
              [|
                OperateTranslationGizmoSceneViewEditorService.unsafeGetTranslationXYPlaneGizmo(
                  editorState,
                ),
                OperateTranslationGizmoSceneViewEditorService.unsafeGetTranslationXZPlaneGizmo(
                  editorState,
                ),
                OperateTranslationGizmoSceneViewEditorService.unsafeGetTranslationYZPlaneGizmo(
                  editorState,
                ),
              |],
              engineState,
            )
            |> expect == true;
          });

          describe("test each plane gizmo", () =>
            describe("test xy plane gizmo", () => {
              test("set plane->isRender to false", () => {
                let editorState = StateEditorService.getState();
                let engineState = StateEngineService.unsafeGetState();

                OperateTranslationGizmoSceneViewEditorService.unsafeGetTranslationXYPlaneGizmo(
                  editorState,
                )
                |> GameObjectComponentEngineService.unsafeGetMeshRendererComponent(
                     _,
                     engineState,
                   )
                |> MeshRendererEngineService.getMeshRendererIsRender(
                     _,
                     engineState,
                   )
                |> expect == false;
              });

              test("plane->local position should be ( 0,0,0 )", () => {
                let editorState = StateEditorService.getState();
                let engineState = StateEngineService.unsafeGetState();

                OperateTranslationGizmoSceneViewEditorService.unsafeGetTranslationXYPlaneGizmo(
                  editorState,
                )
                |> TransformGameObjectEngineService.getLocalPosition(
                     _,
                     engineState,
                   )
                |> expect == (0., 0., 0.);
              });
            })
          );

          describe("test plane gizmo color", () => {
            test("yz plane gizmo is red", () => {
              let editorState = StateEditorService.getState();
              let engineState = StateEngineService.unsafeGetState();

              OperateTranslationGizmoSceneViewEditorService.unsafeGetTranslationYZPlaneGizmo(
                editorState,
              )
              |> GameObjectComponentEngineService.unsafeGetBasicMaterialComponent(
                   _,
                   engineState,
                 )
              |> BasicMaterialEngineService.getColor(_, engineState)
              |> expect == [|1., 0., 0.|];
            });
            test("xz axis gizmo is green", () => {
              let editorState = StateEditorService.getState();
              let engineState = StateEngineService.unsafeGetState();

              OperateTranslationGizmoSceneViewEditorService.unsafeGetTranslationXZPlaneGizmo(
                editorState,
              )
              |> GameObjectComponentEngineService.unsafeGetBasicMaterialComponent(
                   _,
                   engineState,
                 )
              |> BasicMaterialEngineService.getColor(_, engineState)
              |> expect == [|0., 1., 0.|];
            });
            test("xy plane gizmo is blue", () => {
              let editorState = StateEditorService.getState();
              let engineState = StateEngineService.unsafeGetState();

              OperateTranslationGizmoSceneViewEditorService.unsafeGetTranslationXYPlaneGizmo(
                editorState,
              )
              |> GameObjectComponentEngineService.unsafeGetBasicMaterialComponent(
                   _,
                   engineState,
                 )
              |> BasicMaterialEngineService.getColor(_, engineState)
              |> expect == [|0., 0., 1.|];
            });
          });

          test("xz plane gizmo should local rotate (90,0,0)", () => {
            let editorState = StateEditorService.getState();
            let engineState = StateEngineService.unsafeGetState();

            OperateTranslationGizmoSceneViewEditorService.unsafeGetTranslationXZPlaneGizmo(
              editorState,
            )
            |> TransformGameObjectTool.getLocalEulerAngles(_, engineState)
            |> expect == (90., 0., 0.);
          });

          describe("test plane gizmos->draw order", () =>
            test("should draw after axis gizmo", () => {
              let editorState = StateEditorService.getState();
              let engineState = StateEngineService.unsafeGetState();

              let translationWholeGizmo =
                OperateTranslationGizmoSceneViewEditorService.unsafeGetTranslationWholeGizmo(
                  editorState,
                );

              (
                translationWholeGizmo
                |> GameObjectTool.getChild(_, 3, engineState),
                translationWholeGizmo
                |> GameObjectTool.getChild(_, 4, engineState),
                translationWholeGizmo
                |> GameObjectTool.getChild(_, 5, engineState),
              )
              |>
              expect == (
                          OperateTranslationGizmoSceneViewEditorService.unsafeGetTranslationXYPlaneGizmo(
                            editorState,
                          ),
                          OperateTranslationGizmoSceneViewEditorService.unsafeGetTranslationXZPlaneGizmo(
                            editorState,
                          ),
                          OperateTranslationGizmoSceneViewEditorService.unsafeGetTranslationYZPlaneGizmo(
                            editorState,
                          ),
                        );
            })
          );
        });
      });

      describe("create rotation gizmos", () => {
        beforeEach(() => _prepareState(sandbox));

        describe("create three circle gizmos", () => {
          test("rotation whole gizmo has three circle gizmos", () => {
            let editorState = StateEditorService.getState();
            let engineState = StateEngineService.unsafeGetState();

            GameObjectTool.hasTargetChildren(
              OperateRotationGizmoSceneViewEditorService.unsafeGetRotationWholeGizmo(
                editorState,
              ),
              [|
                OperateRotationGizmoSceneViewEditorService.unsafeGetRotationXYCircleGizmo(
                  editorState,
                ),
                OperateRotationGizmoSceneViewEditorService.unsafeGetRotationXZCircleGizmo(
                  editorState,
                ),
                OperateRotationGizmoSceneViewEditorService.unsafeGetRotationYZCircleGizmo(
                  editorState,
                ),
              |],
              engineState,
            )
            |> expect == true;
          });

          describe("test each circle gizmo", () =>
            describe("test xy circle gizmo", () => {
              /* test(
                   "contain two gameObjects: cone gameObject as arrow and cylinder gameObject as line",
                   () => {
                     let editorState = StateEditorService.getState();
                     let engineState = StateEngineService.unsafeGetState();

                     let rotationYAxisGizmo =
                       OperateRotationGizmoSceneViewEditorService.unsafeGetRotationYAxisGizmo(
                         editorState,
                       );

                     (
                       rotationYAxisGizmo
                       |> _getArrow(_, engineState)
                       |> GameObjectEngineService.unsafeGetGameObjectName(
                            _,
                            engineState,
                          ),
                       rotationYAxisGizmo
                       |> _getLine(_, engineState)
                       |> GameObjectEngineService.unsafeGetGameObjectName(
                            _,
                            engineState,
                          ),
                     )
                     |> expect == ("arrow", "line");
                   },
                 ); */

              test("set gizmo->meshRenderer->isRender to false", () => {
                let editorState = StateEditorService.getState();
                let engineState = StateEngineService.unsafeGetState();

                OperateRotationGizmoSceneViewEditorService.unsafeGetRotationXYCircleGizmo(
                  editorState,
                )
                |> GameObjectComponentEngineService.unsafeGetMeshRendererComponent(
                     _,
                     engineState,
                   )
                |> MeshRendererEngineService.getMeshRendererIsRender(
                     _,
                     engineState,
                   )
                |> expect == false;
              });

              test("set gizmo->drawMode to line_strip", () => {
                let editorState = StateEditorService.getState();
                let engineState = StateEngineService.unsafeGetState();

                OperateRotationGizmoSceneViewEditorService.unsafeGetRotationXYCircleGizmo(
                  editorState,
                )
                |> GameObjectComponentEngineService.unsafeGetMeshRendererComponent(
                     _,
                     engineState,
                   )
                |> MeshRendererEngineService.getDrawMode(_, engineState)
                |>
                expect == (
                            Wonderjs.DrawModeType.Line_strip
                            |> Wonderjs.DrawModeType.drawModeToUint8
                          );
              });
            })
          );

          describe("test circle gizmo color", () => {
            test("yz circle gizmo is red", () => {
              let editorState = StateEditorService.getState();
              let engineState = StateEngineService.unsafeGetState();

              OperateRotationGizmoSceneViewEditorService.unsafeGetRotationYZCircleGizmo(
                editorState,
              )
              |> GameObjectComponentEngineService.unsafeGetBasicMaterialComponent(
                   _,
                   engineState,
                 )
              |> BasicMaterialEngineService.getColor(_, engineState)
              |> expect == [|1., 0., 0.|];
            });
            test("xz circle gizmo is green", () => {
              let editorState = StateEditorService.getState();
              let engineState = StateEngineService.unsafeGetState();

              OperateRotationGizmoSceneViewEditorService.unsafeGetRotationXZCircleGizmo(
                editorState,
              )
              |> GameObjectComponentEngineService.unsafeGetBasicMaterialComponent(
                   _,
                   engineState,
                 )
              |> BasicMaterialEngineService.getColor(_, engineState)
              |> expect == [|0., 1., 0.|];
            });
            test("xy circle gizmo is blue", () => {
              let editorState = StateEditorService.getState();
              let engineState = StateEngineService.unsafeGetState();

              OperateRotationGizmoSceneViewEditorService.unsafeGetRotationXYCircleGizmo(
                editorState,
              )
              |> GameObjectComponentEngineService.unsafeGetBasicMaterialComponent(
                   _,
                   engineState,
                 )
              |> BasicMaterialEngineService.getColor(_, engineState)
              |> expect == [|0., 0., 1.|];
            });
          });

          test("yz circle gizmo should rotate 90 by y axis", () => {
            let editorState = StateEditorService.getState();
            let engineState = StateEngineService.unsafeGetState();

            OperateRotationGizmoSceneViewEditorService.unsafeGetRotationYZCircleGizmo(
              editorState,
            )
            |> TransformGameObjectTool.getLocalEulerAngles(_, engineState)
            |> expect == (0., 90., 0.);
          });
          test("xz circle gizmo should rotate 90 by x axis", () => {
            let editorState = StateEditorService.getState();
            let engineState = StateEngineService.unsafeGetState();

            OperateRotationGizmoSceneViewEditorService.unsafeGetRotationXZCircleGizmo(
              editorState,
            )
            |> TransformGameObjectTool.getLocalEulerAngles(_, engineState)
            |> expect == (90., 0., 0.);
          });
        });
      });
    });

    describe("test move translation plane gizmos", () => {
      let _prepare =
          (
            ~createGameObjectFunc=InitPickingJobTool.createSphere,
            ~viewWidth=500,
            ~viewHeight=200,
            ~sandbox,
            /* ~offsetLeft,
               ~offsetTop, */
            ~cameraPos,
            ~gameObjectPos,
            ~gameObjectEulerAngles,
            (),
          ) => {
        let editorState = StateEditorService.getState();
        let engineState = StateEngineService.unsafeGetState();

        let (editCamera, (editorState, engineState)) =
          InitPickingJobTool.prepareCamera(
            cameraPos,
            (viewWidth, viewHeight),
            (editorState, engineState),
          );

        let (engineState, gameObject1) =
          InitPickingJobTool.prepareGameObject(
            gameObjectPos,
            gameObjectEulerAngles,
            createGameObjectFunc,
            engineState,
          );

        editorState |> StateEditorService.setState |> ignore;
        engineState |> StateEngineService.setState |> ignore;

        GameObjectTool.setCurrentSceneTreeNode(gameObject1);
      };

      describe(
        "move based on the camera pos in the local coordinate system of the current scene tree node",
        () => {
          let _getPlaneGizmoLocalPos =
              (getGizmoFunc, editorState, engineState) =>
            TransformGameObjectEngineService.getLocalPosition(
              getGizmoFunc(editorState),
              engineState,
            );

          let _getAllPlaneGizmoLocalPos = (editorState, engineState) => (
            _getPlaneGizmoLocalPos(
              OperateTranslationGizmoSceneViewEditorService.unsafeGetTranslationXYPlaneGizmo,
              editorState,
              engineState,
            ),
            _getPlaneGizmoLocalPos(
              OperateTranslationGizmoSceneViewEditorService.unsafeGetTranslationXZPlaneGizmo,
              editorState,
              engineState,
            ),
            _getPlaneGizmoLocalPos(
              OperateTranslationGizmoSceneViewEditorService.unsafeGetTranslationYZPlaneGizmo,
              editorState,
              engineState,
            ),
          );

          let _test =
              (
                ~gameObjectPos=(2., 0., 0.),
                ~gameObjectEulerAngles=(0., 0., 0.),
                ~sandbox,
                ~cameraPos,
                ~allPlaneGizmoLocalPos,
                (),
              ) => {
            _prepare(
              ~sandbox,
              ~cameraPos,
              ~gameObjectPos,
              ~gameObjectEulerAngles,
              (),
            );

            let engineState = StateEngineService.unsafeGetState();
            let (engineState, _) =
              ManageEventEngineService.triggerCustomGlobalEvent(
                CreateCustomEventEngineService.create(
                  CustomEventEditorService.getSelectSceneTreeNodeEventName(),
                  None,
                ),
                engineState,
              );

            let editorState = StateEditorService.getState();
            _getAllPlaneGizmoLocalPos(editorState, engineState)
            |> expect == allPlaneGizmoLocalPos;
          };

          test("test camera is in px,py,pz", () =>
            _test(
              ~sandbox,
              ~cameraPos=(10., 1., 3.),
              ~allPlaneGizmoLocalPos=(
                (1., 1., 0.),
                (1., 0., 1.),
                (0., 1., 1.),
              ),
              (),
            )
          );
          test("test camera is in nx,py,pz", () =>
            _test(
              ~sandbox,
              ~cameraPos=(1., 0., 3.),
              ~allPlaneGizmoLocalPos=(
                ((-1.), (-1.), 0.),
                ((-1.), 0., 1.),
                (0., (-1.), 1.),
              ),
              (),
            )
          );
          test("test camera is in px,ny,pz", () =>
            _test(
              ~sandbox,
              ~cameraPos=(10., (-1.), 3.),
              ~allPlaneGizmoLocalPos=(
                (1., (-1.), 0.),
                (1., 0., 1.),
                (0., (-1.), 1.),
              ),
              (),
            )
          );
          test("test camera is in px,py,nz", () =>
            _test(
              ~sandbox,
              ~cameraPos=(10., 1., (-3.)),
              ~allPlaneGizmoLocalPos=(
                (1., 1., 0.),
                (1., 0., (-1.)),
                (0., 1., (-1.)),
              ),
              (),
            )
          );
          test("test camera is in nx,ny,pz", () =>
            _test(
              ~sandbox,
              ~cameraPos=(1., (-1.), 3.),
              ~allPlaneGizmoLocalPos=(
                ((-1.), (-1.), 0.),
                ((-1.), 0., 1.),
                (0., (-1.), 1.),
              ),
              (),
            )
          );
          test("test camera is in nx,py,nz", () =>
            _test(
              ~sandbox,
              ~cameraPos=(1., 1., (-3.)),
              ~allPlaneGizmoLocalPos=(
                ((-1.), 1., 0.),
                ((-1.), 0., (-1.)),
                (0., 1., (-1.)),
              ),
              (),
            )
          );
          test("test camera is in px,ny,nz", () =>
            _test(
              ~sandbox,
              ~cameraPos=(10., (-1.), (-3.)),
              ~allPlaneGizmoLocalPos=(
                (1., (-1.), 0.),
                (1., 0., (-1.)),
                (0., (-1.), (-1.)),
              ),
              (),
            )
          );
          test("test camera is in nx,ny,nz", () =>
            _test(
              ~sandbox,
              ~cameraPos=(1., (-1.), (-3.)),
              ~allPlaneGizmoLocalPos=(
                ((-1.), (-1.), 0.),
                ((-1.), 0., (-1.)),
                (0., (-1.), (-1.)),
              ),
              (),
            )
          );
        },
      );
    });

    describe("bind event", () => {
      afterEach(() => EventTool.restore());

      describe("bind point drag start event", () => {
        describe("test translation gizmo", () => {
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

              SelectTranslationGizmoSceneViewEditorService.isTranslationXAxisGizmoSelected
              |> StateLogicService.getEditorState
              |> expect == false;
            })
          );

          describe(
            "else if translation gizmo isn't render, not select gizmo", () =>
            describe("if not has current scene tree node", () =>
              test("not render translation gizmo", () => {
                let gameObject1 = prepareGameObject(sandbox);

                EventTransformGizmosTool.triggerMouseDown(
                  ~sandbox,
                  ~pageX=250 + 10,
                  ~pageY=100,
                  (),
                );

                SelectTranslationGizmoSceneViewEditorService.isTranslationXAxisGizmoSelected
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

                    SelectTranslationGizmoSceneViewEditorService.isTranslationXAxisGizmoSelected
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

                    SelectTranslationGizmoSceneViewEditorService.isTranslationXAxisGizmoSelected
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

                    SelectTranslationGizmoSceneViewEditorService.isTranslationXAxisGizmoSelected
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
                SelectTranslationGizmoSceneViewEditorService.isTranslationXAxisGizmoSelected
                |> StateLogicService.getEditorState,
                SelectTranslationGizmoSceneViewEditorService.isTranslationYAxisGizmoSelected
                |> StateLogicService.getEditorState,
                SelectTranslationGizmoSceneViewEditorService.isTranslationZAxisGizmoSelected
                |> StateLogicService.getEditorState,
              )
              |> expect == (false, false, false);
            });

            describe("fix bug", () =>
              describe(
                {|"select translation gizmo" should intersect "with mesh" instead of "with aabb"|},
                () => {
                  let prepareGameObject = sandbox =>
                    InitTransformGizmosJobTool.prepareOneGameObject(
                      ~sandbox,
                      ~viewWidth=500,
                      ~viewHeight=400,
                      ~offsetLeft=0,
                      ~offsetTop=0,
                      ~cameraPos=(0., 16.180339813232422, 11.755704879760742),
                      ~gameObjectPos=(0., 0., 0.),
                      ~gameObjectEulerAngles=(12., 45., 22.),
                      ~createGameObjectFunc=InitPickingJobTool.createCube,
                      (),
                    );

                  let _prepare = sandbox => {
                    let gameObject1 = prepareGameObject(sandbox);

                    InitPickingJobTool.triggerPicking(
                      ~sandbox,
                      ~pageX=250,
                      ~pageY=200,
                      (),
                    );

                    gameObject1;
                  };

                  test("test not select x axis", () => {
                    _prepare(sandbox);

                    EventTransformGizmosTool.triggerMouseDown(
                      ~sandbox,
                      ~pageX=262,
                      ~pageY=159,
                      (),
                    );

                    SelectTranslationGizmoSceneViewEditorService.isTranslationXAxisGizmoSelected
                    |> StateLogicService.getEditorState
                    |> expect == false;
                  });
                },
              )
            );
          });
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

          describe("if circle gizmo is unused, not select it", () =>
            test("test yz circle gizmo", () => {
              let gameObject1 = _prepare(sandbox);

              EventTransformGizmosTool.triggerMouseDown(
                ~sandbox,
                ~pageX=250,
                ~pageY=200,
                (),
              );

              SelectRotationGizmoSceneViewEditorService.isYZCircleGizmoSelected
              |> StateLogicService.getEditorState
              |> expect == false;
            })
          );

          describe(
            "else if point down the not visible part of the circle gizmo, not select it",
            () =>
            test("test xy circle gizmo", () => {
              let gameObject1 = _prepare(sandbox);

              EventTransformGizmosTool.triggerMouseDown(
                ~sandbox,
                ~pageX=201,
                ~pageY=199,
                (),
              );

              SelectRotationGizmoSceneViewEditorService.isXYCircleGizmoSelected
              |> StateLogicService.getEditorState
              |> expect == false;
            })
          );

          describe("else if point down any circle gizmo, select it", () =>
            describe("test point down xy circle gizmo", () => {
              describe("if point down", () =>
                test("should mark circle gizmo selected", () => {
                  let gameObject1 = _prepare(sandbox);

                  EventTransformGizmosTool.triggerMouseDown(
                    ~sandbox,
                    ~pageX=223,
                    ~pageY=172,
                    (),
                  );

                  SelectRotationGizmoSceneViewEditorService.isXYCircleGizmoSelected
                  |> StateLogicService.getEditorState
                  |> expect == true;
                })
              );

              test("else, not mark", () => {
                let gameObject1 = _prepare(sandbox);

                EventTransformGizmosTool.triggerMouseDown(
                  ~sandbox,
                  ~pageX=350,
                  ~pageY=172,
                  (),
                );

                SelectRotationGizmoSceneViewEditorService.isXYCircleGizmoSelected
                |> StateLogicService.getEditorState
                |> expect == false;
              });
            })
          );

          test("else, mark not select any circle gizmo", () => {
            let gameObject1 = _prepare(sandbox);
            SelectRotationGizmoSceneViewEditorService.onlySelectXZCircleGizmo
            |> StateLogicService.getAndSetEditorState;

            EventTransformGizmosTool.triggerMouseDown(
              ~sandbox,
              ~pageX=314,
              ~pageY=229,
              (),
            );

            (
              SelectRotationGizmoSceneViewEditorService.isXYCircleGizmoSelected
              |> StateLogicService.getEditorState,
              SelectRotationGizmoSceneViewEditorService.isXZCircleGizmoSelected
              |> StateLogicService.getEditorState,
              SelectRotationGizmoSceneViewEditorService.isYZCircleGizmoSelected
              |> StateLogicService.getEditorState,
            )
            |> expect == (false, false, false);
          });
        });
      });

      describe("bind point drag over event", () => {
        describe("test translation gizmo", () => {
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
            describe("affect gizmo", () => {
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

              describe("test affect plane gizmos", () =>
                describe("test affect xy plane gizmo", () =>
                  describe(
                    "should move current scene tree node along the xy plane",
                    () =>
                    describe("test current scene tree node not rotate", () => {
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

                      test(
                        {|
            pick gameObject;
            select xy plane;
            mouse move (10px, 10px);

            gameObject should move (10px, 10px) along xy plane;
            |},
                        () => {
                          _prepare(sandbox, prepareGameObject);

                          EventTransformGizmosTool.triggerMouseDown(
                            ~sandbox,
                            ~pageX=250 + 10,
                            ~pageY=100 - 10,
                            (),
                          );
                          EventTransformGizmosTool.triggerMouseMove(
                            ~sandbox,
                            ~pageX=250 + 20,
                            ~pageY=100,
                            (),
                          );

                          InitTransformGizmosJobTool.getCurrentSceneTreeNodePosition()
                          |> expect == (0.173, (-0.173), 0.);
                        },
                      );
                    })
                  )
                )
              );

              describe("test affect axis gizmos", () => {
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
                          ~viewHeight=400,
                          ~offsetLeft=0,
                          ~offsetTop=0,
                          ~cameraPos=(
                            0.,
                            16.180339813232422,
                            11.755704879760742,
                          ),
                          ~gameObjectPos=(0., 0., 0.),
                          ~gameObjectEulerAngles=(12., 45., 22.),
                          ~createGameObjectFunc=InitPickingJobTool.createCube,
                          (),
                        );

                      let _prepare = sandbox => {
                        let gameObject1 = prepareGameObject(sandbox);

                        InitPickingJobTool.triggerPicking(
                          ~sandbox,
                          ~pageX=250,
                          ~pageY=200,
                          (),
                        );

                        gameObject1;
                      };

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
                            ~pageX=275,
                            ~pageY=165,
                            (),
                          );
                          EventTransformGizmosTool.triggerMouseMove(
                            ~sandbox,
                            ~pageX=275 + 10,
                            ~pageY=165,
                            (),
                          );

                          InitTransformGizmosJobTool.getCurrentSceneTreeNodePosition()
                          |> expect == (0.22, 0.089, (-0.238));
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

                        let editorState = StateEditorService.getState();
                        let engineState = StateEngineService.unsafeGetState();
                        TransformGameObjectEngineService.getPosition(
                          OperateTranslationGizmoSceneViewEditorService.unsafeGetTranslationWholeGizmo(
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
              });
            })
          );

          describe("test refresh inspector", () => {
            let _prepare = sandbox => {
              let dispatchFuncStub =
                ReactTool.createDispatchFuncStub(sandbox);
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

        describe("test rotation gizmo", () =>
          describe("affect gizmo", () => {
            let _prepare =
                (
                  ~cameraPos=(0., 16.180339813232422, 11.755704879760742),
                  ~sandbox,
                  (),
                ) => {
              let gameObject1 =
                InitTransformGizmosJobTool.prepareOneGameObject(
                  ~sandbox,
                  ~viewWidth=500,
                  ~viewHeight=400,
                  ~offsetLeft=0,
                  ~offsetTop=0,
                  ~cameraPos,
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

              gameObject1;
            };

            describe("test affect circle gizmos", () => {
              describe("test affect xy circle", () => {
                describe(
                  "should rotate current scene tree node along the local z axis(compute the angle based on the point projected mouse to xy plane of the circle)",
                  () => {
                    test(
                      {|
            pick gameObject;
            select xy circle;
            mouse move (10px, 0px);

            gameObject should rotate;
            |},
                      () => {
                        let gameObject1 = _prepare(~sandbox, ());

                        EventTransformGizmosTool.triggerMouseDown(
                          ~sandbox,
                          ~pageX=226,
                          ~pageY=172,
                          (),
                        );
                        EventTransformGizmosTool.triggerMouseMove(
                          ~sandbox,
                          ~pageX=226 + 10,
                          ~pageY=172,
                          (),
                        );

                        InitTransformGizmosJobTool.getCurrentSceneTreeNodeEulerAngles()
                        |> expect == (0., 0., (-10.4));
                      },
                    );

                    test(
                      {|
            pick gameObject;
            select xy circle;
            mouse move (10px, 0px);
            mouse move (0px, 10px);

            gameObject should rotate;
            |},
                      () => {
                        let gameObject1 = _prepare(~sandbox, ());

                        EventTransformGizmosTool.triggerMouseDown(
                          ~sandbox,
                          ~pageX=226,
                          ~pageY=172,
                          (),
                        );
                        EventTransformGizmosTool.triggerMouseMove(
                          ~sandbox,
                          ~pageX=226 + 10,
                          ~pageY=172,
                          (),
                        );
                        EventTransformGizmosTool.triggerMouseMove(
                          ~sandbox,
                          ~pageX=226 + 10,
                          ~pageY=172 + 10,
                          (),
                        );

                        InitTransformGizmosJobTool.getCurrentSceneTreeNodeEulerAngles()
                        |> expect == (0., 0., (-2.2));
                      },
                    );
                  },
                );

                describe(
                  "should rotate translation whole gizmo along the local z axis",
                  () => {
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
            select xy circle;
            mouse move (10px, 0px);

            whole gizmo should rotate;
            |},
                    () => {
                      let gameObject1 = _prepare(~sandbox, ());

                      EventTransformGizmosTool.triggerMouseDown(
                        ~sandbox,
                        ~pageX=226,
                        ~pageY=172,
                        (),
                      );
                      EventTransformGizmosTool.triggerMouseMove(
                        ~sandbox,
                        ~pageX=226 + 10,
                        ~pageY=172,
                        (),
                      );

                      let editorState = StateEditorService.getState();
                      let engineState = StateEngineService.unsafeGetState();

                      TransformGameObjectTool.getEulerAngles(
                        OperateRotationGizmoSceneViewEditorService.unsafeGetRotationWholeGizmo(
                          editorState,
                        ),
                        engineState,
                      )
                      |> Vector3Service.truncate(1)
                      |> expect == (0., 0., (-10.4));
                    },
                  );
                });
              });

              describe("test affect xy+xz circle", () =>
                describe(
                  "should rotate current scene tree node along the local z and y axis",
                  () =>
                  test(
                    {|
            pick gameObject;
            select xy circle;
            mouse move (30px, 0px);
            select xz circle;
            mouse move (0px, -20px);

            gameObject should rotate;
            |},
                    () => {
                      let gameObject1 = _prepare(~sandbox, ());

                      EventTransformGizmosTool.triggerMouseDown(
                        ~sandbox,
                        ~pageX=226,
                        ~pageY=172,
                        (),
                      );
                      EventTransformGizmosTool.triggerMouseMove(
                        ~sandbox,
                        ~pageX=226 + 30,
                        ~pageY=172,
                        (),
                      );
                      EventTransformGizmosTool.triggerMouseDown(
                        ~sandbox,
                        ~pageX=216,
                        ~pageY=218,
                        (),
                      );
                      EventTransformGizmosTool.triggerMouseMove(
                        ~sandbox,
                        ~pageX=216,
                        ~pageY=218 - 20,
                        (),
                      );

                      InitTransformGizmosJobTool.getCurrentSceneTreeNodeEulerAngles()
                      |> expect == (0., 9.5, (-33.9));
                    },
                  )
                )
              );

              describe("fix bug", () =>
                describe(
                  "test camera is look at the negative plane of the circle", () =>
                  describe("test xy circle", () =>
                    test(
                      {|
            pick gameObject;
            select xy circle;
            mouse move (30px, 0px);

            gameObject should rotate;
            |},
                      () => {
                        let gameObject1 =
                          _prepare(
                            ~sandbox,
                            ~cameraPos=(
                              (-0.11191991716623306),
                              14.925893783569336,
                              (-13.311843872070312),
                            ),
                            (),
                          );

                        EventTransformGizmosTool.triggerMouseDown(
                          ~sandbox,
                          ~pageX=213,
                          ~pageY=172,
                          (),
                        );
                        EventTransformGizmosTool.triggerMouseMove(
                          ~sandbox,
                          ~pageX=213 + 30,
                          ~pageY=172,
                          (),
                        );

                        InitTransformGizmosJobTool.getCurrentSceneTreeNodeEulerAngles()
                        |> expect == (0., 0., 32.1);
                      },
                    )
                  )
                )
              );
            });
          })
        );
      });
    });
  });