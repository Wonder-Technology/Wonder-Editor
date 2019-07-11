open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open Js.Promise;

let _ =
  describe("redo_undo: cubemap inspector", () => {
    let sandbox = getSandboxDefaultVal();

    beforeEach(() => {
      sandbox := createSandbox();

      MainEditorSceneTool.initState(~sandbox, ());
      MainEditorSceneTool.prepareScene(sandbox);
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test load and set face source", () => {
      let _prepareAndExec = judgeFunc => {
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
          ~cubemapTexture,
          ~setSourceFunc=CubemapTextureEngineService.setPXSource,
          (),
        )
        |> then_(_ => judgeFunc(cubemapTexture));
      };

      beforeEach(() => {
        MainEditorAssetTool.buildFakeFileReader();
        MainEditorAssetTool.buildFakeImage();

        LoadTool.buildFakeTextDecoder(LoadTool.convertUint8ArrayToBuffer);
        LoadTool.buildFakeURL(sandbox^);

        LoadTool.buildFakeLoadImage(.);
      });

      describe("test undo operate", () => {
        testPromise({|should undo "set source"|}, () =>
          _prepareAndExec(cubemapTexture => {
            RedoUndoTool.undoHistoryState();

            CubemapTextureEngineService.getPXSource(cubemapTexture)
            |> StateLogicService.getEngineStateToGetData
            |> expect == None
            |> resolve;
          })
        );
        testPromise("should mark texture->isNeedUpdate to true after undo", () =>
          _prepareAndExec(cubemapTexture => {
            CubemapTextureEngineService.setIsNeedUpdate(false, cubemapTexture)
            |> StateLogicService.getAndSetEngineState;
            RedoUndoTool.undoHistoryState();

            StateEngineService.unsafeGetState()
            |> CubemapTextureEngineService.getIsNeedUpdate(cubemapTexture)
            |> expect == true
            |> resolve;
          })
        );
      });

      describe("test redo operate", () => {
        testPromise({|should redo "set source"|}, () =>
          _prepareAndExec(cubemapTexture => {
            RedoUndoTool.undoHistoryState();
            RedoUndoTool.redoHistoryState();

            CubemapTextureEngineService.getPXSource(cubemapTexture)
            |> StateLogicService.getEngineStateToGetData
            |> Js.Option.isSome
            |> expect == true
            |> resolve;
          })
        );
        testPromise("should mark texture->isNeedUpdate to true after undo", () =>
          _prepareAndExec(cubemapTexture => {
            RedoUndoTool.undoHistoryState();
            CubemapTextureEngineService.setIsNeedUpdate(false, cubemapTexture)
            |> StateLogicService.getAndSetEngineState;
            RedoUndoTool.redoHistoryState();

            StateEngineService.unsafeGetState()
            |> CubemapTextureEngineService.getIsNeedUpdate(cubemapTexture)
            |> expect == true
            |> resolve;
          })
        );
      });
    });

    describe("test change wrapS", () => {
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
        let oldValue =
          CubemapTextureEngineService.getWrapS(cubemapTexture)
          |> StateLogicService.getEngineStateToGetData
          |> TextureTypeUtils.convertWrapToInt;

        MainEditorAssetChildrenNodeTool.selectCubemapNode(~nodeId, ());
        CubemapInspectorTool.changeWrapS(
          ~cubemapTexture,
          ~value=wrapRepeatType,
          (),
        );

        (cubemapTexture, oldValue, wrapRepeatType);
      };

      describe("test undo operate", () => {
        test("should undo wrapS", () => {
          let (cubemapTexture, oldValue, newValue) = _prepareAndExec();

          RedoUndoTool.undoHistoryState();

          StateEngineService.unsafeGetState()
          |> CubemapTextureEngineService.getWrapS(cubemapTexture)
          |> TextureTypeUtils.convertWrapToInt
          |> expect == oldValue;
        });
        test("should mark texture->isNeedUpdate to true after undo", () => {
          let (cubemapTexture, oldValue, newValue) = _prepareAndExec();

          CubemapTextureEngineService.setIsNeedUpdate(false, cubemapTexture)
          |> StateLogicService.getAndSetEngineState;
          RedoUndoTool.undoHistoryState();

          StateEngineService.unsafeGetState()
          |> CubemapTextureEngineService.getIsNeedUpdate(cubemapTexture)
          |> expect == true;
        });
      });

      describe("test redo operate", () => {
        test("should redo wrapS", () => {
          let (cubemapTexture, oldValue, newValue) = _prepareAndExec();

          RedoUndoTool.undoHistoryState();
          RedoUndoTool.redoHistoryState();

          StateEngineService.unsafeGetState()
          |> CubemapTextureEngineService.getWrapS(cubemapTexture)
          |> TextureTypeUtils.convertWrapToInt
          |> expect == newValue;
        });
        test("should mark texture->isNeedUpdate to true after redo", () => {
          let (cubemapTexture, oldValue, newValue) = _prepareAndExec();

          RedoUndoTool.undoHistoryState();
          CubemapTextureEngineService.setIsNeedUpdate(false, cubemapTexture)
          |> StateLogicService.getAndSetEngineState;
          RedoUndoTool.redoHistoryState();

          StateEngineService.unsafeGetState()
          |> CubemapTextureEngineService.getIsNeedUpdate(cubemapTexture)
          |> expect == true;
        });
      });
    });
  });