
open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open MainEditorSceneTreeTool;

let _ =
  describe(
    "mainEditor sceneTree specific function",
    () => {
      let sandbox = getSandboxDefaultVal();
      beforeEach(
        () => {
          sandbox := createSandbox();
          
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "test getDragedSceneGraphData function",
        () => {
          describe(
            "should move draged tree node to be target tree node's child",
            () => {
              beforeEach(() => TestTool.closeContractCheck());
              afterEach(() => TestTool.openContractCheck());
              test(
                "test haven't children case",
                () => {
                  let dragedSceneGraph = getDragedSceneGraphData(2, 1, getSimpleSceneTree());
                  expect(dragedSceneGraph)
                  == [|
                       {
                         uid: 0,
                         name: "root",
                         children: [|
                           {
                             uid: 2,
                             name: "gameObject2",
                             children: [|{uid: 1, name: "gameObject1", children: [||]}|]
                           },
                           {uid: 3, name: "gameObject3", children: [||]}
                         |]
                       }
                     |]
                }
              );
              test(
                "shouldn't change origin sceneGraphData, get new array data",
                () => {
                  let sceneGraphData = getSimpleSceneTree();
                  getDragedSceneGraphData(1, 2, sceneGraphData) |> ignore;
                  expect(sceneGraphData) == getSimpleSceneTree()
                }
              );
              describe(
                "test has children case",
                () => {
                  describe(
                    "has first layer children",
                    () => {
                      test(
                        "add into first layer parent",
                        () => {
                          let dragedSceneGraph =
                            getDragedSceneGraphData(3, 2, getTwoLayerSceneTree());
                          expect(dragedSceneGraph)
                          == [|
                               {
                                 uid: 0,
                                 name: "root",
                                 children: [|
                                   {uid: 1, name: "gameObject1", children: [||]},
                                   {
                                     uid: 3,
                                     name: "gameObject3",
                                     children: [|
                                       {uid: 4, name: "gameObject4", children: [||]},
                                       {uid: 5, name: "gameObject5", children: [||]},
                                       {uid: 2, name: "gameObject2", children: [||]}
                                     |]
                                   }
                                 |]
                               }
                             |]
                        }
                      );
                      test(
                        "add into first layer children",
                        () => {
                          let dragedSceneGraph =
                            getDragedSceneGraphData(4, 2, getTwoLayerSceneTree());
                          expect(dragedSceneGraph)
                          == [|
                               {
                                 uid: 0,
                                 name: "root",
                                 children: [|
                                   {uid: 1, name: "gameObject1", children: [||]},
                                   {
                                     uid: 3,
                                     name: "gameObject3",
                                     children: [|
                                       {
                                         uid: 4,
                                         name: "gameObject4",
                                         children: [|
                                           {uid: 2, name: "gameObject2", children: [||]}
                                         |]
                                       },
                                       {uid: 5, name: "gameObject5", children: [||]}
                                     |]
                                   }
                                 |]
                               }
                             |]
                        }
                      );
                      test(
                        "shouldn't change origin sceneGraphData, get new array data",
                        () => {
                          let sceneGraphData = getTwoLayerSceneTree();
                          getDragedSceneGraphData(1, 2, sceneGraphData) |> ignore;
                          expect(sceneGraphData) == getTwoLayerSceneTree()
                        }
                      )
                    }
                  );
                  describe(
                    "has two layer children",
                    () =>
                      test(
                        "add into second layer children",
                        () => {
                          let dragedSceneGraph =
                            getDragedSceneGraphData(6, 2, getThreeLayerSceneTree());
                          expect(dragedSceneGraph)
                          == [|
                               {
                                 uid: 0,
                                 name: "root",
                                 children: [|
                                   {uid: 1, name: "gameObject1", children: [||]},
                                   {
                                     uid: 3,
                                     name: "gameObject3",
                                     children: [|
                                       {uid: 4, name: "gameObject4", children: [||]},
                                       {
                                         uid: 5,
                                         name: "gameObject5",
                                         children: [|
                                           {
                                             uid: 6,
                                             name: "gameObject6",
                                             children: [|
                                               {uid: 2, name: "gameObject2", children: [||]}
                                             |]
                                           }
                                         |]
                                       }
                                     |]
                                   }
                                 |]
                               }
                             |]
                        }
                      )
                  )
                }
              )
            }
          );
          describe(
            "deal with specific case",
            () =>
              test(
                "test if drageId is can't find in array, should throw error",
                () =>
                  expect(() => getDragedSceneGraphData(1, 5, getSimpleSceneTree()))
                  |> toThrowMessageRe([%re {|/expect dragedTreeNode should exist, but actual not/img|}])
              )
          )
        }
      )
    }
  );