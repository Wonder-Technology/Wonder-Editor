open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("redo_undo: texture inspector", () => {
    let sandbox = getSandboxDefaultVal();

    beforeEach(() => {
      sandbox := createSandbox();

      MainEditorSceneTool.initState(~sandbox, ());
      MainEditorSceneTool.prepareScene(sandbox);
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test change type", () => {
      let _prepareAndExec = () => {
        let assetTreeData =
          MainEditorAssetTreeTool.BuildAssetTree.Texture.buildOneTextureAssetTree();

        let type_ = NodeAssetType.IMGUICustomImage;
        let nodeId =
          MainEditorAssetTreeTool.BuildAssetTree.Texture.getFirstTextureNodeId(
            assetTreeData,
          );
        let oldValue =
          TextureNodeAssetEditorService.getType(nodeId)
          |> StateLogicService.getEditorState;

        MainEditorAssetChildrenNodeTool.selectTextureNode(~nodeId, ());

        TextureInspectorTool.changeType(~nodeId, ~type_, ());

        (nodeId, oldValue, type_);
      };

      describe("test undo operate", () =>
        test("should undo wrapS", () => {
          let (nodeId, oldValue, newValue) = _prepareAndExec();

          RedoUndoTool.undoHistoryState();

          TextureNodeAssetEditorService.getType(nodeId)
          |> StateLogicService.getEditorState
          |> expect == oldValue;
        })
      );

      describe("test redo operate", () =>
        test("should redo wrapS", () => {
          let (nodeId, oldValue, newValue) = _prepareAndExec();

          RedoUndoTool.undoHistoryState();
          RedoUndoTool.redoHistoryState();

          TextureNodeAssetEditorService.getType(nodeId)
          |> StateLogicService.getEditorState
          |> expect == newValue;
        })
      );
    });

    describe("test texture content", () =>
      describe("test type is IMGUICustomImage", () =>
        describe("test set id", () => {
          let _prepareAndExec = () => {
            let assetTreeData =
              MainEditorAssetTreeTool.BuildAssetTree.Texture.buildOneTextureAssetTree();

            let nodeId =
              MainEditorAssetTreeTool.BuildAssetTree.Texture.getFirstTextureNodeId(
                assetTreeData,
              );
            MainEditorAssetChildrenNodeTool.selectTextureNode(~nodeId, ());

            TextureInspectorTool.changeType(
              ~nodeId,
              ~type_=NodeAssetType.IMGUICustomImage,
              (),
            );

            let oldValue =
              IMGUICustomImageTypeTextureNodeAssetEditorService.getId(nodeId)
              |> StateLogicService.getEditorState;
            let id = "aaa";

            TextureInspectorTool.IMGUICustomImageType.setCustomImageId(
              ~nodeId,
              ~customImageId=id,
              (),
            );

            (nodeId, oldValue, Some(id));
          };

          describe("test undo operate", () =>
            test("should undo wrapS", () => {
              let (nodeId, oldValue, newValue) = _prepareAndExec();

              RedoUndoTool.undoHistoryState();

              IMGUICustomImageTypeTextureNodeAssetEditorService.getId(nodeId)
              |> StateLogicService.getEditorState
              |> expect == oldValue;
            })
          );

          describe("test redo operate", () =>
            test("should redo wrapS", () => {
              let (nodeId, oldValue, newValue) = _prepareAndExec();

              RedoUndoTool.undoHistoryState();
              RedoUndoTool.redoHistoryState();

              IMGUICustomImageTypeTextureNodeAssetEditorService.getId(nodeId)
              |> StateLogicService.getEditorState
              |> expect == newValue;
            })
          );
        })
      )
    );

    describe("test change wrapS", () => {
      let _prepareAndExec = () => {
        let assetTreeData =
          MainEditorAssetTreeTool.BuildAssetTree.Texture.buildOneTextureAssetTree();

        let wrapRepeatType = TextureInspectorTool.getWrapRepeatType();
        let nodeId =
          MainEditorAssetTreeTool.BuildAssetTree.Texture.getFirstTextureNodeId(
            assetTreeData,
          );
        let textureComponent =
          MainEditorAssetNodeTool.getTextureComponentFromNodeId(nodeId);
        let oldValue =
          BasicSourceTextureEngineService.getWrapS(textureComponent)
          |> StateLogicService.getEngineStateToGetData
          |> TextureTypeUtils.convertWrapToInt;

        MainEditorAssetChildrenNodeTool.selectTextureNode(~nodeId, ());
        TextureInspectorTool.changeWrapS(
          ~textureComponent,
          ~value=wrapRepeatType,
          (),
        );

        (textureComponent, oldValue, wrapRepeatType);
      };

      describe("test undo operate", () => {
        test("should undo wrapS", () => {
          let (textureComponent, oldValue, newValue) = _prepareAndExec();

          RedoUndoTool.undoHistoryState();

          StateEngineService.unsafeGetState()
          |> BasicSourceTextureEngineService.getWrapS(textureComponent)
          |> TextureTypeUtils.convertWrapToInt
          |> expect == oldValue;
        });
        test("should mark texture->isNeedUpdate to true after undo", () => {
          let (textureComponent, oldValue, newValue) = _prepareAndExec();

          BasicSourceTextureEngineService.setIsNeedUpdate(
            false,
            textureComponent,
          )
          |> StateLogicService.getAndSetEngineState;
          RedoUndoTool.undoHistoryState();

          StateEngineService.unsafeGetState()
          |> BasicSourceTextureEngineService.getIsNeedUpdate(
               textureComponent,
             )
          |> expect == true;
        });
      });

      describe("test redo operate", () => {
        test("should redo wrapS", () => {
          let (textureComponent, oldValue, newValue) = _prepareAndExec();

          RedoUndoTool.undoHistoryState();
          RedoUndoTool.redoHistoryState();

          StateEngineService.unsafeGetState()
          |> BasicSourceTextureEngineService.getWrapS(textureComponent)
          |> TextureTypeUtils.convertWrapToInt
          |> expect == newValue;
        });
        test("should mark texture->isNeedUpdate to true after redo", () => {
          let (textureComponent, oldValue, newValue) = _prepareAndExec();

          BasicSourceTextureEngineService.setIsNeedUpdate(
            false,
            textureComponent,
          )
          |> StateLogicService.getAndSetEngineState;
          RedoUndoTool.undoHistoryState();
          BasicSourceTextureEngineService.setIsNeedUpdate(
            false,
            textureComponent,
          )
          |> StateLogicService.getAndSetEngineState;
          RedoUndoTool.redoHistoryState();

          StateEngineService.unsafeGetState()
          |> BasicSourceTextureEngineService.getIsNeedUpdate(
               textureComponent,
             )
          |> expect == true;
        });
      });
    });

    describe("test change wrapT", () => {
      let _prepareAndExec = () => {
        let assetTreeData =
          MainEditorAssetTreeTool.BuildAssetTree.Texture.buildOneTextureAssetTree();

        let wrapRepeatType = TextureInspectorTool.getWrapRepeatType();
        let nodeId =
          MainEditorAssetTreeTool.BuildAssetTree.Texture.getFirstTextureNodeId(
            assetTreeData,
          );
        let textureComponent =
          MainEditorAssetNodeTool.getTextureComponentFromNodeId(nodeId);
        let oldValue =
          BasicSourceTextureEngineService.getWrapT(textureComponent)
          |> StateLogicService.getEngineStateToGetData
          |> TextureTypeUtils.convertWrapToInt;

        MainEditorAssetChildrenNodeTool.selectTextureNode(~nodeId, ());
        TextureInspectorTool.changeWrapT(
          ~textureComponent,
          ~value=wrapRepeatType,
          (),
        );

        (textureComponent, oldValue, wrapRepeatType);
      };

      describe("test undo operate", () => {
        test("should undo wrapT", () => {
          let (textureComponent, oldValue, newValue) = _prepareAndExec();

          RedoUndoTool.undoHistoryState();

          StateEngineService.unsafeGetState()
          |> BasicSourceTextureEngineService.getWrapT(textureComponent)
          |> TextureTypeUtils.convertWrapToInt
          |> expect == oldValue;
        });
        test("should mark texture->isNeedUpdate to true after undo", () => {
          let (textureComponent, oldValue, newValue) = _prepareAndExec();

          BasicSourceTextureEngineService.setIsNeedUpdate(
            false,
            textureComponent,
          )
          |> StateLogicService.getAndSetEngineState;
          RedoUndoTool.undoHistoryState();

          StateEngineService.unsafeGetState()
          |> BasicSourceTextureEngineService.getIsNeedUpdate(
               textureComponent,
             )
          |> expect == true;
        });
      });

      describe("test redo operate", () => {
        test("should redo wrapT", () => {
          let (textureComponent, oldValue, newValue) = _prepareAndExec();

          RedoUndoTool.undoHistoryState();
          RedoUndoTool.redoHistoryState();

          StateEngineService.unsafeGetState()
          |> BasicSourceTextureEngineService.getWrapT(textureComponent)
          |> TextureTypeUtils.convertWrapToInt
          |> expect == newValue;
        });
        test("should mark texture->isNeedUpdate to true after redo", () => {
          let (textureComponent, oldValue, newValue) = _prepareAndExec();

          BasicSourceTextureEngineService.setIsNeedUpdate(
            false,
            textureComponent,
          )
          |> StateLogicService.getAndSetEngineState;
          RedoUndoTool.undoHistoryState();
          BasicSourceTextureEngineService.setIsNeedUpdate(
            false,
            textureComponent,
          )
          |> StateLogicService.getAndSetEngineState;
          RedoUndoTool.redoHistoryState();

          StateEngineService.unsafeGetState()
          |> BasicSourceTextureEngineService.getIsNeedUpdate(
               textureComponent,
             )
          |> expect == true;
        });
      });
    });

    describe("test change magFilter", () => {
      let _prepareAndExec = () => {
        let assetTreeData =
          MainEditorAssetTreeTool.BuildAssetTree.Texture.buildOneTextureAssetTree();

        let filterLinearMipmapLinearType =
          TextureInspectorTool.getFilterLinearMipmapLinearType();
        let nodeId =
          MainEditorAssetTreeTool.BuildAssetTree.Texture.getFirstTextureNodeId(
            assetTreeData,
          );
        let textureComponent =
          MainEditorAssetNodeTool.getTextureComponentFromNodeId(nodeId);
        let oldValue =
          BasicSourceTextureEngineService.getMagFilter(textureComponent)
          |> StateLogicService.getEngineStateToGetData;

        MainEditorAssetChildrenNodeTool.selectTextureNode(~nodeId, ());
        TextureInspectorTool.changeMagFilter(
          ~textureComponent,
          ~value=filterLinearMipmapLinearType,
          (),
        );

        (
          textureComponent,
          oldValue,
          filterLinearMipmapLinearType |> TextureTypeUtils.convertIntToFilter,
        );
      };

      describe("test undo operate", () => {
        test("should undo magFilter", () => {
          let (textureComponent, oldValue, newValue) = _prepareAndExec();

          RedoUndoTool.undoHistoryState();

          StateEngineService.unsafeGetState()
          |> BasicSourceTextureEngineService.getMagFilter(textureComponent)
          |> expect == oldValue;
        });
        test("should mark texture->isNeedUpdate to true after undo", () => {
          let (textureComponent, oldValue, newValue) = _prepareAndExec();

          BasicSourceTextureEngineService.setIsNeedUpdate(
            false,
            textureComponent,
          )
          |> StateLogicService.getAndSetEngineState;
          RedoUndoTool.undoHistoryState();

          StateEngineService.unsafeGetState()
          |> BasicSourceTextureEngineService.getIsNeedUpdate(
               textureComponent,
             )
          |> expect == true;
        });
      });

      describe("test redo operate", () => {
        test("should redo magFilter", () => {
          let (textureComponent, oldValue, newValue) = _prepareAndExec();

          RedoUndoTool.undoHistoryState();
          RedoUndoTool.redoHistoryState();

          StateEngineService.unsafeGetState()
          |> BasicSourceTextureEngineService.getMagFilter(textureComponent)
          |> expect == newValue;
        });
        test("should mark texture->isNeedUpdate to true after redo", () => {
          let (textureComponent, oldValue, newValue) = _prepareAndExec();

          BasicSourceTextureEngineService.setIsNeedUpdate(
            false,
            textureComponent,
          )
          |> StateLogicService.getAndSetEngineState;
          RedoUndoTool.undoHistoryState();
          BasicSourceTextureEngineService.setIsNeedUpdate(
            false,
            textureComponent,
          )
          |> StateLogicService.getAndSetEngineState;
          RedoUndoTool.redoHistoryState();

          StateEngineService.unsafeGetState()
          |> BasicSourceTextureEngineService.getIsNeedUpdate(
               textureComponent,
             )
          |> expect == true;
        });
      });
    });

    describe("test change minFilter", () => {
      let _prepareAndExec = () => {
        let assetTreeData =
          MainEditorAssetTreeTool.BuildAssetTree.Texture.buildOneTextureAssetTree();

        let filterLinearMipmapLinearType =
          TextureInspectorTool.getFilterLinearMipmapLinearType();
        let nodeId =
          MainEditorAssetTreeTool.BuildAssetTree.Texture.getFirstTextureNodeId(
            assetTreeData,
          );
        let textureComponent =
          MainEditorAssetNodeTool.getTextureComponentFromNodeId(nodeId);
        let oldValue =
          BasicSourceTextureEngineService.getMinFilter(textureComponent)
          |> StateLogicService.getEngineStateToGetData;

        MainEditorAssetChildrenNodeTool.selectTextureNode(~nodeId, ());
        TextureInspectorTool.changeMinFilter(
          ~textureComponent,
          ~value=filterLinearMipmapLinearType,
          (),
        );

        (
          textureComponent,
          oldValue,
          filterLinearMipmapLinearType |> TextureTypeUtils.convertIntToFilter,
        );
      };

      describe("test undo operate", () => {
        test("should undo minFilter", () => {
          let (textureComponent, oldValue, newValue) = _prepareAndExec();

          RedoUndoTool.undoHistoryState();

          StateEngineService.unsafeGetState()
          |> BasicSourceTextureEngineService.getMinFilter(textureComponent)
          |> expect == oldValue;
        });
        test("should mark texture->isNeedUpdate to true after undo", () => {
          let (textureComponent, oldValue, newValue) = _prepareAndExec();

          BasicSourceTextureEngineService.setIsNeedUpdate(
            false,
            textureComponent,
          )
          |> StateLogicService.getAndSetEngineState;
          RedoUndoTool.undoHistoryState();

          StateEngineService.unsafeGetState()
          |> BasicSourceTextureEngineService.getIsNeedUpdate(
               textureComponent,
             )
          |> expect == true;
        });
      });

      describe("test redo operate", () => {
        test("should redo minFilter", () => {
          let (textureComponent, oldValue, newValue) = _prepareAndExec();

          RedoUndoTool.undoHistoryState();
          RedoUndoTool.redoHistoryState();

          StateEngineService.unsafeGetState()
          |> BasicSourceTextureEngineService.getMinFilter(textureComponent)
          |> expect == newValue;
        });
        test("should mark texture->isNeedUpdate to true after redo", () => {
          let (textureComponent, oldValue, newValue) = _prepareAndExec();

          BasicSourceTextureEngineService.setIsNeedUpdate(
            false,
            textureComponent,
          )
          |> StateLogicService.getAndSetEngineState;
          RedoUndoTool.undoHistoryState();
          BasicSourceTextureEngineService.setIsNeedUpdate(
            false,
            textureComponent,
          )
          |> StateLogicService.getAndSetEngineState;
          RedoUndoTool.redoHistoryState();

          StateEngineService.unsafeGetState()
          |> BasicSourceTextureEngineService.getIsNeedUpdate(
               textureComponent,
             )
          |> expect == true;
        });
      });
    });
  });