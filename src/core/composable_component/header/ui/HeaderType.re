type navType =
  | None
  | File
  | Edit
  | Help;

type action =
  | HoverNav(navType)
  | ToggleShowNav(navType)
  | BlurNav
  | ShowEditExportPackageModal
  | HideEditExportPackageModal
  | ShowEditExportSceneModal
  | HideEditExportSceneModal
  | ShowHelpVersionModal
  | HideHelpVersionModal;