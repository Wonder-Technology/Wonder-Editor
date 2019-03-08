var path = require("path");

module.exports = {
    resolveSnapshotPath: (testPath, snapshotExtension) => {
        var testPath = testPath.replace("lib/es6_global/", "");

        return path.join(
            path.join(path.dirname(testPath), '__snapshots__'),
            path.basename(testPath) + snapshotExtension,
        )
    },
    resolveTestPath: (snapshotFilePath, snapshotExtension) => {
        var snapshotFilePath = snapshotFilePath.replace("Wonder-Editor/test", "Wonder-Editor/lib/es6_global/test");

        return path.resolve(
            path.dirname(snapshotFilePath),
            '..',
            path.basename(snapshotFilePath, snapshotExtension),
        )
    },
    testPathForConsistencyCheck: "/Users/y/Github/Wonder-Editor/lib/es6_global/test/unit/atom_component/fileInput/FileInput_test.js"
};