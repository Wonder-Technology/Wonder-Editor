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
    title: "header-export-package",
    language: {
      zh: {j|请在停止状态导出包WPK，现在正在运行 ！|j},
      en: "should export package when stop, but now is run!",
    },
  },
  {
    title: "header-export-scene",
    language: {
      zh: {j|请在停止状态导出场景模型WDB，现在正在运行 ！|j},
      en: "should export scene when stop, but now is run!",
    },
  },
  {
    title: "header-import-package",
    language: {
      zh: {j|请在停止状态导入包WPK，现在正在运行 ！|j},
      en: "should import package when stop, but now is run!",
    },
  },
  {
    title: "header-publish-local",
    language: {
      zh: {j|请在停止状态发布本地包，现在正在运行 ！|j},
      en: "should publish local when stop, but now is run!",
    },
  },
  {
    title: "load-asset-file",
    language: {
      zh: {j|上传的资源类型错误，资源类型包括 (.wdb, .glb, .jpg, .jpeg, .png, .zip) ！|j},
      en: "the loaded asset type is error, asset type include (.wdb, .glb, .jpg, .jpeg, .png, .zip)! ",
    },
  },
  {
    title: "load-asset-package",
    language: {
      zh: {j|上传的包类型错误，包类型包括(.wpk) ！|j},
      en: "the loaded package type is error, package type include (.wpk)",
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
      en: "material name shouldn't equal default material name",
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
|];