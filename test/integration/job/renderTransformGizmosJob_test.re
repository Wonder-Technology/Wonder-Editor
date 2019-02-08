open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open EventType;

let _ =
  describe("render transform gizmos job", () => {
    let sandbox = getSandboxDefaultVal();

    let _prepareState = () => {
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
            },
      {
        "name": "init_no_material_shader"
      },
            {
              "name": "init_basic_material"
            },
            {
              "name": "init_light_material"
            }
          ]
        }
      ]
            |},
            ~loopPipelines=
              {|
             [
         {
           "name": "default",
           "jobs": [
            {
                "name": "get_camera_data"
            },
            {
                "name": "create_basic_render_object_buffer"
            },
            {
                "name": "create_light_render_object_buffer"
            },
{"name": "render_transform_gizmos" }
           ]
         }
       ]
             |},
            (),
          ),
        (),
      );

      MainEditorSceneTool.createDefaultSceneAndNotInit(sandbox);
    };

    beforeEach(() => {
      sandbox := createSandbox();

      _prepareState();
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("if has current scene tree node", () => {
      beforeEach(() =>
        MainEditorSceneTool.setFirstCubeToBeCurrentSceneTreeNode()
      );

      describe("render translation gizmos", () => {
        describe("render axis gizmos", () => {
          let _getArrowGeometry = (editorState, engineState) =>
            GameObjectComponentEngineService.unsafeGetGeometryComponent(
              TransformGizmosTool.getArrowGameObject(
                editorState,
                engineState,
              ),
              engineState,
            );

          let _getLineGeometry = (editorState, engineState) =>
            GameObjectComponentEngineService.unsafeGetGeometryComponent(
              TransformGizmosTool.getLineGameObject(editorState, engineState),
              engineState,
            );

          describe("prepare gl state", () =>
            test("disable depth test", () => {
              let engineState = StateEngineService.unsafeGetState();
              let disable = createEmptyStubWithJsObjSandbox(sandbox);
              let getDepthTest = 1;
              let engineState =
                engineState
                |> FakeGlToolEngine.setFakeGl(
                     FakeGlToolEngine.buildFakeGl(
                       ~sandbox,
                       ~disable,
                       ~getDepthTest,
                       (),
                     ),
                   );

              let engineState =
                engineState
                |> MainUtils._handleEngineState
                |> DirectorToolEngine.runWithDefaultTime;

              disable
              |> getCall(0)
              |> expect
              |> toCalledWith([|getDepthTest|]);
            })
          );

          test("use one program", () => {
            let engineState = StateEngineService.unsafeGetState();
            let useProgram = createEmptyStubWithJsObjSandbox(sandbox);
            let engineState =
              engineState
              |> FakeGlToolEngine.setFakeGl(
                   FakeGlToolEngine.buildFakeGl(~sandbox, ~useProgram, ()),
                 );

            let engineState =
              engineState
              |> MainUtils._handleEngineState
              |> DirectorToolEngine.runWithDefaultTime;

            useProgram |> getCallCount |> expect >= 1;
          });

          describe("send gl data", () => {
            describe("send attribute", () =>
              describe("init vbo buffers when first send", () => {
                let _prepareForBufferData =
                    (arrowPoints, linePoints, countTuple) => {
                  let engineState = StateEngineService.unsafeGetState();
                  let array_buffer = 1;
                  let static_draw = 2;
                  let bufferData = createEmptyStubWithJsObjSandbox(sandbox);
                  let engineState =
                    engineState
                    |> FakeGlToolEngine.setFakeGl(
                         FakeGlToolEngine.buildFakeGl(
                           ~sandbox,
                           ~array_buffer,
                           ~static_draw,
                           ~bufferData,
                           (),
                         ),
                       );

                  let engineState =
                    engineState
                    |> MainUtils._handleEngineState
                    |> DirectorToolEngine.runWithDefaultTime;

                  (
                    bufferData
                    |> withThreeArgs(array_buffer, arrowPoints, static_draw)
                    |> getCallCount,
                    bufferData
                    |> withThreeArgs(array_buffer, linePoints, static_draw)
                    |> getCallCount,
                  )
                  |> expect == countTuple;
                };

                beforeEach(() =>
                  MainUtils._handleEngineState
                  |> StateLogicService.getAndSetEngineState
                );

                describe("init vertex buffer", () =>
                  test("bufferData arrow and line vertices three times", () => {
                    let engineState = StateEngineService.unsafeGetState();
                    let editorState = StateEditorService.getState();

                    _prepareForBufferData(
                      GeometryToolEngine.getGameObjectVertices(
                        TransformGizmosTool.getArrowGameObject(
                          editorState,
                          engineState,
                        ),
                        engineState,
                      ),
                      GeometryToolEngine.getGameObjectVertices(
                        TransformGizmosTool.getLineGameObject(
                          editorState,
                          engineState,
                        ),
                        engineState,
                      ),
                      (3, 3),
                    );
                  })
                );

                describe("not init texCoord buffer", () =>
                  test("bufferData arrow and line texCoords three times", () => {
                    let engineState = StateEngineService.unsafeGetState();
                    let editorState = StateEditorService.getState();

                    _prepareForBufferData(
                      GeometryToolEngine.getGameObjectTexCoords(
                        TransformGizmosTool.getArrowGameObject(
                          editorState,
                          engineState,
                        ),
                        engineState,
                      ),
                      GeometryToolEngine.getGameObjectTexCoords(
                        TransformGizmosTool.getLineGameObject(
                          editorState,
                          engineState,
                        ),
                        engineState,
                      ),
                      (0, 0),
                    );
                  })
                );

                describe("init index buffer", () =>
                  test("bufferData", () => {
                    let engineState = StateEngineService.unsafeGetState();
                    let editorState = StateEditorService.getState();
                    let element_array_buffer = 1;
                    let static_draw = 2;
                    let bufferData = createEmptyStubWithJsObjSandbox(sandbox);
                    let engineState =
                      engineState
                      |> FakeGlToolEngine.setFakeGl(
                           FakeGlToolEngine.buildFakeGl(
                             ~sandbox,
                             ~element_array_buffer,
                             ~static_draw,
                             ~bufferData,
                             (),
                           ),
                         );

                    let engineState =
                      engineState |> DirectorToolEngine.runWithDefaultTime;

                    let arrowIndices =
                      GeometryToolEngine.getGameObjectIndices16(
                        TransformGizmosTool.getArrowGameObject(
                          editorState,
                          engineState,
                        ),
                        engineState,
                      );
                    let lineIndices =
                      GeometryToolEngine.getGameObjectIndices16(
                        TransformGizmosTool.getLineGameObject(
                          editorState,
                          engineState,
                        ),
                        engineState,
                      );
                    (
                      bufferData
                      |> withThreeArgs(
                           element_array_buffer,
                           arrowIndices,
                           static_draw,
                         )
                      |> getCallCount,
                      bufferData
                      |> withThreeArgs(
                           element_array_buffer,
                           lineIndices,
                           static_draw,
                         )
                      |> getCallCount,
                    )
                    |> expect == (3, 3);
                  })
                );
              })
            );

            describe("send uniform data", () => {
              describe("test send model data", () =>
                describe("send u_mMatrix", () =>
                  test(
                    "test send each axis->arrow and line gameObjects->u_mMatrix",
                    () => {
                    let engineState = StateEngineService.unsafeGetState();
                    let uniformMatrix4fv =
                      createEmptyStubWithJsObjSandbox(sandbox);
                    let pos = 10;
                    let getUniformLocation =
                      GLSLLocationToolEngine.getUniformLocation(
                        ~pos,
                        sandbox,
                        "u_mMatrix",
                      );
                    let engineState =
                      FakeGlToolEngine.setFakeGl(
                        FakeGlToolEngine.buildFakeGl(
                          ~sandbox,
                          ~uniformMatrix4fv,
                          ~getUniformLocation,
                          (),
                        ),
                        engineState,
                      );

                    let engineState =
                      engineState
                      |> MainUtils._handleEngineState
                      |> DirectorToolEngine.runWithDefaultTime;

                    uniformMatrix4fv
                    |> withOneArg(pos)
                    |> getCallCount
                    |> expect >= 6;
                  })
                )
              );

              describe("test send material data", () => {
                describe("send u_alpha", () =>
                  test("test send axis gameObjects->u_alpha with 1.0", () => {
                    let engineState = StateEngineService.unsafeGetState();
                    let uniform1f = createEmptyStubWithJsObjSandbox(sandbox);
                    let pos = 10;
                    let getUniformLocation =
                      GLSLLocationToolEngine.getUniformLocation(
                        ~pos,
                        sandbox,
                        "u_alpha",
                      );
                    let engineState =
                      FakeGlToolEngine.setFakeGl(
                        FakeGlToolEngine.buildFakeGl(
                          ~sandbox,
                          ~uniform1f,
                          ~getUniformLocation,
                          (),
                        ),
                        engineState,
                      );

                    let engineState =
                      engineState
                      |> MainUtils._handleEngineState
                      |> DirectorToolEngine.runWithDefaultTime;

                    uniform1f
                    |> withTwoArgs(pos, 1.0)
                    |> getCallCount
                    |> expect == 1;
                  })
                );

                describe("send u_color", () =>
                  test("test send each axis gameObject->u_color", () => {
                    let engineState = StateEngineService.unsafeGetState();
                    let uniform3f = createEmptyStubWithJsObjSandbox(sandbox);
                    let pos = 10;
                    let getUniformLocation =
                      GLSLLocationToolEngine.getUniformLocation(
                        ~pos,
                        sandbox,
                        "u_color",
                      );
                    let engineState =
                      FakeGlToolEngine.setFakeGl(
                        FakeGlToolEngine.buildFakeGl(
                          ~sandbox,
                          ~uniform3f,
                          ~getUniformLocation,
                          (),
                        ),
                        engineState,
                      );

                    let engineState =
                      engineState
                      |> MainUtils._handleEngineState
                      |> DirectorToolEngine.runWithDefaultTime;

                    uniform3f
                    |> withOneArg(pos)
                    |> getCallCount
                    |> expect >= 3;
                  })
                );
              });
            });
          });

          describe("draw", () =>
            test("draw each axis->arrow and line gameObjects", () => {
              let engineState = StateEngineService.unsafeGetState();
              let triangles = 2;
              let drawElements = createEmptyStubWithJsObjSandbox(sandbox);
              let engineState =
                FakeGlToolEngine.setFakeGl(
                  FakeGlToolEngine.buildFakeGl(
                    ~sandbox,
                    ~triangles,
                    ~drawElements,
                    (),
                  ),
                  engineState,
                );

              let engineState =
                engineState
                |> MainUtils._handleEngineState
                |> DirectorToolEngine.runWithDefaultTime;

              let editorState = StateEditorService.getState();
              (
                drawElements
                |> withTwoArgs(
                     triangles,
                     GeometryEngineService.getIndicesCount(
                       _getArrowGeometry(editorState, engineState),
                       engineState,
                     ),
                   )
                |> getCallCount,
                drawElements
                |> withTwoArgs(
                     triangles,
                     GeometryEngineService.getIndicesCount(
                       _getLineGeometry(editorState, engineState),
                       engineState,
                     ),
                   )
                |> getCallCount,
              )
              |> expect == (3, 3);
            })
          );

          describe("restore gl state", () =>
            test("enable depth test", () => {
              let engineState = StateEngineService.unsafeGetState();
              let enable = createEmptyStubWithJsObjSandbox(sandbox);
              let getDepthTest = 1;
              let engineState =
                engineState
                |> FakeGlToolEngine.setFakeGl(
                     FakeGlToolEngine.buildFakeGl(
                       ~sandbox,
                       ~enable,
                       ~getDepthTest,
                       (),
                     ),
                   );

              let engineState =
                engineState
                |> MainUtils._handleEngineState
                |> DirectorToolEngine.runWithDefaultTime;

              enable
              |> getCall(0)
              |> expect
              |> toCalledWith([|getDepthTest|]);
            })
          );
        });

        describe("render plane gizmos", () => {
          let _getPlaneGeometry = (editorState, engineState) =>
            GameObjectComponentEngineService.unsafeGetGeometryComponent(
              OperateTranslationGizmoSceneViewEditorService.unsafeGetTranslationXYPlaneGizmo(
                editorState,
              ),
              engineState,
            );

          describe("prepare gl state", () => {
            test("disable depth write", () => {
              let engineState = StateEngineService.unsafeGetState();
              let depthMask = createEmptyStubWithJsObjSandbox(sandbox);
              let engineState =
                engineState
                |> FakeGlToolEngine.setFakeGl(
                     FakeGlToolEngine.buildFakeGl(~sandbox, ~depthMask, ()),
                   );

              let engineState =
                engineState
                |> MainUtils._handleEngineState
                |> DirectorToolEngine.runWithDefaultTime;

              depthMask |> getCall(0) |> expect |> toCalledWith([|false|]);
            });
            test("disable depth test", () => {
              let engineState = StateEngineService.unsafeGetState();
              let disable = createEmptyStubWithJsObjSandbox(sandbox);
              let getDepthTest = 1;
              let engineState =
                engineState
                |> FakeGlToolEngine.setFakeGl(
                     FakeGlToolEngine.buildFakeGl(
                       ~sandbox,
                       ~disable,
                       ~getDepthTest,
                       (),
                     ),
                   );

              let engineState =
                engineState
                |> MainUtils._handleEngineState
                |> DirectorToolEngine.runWithDefaultTime;

              disable
              |> getCall(1)
              |> expect
              |> toCalledWith([|getDepthTest|]);
            });
            test("set side to both", () => {
              let engineState = StateEngineService.unsafeGetState();
              let disable = createEmptyStubWithJsObjSandbox(sandbox);
              let getCullFace = 1;
              let engineState =
                engineState
                |> FakeGlToolEngine.setFakeGl(
                     FakeGlToolEngine.buildFakeGl(
                       ~sandbox,
                       ~disable,
                       ~getCullFace,
                       (),
                     ),
                   );

              let engineState =
                engineState
                |> MainUtils._handleEngineState
                |> DirectorToolEngine.runWithDefaultTime;

              disable
              |> getCall(2)
              |> expect
              |> toCalledWith([|getCullFace|]);
            });

            describe("open blend", () => {
              test("enable blend", () => {
                let engineState = StateEngineService.unsafeGetState();
                let enable = createEmptyStubWithJsObjSandbox(sandbox);
                let getBlend = 1;
                let engineState =
                  engineState
                  |> FakeGlToolEngine.setFakeGl(
                       FakeGlToolEngine.buildFakeGl(
                         ~sandbox,
                         ~enable,
                         ~getBlend,
                         (),
                       ),
                     );

                let engineState =
                  engineState
                  |> MainUtils._handleEngineState
                  |> DirectorToolEngine.runWithDefaultTime;

                enable |> getCall(1) |> expect |> toCalledWith([|getBlend|]);
              });
              test("set blend func", () => {
                let engineState = StateEngineService.unsafeGetState();
                let blendFunc = createEmptyStubWithJsObjSandbox(sandbox);
                let getSrcAlpha = 1;
                let getOneMinusSrcAlpha = 2;
                let engineState =
                  engineState
                  |> FakeGlToolEngine.setFakeGl(
                       FakeGlToolEngine.buildFakeGl(
                         ~sandbox,
                         ~blendFunc,
                         ~getSrcAlpha,
                         ~getOneMinusSrcAlpha,
                         (),
                       ),
                     );

                let engineState =
                  engineState
                  |> MainUtils._handleEngineState
                  |> DirectorToolEngine.runWithDefaultTime;

                blendFunc
                |> getCall(0)
                |> expect
                |> toCalledWith([|getSrcAlpha, getOneMinusSrcAlpha|]);
              });
            });
          });

          test("use the same program", () => {
            let engineState = StateEngineService.unsafeGetState();
            let useProgram = createEmptyStubWithJsObjSandbox(sandbox);
            let engineState =
              engineState
              |> FakeGlToolEngine.setFakeGl(
                   FakeGlToolEngine.buildFakeGl(~sandbox, ~useProgram, ()),
                 );

            let engineState =
              engineState
              |> MainUtils._handleEngineState
              |> DirectorToolEngine.runWithDefaultTime;

            useProgram |> getCallCount |> expect == 1;
          });

          describe("send gl data", () => {
            describe("send attribute", () =>
              describe("init vbo buffers when first send", () => {
                let _prepareForBufferData = (planePoints, count) => {
                  let engineState = StateEngineService.unsafeGetState();
                  let array_buffer = 1;
                  let static_draw = 2;
                  let bufferData = createEmptyStubWithJsObjSandbox(sandbox);
                  let engineState =
                    engineState
                    |> FakeGlToolEngine.setFakeGl(
                         FakeGlToolEngine.buildFakeGl(
                           ~sandbox,
                           ~array_buffer,
                           ~static_draw,
                           ~bufferData,
                           (),
                         ),
                       );

                  let engineState =
                    engineState
                    |> MainUtils._handleEngineState
                    |> DirectorToolEngine.runWithDefaultTime;

                  bufferData
                  |> withThreeArgs(array_buffer, planePoints, static_draw)
                  |> getCallCount
                  |> expect == count;
                };

                beforeEach(() =>
                  MainUtils._handleEngineState
                  |> StateLogicService.getAndSetEngineState
                );

                describe("init vertex buffer", () =>
                  test("bufferData plane vertices three times", () => {
                    let engineState = StateEngineService.unsafeGetState();
                    let editorState = StateEditorService.getState();

                    _prepareForBufferData(
                      GeometryToolEngine.getGameObjectVertices(
                        _getPlaneGeometry(editorState, engineState),
                        engineState,
                      ),
                      3,
                    );
                  })
                );

                describe("not init texCoord buffer", () =>
                  test("bufferData arrow and line texCoords three times", () => {
                    let engineState = StateEngineService.unsafeGetState();
                    let editorState = StateEditorService.getState();

                    _prepareForBufferData(
                      GeometryToolEngine.getGameObjectTexCoords(
                        _getPlaneGeometry(editorState, engineState),
                        engineState,
                      ),
                      0,
                    );
                  })
                );

                describe("init index buffer", () =>
                  test("bufferData", () => {
                    let engineState = StateEngineService.unsafeGetState();
                    let editorState = StateEditorService.getState();
                    let element_array_buffer = 1;
                    let static_draw = 2;
                    let bufferData = createEmptyStubWithJsObjSandbox(sandbox);
                    let engineState =
                      engineState
                      |> FakeGlToolEngine.setFakeGl(
                           FakeGlToolEngine.buildFakeGl(
                             ~sandbox,
                             ~element_array_buffer,
                             ~static_draw,
                             ~bufferData,
                             (),
                           ),
                         );

                    let engineState =
                      engineState |> DirectorToolEngine.runWithDefaultTime;

                    let arrowIndices =
                      GeometryToolEngine.getGameObjectIndices16(
                        TransformGizmosTool.getArrowGameObject(
                          editorState,
                          engineState,
                        ),
                        engineState,
                      );
                    let lineIndices =
                      GeometryToolEngine.getGameObjectIndices16(
                        TransformGizmosTool.getLineGameObject(
                          editorState,
                          engineState,
                        ),
                        engineState,
                      );

                    bufferData
                    |> withThreeArgs(
                         element_array_buffer,
                         GeometryEngineService.getGeometryIndices16(
                           _getPlaneGeometry(editorState, engineState),
                           engineState,
                         ),
                         static_draw,
                       )
                    |> getCallCount
                    |> expect == 3;
                  })
                );
              })
            );

            describe("send uniform data", () => {
              describe("test send model data", () =>
                describe("send u_mMatrix", () =>
                  test("test 3 plane gameObjects->u_mMatrix", () => {
                    let engineState = StateEngineService.unsafeGetState();
                    let uniformMatrix4fv =
                      createEmptyStubWithJsObjSandbox(sandbox);
                    let pos = 10;
                    let getUniformLocation =
                      GLSLLocationToolEngine.getUniformLocation(
                        ~pos,
                        sandbox,
                        "u_mMatrix",
                      );
                    let engineState =
                      FakeGlToolEngine.setFakeGl(
                        FakeGlToolEngine.buildFakeGl(
                          ~sandbox,
                          ~uniformMatrix4fv,
                          ~getUniformLocation,
                          (),
                        ),
                        engineState,
                      );

                    let engineState =
                      engineState
                      |> MainUtils._handleEngineState
                      |> DirectorToolEngine.runWithDefaultTime;

                    uniformMatrix4fv
                    |> withOneArg(pos)
                    |> getCallCount
                    |> expect >= 3;
                  })
                )
              );

              describe("test send material data", () => {
                describe("send u_alpha", () =>
                  test("test send 3 planes->u_alpha with 0.3", () => {
                    let engineState = StateEngineService.unsafeGetState();
                    let uniform1f = createEmptyStubWithJsObjSandbox(sandbox);
                    let pos = 10;
                    let getUniformLocation =
                      GLSLLocationToolEngine.getUniformLocation(
                        ~pos,
                        sandbox,
                        "u_alpha",
                      );
                    let engineState =
                      FakeGlToolEngine.setFakeGl(
                        FakeGlToolEngine.buildFakeGl(
                          ~sandbox,
                          ~uniform1f,
                          ~getUniformLocation,
                          (),
                        ),
                        engineState,
                      );

                    let engineState =
                      engineState
                      |> MainUtils._handleEngineState
                      |> DirectorToolEngine.runWithDefaultTime;

                    uniform1f
                    |> withTwoArgs(pos, 0.30000001192092896)
                    |> getCallCount
                    |> expect == 1;
                  })
                );

                describe("send u_color", () =>
                  test("test send 3 plane gameObjects->u_color", () => {
                    let engineState = StateEngineService.unsafeGetState();
                    let uniform3f = createEmptyStubWithJsObjSandbox(sandbox);
                    let pos = 10;
                    let getUniformLocation =
                      GLSLLocationToolEngine.getUniformLocation(
                        ~pos,
                        sandbox,
                        "u_color",
                      );
                    let engineState =
                      FakeGlToolEngine.setFakeGl(
                        FakeGlToolEngine.buildFakeGl(
                          ~sandbox,
                          ~uniform3f,
                          ~getUniformLocation,
                          (),
                        ),
                        engineState,
                      );

                    let engineState =
                      engineState
                      |> MainUtils._handleEngineState
                      |> DirectorToolEngine.runWithDefaultTime;

                    uniform3f
                    |> withOneArg(pos)
                    |> getCallCount
                    |> expect >= 3;
                  })
                );
              });
            });
          });

          describe("draw", () =>
            test("draw 3 plane gameObjects", () => {
              let engineState = StateEngineService.unsafeGetState();
              let triangles = 2;
              let drawElements = createEmptyStubWithJsObjSandbox(sandbox);
              let engineState =
                FakeGlToolEngine.setFakeGl(
                  FakeGlToolEngine.buildFakeGl(
                    ~sandbox,
                    ~triangles,
                    ~drawElements,
                    (),
                  ),
                  engineState,
                );

              let engineState =
                engineState
                |> MainUtils._handleEngineState
                |> DirectorToolEngine.runWithDefaultTime;

              let editorState = StateEditorService.getState();
              drawElements
              |> withTwoArgs(
                   triangles,
                   GeometryEngineService.getIndicesCount(
                     _getPlaneGeometry(editorState, engineState),
                     engineState,
                   ),
                 )
              |> getCallCount
              |> expect == 3;
            })
          );

          describe("restore gl state", () => {
            test("enable depth write", () => {
              let engineState = StateEngineService.unsafeGetState();
              let depthMask = createEmptyStubWithJsObjSandbox(sandbox);
              let engineState =
                engineState
                |> FakeGlToolEngine.setFakeGl(
                     FakeGlToolEngine.buildFakeGl(~sandbox, ~depthMask, ()),
                   );

              let engineState =
                engineState
                |> MainUtils._handleEngineState
                |> DirectorToolEngine.runWithDefaultTime;

              depthMask |> getCall(1) |> expect |> toCalledWith([|true|]);
            });
            test("enable depth test", () => {
              let engineState = StateEngineService.unsafeGetState();
              let enable = createEmptyStubWithJsObjSandbox(sandbox);
              let getDepthTest = 1;
              let engineState =
                engineState
                |> FakeGlToolEngine.setFakeGl(
                     FakeGlToolEngine.buildFakeGl(
                       ~sandbox,
                       ~enable,
                       ~getDepthTest,
                       (),
                     ),
                   );

              let engineState =
                engineState
                |> MainUtils._handleEngineState
                |> DirectorToolEngine.runWithDefaultTime;

              enable
              |> getCall(2)
              |> expect
              |> toCalledWith([|getDepthTest|]);
            });
            test("set side to front", () => {
              let engineState = StateEngineService.unsafeGetState();
              let enable = createEmptyStubWithJsObjSandbox(sandbox);
              let cullFace = createEmptyStubWithJsObjSandbox(sandbox);
              let getCullFace = 1;
              let back = 2;
              let engineState =
                engineState
                |> FakeGlToolEngine.setFakeGl(
                     FakeGlToolEngine.buildFakeGl(
                       ~sandbox,
                       ~enable,
                       ~cullFace,
                       ~getCullFace,
                       ~back,
                       (),
                     ),
                   );

              let engineState =
                engineState
                |> MainUtils._handleEngineState
                |> DirectorToolEngine.runWithDefaultTime;

              (
                enable |> getCall(3) |> SinonTool.calledWith(_, getCullFace),
                cullFace |> getCall(0) |> SinonTool.calledWith(_, back),
              )
              |> expect == (true, true);
            });
            test("disable blend", () => {
              let engineState = StateEngineService.unsafeGetState();
              let disable = createEmptyStubWithJsObjSandbox(sandbox);
              let getBlend = 10;
              let engineState =
                engineState
                |> FakeGlToolEngine.setFakeGl(
                     FakeGlToolEngine.buildFakeGl(
                       ~sandbox,
                       ~disable,
                       ~getBlend,
                       (),
                     ),
                   );

              let engineState =
                engineState
                |> MainUtils._handleEngineState
                |> DirectorToolEngine.runWithDefaultTime;

              disable |> getCall(3) |> expect |> toCalledWith([|getBlend|]);
            });
          });
        });
      });

      describe("render rotation gizmos", () =>
        describe("render circle gizmos", () => {
          let _getCircleGeometry = (editorState, engineState) =>
            GameObjectComponentEngineService.unsafeGetGeometryComponent(
              OperateRotationGizmoSceneViewEditorService.unsafeGetRotationXYCircleGizmo(
                editorState,
              ),
              engineState,
            );

          let _handleEngineState = engineState => {
            let engineState = engineState |> MainUtils._handleEngineState;

            CurrentTransformGizmoSceneViewEditorService.markRotation
            |> StateLogicService.getAndSetEditorState;

            engineState;
          };

          describe("prepare gl state", () => {
            test("disable depth test", () => {
              let engineState = StateEngineService.unsafeGetState();
              let disable = createEmptyStubWithJsObjSandbox(sandbox);
              let getDepthTest = 1;
              let engineState =
                engineState
                |> FakeGlToolEngine.setFakeGl(
                     FakeGlToolEngine.buildFakeGl(
                       ~sandbox,
                       ~disable,
                       ~getDepthTest,
                       (),
                     ),
                   );

              let engineState =
                engineState
                |> _handleEngineState
                |> DirectorToolEngine.runWithDefaultTime;

              disable
              |> getCall(0)
              |> expect
              |> toCalledWith([|getDepthTest|]);
            });

            describe("open blend", () => {
              test("enable blend", () => {
                let engineState = StateEngineService.unsafeGetState();
                let enable = createEmptyStubWithJsObjSandbox(sandbox);
                let getBlend = 1;
                let engineState =
                  engineState
                  |> FakeGlToolEngine.setFakeGl(
                       FakeGlToolEngine.buildFakeGl(
                         ~sandbox,
                         ~enable,
                         ~getBlend,
                         (),
                       ),
                     );

                let engineState =
                  engineState
                  |> _handleEngineState
                  |> DirectorToolEngine.runWithDefaultTime;

                enable |> getCall(0) |> expect |> toCalledWith([|getBlend|]);
              });
              test("set blend func", () => {
                let engineState = StateEngineService.unsafeGetState();
                let blendFunc = createEmptyStubWithJsObjSandbox(sandbox);
                let getSrcAlpha = 1;
                let getOneMinusSrcAlpha = 2;
                let engineState =
                  engineState
                  |> FakeGlToolEngine.setFakeGl(
                       FakeGlToolEngine.buildFakeGl(
                         ~sandbox,
                         ~blendFunc,
                         ~getSrcAlpha,
                         ~getOneMinusSrcAlpha,
                         (),
                       ),
                     );

                let engineState =
                  engineState
                  |> _handleEngineState
                  |> DirectorToolEngine.runWithDefaultTime;

                blendFunc
                |> getCall(0)
                |> expect
                |> toCalledWith([|getSrcAlpha, getOneMinusSrcAlpha|]);
              });
            });
          });

          test("use no material shader->rotation_gizmo_for_editor", () => {
            let engineState = StateEngineService.unsafeGetState();
            let createProgram = createEmptyStubWithJsObjSandbox(sandbox);
            let program1 = Obj.magic(1);
            let program2 = Obj.magic(2);
            let program3 = Obj.magic(3);
            createProgram |> onCall(0) |> returns(program1);
            createProgram |> onCall(1) |> returns(program2);
            createProgram |> onCall(2) |> returns(program3);
            let useProgram = createEmptyStubWithJsObjSandbox(sandbox);
            let engineState =
              engineState
              |> FakeGlToolEngine.setFakeGl(
                   FakeGlToolEngine.buildFakeGl(
                     ~sandbox,
                     ~useProgram,
                     ~createProgram,
                     (),
                   ),
                 );

            let engineState =
              engineState
              |> _handleEngineState
              |> DirectorToolEngine.runWithDefaultTime;

            let shaderIndex =
              NoMaterialShaderEngineService.unsafeGetNoMaterialShader(
                "rotation_gizmo_for_editor",
                engineState,
              );
            (
              useProgram |> getCallCount,
              useProgram
              |> SinonTool.calledWith(
                   _,
                   ProgramToolEngine.getProgram(shaderIndex, engineState)
                   |> WonderLog.Log.print,
                 ),
              ProgramToolEngine.getProgram(shaderIndex, engineState),
            )
            |> expect == (1, true, program1);
          });

          describe("send gl data", () =>
            describe("send uniform data", () =>
              describe("test send no material shader data", () => {
                let _prepareCamera = () => {
                  let engineState = StateEngineService.unsafeGetState();

                  let currentCameraTransform =
                    MainEditorCameraTool.getCurrentCameraGameObject(
                      engineState,
                    )
                    |> OptionService.unsafeGet
                    |> GameObjectComponentEngineService.unsafeGetTransformComponent(
                         _,
                         engineState,
                       );
                  let engineState =
                    engineState
                    |> TransformEngineService.setLocalPosition(
                         (0., 2., 3.),
                         currentCameraTransform,
                       )
                    |> TransformEngineService.lookAt(
                         currentCameraTransform,
                         (0., 0., 0.),
                       );

                  engineState |> StateEngineService.setState |> ignore;
                };

                describe("send u_alpha", () => {
                  let _test = (alpha, count) => {
                    let engineState = StateEngineService.unsafeGetState();
                    let uniform1f = createEmptyStubWithJsObjSandbox(sandbox);
                    let pos = 10;
                    let getUniformLocation =
                      GLSLLocationToolEngine.getUniformLocation(
                        ~pos,
                        sandbox,
                        "u_alpha",
                      );
                    let engineState =
                      FakeGlToolEngine.setFakeGl(
                        FakeGlToolEngine.buildFakeGl(
                          ~sandbox,
                          ~uniform1f,
                          ~getUniformLocation,
                          (),
                        ),
                        engineState,
                      );

                    let engineState =
                      engineState
                      |> _handleEngineState
                      |> DirectorToolEngine.runWithDefaultTime;

                    uniform1f
                    |> withTwoArgs(pos, alpha)
                    |> getCallCount
                    |> expect == count;
                  };

                  beforeEach(() => _prepareCamera());

                  test("if circle gizmo is unused, send small value", () =>
                    _test(0.1, 1)
                  );
                  test("else, send 1.0", () =>
                    _test(1.0, 1)
                  );
                });

                describe("send u_color", () =>
                  test("test send each circle gameObject->u_color", () => {
                    let engineState = StateEngineService.unsafeGetState();
                    let uniform3f = createEmptyStubWithJsObjSandbox(sandbox);
                    let pos = 10;
                    let getUniformLocation =
                      GLSLLocationToolEngine.getUniformLocation(
                        ~pos,
                        sandbox,
                        "u_color",
                      );
                    let engineState =
                      FakeGlToolEngine.setFakeGl(
                        FakeGlToolEngine.buildFakeGl(
                          ~sandbox,
                          ~uniform3f,
                          ~getUniformLocation,
                          (),
                        ),
                        engineState,
                      );

                    let engineState =
                      engineState
                      |> _handleEngineState
                      |> DirectorToolEngine.runWithDefaultTime;

                    uniform3f
                    |> withOneArg(pos)
                    |> getCallCount
                    |> expect == 3;
                  })
                );

                describe("send u_cameraPosInLocalCoordSystem", () =>
                  test(
                    "send send each circle gameObject->camera pos in local coord system",
                    () => {
                    _prepareCamera();
                    let engineState = StateEngineService.unsafeGetState();
                    let uniform3f = createEmptyStubWithJsObjSandbox(sandbox);
                    let pos = 10;
                    let getUniformLocation =
                      GLSLLocationToolEngine.getUniformLocation(
                        ~pos,
                        sandbox,
                        "u_cameraPosInLocalCoordSystem",
                      );
                    let engineState =
                      FakeGlToolEngine.setFakeGl(
                        FakeGlToolEngine.buildFakeGl(
                          ~sandbox,
                          ~uniform3f,
                          ~getUniformLocation,
                          (),
                        ),
                        engineState,
                      );

                    let engineState =
                      engineState
                      |> _handleEngineState
                      |> DirectorToolEngine.runWithDefaultTime;

                    let (x, y, z) =
                      CameraPosUtils.getCameraPos(
                        StateEditorService.getState(),
                        engineState,
                      );
                    (
                      uniform3f |> withFourArgs(pos, x, y, z) |> getCallCount,
                      uniform3f
                      |> withFourArgs(
                           pos,
                           0.,
                           3.0000004260849593,
                           -2.000000135732943,
                         )
                      |> getCallCount,
                      uniform3f
                      |> withFourArgs(
                           pos,
                           -3.0000003576278687,
                           2.,
                           1.0268563599424851e-7,
                         )
                      |> getCallCount,
                    )
                    |> expect == (1, 1, 1);
                  })
                );
              })
            )
          );

          describe("draw", () =>
            test("draw each circle gameObject with line_strip", () => {
              let engineState = StateEngineService.unsafeGetState();
              let line_strip = 2;
              let drawElements = createEmptyStubWithJsObjSandbox(sandbox);
              let engineState =
                FakeGlToolEngine.setFakeGl(
                  FakeGlToolEngine.buildFakeGl(
                    ~sandbox,
                    ~line_strip,
                    ~drawElements,
                    (),
                  ),
                  engineState,
                );

              let engineState =
                engineState
                |> _handleEngineState
                |> DirectorToolEngine.runWithDefaultTime;

              let editorState = StateEditorService.getState();

              drawElements
              |> withTwoArgs(
                   line_strip,
                   GeometryEngineService.getIndicesCount(
                     _getCircleGeometry(editorState, engineState),
                     engineState,
                   ),
                 )
              |> getCallCount
              |> expect == 3;
            })
          );

          describe("restore gl state", () => {
            test("enable depth test", () => {
              let engineState = StateEngineService.unsafeGetState();
              let enable = createEmptyStubWithJsObjSandbox(sandbox);
              let getDepthTest = 1;
              let engineState =
                engineState
                |> FakeGlToolEngine.setFakeGl(
                     FakeGlToolEngine.buildFakeGl(
                       ~sandbox,
                       ~enable,
                       ~getDepthTest,
                       (),
                     ),
                   );

              let engineState =
                engineState
                |> _handleEngineState
                |> DirectorToolEngine.runWithDefaultTime;

              enable
              |> getCall(1)
              |> expect
              |> toCalledWith([|getDepthTest|]);
            });
            test("disable blend", () => {
              let engineState = StateEngineService.unsafeGetState();
              let disable = createEmptyStubWithJsObjSandbox(sandbox);
              let getBlend = 10;
              let engineState =
                engineState
                |> FakeGlToolEngine.setFakeGl(
                     FakeGlToolEngine.buildFakeGl(
                       ~sandbox,
                       ~disable,
                       ~getBlend,
                       (),
                     ),
                   );

              let engineState =
                engineState
                |> _handleEngineState
                |> DirectorToolEngine.runWithDefaultTime;

              disable |> getCall(1) |> expect |> toCalledWith([|getBlend|]);
            });
          });
        })
      );
    });
  });