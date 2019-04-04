open Wonderjs;

open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open Js.Promise;

let _ =
  describe("materialInspector: insepctor canvas", () => {
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

    describe("test create new material into asset", () =>
      describe("test creat material sphere", () => {
        describe("test material is light material", () =>
          describe("clone the new material", () =>
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
          )
        );

        describe("test material is basic material", () =>
          describe("clone the new material", () =>
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
          )
        );
      })
    );

    describe("test create material sphere gameObject", () =>
      test("create material sphere gameObject add to parent gameObject", () => {
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

        MaterialInspectorTool.createMaterialSphereInToInspectorCanvas(
          MaterialDataAssetType.LightMaterial,
          materialComponent,
        );

        let materialSphere =
          (editorState, inspectorEngineState)
          |> InspectorEngineGameObjectLogicService.getMaterialSphere
          |> OptionService.unsafeGet;

        materialSphere |> expect == newGameObject;
      })
    );
  });