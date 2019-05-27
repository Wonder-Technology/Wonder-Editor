open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open Js.Promise;

let _ =
  describe("materialInspector: inspector canvas", () => {
    let sandbox = getSandboxDefaultVal();

    let _willUnmount = currentNodeId =>
      MaterialInspector.Method.willUnmount(
        currentNodeId,
        TestTool.getDispatch(),
      );

    let _prepareState = () => {
      MainEditorSceneTool.initState(~sandbox, ());

      InspectorCanvasTool.prepareInspectorEngineState(sandbox);
    };

    beforeEach(() => {
      sandbox := createSandbox();

      _prepareState();

    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("operate inspector engine state", () => {
      describe("test inspector canvas visibility", () => {
        open MainEditor;

        afterEach(() => CanvasTool.restoreMainCanvasAndInspectorCanvasDom());

        describe("didUpdate MainEditor", () => {
          test("should hide the inspector canvas", () => {
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

          describe("mount the MaterialInspector", () => {
            test("should show inspector canvas", () => {
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
              "unMount the MaterialInspector, should hide inspector canvas", () => {
              let (
                imgCanvasFakeBase64Str,
                (
                  mainParentDom,
                  mainCanvasDom,
                  inspectorParentDom,
                  inspectorCanvasDom,
                  imgCanvasDom,
                ),
              ) =
                InspectorCanvasTool.prepareInspectorAndImgCanvasAndReturnAllData(
                  ~sandbox,
                  (),
                );

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
              _willUnmount(addedMaterialNodeId);

              inspectorParentDom##style##display |> expect == "none";
            });
          });
        });
      });

      describe("test create material sphere gameObject in didMount", () =>
        describe("test create", () => {
          beforeEach(() =>
            CanvasTool.stubMainCanvasAndInspectorCanvasDom(~sandbox, ())
            |> ignore
          );
          afterEach(() => CanvasTool.restoreMainCanvasAndInspectorCanvasDom());

          test(
            "create material sphere gameObject into container gameObject", () => {
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

            MaterialInspector.Method.didMount(
              MaterialDataAssetType.LightMaterial,
              materialComponent,
            );

            let containerGameObjectFirstChild =
              (editorState, inspectorEngineState)
              |> InspectorEngineTool.getMaterialSphere
              |> OptionService.unsafeGet;

            containerGameObjectFirstChild |> expect == newGameObject;
          });

          describe(
            {|
              clone the selected material asset to be material component m2(from engine state to inspector engine state);
              add m2 to material sphere gameObject;
          |},
            () => {
              describe(
                "test the selected material asset is light material", () =>
                describe(
                  "cloned material's data should equal to source one", () => {
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
                      MainEditorSceneTool.createDefaultSceneAndNotInit(
                        sandbox,
                      );
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
                        "cloned texture's data should equal to source texture",
                        () => {
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

              describe(
                "test the selected material asset is basic material", () =>
                describe(
                  "cloned material's data should equal to source one", () => {
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
            },
          );
        })
      );

      describe("test render material sphere gameObject", () => {
        beforeEach(() =>
          CanvasTool.stubMainCanvasAndInspectorCanvasDom(~sandbox, ())
          |> ignore
        );
        afterEach(() => CanvasTool.restoreMainCanvasAndInspectorCanvasDom());

        test("test draw once", () => {
          let gl = FakeGlToolEngine.getInspectorEngineStateGl();
          let drawElements = gl##drawElements;

          let (addedMaterialNodeId, materialComponent) =
            MaterialInspectorCanvasTool.createNewMaterial();

          MaterialInspector.Method.didMount(
            MaterialDataAssetType.LightMaterial,
            materialComponent,
          );

          drawElements |> expect |> toCalledOnce;
        });
      });

      describe("test willUnmount", () => {
        test(
          "if material is removed, not create material sphere's snapshot", () => {
          NoWorkerJobTool.initStateWithDisposeJob(~sandbox, ());
          MainEditorSceneTool.prepareScene(sandbox);
          let _ =
            InspectorCanvasTool.prepareInspectorAndImgCanvasAndReturnAllData(
              ~sandbox,
              (),
            );
          let (addedMaterialNodeId, materialComponent) =
            MaterialInspectorCanvasTool.createNewMaterial();

          MainEditorAssetHeaderOperateNodeTool.removeMaterialNode(
            ~materialNodeId=addedMaterialNodeId,
            (),
          );
          _willUnmount(addedMaterialNodeId);

          let editorState = StateEditorService.getState();
          let imgContext =
            editorState |> ImgContextImgCanvasEditorService.unsafeGetImgContext;
          CanvasType.convertContextToJsObj(imgContext)##clearRect
          |> expect
          |> not_
          |> toCalled;
        });

        describe("else, create material sphere's snapshot", () => {
          let _prepareAndExec =
              (
                ~sandbox,
                ~inspectorCanvasWidth=371,
                ~inspectorCanvasHeight=300,
                (),
              ) => {
            let (imgCanvasFakeBase64Str, (inspectorCanvasDom, imgCanvasDom)) =
              InspectorCanvasTool.prepareInspectorAndImgCanvas(
                ~sandbox,
                ~inspectorCanvasWidth,
                ~inspectorCanvasHeight,
                (),
              );
            let (addedMaterialNodeId, materialComponent) =
              MaterialInspectorCanvasTool.createNewMaterial();

            MaterialInspector.Method.didMount(
              MaterialDataAssetType.LightMaterial,
              materialComponent,
            );

            _willUnmount(addedMaterialNodeId);

            (
              addedMaterialNodeId,
              imgCanvasFakeBase64Str,
              (inspectorCanvasDom, imgCanvasDom),
            );
          };

          /* beforeEach(() =>
               InspectorCanvasTool.prepareInspectorAndImgCanvas(~sandbox, ())
               |> ignore
             );
             afterEach(() => CanvasTool.restoreMainCanvasAndInspectorCanvasDom()); */

          test("clear img canvas", () => {
            let _ = _prepareAndExec(~sandbox, ());

            let editorState = StateEditorService.getState();
            let imgContext =
              editorState
              |> ImgContextImgCanvasEditorService.unsafeGetImgContext;

            CanvasType.convertContextToJsObj(imgContext)##clearRect
            |> expect
            |> toCalledWith([|0., 0., 50., 50.|]);
          });

          describe("clip the inspector-canvas snapshot", () =>
            test(
              "img-canvas's drawImage calledWith inspector-canvas's clip area and img-canvas snapshot area",
              () => {
                let (
                  _,
                  imgCanvasFakeBase64Str,
                  (inspectorCanvasDom, imgCanvasDom),
                ) =
                  _prepareAndExec(
                    ~sandbox,
                    ~inspectorCanvasWidth=371,
                    ~inspectorCanvasHeight=300,
                    (),
                  );

                let editorState = StateEditorService.getState();
                let imgContext =
                  editorState
                  |> ImgContextImgCanvasEditorService.unsafeGetImgContext;

                CanvasType.convertContextToJsObj(imgContext)##drawImage
                |> expect
                |> toCalledWith([|
                     inspectorCanvasDom |> Obj.magic,
                     85.5,
                     50.,
                     200.,
                     200.,
                     0.,
                     0.,
                     50.,
                     50.,
                   |]);
              },
            )
          );

          describe("store snapshot in imageDataMap", () =>
            test(
              "should store img canvas snapshot in imageDataMap's base64", () => {
              let (
                addedMaterialNodeId,
                imgCanvasFakeBase64Str,
                (inspectorCanvasDom, imgCanvasDom),
              ) =
                _prepareAndExec(~sandbox, ());

              let editorState = StateEditorService.getState();
              let {imageDataIndex}: NodeAssetType.materialNodeData =
                editorState
                |> OperateTreeAssetEditorService.unsafeFindNodeById(
                     addedMaterialNodeId,
                   )
                |> MaterialNodeAssetService.getNodeData;

              editorState
              |> ImageDataMapAssetEditorService.unsafeGetData(imageDataIndex)
              |> (
                ({base64}) =>
                  base64
                  |> OptionService.unsafeGet
                  |> expect == imgCanvasFakeBase64Str
              );
            })
          );

          test("dispatch Project", () => {
            let dispatchFuncStub = ReactTool.createDispatchFuncStub(sandbox);
            let (
              addedMaterialNodeId,
              imgCanvasFakeBase64Str,
              (inspectorCanvasDom, imgCanvasDom),
            ) =
              _prepareAndExec(~sandbox, ());

            dispatchFuncStub
            |> expect
            |> toCalledWith([|
                 AppStore.UpdateAction(Update([|UpdateStore.Project|])),
               |]);
          });
        });

        describe("dispose container->material sphere gameObject", () => {
          beforeEach(() =>
            InspectorCanvasTool.prepareInspectorAndImgCanvas(~sandbox, ())
            |> ignore
          );
          afterEach(() => CanvasTool.restoreMainCanvasAndInspectorCanvasDom());

          test("the container gameObject children array should be empty", () => {
            let (addedMaterialNodeId, materialComponent) =
              MaterialInspectorCanvasTool.createNewMaterial();

            MaterialInspector.Method.didMount(
              MaterialDataAssetType.LightMaterial,
              materialComponent,
            );

            _willUnmount(addedMaterialNodeId);

            let inspectorEngineState =
              StateInspectorEngineService.unsafeGetState();
            let editorState = StateEditorService.getState();
            let containerGameObject =
              ContainerGameObjectInspectorCanvasEditorService.unsafeGetContainerGameObject(
                editorState,
              );

            inspectorEngineState
            |> HierarchyGameObjectEngineService.getChildren(
                 containerGameObject,
               )
            |> Js.Array.length
            |> expect == 0;
          });

          test("the materialSphere->material component should be disposed", () => {
            let (addedMaterialNodeId, materialComponent) =
              MaterialInspectorCanvasTool.createNewMaterial();

            MaterialInspector.Method.didMount(
              MaterialDataAssetType.LightMaterial,
              materialComponent,
            );

            let inspectorEngineState =
              StateInspectorEngineService.unsafeGetState();
            let editorState = StateEditorService.getState();

            let materialSphereLightMaterial =
              InspectorEngineTool.getMaterialSphereLightMaterial(
                editorState,
                inspectorEngineState,
              );

            _willUnmount(addedMaterialNodeId);

            StateInspectorEngineService.unsafeGetState()
            |> LightMaterialToolEngine.isAlive(materialSphereLightMaterial)
            |> expect == false;
          });
          test("the materialSphere->geometry component should be disposed", () => {
            let (addedMaterialNodeId, materialComponent) =
              MaterialInspectorCanvasTool.createNewMaterial();

            MaterialInspector.Method.didMount(
              MaterialDataAssetType.LightMaterial,
              materialComponent,
            );

            let inspectorEngineState =
              StateInspectorEngineService.unsafeGetState();
            let editorState = StateEditorService.getState();

            let materialSphereGeometryComponent =
              (editorState, inspectorEngineState)
              |> InspectorEngineTool.getMaterialSphere
              |> OptionService.unsafeGet
              |> GameObjectComponentEngineService.unsafeGetGeometryComponent(
                   _,
                   inspectorEngineState,
                 );

            _willUnmount(addedMaterialNodeId);

            StateInspectorEngineService.unsafeGetState()
            |> GeometryToolEngine.isGeometryDisposed(
                 materialSphereGeometryComponent,
               )
            |> expect == true;
          });
        });
      });
    });
  });