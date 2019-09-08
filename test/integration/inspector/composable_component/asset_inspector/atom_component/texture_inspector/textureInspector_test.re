open Wonder_jest;

open Expect;

open Expect.Operators;

open NodeAssetType;

open Sinon;

open Js.Promise;

let _ =
  describe("texture inspector", () => {
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

      describe("test texture inspector->show default value", () =>
        test("test snapshot", () => {
          let assetTreeData =
            MainEditorAssetTreeTool.BuildAssetTree.Texture.buildOneTextureAssetTree();

          MainEditorAssetChildrenNodeTool.selectTextureNode(
            ~nodeId=
              MainEditorAssetTreeTool.BuildAssetTree.Texture.getFirstTextureNodeId(
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

      describe("test texture rename", () => {
        describe("test rename to specific name", () =>
          test("test snapshot", () => {
            let assetTreeData =
              MainEditorAssetTreeTool.BuildAssetTree.Texture.buildOneTextureAssetTree();
            let newName = "newTextureName";

            AssetInspectorTool.Rename.renameAssetTextureNode(
              ~nodeId=
                MainEditorAssetTreeTool.BuildAssetTree.Texture.getFirstTextureNodeId(
                  assetTreeData,
                ),
              ~name=newName,
              (),
            );

            BuildComponentTool.buildAssetComponent()
            |> ReactTestTool.createSnapshotAndMatch;
          })
        );

        testPromise(
          {|upload texture;
            rename texture;

            texture name should be renamed
              |},
          () => {
            MainEditorAssetTool.buildFakeFileReader();
            MainEditorAssetTool.buildFakeImage();

            let assetTreeData =
              MainEditorAssetTreeTool.BuildAssetTree.Texture.buildOneTextureAssetTree();
            let newName = "newTextureToEngine";

            MainEditorAssetUploadTool.loadOneTexture()
            |> then_(uploadedTextureNodeId => {
                 AssetInspectorTool.Rename.renameAssetTextureNode(
                   ~nodeId=uploadedTextureNodeId,
                   ~name=newName,
                   (),
                 );
                 MainEditorAssetChildrenNodeTool.selectTextureNode(
                   ~nodeId=uploadedTextureNodeId,
                   (),
                 );

                 MainEditorAssetNodeTool.getTextureComponentFromCurrentNodeId()
                 |> BasicSourceTextureEngineService.unsafeGetBasicSourceTextureName
                 |> StateLogicService.getEngineStateToGetData
                 |> expect == newName
                 |> Js.Promise.resolve;
               });
          },
        );

        test("if rename to the existed name in the same dir, should fail", () => {
          let assetTreeData =
            MainEditorAssetTreeTool.BuildAssetTree.Texture.buildTwoTextureAssetTree();

          let newName = "newTextureName";
          let firstTextureNodeId =
            MainEditorAssetTreeTool.BuildAssetTree.Texture.getFirstTextureNodeId(
              assetTreeData,
            );
          let secondTextureNodeId =
            MainEditorAssetTreeTool.BuildAssetTree.Texture.getSecondTextureNodeId(
              assetTreeData,
            );

          AssetInspectorTool.Rename.renameAssetTextureNode(
            ~nodeId=firstTextureNodeId,
            ~name=newName,
            (),
          );
          let texture2OldName =
            MainEditorAssetTextureNodeTool.getTextureName(
              ~nodeId=secondTextureNodeId,
              (),
            );
          AssetInspectorTool.Rename.renameAssetTextureNode(
            ~nodeId=secondTextureNodeId,
            ~name=newName,
            (),
          );

          (
            MainEditorAssetTextureNodeTool.getTextureName(
              ~nodeId=firstTextureNodeId,
              (),
            ),
            MainEditorAssetTextureNodeTool.getTextureName(
              ~nodeId=secondTextureNodeId,
              (),
            ),
          )
          |> expect == (newName, texture2OldName);
        });
      });

      describe("test change texture type", () => {
        beforeEach(() => {
          MainEditorAssetTool.buildFakeFileReader();
          MainEditorAssetTool.buildFakeImage();
        });

        describe("update engine data", () => {
          describe("if old type is IMGUICustomImage", () =>
            describe("if the custom image data has set to engine", () => {
              let _test = judgeFunc =>
                MainEditorAssetUploadTool.loadOneTexture()
                |> then_(uploadedTextureNodeId => {
                     TextureInspectorTool.changeType(
                       ~nodeId=uploadedTextureNodeId,
                       ~type_=NodeAssetType.IMGUICustomImage,
                       (),
                     );

                     let customImageId = "i1";

                     TextureInspectorTool.IMGUICustomImageType.setCustomImageId(
                       ~nodeId=uploadedTextureNodeId,
                       ~customImageId,
                       (),
                     )
                     |> StateLogicService.setState;

                     AssetIMGUITool.addSettedAssetCustomImageData(
                       AssetIMGUITool.buildFakeCustomImageData(
                         ~imageId=customImageId,
                         (),
                       ),
                     )
                     |> StateLogicService.getAndSetEngineState;

                     TextureInspectorTool.changeType(
                       ~nodeId=uploadedTextureNodeId,
                       ~type_=NodeAssetType.BasicSource,
                       (),
                     );

                     judgeFunc(customImageId);
                   });

              testPromise("remove it", () =>
                _test(customImageId =>
                  AssetIMGUIEngineService.hasSettedAssetCustomImageData(
                    customImageId,
                  )
                  |> StateLogicService.getEngineStateToGetData
                  |> expect == false
                  |> resolve
                )
              );
              testPromise("refresh engine data", () =>
                RefreshEngineStateTool.testRefreshEngineStatePromise(
                  sandbox, () =>
                  _test(_ => () |> resolve)
                )
              );
            })
          );

          describe("if old type is BasicSource", () =>
            describe(
              "if the texture has set to engine as imgui font-> bitmap", () => {
              let _test = judgeFunc => {
                let bitmapName = "bitmap.png";

                MainEditorAssetUploadTool.loadOneTexture(
                  ~imgName=bitmapName,
                  (),
                )
                |> then_(uploadedTextureNodeId => {
                     AssetIMGUITool.setSettedAssetBitmapData(
                       ~name=bitmapName |> FileNameService.getBaseName,
                       (),
                     )
                     |> StateEngineService.setState
                     |> ignore;

                     TextureInspectorTool.changeType(
                       ~nodeId=uploadedTextureNodeId,
                       ~type_=NodeAssetType.IMGUICustomImage,
                       (),
                     );

                     judgeFunc(bitmapName);
                   });
              };

              testPromise("remove it", () =>
                _test(bitmapName =>
                  AssetIMGUIEngineService.hasSettedAssetBitmapData(bitmapName)
                  |> StateLogicService.getEngineStateToGetData
                  |> expect == false
                  |> resolve
                )
              );
              testPromise("refresh engine data", () =>
                RefreshEngineStateTool.testRefreshEngineStatePromise(
                  sandbox, () =>
                  _test(_ => () |> resolve)
                )
              );
            })
          );
        });

        describe("update editor data", () => {
          describe("if new type is BasicSource", () => {
            let _test = judgeFunc =>
              MainEditorAssetUploadTool.loadOneTexture()
              |> then_(uploadedTextureNodeId => {
                   TextureInspectorTool.changeType(
                     ~nodeId=uploadedTextureNodeId,
                     ~type_=NodeAssetType.IMGUICustomImage,
                     (),
                   );

                   let textureContentIndex =
                     IMGUICustomImageTypeTextureNodeAssetEditorService.unsafeGetTextureContentIndex(
                       uploadedTextureNodeId,
                     )
                     |> StateLogicService.getEditorState;

                   TextureInspectorTool.changeType(
                     ~nodeId=uploadedTextureNodeId,
                     ~type_=NodeAssetType.BasicSource,
                     (),
                   );

                   judgeFunc(uploadedTextureNodeId, textureContentIndex);
                 });

            testPromise("remove old texture content", () =>
              _test((uploadedTextureNodeId, textureContentIndex) =>
                IMGUICustomImageTextureContentMapTool.hasContent(
                  ~textureContentIndex,
                  (),
                )
                |> expect == false
                |> resolve
              )
            );
            testPromise("update texture node->type_, textureContentIndex", () =>
              _test((uploadedTextureNodeId, textureContentIndex) =>
                (
                  TextureNodeAssetEditorService.getType(uploadedTextureNodeId)
                  |> StateLogicService.getEditorState,
                  TextureAssetTool.getTextureContentIndex(
                    uploadedTextureNodeId,
                  )
                  |> StateLogicService.getEditorState,
                )
                |> expect == (NodeAssetType.BasicSource, None)
                |> resolve
              )
            );
          });

          describe("if new type is IMGUICustomImage", () => {
            let _test = judgeFunc =>
              MainEditorAssetUploadTool.loadOneTexture()
              |> then_(uploadedTextureNodeId => {
                   TextureInspectorTool.changeType(
                     ~nodeId=uploadedTextureNodeId,
                     ~type_=NodeAssetType.BasicSource,
                     (),
                   );

                   let textureContentIndex =
                     IndexAssetEditorService.getIMGUICustomImageTextureContentIndex
                     |> StateLogicService.getEditorState;

                   TextureInspectorTool.changeType(
                     ~nodeId=uploadedTextureNodeId,
                     ~type_=NodeAssetType.IMGUICustomImage,
                     (),
                   );

                   judgeFunc(uploadedTextureNodeId, textureContentIndex);
                 });

            testPromise("update texture node->type_, textureContentIndex", () =>
              _test((uploadedTextureNodeId, textureContentIndex) =>
                (
                  TextureNodeAssetEditorService.getType(uploadedTextureNodeId)
                  |> StateLogicService.getEditorState,
                  TextureAssetTool.getTextureContentIndex(
                    uploadedTextureNodeId,
                  )
                  |> StateLogicService.getEditorState,
                )
                |> expect
                == (
                     NodeAssetType.IMGUICustomImage,
                     Some(textureContentIndex |> succ),
                   )
                |> resolve
              )
            );
            testPromise("add empty texture content", () =>
              _test((uploadedTextureNodeId, textureContentIndex) =>
                IMGUICustomImageTextureContentMapAssetEditorService.unsafeGetContent(
                  IMGUICustomImageTypeTextureNodeAssetEditorService.unsafeGetTextureContentIndex(
                    uploadedTextureNodeId,
                  )
                  |> StateLogicService.getEditorState,
                )
                |> StateLogicService.getEditorState
                |> expect
                == IMGUICustomImageTextureContentMapAssetEditorService.generateEmptyContent()
                |> resolve
              )
            );
          });
        });
      });

      describe("test texture content", () => {
        beforeEach(() => {
          MainEditorAssetTool.buildFakeFileReader();
          MainEditorAssetTool.buildFakeImage();
        });

        describe("test type is IMGUICustomImage", () => {
          testPromise("show default texture content", () =>
            MainEditorAssetUploadTool.loadOneTexture()
            |> then_(uploadedTextureNodeId => {
                 TextureInspectorTool.changeType(
                   ~nodeId=uploadedTextureNodeId,
                   ~type_=NodeAssetType.IMGUICustomImage,
                   (),
                 );

                 let customImageId = "i1";

                 TextureInspectorTool.IMGUICustomImageType.setCustomImageId(
                   ~nodeId=uploadedTextureNodeId,
                   ~customImageId,
                   (),
                 )
                 |> StateLogicService.setState;

                 MainEditorAssetChildrenNodeTool.selectTextureNode(
                   ~nodeId=uploadedTextureNodeId,
                   (),
                 );

                 BuildComponentTool.buildInspectorComponent(
                   TestTool.buildEmptyAppState(),
                   InspectorTool.buildFakeAllShowComponentConfig(),
                 )
                 |> ReactTestTool.createSnapshotAndMatch
                 |> resolve;
               })
          );

          describe("test set custom image id", () => {
            testPromise("if target id already exist, warn", () => {
              let warn =
                createMethodStubWithJsObjSandbox(
                  sandbox,
                  ConsoleTool.console,
                  "warn",
                );

              MainEditorAssetUploadTool.loadOneTexture()
              |> then_(uploadedTextureNodeId => {
                   TextureInspectorTool.changeType(
                     ~nodeId=uploadedTextureNodeId,
                     ~type_=NodeAssetType.IMGUICustomImage,
                     (),
                   );

                   let customImageId = "i1";

                   TextureInspectorTool.IMGUICustomImageType.setCustomImageId(
                     ~nodeId=uploadedTextureNodeId,
                     ~customImageId,
                     (),
                   )
                   |> StateLogicService.setState;

                   TextureInspectorTool.IMGUICustomImageType.setCustomImageId(
                     ~nodeId=uploadedTextureNodeId,
                     ~customImageId,
                     (),
                   )
                   |> StateLogicService.setState;

                   warn |> expect |> toCalledOnce |> resolve;
                 });
            });

            describe("else", () => {
              let _test = judgeFunc =>
                MainEditorAssetUploadTool.loadOneTexture(
                  ~imgSrc=Base64Tool.buildFakeBase64_1(),
                  (),
                )
                |> then_(uploadedTextureNodeId => {
                     TextureInspectorTool.changeType(
                       ~nodeId=uploadedTextureNodeId,
                       ~type_=NodeAssetType.IMGUICustomImage,
                       (),
                     );

                     let customImageId1 = "i1";
                     let customImageId2 = "i2";

                     TextureInspectorTool.IMGUICustomImageType.setCustomImageId(
                       ~nodeId=uploadedTextureNodeId,
                       ~customImageId=customImageId1,
                       (),
                     )
                     |> StateLogicService.setState;

                     AssetIMGUITool.addSettedAssetCustomImageData(
                       AssetIMGUITool.buildFakeCustomImageData(
                         ~imageId=customImageId1,
                         (),
                       ),
                     )
                     |> StateLogicService.getAndSetEngineState;

                     TextureInspectorTool.IMGUICustomImageType.setCustomImageId(
                       ~nodeId=uploadedTextureNodeId,
                       ~customImageId=customImageId2,
                       (),
                     )
                     |> StateLogicService.setState;

                     judgeFunc(
                       uploadedTextureNodeId,
                       (customImageId1, customImageId2),
                     );
                   });

              describe("update engine data", () =>
                describe("if the custom image data has set to engine", () => {
                  testPromise("remove it", () =>
                    _test((_, (oldCustomImageId, newCustomImageId)) =>
                      AssetIMGUIEngineService.hasSettedAssetCustomImageData(
                        oldCustomImageId,
                      )
                      |> StateLogicService.getEngineStateToGetData
                      |> expect == false
                      |> resolve
                    )
                  );
                  testPromise("add the custom image data of the new id", () =>
                    _test((_, (oldCustomImageId, newCustomImageId)) =>
                      AssetIMGUITool.findSettedAssetCustomImageDataById(
                        newCustomImageId,
                      )
                      |> StateLogicService.getEngineStateToGetData
                      |> expect
                      == AssetIMGUITool.buildFakeCustomImageData(
                           ~imageId=newCustomImageId,
                           (),
                         )
                      |> resolve
                    )
                  );
                  testPromise("refresh engine data", () =>
                    RefreshEngineStateTool.testRefreshEngineStatePromise(
                      sandbox, () =>
                      _test((_, _) => () |> resolve)
                    )
                  );
                })
              );

              describe("update editor data", () =>
                testPromise("set id to texture content", () =>
                  _test(
                    (
                      uploadedTextureNodeId,
                      (oldCustomImageId, newCustomImageId),
                    ) =>
                    IMGUICustomImageTextureContentMapAssetEditorService.getId(
                      IMGUICustomImageTypeTextureNodeAssetEditorService.unsafeGetTextureContentIndex(
                        uploadedTextureNodeId,
                      )
                      |> StateLogicService.getEditorState,
                    )
                    |> StateLogicService.getEditorState
                    |> expect == newCustomImageId
                    |> resolve
                  )
                )
              );
            });
          });
        });
      });

      describe("test texture change wrap", () =>
        describe("test set wrapS to Repeat", () => {
          let _prepareAndExec = () => {
            let assetTreeData =
              MainEditorAssetTreeTool.BuildAssetTree.Texture.buildOneTextureAssetTree();
            let wrapRepeatType = TextureInspectorTool.getWrapRepeatType();
            let nodeId =
              MainEditorAssetTreeTool.BuildAssetTree.Texture.getFirstTextureNodeId(
                assetTreeData,
              );

            TextureInspectorTool.changeWrapS(
              ~textureComponent=
                MainEditorAssetNodeTool.getTextureComponentFromNodeId(
                  MainEditorAssetTreeTool.BuildAssetTree.Texture.getFirstTextureNodeId(
                    assetTreeData,
                  ),
                ),
              ~value=wrapRepeatType,
              (),
            );

            (
              MainEditorAssetNodeTool.getTextureComponentFromNodeId(nodeId),
              wrapRepeatType,
            );
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
            let (textureComponent, wrapRepeatType) = _prepareAndExec();

            BasicSourceTextureEngineService.getWrapS(textureComponent)
            |> StateLogicService.getEngineStateToGetData
            |> TextureTypeUtils.convertWrapToInt
            |> expect == wrapRepeatType;
          });
          test("mark need update", () => {
            let (textureComponent, wrapRepeatType) = _prepareAndExec();

            let engineState = StateEngineService.unsafeGetState();
            BasicSourceTextureToolEngine.getIsNeedUpdate(
              textureComponent,
              engineState,
            )
            |> expect == true;
          });
        })
      );

      describe("test texture change filter", () => {
        describe("test set MagFilter", () => {
          let _prepareAndExec = () => {
            let assetTreeData =
              MainEditorAssetTreeTool.BuildAssetTree.Texture.buildOneTextureAssetTree();
            let filterNearestType =
              TextureInspectorTool.getFilterNearestType();
            let nodeId =
              MainEditorAssetTreeTool.BuildAssetTree.Texture.getFirstTextureNodeId(
                assetTreeData,
              );

            TextureInspectorTool.changeMagFilter(
              ~textureComponent=
                MainEditorAssetTextureNodeTool.getTextureComponent(
                  nodeId,
                  StateEditorService.getState(),
                ),
              ~value=filterNearestType,
              (),
            );

            (
              MainEditorAssetNodeTool.getTextureComponentFromNodeId(nodeId),
              filterNearestType,
            );
          };

          test("set magFilter", () => {
            let (textureComponent, filterNearestType) = _prepareAndExec();

            BasicSourceTextureEngineService.getMagFilter(textureComponent)
            |> StateLogicService.getEngineStateToGetData
            |> TextureTypeUtils.convertFilterToInt
            |> expect == filterNearestType;
          });
          test("mark need update", () => {
            let (textureComponent, _) = _prepareAndExec();

            let engineState = StateEngineService.unsafeGetState();
            BasicSourceTextureToolEngine.getIsNeedUpdate(
              textureComponent,
              engineState,
            )
            |> expect == true;
          });
        });

        describe("test set MinFilter to Nearest_mipmap_linear", () => {
          let _prepareAndExec = () => {
            let assetTreeData =
              MainEditorAssetTreeTool.BuildAssetTree.Texture.buildOneTextureAssetTree();
            let filterLinearMipmapLinearType =
              TextureInspectorTool.getFilterLinearMipmapLinearType();

            let nodeId =
              MainEditorAssetTreeTool.BuildAssetTree.Texture.getFirstTextureNodeId(
                assetTreeData,
              );

            TextureInspectorTool.changeMinFilter(
              ~textureComponent=
                MainEditorAssetNodeTool.getTextureComponentFromNodeId(
                  MainEditorAssetTreeTool.BuildAssetTree.Texture.getFirstTextureNodeId(
                    assetTreeData,
                  ),
                ),
              ~value=filterLinearMipmapLinearType,
              (),
            );

            (
              MainEditorAssetNodeTool.getTextureComponentFromNodeId(nodeId),
              filterLinearMipmapLinearType,
            );
          };

          test("test snapshot", () => {
            let _ = _prepareAndExec();

            BuildComponentTool.buildInspectorComponent(
              TestTool.buildEmptyAppState(),
              InspectorTool.buildFakeAllShowComponentConfig(),
            )
            |> ReactTestTool.createSnapshotAndMatch;
          });

          test("set minFilter", () => {
            let (textureComponent, filterNearestType) = _prepareAndExec();

            BasicSourceTextureEngineService.getMinFilter(textureComponent)
            |> StateLogicService.getEngineStateToGetData
            |> TextureTypeUtils.convertFilterToInt
            |> expect == filterNearestType;
          });
          test("mark need update", () => {
            let (textureComponent, _) = _prepareAndExec();

            let engineState = StateEngineService.unsafeGetState();
            BasicSourceTextureToolEngine.getIsNeedUpdate(
              textureComponent,
              engineState,
            )
            |> expect == true;
          });
        });
      });
    });
  });