open Wonder_jest;

open AssetTreeTwoLayerTypeTool;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("MainEditorAssetHeader", () => {
    let sandbox = getSandboxDefaultVal();

    beforeEach(() => {
      sandbox := createSandbox();
      MainEditorSceneTool.initStateAndGl(~sandbox, ());
      MainEditorSceneTool.createDefaultScene(
        sandbox,
        MainEditorAssetTool.initAssetTree,
      );

      EventListenerTool.buildFakeDom()
      |> EventListenerTool.stubGetElementByIdReturnFakeDom;
    });

    afterEach(() => {
      restoreSandbox(refJsObjToSandbox(sandbox^));
      StateAssetService.getState()
      |> CurrentNodeDataAssetService.clearCurrentNodeData
      |> CurrentNodeParentIdAssetService.clearCurrentNodeParentId
      |> StateAssetService.setState
      |> ignore;
    });

    describe("test operate treeNode", () => {
      describe("test add folder", () => {
        let _triggerAddFolderClick =
            (~component=BuildComponentTool.buildAssetComponent(), ()) =>
          BaseEventTool.triggerComponentEvent(
            BuildComponentTool.buildAssetComponent(),
            AssetTreeEventTool.triggerAddFolderClick,
          );

        describe(
          "if not select specific treeNode, add folder into root treeNode", () => {
          test("test snapshot", () => {
            MainEditorAssetTool.buildTwoLayerAssetTreeRoot() |> ignore;

            _triggerAddFolderClick();

            BuildComponentTool.buildAssetComponent()
            |> ReactTestTool.createSnapshotAndMatch;
          });

          describe("test logic", () => {
            test("test asset children length before add folder", () => {
              MainEditorAssetTool.buildTwoLayerAssetTreeRoot() |> ignore;

              StateAssetService.getState()
              |> AssetTreeRootAssetService.unsafeGetAssetTreeRoot
              |> (root => root.children)
              |> Js.Array.length
              |> expect == 5;
            });

            test("test asset children length after add folder", () => {
              MainEditorAssetTool.buildTwoLayerAssetTreeRoot() |> ignore;

              _triggerAddFolderClick();

              StateAssetService.getState()
              |> AssetTreeRootAssetService.unsafeGetAssetTreeRoot
              |> (root => root.children)
              |> Js.Array.length
              |> expect == 6;
            });
          });
        });

        test("else, add folder into specific treeNode", () => {
          let assetTreeDomRecord =
            MainEditorAssetTool.buildTwoLayerAssetTreeRoot();
          let component = BuildComponentTool.buildAssetComponent();

          assetTreeDomRecord
          |> MainEditorAssetNodeTool.OperateTwoLayer.getFirstFolderDomIndexForAssetTree
          |> MainEditorAssetTool.clickAssetTreeNodeToSetCurrentNode(component);
          _triggerAddFolderClick(~component, ());

          BuildComponentTool.buildAssetComponent()
          |> ReactTestTool.createSnapshotAndMatch;
        });
      });

      describe("test remove tree node", () => {
        let _triggerRemoveFolderClick = component =>
          BaseEventTool.triggerComponentEvent(
            component,
            AssetTreeEventTool.triggerRemoveNodeClick,
          );

        test(
          "if not select specific treeNode, remove-button's disabled props should == true ",
          () => {
            MainEditorAssetTool.buildTwoLayerAssetTreeRoot() |> ignore;

            BuildComponentTool.buildAssetComponent()
            |> ReactTestTool.createSnapshotAndMatch;
          },
        );

        describe("else", () => {
          describe("test snapshot", () => {
            test("remove-button's disabled props should == false", () => {
              let assetTreeDomRecord =
                MainEditorAssetTool.buildTwoLayerAssetTreeRoot();
              let component = BuildComponentTool.buildAssetComponent();

              assetTreeDomRecord
              |> MainEditorAssetNodeTool.OperateTwoLayer.getFirstFolderDomIndexForAssetTree
              |> MainEditorAssetTool.clickAssetTreeNodeToSetCurrentNode(
                   component,
                 );

              component |> ReactTestTool.createSnapshotAndMatch;
            });

            describe("test select folder", () =>
              test(
                "click remove-button should remove folder from assetTreeRoot",
                () => {
                let assetTreeDomRecord =
                  MainEditorAssetTool.buildTwoLayerAssetTreeRoot();
                let component = BuildComponentTool.buildAssetComponent();

                assetTreeDomRecord
                |> MainEditorAssetNodeTool.OperateTwoLayer.getFirstFolderDomIndexForAssetTree
                |> MainEditorAssetTool.clickAssetTreeNodeToSetCurrentNode(
                     component,
                   );
                _triggerRemoveFolderClick(component);

                BuildComponentTool.buildAssetComponent()
                |> ReactTestTool.createSnapshotAndMatch;
              })
            );

            describe("test select file", () => {
              test(
                "select texture;
                click remove-button;
                should remove it from assetTreeRoot",
                () => {
                  let assetTreeDomRecord =
                    MainEditorAssetTool.buildTwoLayerAssetTreeRoot();

                  assetTreeDomRecord
                  |> MainEditorAssetNodeTool.OperateTwoLayer.getFirstTextureDomIndex
                  |> MainEditorAssetTool.clickAssetChildrenNodeToSetCurrentNode;
                  _triggerRemoveFolderClick(
                    BuildComponentTool.buildAssetComponent(),
                  );

                  BuildComponentTool.buildAssetComponent()
                  |> ReactTestTool.createSnapshotAndMatch;
                },
              );

              test(
                "select json is currentNode;
                click remove-button;
                should remove it from assetTreeRoot",
                () => {
                  let assetTreeDomRecord =
                    MainEditorAssetTool.buildTwoLayerAssetTreeRoot();

                  assetTreeDomRecord
                  |> MainEditorAssetNodeTool.OperateTwoLayer.getFirstJsonDomIndex
                  |> MainEditorAssetTool.clickAssetChildrenNodeToSetCurrentNode;
                  _triggerRemoveFolderClick(
                    BuildComponentTool.buildAssetComponent(),
                  );

                  BuildComponentTool.buildAssetComponent()
                  |> ReactTestTool.createSnapshotAndMatch;
                },
              );
            });
          });

          describe("test logic", () => {
            test("test assetTree root length before remove", () => {
              MainEditorAssetTool.buildTwoLayerAssetTreeRoot() |> ignore;

              StateAssetService.getState()
              |> AssetTreeRootAssetService.unsafeGetAssetTreeRoot
              |> (root => root.children)
              |> Js.Array.length
              |> expect == 5;
            });

            test("test remove node from aseetTreeRoot", () => {
              let assetTreeDomRecord =
                MainEditorAssetTool.buildTwoLayerAssetTreeRoot();
              let component = BuildComponentTool.buildAssetComponent();

              assetTreeDomRecord
              |> MainEditorAssetNodeTool.OperateTwoLayer.getFirstFolderDomIndexForAssetTree
              |> MainEditorAssetTool.clickAssetTreeNodeToSetCurrentNode(
                   component,
                 );
              _triggerRemoveFolderClick(component);

              StateAssetService.getState()
              |> AssetTreeRootAssetService.unsafeGetAssetTreeRoot
              |> (root => root.children)
              |> Js.Array.length
              |> expect == 4;
            });
          });
        });
      });
    });

    describe("test load file", () => {
      beforeEach(() => {
        MainEditorAssetTool.buildFakeFileReader();
        MainEditorAssetTool.buildFakeImage();
      });
      describe("test snapshot", () =>
        describe("if not select specific treeNode", () =>
          testPromise("load file should add into root node children", () => {
            MainEditorAssetTool.buildTwoLayerAssetTreeRoot() |> ignore;

            MainEditorAssetHeader.Method._fileLoad(
              TestTool.getDispatch(),
              BaseEventTool.buildFileEvent(),
            )
            |> Js.Promise.then_(_ =>
                 BuildComponentTool.buildAssetComponent()
                 |> ReactTestTool.createSnapshotAndMatch
                 |> Js.Promise.resolve
               );
          })
        )
      );

      describe("test logic", () => {
        describe("test should add into root node children", () =>
          testPromise("test children node length", () => {
            MainEditorAssetTool.buildTwoLayerAssetTreeRoot() |> ignore;
            let uploadFileLength = 2;
            let normalChildrenLen =
              StateAssetService.getState()
              |> AssetTreeRootAssetService.unsafeGetAssetTreeRoot
              |> (root => root.children)
              |> Js.Array.length;

            MainEditorAssetHeader.Method._fileLoad(
              TestTool.getDispatch(),
              BaseEventTool.buildFileEvent(),
            )
            |> Js.Promise.then_(_ =>
                 StateAssetService.getState()
                 |> AssetTreeRootAssetService.unsafeGetAssetTreeRoot
                 |> (root => root.children)
                 |> Js.Array.length
                 |> (lastLen => lastLen - normalChildrenLen)
                 |> expect == uploadFileLength
                 |> Js.Promise.resolve
               );
          })
        );

        describe("test should add into nodeMap", () => {
          describe("test imageBase64Map", () => {
            testPromise("add image base64 to imageBase64Map", () => {
              let assetTreeDomRecord =
                MainEditorAssetTool.buildTwoLayerAssetTreeRoot();
              let imgBase64 = "newImgBase64";

              MainEditorAssetHeader.Method._fileLoad(
                TestTool.getDispatch(),
                BaseEventTool.buildFileEvent(~imgSrc=imgBase64, ()),
              )
              |> Js.Promise.then_(_ => {
                   assetTreeDomRecord
                   |> MainEditorAssetNodeTool.OperateTwoLayer.getUploadedeTextureNodeDomIndex
                   |> MainEditorAssetTool.clickAssetChildrenNodeToSetCurrentNode;

                   StateAssetService.getState()
                   |> ImageBase64MapAssetService.getImageBase64Map
                   |> WonderCommonlib.SparseMapService.unsafeGet(
                        MainEditorAssetNodeTool.getTextureIndexFromCurrentNodeId(),
                      )
                   |> expect == imgBase64
                   |> Js.Promise.resolve;
                 });
            });
            testPromise(
              "test show texture image, get it base64 from imageBase64Map", () => {
              MainEditorAssetTool.buildTwoLayerAssetTreeRoot() |> ignore;
              let imgBase64 = "newImgBase64";

              MainEditorAssetHeader.Method._fileLoad(
                TestTool.getDispatch(),
                BaseEventTool.buildFileEvent(~imgSrc=imgBase64, ()),
              )
              |> Js.Promise.then_(_ =>
                   BuildComponentTool.buildAssetComponent()
                   |> ReactTestTool.createSnapshotAndMatch
                   |> Js.Promise.resolve
                 );
            });
          });

          describe("test textureNodeMap", () =>
            testPromise("add created texture index to textureNodeMap", () => {
              let assetTreeDomRecord =
                MainEditorAssetTool.buildTwoLayerAssetTreeRoot();

              MainEditorAssetHeader.Method._fileLoad(
                TestTool.getDispatch(),
                BaseEventTool.buildFileEvent(),
              )
              |> Js.Promise.then_(_ => {
                   assetTreeDomRecord
                   |> MainEditorAssetNodeTool.OperateTwoLayer.getUploadedeTextureNodeDomIndex
                   |> MainEditorAssetTool.clickAssetChildrenNodeToSetCurrentNode;

                   MainEditorAssetNodeTool.getTextureIndexFromCurrentNodeId()
                   |>
                   expect == MainEditorAssetNodeTool.OperateTwoLayer.getUploadedTextureIndex(
                               assetTreeDomRecord,
                             )
                   |> Js.Promise.resolve;
                 });
            })
          );
          describe("test jsonNodeMap", () =>
            testPromise("add json string to jsonNodeMap", () => {
              let assetTreeDomRecord =
                MainEditorAssetTool.buildTwoLayerAssetTreeRoot();
              let jsonName = "newLoadJson.json";
              let jsonResult = "I'm the result";

              MainEditorAssetHeader.Method._fileLoad(
                TestTool.getDispatch(),
                BaseEventTool.buildFileEvent(~jsonName, ~jsonResult, ()),
              )
              |> Js.Promise.then_(_ => {
                   assetTreeDomRecord
                   |> MainEditorAssetNodeTool.OperateTwoLayer.getUploadedeJsonNodeDomIndex
                   |> MainEditorAssetTool.clickAssetChildrenNodeToSetCurrentNode;

                   let {name, jsonResult}: AssetNodeType.jsonResultType =
                     StateAssetService.getState()
                     |> JsonNodeMapAssetService.getJsonNodeMap
                     |> WonderCommonlib.SparseMapService.unsafeGet(
                          MainEditorAssetNodeTool.getCurrentNodeId(),
                        );

                   (name, jsonResult)
                   |> expect == (jsonName, jsonResult)
                   |> Js.Promise.resolve;
                 });
            })
          );
        });
      });

      describe("deal with specific case", () => {
        let _getErrorTypeFile = () => "json/png";
        test("if upload error file type, should throw error", () =>
          expect(() =>
            AssetTreeNodeUtils.getUploadFileType(_getErrorTypeFile())
          )
          |> toThrowMessageRe(
               [%re
                 {|/getUploadFileType/img|}
               ],
             )
        );
      });
    });
  });
