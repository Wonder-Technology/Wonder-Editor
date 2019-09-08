open LanguageDataType;

let message_language_array = [|
  {
    title: "floatInput-value",
    language: {
      zh: {j|该值不能为0 ！|j},
      en: "the value can't be 0 !",
    },
  },
  {
    title: "should-in-stop",
    language: {
      zh: {j|请在停止状态操作，现在正在运行 ！|j},
      en: "should operate when stop, but now is run!",
    },
  },
  {
    title: "load-asset-file-error",
    language: {
      zh: {j|上传的资源类型错误，资源类型包括 (.wdb, .glb, .jpg, .jpeg, .png, .zip) ！|j},
      en: "the loaded asset type is error, type should include (.wdb, .glb, .jpg, .jpeg, .png, .zip)! ",
    },
  },
  {
    title: "load-package-error",
    language: {
      zh: {j|上传的包类型错误，包类型包括(.wpk) ！|j},
      en: "the loaded package type is error, type should include (.wpk)",
    },
  },
  {
    title: "load-cubemap-faceSource-error",
    language: {
      zh: {j|上传的Cubemap Face Source类型错误，类型包括(.jpg, .jpeg, .png) ！|j},
      en: "the loaded cubemap face source type is error, type should include (.jpg, .jpeg, .png)! ",
    },
  },
  {
    title: "add-component-duplicate",
    language: {
      zh: {j|该GameObject已经拥有这个组件 ！|j},
      en: "the game object already have this component !",
    },
  },
  {
    title: "add-component-camera-duplicate",
    language: {
      zh: {j|该GameObject已经拥有类似相机控制器！|j},
      en: "the game object already have the camera controller!",
    },
  },
  {
    title: "asset-rename-node",
    language: {
      zh: {j|资产名称不能重复 ！|j},
      en: "parent node shouldn't has the child with the same name ! ",
    },
  },
  {
    title: "asset-rename-material",
    language: {
      zh: {j|材质名称不能与默认名称重复 ！|j},
      en: "material's name shouldn't equal default material name",
    },
  },
  {
    title: "asset-rename-scriptEventFunction",
    language: {
      zh: {j|eventFunction名称不能与其他eventFunction名称重复 ！|j},
      en: "script event function's name shouldn't equal other ones' name",
    },
  },
  {
    title: "asset-rename-scriptAttribute",
    language: {
      zh: {j|attribute名称不能与其他attribute名称重复 ！|j},
      en: "script attribute's name shouldn't equal other ones' name",
    },
  },
  {
    title: "asset-rename-scriptAttribute-field",
    language: {
      zh: {j|field名称不能与attribute的其他field名称重复 ！|j},
      en: "field's name shouldn't equal other ones' name of the same attribute",
    },
  },
  {
    title: "asset-rename-imguiExecFuncData",
    language: {
      zh: {j|imguiExecFuncData名称不能与其他imguiExecFuncData名称重复 ！|j},
      en: "imguiExecFuncData's name shouldn't equal other ones' name",
    },
  },
  {
    title: "asset-rename-imguiCustomControl",
    language: {
      zh: {j|imguiCustomControl名称不能与其他imguiCustomControl名称重复 ！|j},
      en: "imguiCustomControl's name shouldn't equal other ones' name",
    },
  },
  {
    title: "asset-rename-imguiSkin",
    language: {
      zh: {j|imguiSkin名称不能与其他imguiSkin名称重复 ！|j},
      en: "imguiSkin's name shouldn't equal other ones' name",
    },
  },
  {
    title: "asset-rename-fnt",
    language: {
      zh: {j|fnt名称不能与其他fnt名称重复 ！|j},
      en: "fnt's name shouldn't equal other ones' name",
    },
  },
  {
    title: "direction-light-exceed",
    language: {
      zh: {j|方向光(Direction Light)数量超出了最大限制 ！|j},
      en: "the direction light count is exceed max count!",
    },
  },
  {
    title: "point-light-exceed",
    language: {
      zh: {j|点光源(Point Light)数量超出了最大限制 ！|j},
      en: "the point light count is exceed max count!",
    },
  },
  {
    title: "need-add-scriptEventFunction",
    language: {
      zh: {j|请添加ScriptEventFunction资产|j},
      en: "please add script event function asset",
    },
  },
  {
    title: "need-add-scriptAttribute",
    language: {
      zh: {j|请添加ScriptAttribute资产|j},
      en: "please add script attribute asset",
    },
  },
  {
    title: "texture-inspector-customImageId-exist",
    language: {
      zh: {j|custom image id已经存在|j},
      en: "custom image id already exist",
    },
  },
|];