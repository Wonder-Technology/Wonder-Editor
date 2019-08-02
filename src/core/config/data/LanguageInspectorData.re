open LanguageDataType;

let inspector_language_array = [|
  {
    title: "name-describe",
    language: {
      zh: {j|GameObject的名字|j},
      en: "gameObject's name",
    },
  },
  {
    title: "transform-describe",
    language: {
      zh: {j|Transform|j},
      en: "Transform",
    },
  },
  {
    title: "position-describe",
    language: {
      zh: {j|本地坐标系中的位置|j},
      en: "position in local coordinate system",
    },
  },
  {
    title: "rotation-describe",
    language: {
      zh: {j|本地坐标系中的旋转角度|j},
      en: "euler angle in local coordinate system",
    },
  },
  {
    title: "scale-describe",
    language: {
      zh: {j|本地坐标系中的缩放大小|j},
      en: "scale in local coordinate system",
    },
  },
  {
    title: "render-group-describe",
    language: {
      zh: {j|Render Group，决定GameObject是否以及怎样被渲染|j},
      en: "Render Group decide how to render the gameObject and whether to render it or not ",
    },
  },
  {
    title: "mesh-render-describe",
    language: {
      zh: {j|MeshRenderer|j},
      en: "MeshRenderer",
    },
  },
  {
    title: "draw-mode-describe",
    language: {
      zh: {j|绘制模式|j},
      en: "draw mode",
    },
  },
  {
    title: "scriptEventFunction-name-describe",
    language: {
      zh: {j|Script EventFunction的名字|j},
      en: "script eventFunction's name",
    },
  },
  {
    title: "scriptAttribute-name-describe",
    language: {
      zh: {j|Script Attribute的名字|j},
      en: "script attribute's name",
    },
  },
  {
    title: "scriptAttribute-field-name-describe",
    language: {
      zh: {j|Script Attribute field的名字|j},
      en: "script attribute's field's name",
    },
  },
  {
    title: "add-scriptAttribute-field",
    language: {
      zh: {j|添加Script Attribute Field|j},
      en: "Add script attribute's field",
    },
  },
  {
    title: "material-describe",
    language: {
      zh: {j|Material|j},
      en: "Material",
    },
  },
  {
    title: "material-material-describe",
    language: {
      zh: {j|使用的material，来自默认的material和material资产|j},
      en: "material in use which is default or material asset",
    },
  },
  {
    title: "material-name-describe",
    language: {
      zh: {j|Material的名字|j},
      en: "material's name",
    },
  },
  {
    title: "material-type-describe",
    language: {
      zh: {j|Material的类型|j},
      en: "material's type",
    },
  },
  {
    title: "material-diffuseColor-describe",
    language: {
      zh: {j|Material的Diffuse颜色|j},
      en: "material's diffuse color",
    },
  },
  {
    title: "material-diffuseMap-describe",
    language: {
      zh: {j|Material的Diffuse纹理|j},
      en: "material's diffuse map",
    },
  },
  {
    title: "material-shininess-describe",
    language: {
      zh: {j|Material的亮度|j},
      en: "material's shininess",
    },
  },
  {
    title: "geometry-describe",
    language: {
      zh: {j|Geometry|j},
      en: "Geometry",
    },
  },
  {
    title: "geometry-geometry-describe",
    language: {
      zh: {j|使用的geometry，来自默认的geometry和模型的geometry|j},
      en: "geometry in use which is default or model's geometry",
    },
  },
  {
    title: "camera-group-describe",
    language: {
      zh: {j|Camera Group，设置GameObject的相机组件|j},
      en: "Camera Group set the gameObject's camera related components",
    },
  },
  {
    title: "camera-view-describe",
    language: {
      zh: {j|CameraView|j},
      en: "CameraView",
    },
  },
  {
    title: "view-type-describe",
    language: {
      zh: {j|类型|j},
      en: "type",
    },
  },
  {
    title: "current-camera-describe",
    language: {
      zh: {j|设置为当前使用的相机。场景中只能有一个使用的相机。设置后，会取消其它使用的相机。|j},
      en: "set the camera currently in use. only one camera can be used in the scene. after setting, other cameras will be cancelled.",
    },
  },
  {
    title: "camera-projection-describe",
    language: {
      zh: {j|Projection组件，负责投影矩阵相关的属性|j},
      en: "Projection component, responsible for perspective matrix's attributes.",
    },
  },
  {
    title: "projection-type-describe",
    language: {
      zh: {j|投影矩阵的类型|j},
      en: "perspective matrix's type",
    },
  },
  {
    title: "projection-near-describe",
    language: {
      zh: {j|近平面距离|j},
      en: "up near-plane distance",
    },
  },
  {
    title: "projection-far-describe",
    language: {
      zh: {j|远平面距离|j},
      en: "up far-plane distance",
    },
  },
  {
    title: "projection-fovy-describe",
    language: {
      zh: {j|定义镜头垂直观察范围，以角度为单位|j},
      en: "define the vertical viewing range of the lens in terms of angle",
    },
  },
  {
    title: "fly-cameraController-describe",
    language: {
      zh: {j|自由相机组件|j},
      en: "fly camera controller",
    },
  },
  {
    title: "fly-move-speed-describe",
    language: {
      zh: {j|相机按键移动速度|j},
      en: "distance between camera and target",
    },
  },
  {
    title: "fly-rotate-speed-describe",
    language: {
      zh: {j|相机按键移动速度|j},
      en: "distance between camera and target",
    },
  },
  {
    title: "fly-wheel-speed-describe",
    language: {
      zh: {j|相机按键移动速度|j},
      en: "distance between camera and target",
    },
  },
  {
    title: "arcball-cameraController-describe",
    language: {
      zh: {j|轨道相机组件|j},
      en: "arcball camera controller",
    },
  },
  {
    title: "arcball-distance-describe",
    language: {
      zh: {j|相机到目标的距离|j},
      en: "distance between camera and target",
    },
  },
  {
    title: "arcball-min-distance-describe",
    language: {
      zh: {j|相机到目标的最小距离。如果距离小于该值，距离会被自动设置为该值。|j},
      en: "min distance between camera and target",
    },
  },
  {
    title: "arcball-target-describe",
    language: {
      zh: {j|目标|j},
      en: "target",
    },
  },
  {
    title: "arcball-phi-describe",
    language: {
      zh: {j|水平的弧度|j},
      en: "horizontal radian",
    },
  },
  {
    title: "arcball-theta-describe",
    language: {
      zh: {j|垂直的弧度|j},
      en: "vertical radian",
    },
  },
  {
    title: "light-describe",
    language: {
      zh: {j|Light|j},
      en: "Light",
    },
  },
  {
    title: "light-type-describe",
    language: {
      zh: {j|光的类型，分为方向光、点光源。|j},
      en: "light type",
    },
  },
  {
    title: "light-color-describe",
    language: {
      zh: {j|光的颜色|j},
      en: "light's color",
    },
  },
  {
    title: "light-intensity-describe",
    language: {
      zh: {j|光的强度|j},
      en: "light's intensity",
    },
  },
  {
    title: "light-constant-describe",
    language: {
      zh: {j|点光源衰减的相关属性|j},
      en: "relevant attributes of point light source attenuation",
    },
  },
  {
    title: "light-linear-describe",
    language: {
      zh: {j|点光源衰减的相关属性|j},
      en: "relevant attributes of point light source attenuation",
    },
  },
  {
    title: "light-quadratic-describe",
    language: {
      zh: {j|点光源衰减的相关属性|j},
      en: "relevant attributes of point light source attenuation",
    },
  },
  {
    title: "light-range-describe",
    language: {
      zh: {j|点光源的范围|j},
      en: "point light's range",
    },
  },
  {
    title: "script-describe",
    language: {
      zh: {j|Script|j},
      en: "Script",
    },
  },
  {
    title: "script-add-scriptEventFunction",
    language: {
      zh: {j|添加script event function|j},
      en: "Add script event function",
    },
  },
  {
    title: "script-use-scriptEventFunction-describe",
    language: {
      zh: {j|使用的script event function资产|j},
      en: "script event function asset in use",
    },
  },
  {
    title: "script-add-scriptAttribute",
    language: {
      zh: {j|添加script attribute|j},
      en: "Add script attribute",
    },
  },
  {
    title: "script-use-scriptAttribute-describe",
    language: {
      zh: {j|使用的script attribute资产|j},
      en: "script attribute asset in use",
    },
  },
  {
    title: "script-scriptAttribute-field-name-describe",
    language: {
      zh: {j|field的名称|j},
      en: "field's name",
    },
  },
  {
    title: "script-scriptAttribute-field-type-describe",
    language: {
      zh: {j|field的类型|j},
      en: "field's type",
    },
  },
  {
    title: "script-scriptAttribute-field-defaultValue-describe",
    language: {
      zh: {j|field的默认值|j},
      en: "field's default value",
    },
  },
  {
    title: "texture-name-describe",
    language: {
      zh: {j|纹理的名字|j},
      en: "texture's name",
    },
  },
  {
    title: "texture-wraps-describe",
    language: {
      zh: {j|纹理水平方向的重复模式|j},
      en: "repetitive pattern in horizontal direction of texture",
    },
  },
  {
    title: "texture-wrapt-describe",
    language: {
      zh: {j|纹理垂直方向的重复模式|j},
      en: "repetitive pattern in vertical direction of texture",
    },
  },
  {
    title: "texture-mag-filter-describe",
    language: {
      zh: {j|定义当一个纹理单元（texel）覆盖多个像素点时纹理如何采样|j},
      en: "defines how textures are sampled when a texel covers multiple pixels",
    },
  },
  {
    title: "texture-min-filter-describe",
    language: {
      zh: {j|定义当一个纹理单元（texel）不足以覆盖单个像素点时纹理如何采样|j},
      en: "defines how textures are sampled when a texel is insufficient to cover a single pixel",
    },
  },
  {
    title: "cubemap-name-describe",
    language: {
      zh: {j|cubemap纹理的名字|j},
      en: "cubemap's name",
    },
  },
  {
    title: "cubemap-right-describe",
    language: {
      zh: {j|cubemap +X source|j},
      en: "cubemap +X source",
    },
  },
  {
    title: "cubemap-left-describe",
    language: {
      zh: {j|cubemap -X source|j},
      en: "cubemap -X source",
    },
  },
  {
    title: "cubemap-top-describe",
    language: {
      zh: {j|cubemap +Y source|j},
      en: "cubemap +Y source",
    },
  },
  {
    title: "cubemap-bottom-describe",
    language: {
      zh: {j|cubemap -Y source|j},
      en: "cubemap -Y source",
    },
  },
  {
    title: "cubemap-front-describe",
    language: {
      zh: {j|cubemap +Z source|j},
      en: "cubemap +Z source",
    },
  },
  {
    title: "cubemap-back-describe",
    language: {
      zh: {j|cubemap -Z source|j},
      en: "cubemap -Z source",
    },
  },
  {
    title: "cubemap-wraps-describe",
    language: {
      zh: {j|cubemap纹理水平方向的重复模式|j},
      en: "repetitive pattern in horizontal direction of cubemap",
    },
  },
  {
    title: "cubemap-wrapt-describe",
    language: {
      zh: {j|cubemap纹理垂直方向的重复模式|j},
      en: "repetitive pattern in vertical direction of cubemap",
    },
  },
  {
    title: "cubemap-mag-filter-describe",
    language: {
      zh: {j|定义当一个纹理单元（texel）覆盖多个像素点时纹理如何采样|j},
      en: "defines how cubemaps are sampled when a texel covers multiple pixels",
    },
  },
  {
    title: "cubemap-min-filter-describe",
    language: {
      zh: {j|定义当一个纹理单元（texel）不足以覆盖单个像素点时纹理如何采样|j},
      en: "defines how cubemaps are sampled when a texel is insufficient to cover a single pixel",
    },
  },
  {
    title: "add-component",
    language: {
      zh: {j|添加组件|j},
      en: "Add Component",
    },
  },
|];