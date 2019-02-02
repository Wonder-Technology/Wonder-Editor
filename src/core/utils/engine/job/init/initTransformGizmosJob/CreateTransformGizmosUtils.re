let setToEditorState =
    (
      (
        wholeGizmo,
        (xAxisGizmo, yAxisGizmo, zAxisGizmo),
        (xyPlaneGizmo, xzPlaneGizmo, yzPlaneGizmo),
      ),
      editorState: EditorType.editorState,
    )
    : EditorType.editorState => {
  ...editorState,
  sceneViewRecord: {
    ...editorState.sceneViewRecord,
    transformGizmoData:
      Some({
        currentGizmoType: Translation,
        translationGizmoData: {
          translationWholeGizmo: wholeGizmo,
          translationXAxisGizmo: xAxisGizmo,
          translationYAxisGizmo: yAxisGizmo,
          translationZAxisGizmo: zAxisGizmo,
          translationXYPlaneGizmo: xyPlaneGizmo,
          translationXZPlaneGizmo: xzPlaneGizmo,
          translationYZPlaneGizmo: yzPlaneGizmo,
          isTranslationXAxisGizmoSelected: false,
          isTranslationYAxisGizmoSelected: false,
          isTranslationZAxisGizmoSelected: false,
          isTranslationXYPlaneGizmoSelected: false,
          isTranslationXZPlaneGizmoSelected: false,
          isTranslationYZPlaneGizmoSelected: false,
          currentSceneTreeNodeStartPoint: None,
          axisGameObjectStartPoint: None,
          pickStartPoint: None,
        },
      }),
  },
};