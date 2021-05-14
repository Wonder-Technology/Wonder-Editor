var path = require("path");

module.exports = {
    resolveSnapshotPath: (testPath, snapshotExtension) => {
        var testPath = testPath.replace("lib/js/", "");

        return path.join(
            path.join(path.dirname(testPath), '__snapshots__'),
            path.basename(testPath) + snapshotExtension,
        )
    },
    resolveTestPath: (snapshotFilePath, snapshotExtension) => {
        var snapshotFilePath = snapshotFilePath.replace("Wonder-Editor/test", "Wonder-Editor/lib/js/test");

        return path.resolve(
            path.dirname(snapshotFilePath),
            '..',
            path.basename(snapshotFilePath, snapshotExtension),
        )
    },
    testPathForConsistencyCheck: "/Users/y/Github/Wonder-Editor/lib/js/test/unit/atom_component/fileInput/FileInput_test.js"
};