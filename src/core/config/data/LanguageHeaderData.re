open LanguageDataType;

let header_language_array = [|
  {
    title: "header-file",
    language: {
      zh: {j|文件|j},
      en: "File",
    },
  },
  {
    title: "file-undo",
    language: {
      zh: {j|撤销|j},
      en: "Undo",
    },
  },
  {
    title: "file-redo",
    language: {
      zh: {j|重做|j},
      en: "Redo",
    },
  },
  {
    title: "file-controls",
    language: {
      zh: {j|控制|j},
      en: "Controls",
    },
  },
  {
    title: "file-save",
    language: {
      zh: {j|保存场景|j},
      en: "Save Scene",
    },
  },
  {
    title: "file-new-scene",
    language: {
      zh: {j|创建新的场景|j},
      en: "New Scene",
    },
  },
  {
    title: "header-edit",
    language: {
      zh: {j|编辑|j},
      en: "Edit",
    },
  },
  {
    title: "edit-import-package",
    language: {
      zh: {j|导入包|j},
      en: "Import Package",
    },
  },
  {
    title: "edit-export-package",
    language: {
      zh: {j|导出包|j},
      en: "Export Package",
    },
  },
  {
    title: "edit-export-scene",
    language: {
      zh: {j|导出场景|j},
      en: "Export Scene",
    },
  },
  {
    title: "header-publish",
    language: {
      zh: {j|发布|j},
      en: "Publish",
    },
  },
  {
    title: "publish-local",
    language: {
      zh: {j|本地包|j},
      en: "Local",
    },
  },
  {
    title: "header-setting",
    language: {
      zh: {j|设置|j},
      en: "Setting",
    },
  },
  {
    title: "setting-scene",
    language: {
      zh: {j|场景|j},
      en: "Scene",
    },
  },
  {
    title: "setting-scene-ambient",
    language: {
      zh: {j|环境光颜色|j},
      en: "AmbientColor",
    },
  },
  {
    title: "setting-scene-ambient-describe",
    language: {
      zh: {j|设置环境光的颜色。环境光是全局的。|j},
      en: "set ambient color which is global.",
    },
  },
  {
    title: "setting-scene-skybox-cubemap",
    language: {
      zh: {j|天空盒Cubemap|j},
      en: "Skybox Cubemap",
    },
  },
  {
    title: "setting-scene-skybox-cubemap-describe",
    language: {
      zh: {j|设置场景天空盒的Cubemap|j},
      en: "set scene skybox->cubemap",
    },
  },
  {
    title: "header-help",
    language: {
      zh: {j|帮助|j},
      en: "Help",
    },
  },
  {
    title: "help-about",
    language: {
      zh: {j|关于Wonder|j},
      en: "About Wonder",
    },
  },
  {
    title: "header-asset-bundle",
    language: {
      zh: {j|AssetBundle|j},
      en: "AssetBundle",
    },
  },
  {
    title: "generate-single-rab",
    language: {
      zh: {j|创建单个RAB|j},
      en: "Generate Single RAB",
    },
  },
  {
    title: "generate-single-sab",
    language: {
      zh: {j|创建单个SAB|j},
      en: "Generate Single SAB",
    },
  },
  {
    title: "generate-all-ab",
    language: {
      zh: {j|从多个“单个AB”中创建多个AB的zip包|j},
      en: "Generate All AB->zip from multiple 'Single AB'",
    },
  },
  {
    title: "notice-welcome",
    language: {
      zh: {j|欢迎来到Wonder|j},
      en: "Welcome to Wonder",
    },
  },
  {
    title: "welcome-content",
    language: {
      zh: {j|欢迎来到Wonder，我们为您服务～感谢您的信任和支持～|j},
      en: "Welcome to Wonder, We are here to serve you~ Thanks for your trust~",
    },
  },
  {
    title: "notice-version",
    language: {
      zh: {j|版本升级|j},
      en: "Version Upgrade",
    },
  },
  {
    title: "notice-website",
    language: {
      zh: {j|官网|j},
      en: "Website",
    },
  },
  {
    title: "notice-forum",
    language: {
      zh: {j|论坛|j},
      en: "Forum",
    },
  },
  {
    title: "notice-doc",
    language: {
      zh: {j|文档|j},
      en: "Document",
    },
  },
|];