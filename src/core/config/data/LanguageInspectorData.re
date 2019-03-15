open LanguageDataType;

let inspector_language_array = [|
  {
    title: "name-describe",
    language: {
      zh: {j|自定义名词|j},
      en: "name for yourself",
    },
  },
  {
    title: "transform-describe",
    language: {
      zh: {j|自定义名词|j},
      en: "name for yourself",
    },
  },
  {
    title: "position-describe",
    language: {
      zh: {j|自定义名词|j},
      en: "name for yourself",
    },
  },
  {
    title: "rotation-describe",
    language: {
      zh: {j|自定义名词|j},
      en: "name for yourself",
    },
  },
  {
    title: "scale-describe",
    language: {
      zh: {j|自定义名词|j},
      en: "name for yourself",
    },
  },
  {
    title: "render-group-describe",
    language: {
      zh: {j|自定义名词|j},
      en: "name for yourself",
    },
  },
  {
    title: "mesh-render-describe",
    language: {
      zh: {j|自定义名词|j},
      en: "name for yourself",
    },
  },
  {
    title: "draw-mode-describe",
    language: {
      zh: {j|自定义名词|j},
      en: "name for yourself",
    },
  },
  {
    title: "material-type-describe",
    language: {
      zh: {j|自定义名词|j},
      en: "name for yourself",
    },
  },
  {
    title: "material-describe",
    language: {
      zh: {j|自定义名词|j},
      en: "name for yourself",
    },
  },
  {
    title: "material-name-describe",
    language: {
      zh: {j|材质名词|j},
      en: "name for yourself",
    },
  },
  {
    title: "material-type-describe",
    language: {
      zh: {j|自定义名词|j},
      en: "name for yourself",
    },
  },
  {
    title: "material-color-describe",
    language: {
      zh: {j|材质类型|j},
      en: "name for yourself",
    },
  },
  {
    title: "material-map-describe",
    language: {
      zh: {j|自定义名词|j},
      en: "name for yourself",
    },
  },
  {
    title: "material-shininess-describe",
    language: {
      zh: {j|自定义名词|j},
      en: "name for yourself",
    },
  },
  {
    title: "geometry-type-describe",
    language: {
      zh: {j|自定义名词|j},
      en: "name for yourself",
    },
  },
  {
    title: "geometry-describe",
    language: {
      zh: {j|geometry名词|j},
      en: "name for yourself",
    },
  },
  {
    title: "camera-group-describe",
    language: {
      zh: {j|自定义名词|j},
      en: "name for yourself",
    },
  },
  {
    title: "camera-view-describe",
    language: {
      zh: {j|自定义名词|j},
      en: "name for yourself",
    },
  },
  {
    title: "view-type-describe",
    language: {
      zh: {j|自定义名词|j},
      en: "name for yourself",
    },
  },
  {
    title: "current-camera-describe",
    language: {
      zh: {j|自定义名词|j},
      en: "name for yourself",
    },
  },
  {
    title: "camera-projection-describe",
    language: {
      zh: {j|自定义名词|j},
      en: "name for yourself",
    },
  },
  {
    title: "projection-type-describe",
    language: {
      zh: {j|自定义名词|j},
      en: "name for yourself",
    },
  },
  {
    title: "projection-near-describe",
    language: {
      zh: {j|自定义名词|j},
      en: "name for yourself",
    },
  },
  {
    title: "projection-far-describe",
    language: {
      zh: {j|自定义名词|j},
      en: "name for yourself",
    },
  },
  {
    title: "projection-fovy-describe",
    language: {
      zh: {j|自定义名词|j},
      en: "name for yourself",
    },
  },
  {
    title: "arcball-camera-describe",
    language: {
      zh: {j|自定义名词|j},
      en: "name for yourself",
    },
  },
  {
    title: "arcball-distance-describe",
    language: {
      zh: {j|自定义名词|j},
      en: "name for yourself",
    },
  },
  {
    title: "arcball-min-distance-describe",
    language: {
      zh: {j|自定义名词|j},
      en: "name for yourself",
    },
  },
  {
    title: "arcball-target-describe",
    language: {
      zh: {j|自定义名词|j},
      en: "name for yourself",
    },
  },
  {
    title: "arcball-phi-describe",
    language: {
      zh: {j|自定义名词|j},
      en: "name for yourself",
    },
  },
  {
    title: "arcball-theta-describe",
    language: {
      zh: {j|自定义名词|j},
      en: "name for yourself",
    },
  },
  {
    title: "light-describe",
    language: {
      zh: {j|自定义名词|j},
      en: "name for yourself",
    },
  },
  {
    title: "light-type-describe",
    language: {
      zh: {j|自定义名词|j},
      en: "name for yourself",
    },
  },
  {
    title: "light-color-describe",
    language: {
      zh: {j|自定义名词|j},
      en: "name for yourself",
    },
  },
  {
    title: "light-intensity-describe",
    language: {
      zh: {j|自定义名词|j},
      en: "name for yourself",
    },
  },
  {
    title: "light-constant-describe",
    language: {
      zh: {j|自定义名词|j},
      en: "name for yourself",
    },
  },
  {
    title: "light-linear-describe",
    language: {
      zh: {j|自定义名词|j},
      en: "name for yourself",
    },
  },
  {
    title: "light-quadratic-describe",
    language: {
      zh: {j|自定义名词|j},
      en: "name for yourself",
    },
  },
  {
    title: "light-range-describe",
    language: {
      zh: {j|自定义名词|j},
      en: "name for yourself",
    },
  },
  {
    title: "texture-describe",
    language: {
      zh: {j|自定义名词|j},
      en: "name for yourself",
    },
  },
  {
    title: "texture-wraps-describe",
    language: {
      zh: {j|自定义名词|j},
      en: "name for yourself",
    },
  },
  {
    title: "texture-wrapt-describe",
    language: {
      zh: {j|自定义名词|j},
      en: "name for yourself",
    },
  },
  {
    title: "texture-mag-filter-describe",
    language: {
      zh: {j|自定义名词|j},
      en: "name for yourself",
    },
  },
  {
    title: "texture-min-filter-describe",
    language: {
      zh: {j|自定义名词|j},
      en: "name for yourself",
    },
  },
|];