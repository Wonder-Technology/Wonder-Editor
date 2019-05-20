let createScriptAPIJsObj = () => Wonderjs.RecordScriptAPIMainService.create();

let createRewritedScriptAPIJsObj = () =>
  InitScriptAPIJob._rewriteScriptAPIJsObj(createScriptAPIJsObj());