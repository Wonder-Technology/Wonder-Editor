type navType =
  | None
  | File
  | Edit
  | Publish
  | Help;

type action =
  | HoverNav(navType)
  | ToggleShowNav(navType)
  | BlurNav
  | ShowFileControlsModal
  | HideFileControlsModal
  | ShowEditExportPackageModal
  | HideEditExportPackageModal
  | ShowEditExportSceneModal
  | HideEditExportSceneModal
  | ShowPublishLocalModal
  | HidePublishLocalModal
  | ShowHelpVersionModal
  | HideHelpVersionModal;