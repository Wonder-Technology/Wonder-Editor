"use strict";

module.exports = {

  types: [
    { value: "feat", name: "feat:     A new feature" },
    { value: "fix", name: "fix:      A bug fix" },
    { value: "docs", name: "docs:     Documentation only changes" },
    { value: "style", name: "style:    Changes that do not affect the meaning of the code\n            (white-space, formatting, missing semi-colons, etc)" },
    { value: "refactor", name: "refactor: A code change that neither fixes a bug nor adds a feature" },
    { value: "perf", name: "perf:     A code change that improves performance" },
    { value: "test", name: "test:     Adding missing tests" },
    { value: "chore", name: "chore:    Changes to the build process or auxiliary tools\n            and libraries such as documentation generation" },
    { value: "revert", name: "revert:   Revert to a commit" }
  ],

  scopes: [
    { name: "pwa" },
    { name: "hotkey" },
    { name: "focus" },
    { name: "scene-view" },
    { name: "scene-tree" },
    { name: "left-header" },
    { name: "redo-undo" },
    { name: "inspector" },
    { name: "picking" },
    { name: "asset" },
    { name: "package" },
    { name: "scene" },
    { name: "publish" },
    { name: "light" },
    { name: "lightMaterial" },
    { name: "imgui" },
    { name: "event" },
    { name: "engine" },
    { name: "camera" },
    { name: "transform" },
    { name: "state" },
    { name: "component" },
    { name: "console" },
    { name: "ui" },
    { name: "config" },
    { name: "job" },
    { name: "controller" }
  ],


  // it needs to match the value for field type. Eg.: "fix"
  scopeOverrides: {
    test: [
      { name: "contract" },
      { name: "unit-test" },
      { name: "integration-test" },
      { name: "unit-integration-test" },
      { name: "coverage" }
    ],
    refactor: [
      { name: "move" },
      { name: "rename" },
      { name: "duplicate" },
      { name: "dead-code" },
      { name: "code-climate" },
      { name: "rewrite" }
    ],
    chore: [
      { name: "review" },
      { name: "ci" },
      { name: "todo" },
      { name: "code-climate" },
      { name: "publish" },
      { name: "bumped" },
      { name: "readme" },
      { name: "webpack" },
      { name: "version" }
    ]
  },
  // override the messages, defaults are as follows
  messages: {
    type: "Select the type of change that you\"re committing:",
    scope: "\nDenote the SCOPE of this change (optional):",
    // used if allowCustomScopes is true
    customScope: "Denote the SCOPE of this change:",
    subject: "Write a SHORT, IMPERATIVE tense description of the change:\n",
    body: "Provide a LONGER description of the change (optional). Use " | " to break new line:\n",
    breaking: "List any BREAKING CHANGES (optional):\n",
    footer: "List any ISSUES CLOSED by this change (optional). E.g.: #31, #34:\n",
    confirmCommit: "Are you sure you want to proceed with the commit above?"
  },

  allowCustomScopes: true,
  allowBreakingChanges: ["feat", "fix"]

};