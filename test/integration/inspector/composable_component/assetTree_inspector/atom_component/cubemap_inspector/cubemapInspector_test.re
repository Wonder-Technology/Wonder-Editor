open Wonder_jest;

open Expect;

open Expect.Operators;

open NodeAssetType;

open Sinon;

open Js.Promise;

let _ =
  describe("cubemap inspector", () => {
    let sandbox = getSandboxDefaultVal();

    beforeEach(() => {
      sandbox := createSandbox();
      MainEditorSceneTool.initState(~sandbox, ());
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("prepare currentSelectSource", () => {
      beforeEach(() => {
        MainEditorSceneTool.createDefaultScene(
          sandbox,
          MainEditorAssetTool.initAssetTree,
        );
        CurrentSelectSourceEditorService.setCurrentSelectSource(
          AssetWidgetService.getWidget(),
        )
        |> StateLogicService.getAndSetEditorState;
      });

      describe("test cubemap inspector->show default value", () =>
        test("test snapshot", () => {
          let assetTreeData =
            MainEditorAssetTreeTool.BuildAssetTree.Cubemap.buildOneCubemapAssetTree();

          MainEditorAssetChildrenNodeTool.selectCubemapNode(
            ~nodeId=
              MainEditorAssetTreeTool.BuildAssetTree.Cubemap.getFirstCubemapNodeId(
                assetTreeData,
              ),
            (),
          );

          BuildComponentTool.buildInspectorComponent(
            TestTool.buildEmptyAppState(),
            InspectorTool.buildFakeAllShowComponentConfig(),
          )
          |> ReactTestTool.createSnapshotAndMatch;
        })
      );

      describe("test cubemap rename", () => {
        describe("test rename to specific name", () =>
          test("test snapshot", () => {
            let assetTreeData =
              MainEditorAssetTreeTool.BuildAssetTree.Cubemap.buildOneCubemapAssetTree();
            let newName = "newCubemapName";

            AssetTreeInspectorTool.Rename.renameAssetCubemapNode(
              ~nodeId=
                MainEditorAssetTreeTool.BuildAssetTree.Cubemap.getFirstCubemapNodeId(
                  assetTreeData,
                ),
              ~name=newName,
              (),
            );

            BuildComponentTool.buildAssetChildrenNode()
            |> ReactTestTool.createSnapshotAndMatch;
          })
        );

        test(
          {|add cubemap;
            rename cubemap;

            cubemap name should be renamed
              |},
          () => {
            let assetTreeData =
              MainEditorAssetTreeTool.BuildAssetTree.Cubemap.buildOneCubemapAssetTree();
            let newName = "newCubemapToEngine";

            let addedCubemapNodeId = MainEditorAssetIdTool.getNewAssetId();
            MainEditorAssetHeaderOperateNodeTool.addCubemap();

            AssetTreeInspectorTool.Rename.renameAssetCubemapNode(
              ~nodeId=addedCubemapNodeId,
              ~name=newName,
              (),
            );

            MainEditorAssetCubemapNodeTool.getCubemapName(
              ~nodeId=addedCubemapNodeId,
              (),
            )
            |> expect == newName;
          },
        );

        test("if rename to the existed name in the same dir, should fail", () => {
          let assetTreeData =
            MainEditorAssetTreeTool.BuildAssetTree.Cubemap.buildOneCubemapAssetTree();

          let cubemap1OldName =
            MainEditorAssetCubemapNodeTool.getCubemapName(
              ~nodeId=
                MainEditorAssetTreeTool.BuildAssetTree.Cubemap.getFirstCubemapNodeId(
                  assetTreeData,
                ),
              (),
            );

          let addedCubemapNodeId = MainEditorAssetIdTool.getNewAssetId();
          MainEditorAssetHeaderOperateNodeTool.addCubemap();

          let cubemap2OldName =
            MainEditorAssetCubemapNodeTool.getCubemapName(
              ~nodeId=addedCubemapNodeId,
              (),
            );

          AssetTreeInspectorTool.Rename.renameAssetCubemapNode(
            ~nodeId=addedCubemapNodeId,
            ~name=cubemap1OldName,
            (),
          );

          MainEditorAssetCubemapNodeTool.getCubemapName(
            ~nodeId=addedCubemapNodeId,
            (),
          )
          |> expect == cubemap2OldName;
        });
      });

      describe("test load and set face source", () => {
        beforeEach(() => {
          MainEditorAssetTool.buildFakeFileReader();
          MainEditorAssetTool.buildFakeImage();

          LoadTool.buildFakeTextDecoder(LoadTool.convertUint8ArrayToBuffer);
          LoadTool.buildFakeURL(sandbox^);

          LoadTool.buildFakeLoadImage(.);
        });

        testPromise("set source name and src", () => {
          let assetTreeData =
            MainEditorAssetTreeTool.BuildAssetTree.Cubemap.buildOneCubemapAssetTree();

          let cubemapTexture =
            MainEditorAssetCubemapNodeTool.getCubemapTextureComponent(
              ~nodeId=
                MainEditorAssetTreeTool.BuildAssetTree.Cubemap.getFirstCubemapNodeId(
                  assetTreeData,
                ),
              (),
            );

          let imgName = "1.png";
          let imgSrc = "newImgBase64222";

          CubemapInspectorTool.loadAndSetFaceSource(
            ~imgName,
            ~imgSrc,
            ~cubemapTexture,
            ~setSourceFunc=CubemapTextureEngineService.setPXSource,
            (),
          )
          |> then_(_ => {
               let source =
                 CubemapTextureEngineService.unsafeGetPXSource(cubemapTexture)
                 |> StateLogicService.getEngineStateToGetData;

               (Obj.magic(source)##name, Obj.magic(source)##src)
               |> expect == (imgName, imgSrc)
               |> resolve;
             });
        });

        describe("set source format", () => {
          let _test = (imgName, targetFormat) => {
            let assetTreeData =
              MainEditorAssetTreeTool.BuildAssetTree.Cubemap.buildOneCubemapAssetTree();

            let cubemapTexture =
              MainEditorAssetCubemapNodeTool.getCubemapTextureComponent(
                ~nodeId=
                  MainEditorAssetTreeTool.BuildAssetTree.Cubemap.getFirstCubemapNodeId(
                    assetTreeData,
                  ),
                (),
              );

            CubemapInspectorTool.loadAndSetFaceSource(
              ~imgName,
              ~cubemapTexture,
              ~setSourceFunc=CubemapTextureEngineService.setPXSource,
              (),
            )
            |> then_(_ =>
                 CubemapTextureEngineService.getPXFormat(cubemapTexture)
                 |> StateLogicService.getEngineStateToGetData
                 |> expect == targetFormat
                 |> resolve
               );
          };

          testPromise("set jpg texture to rgb format", () =>
            _test("1.jpg", Wonderjs.TextureType.Rgb)
          );
          testPromise("set jpeg texture to rgb format", () =>
            _test("1.jpeg", Wonderjs.TextureType.Rgb)
          );
          testPromise("set png texture to rgba format", () =>
            _test("1.png", Wonderjs.TextureType.Rgba)
          );
        });

        describe("test snapshot", () => {
          test("should has no face source defaultly", () => {
            let assetTreeData =
              MainEditorAssetTreeTool.BuildAssetTree.Cubemap.buildOneCubemapAssetTree();

            MainEditorAssetChildrenNodeTool.selectCubemapNode(
              ~nodeId=
                MainEditorAssetTreeTool.BuildAssetTree.Cubemap.getFirstCubemapNodeId(
                  assetTreeData,
                ),
              (),
            );

            BuildComponentTool.buildInspectorComponent(
              TestTool.buildEmptyAppState(),
              InspectorTool.buildFakeAllShowComponentConfig(),
            )
            |> ReactTestTool.createSnapshotAndMatch;
          });
          testPromise("should show face source image after load", () => {
            let assetTreeData =
              MainEditorAssetTreeTool.BuildAssetTree.Cubemap.buildOneCubemapAssetTree();

            let imgSrc = "newImgBase64222";

            CubemapInspectorTool.loadAndSetFaceSource(
              ~imgSrc,
              ~cubemapTexture=
                MainEditorAssetCubemapNodeTool.getCubemapTextureComponent(
                  ~nodeId=
                    MainEditorAssetTreeTool.BuildAssetTree.Cubemap.getFirstCubemapNodeId(
                      assetTreeData,
                    ),
                  (),
                ),
              (),
            )
            |> then_(_ => {
                 MainEditorAssetChildrenNodeTool.selectCubemapNode(
                   ~nodeId=
                     MainEditorAssetTreeTool.BuildAssetTree.Cubemap.getFirstCubemapNodeId(
                       assetTreeData,
                     ),
                   (),
                 );

                 BuildComponentTool.buildInspectorComponent(
                   TestTool.buildEmptyAppState(),
                   InspectorTool.buildFakeAllShowComponentConfig(),
                 )
                 |> ReactTestTool.createSnapshotAndMatch
                 |> resolve;
               });
          });
        });
      });

      describe("test change wrap", () =>
        describe("test set wrapS to Repeat", () => {
          let _prepareAndExec = () => {
            let assetTreeData =
              MainEditorAssetTreeTool.BuildAssetTree.Cubemap.buildOneCubemapAssetTree();
            let wrapRepeatType = CubemapInspectorTool.getWrapRepeatType();
            let nodeId =
              MainEditorAssetTreeTool.BuildAssetTree.Cubemap.getFirstCubemapNodeId(
                assetTreeData,
              );
            let cubemapTexture =
              MainEditorAssetCubemapNodeTool.getCubemapTextureComponent(
                ~nodeId,
                (),
              );

            MainEditorAssetChildrenNodeTool.selectCubemapNode(~nodeId, ());

            CubemapInspectorTool.changeWrapS(
              ~cubemapTexture,
              ~value=wrapRepeatType,
              (),
            );

            (cubemapTexture, wrapRepeatType);
          };

          test("test snapshot", () => {
            let _ = _prepareAndExec();

            BuildComponentTool.buildInspectorComponent(
              TestTool.buildEmptyAppState(),
              InspectorTool.buildFakeAllShowComponentConfig(),
            )
            |> ReactTestTool.createSnapshotAndMatch;
          });
          test("set wrapS", () => {
            let (cubemapTexture, wrapRepeatType) = _prepareAndExec();

            CubemapTextureEngineService.getWrapS(cubemapTexture)
            |> StateLogicService.getEngineStateToGetData
            |> TextureTypeUtils.convertWrapToInt
            |> expect == wrapRepeatType;
          });

          test("mark need update", () => {
            let (cubemapTexture, wrapRepeatType) = _prepareAndExec();

            let engineState = StateEngineService.unsafeGetState();
            CubemapTextureToolEngine.getIsNeedUpdate(
              cubemapTexture,
              engineState,
            )
            |> expect == true;
          });
        })
      );

      describe("test change filter", () =>
        describe("test set MagFilter", () => {
          let _prepareAndExec = () => {
            let assetTreeData =
              MainEditorAssetTreeTool.BuildAssetTree.Cubemap.buildOneCubemapAssetTree();
            let filterNearestType =
              CubemapInspectorTool.getFilterNearestType();
            let nodeId =
              MainEditorAssetTreeTool.BuildAssetTree.Cubemap.getFirstCubemapNodeId(
                assetTreeData,
              );
            let cubemapTexture =
              MainEditorAssetCubemapNodeTool.getCubemapTextureComponent(
                ~nodeId,
                (),
              );

            CubemapInspectorTool.changeMagFilter(
              ~cubemapTexture,
              ~value=filterNearestType,
              (),
            );

            (cubemapTexture, filterNearestType);
          };

          test("set magFilter", () => {
            let (textureComponent, filterNearestType) = _prepareAndExec();

            CubemapTextureEngineService.getMagFilter(textureComponent)
            |> StateLogicService.getEngineStateToGetData
            |> TextureTypeUtils.convertFilterToInt
            |> expect == filterNearestType;
          });
          test("mark need update", () => {
            let (textureComponent, _) = _prepareAndExec();

            let engineState = StateEngineService.unsafeGetState();
            CubemapTextureToolEngine.getIsNeedUpdate(
              textureComponent,
              engineState,
            )
            |> expect == true;
          });
        })
      );
    });
  });