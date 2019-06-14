

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as CloneValueEngineLogicService$WonderEditor from "./CloneValueEngineLogicService.js";
import * as BasicSourceTextureEngineService$WonderEditor from "../../../state/engine/BasicSourceTextureEngineService.js";
import * as SourceTextureCacheInspectorCanvasLogicService$WonderEditor from "../inspectorCanvas/SourceTextureCacheInspectorCanvasLogicService.js";

function cloneTextureToOtherEngineState(clonedTexture, clonedEngineState, targetEngineState) {
  var match = BasicSourceTextureEngineService$WonderEditor.create(targetEngineState);
  var texture = match[1];
  var targetEngineState$1 = match[0];
  CloneValueEngineLogicService$WonderEditor.cloneValueByGetValueFunc(BasicSourceTextureEngineService$WonderEditor.getFlipY, BasicSourceTextureEngineService$WonderEditor.setFlipY, texture, /* tuple */[
        clonedTexture,
        clonedEngineState
      ], CloneValueEngineLogicService$WonderEditor.cloneValueByGetValueFunc(BasicSourceTextureEngineService$WonderEditor.getType, BasicSourceTextureEngineService$WonderEditor.setType, texture, /* tuple */[
            clonedTexture,
            clonedEngineState
          ], CloneValueEngineLogicService$WonderEditor.cloneValueByGetValueFunc(BasicSourceTextureEngineService$WonderEditor.getFormat, BasicSourceTextureEngineService$WonderEditor.setFormat, texture, /* tuple */[
                clonedTexture,
                clonedEngineState
              ], CloneValueEngineLogicService$WonderEditor.cloneValueByGetValueFunc(BasicSourceTextureEngineService$WonderEditor.getMinFilter, BasicSourceTextureEngineService$WonderEditor.setMinFilter, texture, /* tuple */[
                    clonedTexture,
                    clonedEngineState
                  ], CloneValueEngineLogicService$WonderEditor.cloneValueByGetValueFunc(BasicSourceTextureEngineService$WonderEditor.getMagFilter, BasicSourceTextureEngineService$WonderEditor.setMagFilter, texture, /* tuple */[
                        clonedTexture,
                        clonedEngineState
                      ], CloneValueEngineLogicService$WonderEditor.cloneValueByGetValueFunc(BasicSourceTextureEngineService$WonderEditor.getWrapT, BasicSourceTextureEngineService$WonderEditor.setWrapT, texture, /* tuple */[
                            clonedTexture,
                            clonedEngineState
                          ], CloneValueEngineLogicService$WonderEditor.cloneValueByGetValueFunc(BasicSourceTextureEngineService$WonderEditor.getWrapS, BasicSourceTextureEngineService$WonderEditor.setWrapS, texture, /* tuple */[
                                clonedTexture,
                                clonedEngineState
                              ], CloneValueEngineLogicService$WonderEditor.cloneValueByGetValueFunc(BasicSourceTextureEngineService$WonderEditor.unsafeGetSource, BasicSourceTextureEngineService$WonderEditor.setSource, texture, /* tuple */[
                                    clonedTexture,
                                    clonedEngineState
                                  ], CloneValueEngineLogicService$WonderEditor.cloneValueByGetOptionValueFunc(BasicSourceTextureEngineService$WonderEditor.getBasicSourceTextureName, BasicSourceTextureEngineService$WonderEditor.setBasicSourceTextureName, texture, /* tuple */[
                                        clonedTexture,
                                        clonedEngineState
                                      ], targetEngineState$1)))))))));
  return /* tuple */[
          texture,
          targetEngineState$1
        ];
}

function cloneTextureAndAddToMaterial(param, param$1, editorState, clonedEngineState, targetEngineState) {
  var match = Curry._2(param$1[0], param[0], clonedEngineState);
  if (match !== undefined) {
    var map = match;
    var match$1 = SourceTextureCacheInspectorCanvasLogicService$WonderEditor.getCache(map, /* tuple */[
          editorState,
          clonedEngineState
        ]);
    var match$2;
    if (match$1 !== undefined) {
      match$2 = /* tuple */[
        match$1,
        editorState,
        targetEngineState
      ];
    } else {
      var match$3 = cloneTextureToOtherEngineState(map, clonedEngineState, targetEngineState);
      var targetEngineState$1 = match$3[1];
      var targetTexture = match$3[0];
      var editorState$1 = SourceTextureCacheInspectorCanvasLogicService$WonderEditor.addCache(map, targetTexture, targetEngineState$1, editorState);
      match$2 = /* tuple */[
        targetTexture,
        editorState$1,
        targetEngineState$1
      ];
    }
    return /* tuple */[
            match$2[1],
            Curry._3(param$1[1], match$2[0], param[1], match$2[2])
          ];
  } else {
    return /* tuple */[
            editorState,
            targetEngineState
          ];
  }
}

export {
  cloneTextureToOtherEngineState ,
  cloneTextureAndAddToMaterial ,
  
}
/* BasicSourceTextureEngineService-WonderEditor Not a pure module */
