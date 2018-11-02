type navType =
  | None
  | File
  | Edit
  | Help;

type action =
  | HoverNav(navType)
  | ToggleShowNav(navType)
  | BlurNav
  | ShowEditExportModal
  | HideEditExportModal
  | ShowHelpVersionModal
  | HideHelpVersionModal;