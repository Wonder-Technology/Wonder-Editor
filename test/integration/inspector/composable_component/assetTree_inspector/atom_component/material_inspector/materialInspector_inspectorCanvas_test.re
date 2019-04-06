open Wonderjs;

open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open Js.Promise;

let _ =
  describe("materialInspector: inspector canvas", () => {
    let sandbox = getSandboxDefaultVal();

    let _prepareState = () => {
      MainEditorSceneTool.initState(~sandbox, ());
      MainEditorSceneTool.initInspectorEngineState(
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
                    {"name": "init_inspector_engine" }
                ]
              }
            ]
             |},
            ~initJobs=
              {|
             [
                {"name": "init_inspector_engine" }
             ]
             |},
            ~loopPipelines=
              {|
             [
                {
                  "name": "default",
                  "jobs": [
                    {
                        "name": "dispose"
                    },
                    {
                        "name": "get_camera_data"
                    },
                    {
                        "name": "create_basic_render_object_buffer"
                    },
                    {
                        "name": "create_light_render_object_buffer"
                    },
                    {
                        "name": "clear_last_send_component"
                    },
                    {
                        "name": "send_uniform_shader_data"
                    },
                    {
                        "name": "render_basic"
                    },
                    {
                        "name": "front_render_light"
                    }
                  ]
                }
              ]
             |},
            (),
          ),
        (),
      );
    };

    beforeEach(() => {
      sandbox := createSandbox();

      _prepareState();

      StateInspectorEngineService.unsafeGetState()
      |> MainUtils._handleInspectorEngineState
      |> StateInspectorEngineService.setState
      |> ignore;
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test create material sphere into container gameObject", () =>
      describe("test create new material into asset", () => {
        describe("test select the new material", () => {
          open MainEditor;
          test(
            "not select asset material, the inspector canvas should be hide",
            () => {
            let (_, _, inspectorParentDom, _) =
              CanvasTool.stubMainCanvasAndInspectorCanvasDom(~sandbox, ());

            MainEditorTool.mainEditorDidUpdate(
              OldNewSelfTool.buildOldAndNewSelf(
                {isInitEngine: false},
                {isInitEngine: true},
              ),
            );

            inspectorParentDom##style##display |> expect == "none";
          });
          test("mount the MaterialInspector should show inspector canvas", () => {
            let (_, _, inspectorParentDom, _) =
              CanvasTool.stubMainCanvasAndInspectorCanvasDom(~sandbox, ());

            let (addedMaterialNodeId, materialComponent) =
              MaterialInspectorCanvasTool.createNewMaterial();

            MainEditorTool.mainEditorDidUpdate(
              OldNewSelfTool.buildOldAndNewSelf(
                {isInitEngine: false},
                {isInitEngine: true},
              ),
            );

            MaterialInspectorTool.didMount(
              MaterialDataAssetType.LightMaterial,
              materialComponent,
            );

            inspectorParentDom##style##display |> expect == "block";
          });
          test(
            "unMount the MaterialInspector should hide inspector canvas", () => {
            let (_, _, inspectorParentDom, _) =
              CanvasTool.stubMainCanvasAndInspectorCanvasDom(~sandbox, ());

            let (addedMaterialNodeId, materialComponent) =
              MaterialInspectorCanvasTool.createNewMaterial();

            MainEditorTool.mainEditorDidUpdate(
              OldNewSelfTool.buildOldAndNewSelf(
                {isInitEngine: false},
                {isInitEngine: true},
              ),
            );

            MaterialInspectorTool.didMount(
              MaterialDataAssetType.LightMaterial,
              materialComponent,
            );
            MaterialInspectorTool.willUnmount();

            inspectorParentDom##style##display |> expect == "none";
          });
        });

        describe("test clone the new material", () => {
          describe("test material is light material", () =>
            describe("cloned material's data should equal to source one", () => {
              test("test cloned-material's color", () =>
                MaterialInspectorCanvasTool.judgeClonedAndSourceLightMaterialAttributeIsEqual(
                  LightMaterialEngineService.getLightMaterialDiffuseColor,
                )
              );
              test("test cloned-material's name", () =>
                MaterialInspectorCanvasTool.judgeClonedAndSourceLightMaterialAttributeIsEqual(
                  LightMaterialEngineService.getLightMaterialName,
                )
              );
              test("test cloned-material's shininess", () =>
                MaterialInspectorCanvasTool.judgeClonedAndSourceLightMaterialAttributeIsEqual(
                  LightMaterialEngineService.getLightMaterialShininess,
                )
              );

              describe("if the light material has texture", () => {
                beforeEach(() => {
                  MainEditorSceneTool.createDefaultSceneAndNotInit(sandbox);
                  MainEditorAssetTool.buildFakeFileReader();
                  MainEditorAssetTool.buildFakeImage();

                  LoadTool.buildFakeTextDecoder(
                    LoadTool.convertUint8ArrayToBuffer,
                  );
                  LoadTool.buildFakeURL(sandbox^);

                  LoadTool.buildFakeLoadImage(.);
                });

                describe("clone the material texture", () =>
                  describe(
                    "cloned texture's data should equal to source texture", () => {
                    testPromise("test cloned-texture's name", () =>
                      MaterialInspectorCanvasTool.judgeClonedAndSourceTextureAttributeIsEqual(
                        BasicSourceTextureEngineService.getBasicSourceTextureName,
                      )
                    );
                    testPromise("test cloned-texture's source", () =>
                      MaterialInspectorCanvasTool.judgeClonedAndSourceTextureAttributeIsEqual(
                        BasicSourceTextureEngineService.unsafeGetSource,
                      )
                    );
                    testPromise("test cloned-texture's wrapS", () =>
                      MaterialInspectorCanvasTool.judgeClonedAndSourceTextureAttributeIsEqual(
                        BasicSourceTextureEngineService.getWrapS,
                      )
                    );
                    testPromise("test cloned-texture's wrapT", () =>
                      MaterialInspectorCanvasTool.judgeClonedAndSourceTextureAttributeIsEqual(
                        BasicSourceTextureEngineService.getWrapT,
                      )
                    );
                    testPromise("test cloned-texture's magFilter", () =>
                      MaterialInspectorCanvasTool.judgeClonedAndSourceTextureAttributeIsEqual(
                        BasicSourceTextureEngineService.getMagFilter,
                      )
                    );
                    testPromise("test cloned-texture's minFilter", () =>
                      MaterialInspectorCanvasTool.judgeClonedAndSourceTextureAttributeIsEqual(
                        BasicSourceTextureEngineService.getMinFilter,
                      )
                    );
                    testPromise("test cloned-texture's format", () =>
                      MaterialInspectorCanvasTool.judgeClonedAndSourceTextureAttributeIsEqual(
                        BasicSourceTextureEngineService.getFormat,
                      )
                    );
                    testPromise("test cloned-texture's type", () =>
                      MaterialInspectorCanvasTool.judgeClonedAndSourceTextureAttributeIsEqual(
                        BasicSourceTextureEngineService.getType,
                      )
                    );
                    testPromise("test cloned-texture's flipY", () =>
                      MaterialInspectorCanvasTool.judgeClonedAndSourceTextureAttributeIsEqual(
                        BasicSourceTextureEngineService.getFlipY,
                      )
                    );
                  })
                );
              });
            })
          );

          describe("test material is basic material", () =>
            describe("cloned material's data should equal to source one", () => {
              test("test cloned-material's color", () =>
                MaterialInspectorCanvasTool.judgeClonedAndSourceBasicMaterialAttributeIsEqual(
                  BasicMaterialEngineService.getColor,
                )
              );

              test("test cloned-material's name", () =>
                MaterialInspectorCanvasTool.judgeClonedAndSourceBasicMaterialAttributeIsEqual(
                  BasicMaterialEngineService.getBasicMaterialName,
                )
              );
            })
          );
        });

        describe("test create material sphere gameObject", () => {
          test(
            "create material sphere gameObject add to container gameObject", () => {
            let inspectorEngineState =
              StateInspectorEngineService.unsafeGetState();
            let editorState = StateEditorService.getState();
            let (addedMaterialNodeId, materialComponent) =
              MaterialInspectorCanvasTool.createNewMaterial();
            let newGameObject =
              GameObjectTool.getNewGameObject(
                ~engineState=inspectorEngineState,
                (),
              );

            MaterialInspectorEngineUtils.createMaterialSphereIntoInspectorCanvas(
              MaterialDataAssetType.LightMaterial,
              materialComponent,
            );

            let containerGameObjectFirstChild =
              (editorState, inspectorEngineState)
              |> InspectorEngineTool.getMaterialSphere
              |> OptionService.unsafeGet;

            containerGameObjectFirstChild |> expect == newGameObject;
          });
          describe("test render material sphere", () =>
            test("test draw once", () => {
              let gl = FakeGlToolEngine.getInspectorEngineStateGl();
              let drawElements = gl##drawElements;

              let (addedMaterialNodeId, materialComponent) =
                MaterialInspectorCanvasTool.createNewMaterial();

              MaterialInspectorEngineUtils.createMaterialSphereIntoInspectorCanvas(
                MaterialDataAssetType.LightMaterial,
                materialComponent,
              );

              drawElements |> expect |> toCalledOnce;
            })
          );
        });
      })
    );

    describe("test dispose container gameObject all child", () =>
      test("the container gameObject children array should be empty", () => {
        let inspectorEngineState =
          StateInspectorEngineService.unsafeGetState();
        let editorState = StateEditorService.getState();

        let (addedMaterialNodeId, materialComponent) =
          MaterialInspectorCanvasTool.createNewMaterial();

        MaterialInspectorEngineUtils.createMaterialSphereIntoInspectorCanvas(
          MaterialDataAssetType.LightMaterial,
          materialComponent,
        );

        (editorState, inspectorEngineState)
        |> InspectorEngineTool.disposeInspectorEngineContainerGameObjectAllChild;

        let containerGameObject =
          ContainerGameObjectInspectorCanvasEditorService.unsafeGetContainerGameObject(
            editorState,
          );

        inspectorEngineState
        |> HierarchyGameObjectEngineService.getChildren(containerGameObject)
        |> Js.Array.length
        |> expect == 0;
      })
    );
  });