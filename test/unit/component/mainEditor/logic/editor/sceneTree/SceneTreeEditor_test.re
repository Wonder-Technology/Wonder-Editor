open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open MainEditorSceneTreeToolEditor;

let _ =
  describe(
    "editor: mainEditor sceneTree component",
    () => {
      let sandbox = getSandboxDefaultVal();
      beforeEach(
        () => {
          sandbox := createSandbox();
          TestToolEngine.prepare(sandbox)
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "test getDragedSceneGraphData method",
        () =>
          describe(
            "should change SceneGraphData array structure",
            () => {
              test(
                "test haven't children case",
                () => {
                  let dragedSceneGraph = getDragedSceneGraphData(1, 2, getSimpleSceneTree());
                  expect(dragedSceneGraph)
                  == [|
                       {
                         uid: 0,
                         name: "root",
                         children: [|
                           {
                             uid: 1,
                             name: "gameObject1",
                             children: [|{uid: 2, name: "gameObject2", children: [||]}|]
                           },
                           {uid: 3, name: "gameObject3", children: [||]}
                         |]
                       }
                     |]
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
          )
      )
    }
  );