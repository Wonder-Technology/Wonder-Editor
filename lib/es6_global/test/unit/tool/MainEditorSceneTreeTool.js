

import * as SceneTreeUtils$WonderEditor from "../../../src/core/composable_component/mainEditor/composable_component/sceneTree/utils/SceneTreeUtils.js";

function getSimpleSceneTree() {
  return /* array */[/* record */[
            /* name */"root",
            /* uid */0,
            /* isShowChildren */true,
            /* children : array */[
              /* record */[
                /* name */"gameObject1",
                /* uid */1,
                /* isShowChildren */true,
                /* children : array */[]
              ],
              /* record */[
                /* name */"gameObject2",
                /* uid */2,
                /* isShowChildren */true,
                /* children : array */[]
              ],
              /* record */[
                /* name */"gameObject3",
                /* uid */3,
                /* isShowChildren */true,
                /* children : array */[]
              ]
            ]
          ]];
}

function getTwoLayerSceneTree() {
  return /* array */[/* record */[
            /* name */"root",
            /* uid */0,
            /* isShowChildren */true,
            /* children : array */[
              /* record */[
                /* name */"gameObject1",
                /* uid */1,
                /* isShowChildren */true,
                /* children : array */[]
              ],
              /* record */[
                /* name */"gameObject2",
                /* uid */2,
                /* isShowChildren */true,
                /* children : array */[]
              ],
              /* record */[
                /* name */"gameObject3",
                /* uid */3,
                /* isShowChildren */true,
                /* children : array */[
                  /* record */[
                    /* name */"gameObject4",
                    /* uid */4,
                    /* isShowChildren */true,
                    /* children : array */[]
                  ],
                  /* record */[
                    /* name */"gameObject5",
                    /* uid */5,
                    /* isShowChildren */true,
                    /* children : array */[]
                  ]
                ]
              ]
            ]
          ]];
}

function getThreeLayerSceneTree() {
  return /* array */[/* record */[
            /* name */"root",
            /* uid */0,
            /* isShowChildren */true,
            /* children : array */[
              /* record */[
                /* name */"gameObject1",
                /* uid */1,
                /* isShowChildren */true,
                /* children : array */[]
              ],
              /* record */[
                /* name */"gameObject2",
                /* uid */2,
                /* isShowChildren */true,
                /* children : array */[]
              ],
              /* record */[
                /* name */"gameObject3",
                /* uid */3,
                /* isShowChildren */true,
                /* children : array */[
                  /* record */[
                    /* name */"gameObject4",
                    /* uid */4,
                    /* isShowChildren */true,
                    /* children : array */[]
                  ],
                  /* record */[
                    /* name */"gameObject5",
                    /* uid */5,
                    /* isShowChildren */true,
                    /* children : array */[/* record */[
                        /* name */"gameObject6",
                        /* uid */6,
                        /* isShowChildren */true,
                        /* children : array */[]
                      ]]
                  ]
                ]
              ]
            ]
          ]];
}

var getDragedSceneGraphData = SceneTreeUtils$WonderEditor.getDragedSceneGraphData;

export {
  getDragedSceneGraphData ,
  getSimpleSceneTree ,
  getTwoLayerSceneTree ,
  getThreeLayerSceneTree ,
  
}
/* SceneTreeUtils-WonderEditor Not a pure module */
