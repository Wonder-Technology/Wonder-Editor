open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open Js.Promise;

let _ =
  describe("inspector canvas->clone material", () => {
    let sandbox = getSandboxDefaultVal();

    beforeEach(() => {
      sandbox := createSandbox();

      MainEditorSceneTool.initState(~sandbox, ());

      InspectorCanvasTool.prepareInspectorEngineState(sandbox);

      MainEditorSceneTool.prepareScene(sandbox);
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("clone texture and add to material", () => {
      let _cloneLightMaterialToOtherEngineState = clonedMaterialComponent => {
        let (lightMaterial, editorState, targetEngineState) =
          CloneMaterialEngineLogicService.cloneLightMaterialToOtherEngineState(
            clonedMaterialComponent,
            StateEditorService.getState(),
            StateEngineService.unsafeGetState(),
            StateInspectorEngineService.unsafeGetState(),
          );

        editorState |> StateEditorService.setState |> ignore;
        targetEngineState |> StateInspectorEngineService.setState |> ignore;

        lightMaterial;
      };

      beforeEach(() => {
        MainEditorAssetTool.buildFakeImage();
        MainEditorAssetTool.buildFakeFileReader();

        let _ =
          InspectorCanvasTool.prepareInspectorAndImgCanvas(~sandbox, ());
        ();
      });

      describe("remove texture asset should remove texture cache", () =>
        testPromise(
          {|
              load texture t1;
              add material m1;
              drag t1 to set m1->map;
              clone m1 to be tm1;
              remove t1;
              load texture t2;
              drag t2 to set m1->map;
              clone m1 to be tm2;

              tm2->map should be t2->cloned texture;
            |},
          () => {
            let (addedMaterialNodeId, materialComponent) =
              MaterialInspectorCanvasTool.createNewMaterial();

            MainEditorAssetUploadTool.loadOneTexture(~imgName="i1.png", ())
            |> then_(uploadedTextureNodeId1 => {
                 MainEditorLightMaterialForAssetTool.dragAssetTextureToMap(
                   ~currentNodeId=addedMaterialNodeId,
                   ~textureNodeId=uploadedTextureNodeId1,
                   ~material=materialComponent,
                   (),
                 );

                 let _targetMaterialComponent1 =
                   _cloneLightMaterialToOtherEngineState(materialComponent);

                 MainEditorAssetHeaderOperateNodeTool.removeTextureNode(
                   ~textureNodeId=uploadedTextureNodeId1,
                   (),
                 );

                 MainEditorAssetUploadTool.loadOneTexture(
                   ~imgName="i2.png",
                   (),
                 )
                 |> then_(uploadedTextureNodeId2 => {
                      MainEditorLightMaterialForAssetTool.dragAssetTextureToMap(
                        ~currentNodeId=addedMaterialNodeId,
                        ~textureNodeId=uploadedTextureNodeId2,
                        ~material=materialComponent,
                        (),
                      );

                      let targetMaterialComponent2 =
                        _cloneLightMaterialToOtherEngineState(
                          materialComponent,
                        );

                      let inspectorEngineState =
                        StateInspectorEngineService.unsafeGetState();
                      BasicSourceTextureEngineService.unsafeGetBasicSourceTextureName(
                        LightMaterialEngineService.unsafeGetLightMaterialDiffuseMap(
                          targetMaterialComponent2,
                          inspectorEngineState,
                        ),
                        inspectorEngineState,
                      )
                      |> expect == "i2"
                      |> resolve;
                    });
               });
          },
        )
      );

      describe(
        "change texture asset->wrap/filter should remove texture cache", () =>
        testPromise(
          {|
              load texture t1;
              add material m1;
              drag t1 to set m1->map;
              clone m1 to be tm1;
              change t1->wrapS to s1;
              clone m1 to be tm2;

              tm2->map->wrapS should === s1;
            |},
          () => {
            let (addedMaterialNodeId, materialComponent) =
              MaterialInspectorCanvasTool.createNewMaterial();

            MainEditorAssetUploadTool.loadOneTexture(~imgName="i1.png", ())
            |> then_(uploadedTextureNodeId1 => {
                 MainEditorLightMaterialForAssetTool.dragAssetTextureToMap(
                   ~currentNodeId=addedMaterialNodeId,
                   ~textureNodeId=uploadedTextureNodeId1,
                   ~material=materialComponent,
                   (),
                 );

                 let _targetMaterialComponent1 =
                   _cloneLightMaterialToOtherEngineState(materialComponent);

                 TextureInspectorTool.changeWrapS(
                   ~textureComponent=
                     MainEditorAssetTextureNodeTool.getTextureComponent(
                       uploadedTextureNodeId1,
                     )
                     |> StateLogicService.getEditorState,
                   ~value=2,
                   (),
                 );

                 let targetMaterialComponent2 =
                   _cloneLightMaterialToOtherEngineState(materialComponent);

                 let inspectorEngineState =
                   StateInspectorEngineService.unsafeGetState();
                 BasicSourceTextureEngineService.getWrapS(
                   LightMaterialEngineService.unsafeGetLightMaterialDiffuseMap(
                     targetMaterialComponent2,
                     inspectorEngineState,
                   ),
                   inspectorEngineState,
                 )
                 |> expect == Wonderjs.SourceTextureType.Repeat
                 |> resolve;
               });
          },
        )
      );

      describe("import package should clear texture cache", () =>
        testPromise(
          {|
            import package;

            texture cache should be empty;
            |},
          () => {
            ImportPackageTool.prepareLoad(sandbox);

            InspectorCanvasTool.TextureCache.setFakeCaches();

            ImportPackageTool.testImportPackage(
              ~testFunc=
                () =>
                  InspectorCanvasTool.TextureCache.isCacheMapEmpty
                  |> StateLogicService.getEditorState
                  |> expect == true
                  |> resolve,
              (),
            );
          },
        )
      );

      describe("test init script api", () => {
        beforeEach(() =>
          MainEditorSceneTool.createDefaultScene(
            sandbox,
            MainEditorSceneTool.setFirstCubeToBeCurrentSceneTreeNode,
          )
        );

        describe("disposeGameObject", () =>
          testPromise("should remove texture cache", () => {
            let disposeGameObjectFunc =
              InitScriptJobTool.createRewritedScriptAPIJsObj()##disposeGameObject;

            let gameObject = GameObjectTool.unsafeGetCurrentSceneTreeNode();

            let (addedMaterialNodeId, materialComponent) =
              MaterialInspectorCanvasTool.createNewMaterial();

            MainEditorMaterialTool.changeMaterial(
              ~sourceMaterial=GameObjectTool.getCurrentSceneTreeNodeMaterial(),
              ~sourceMaterialType=MaterialDataAssetType.LightMaterial,
              ~targetMaterial=materialComponent,
              ~targetMaterialType=MaterialDataAssetType.LightMaterial,
              ~materialNodeId=Some(addedMaterialNodeId),
              ~gameObject,
              (),
            );

            MainEditorAssetUploadTool.loadOneTexture(~imgName="i1.png", ())
            |> then_(uploadedTextureNodeId1 => {
                 MainEditorLightMaterialForAssetTool.dragAssetTextureToMap(
                   ~currentNodeId=addedMaterialNodeId,
                   ~textureNodeId=uploadedTextureNodeId1,
                   ~material=materialComponent,
                   (),
                 );

                 let _targetMaterialComponent1 =
                   _cloneLightMaterialToOtherEngineState(materialComponent);

                 disposeGameObjectFunc(.
                   gameObject,
                   StateEngineService.unsafeGetState(),
                 )
                 |> StateEngineService.setState
                 |> ignore;

                 InspectorCanvasTool.TextureCache.isCacheMapEmpty
                 |> StateLogicService.getEditorState
                 |> expect == true
                 |> resolve;
               });
          })
        );
      });
    });
  });