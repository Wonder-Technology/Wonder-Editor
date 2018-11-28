const path = require('path');

const fs = require('fs');

function replaceSnapshotPath(filePath) {
    fs.readFile(filePath, 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        var result = data.replace(/const\sgetSnapshotPath[\w\W]+?;/img, `
        const getSnapshotPath = (exports.getSnapshotPath = testPath => {
              let filePathArray = testPath.split('/')
              filePathArray.splice(5, 2)
              testPath = filePathArray.join('/')
              return _path2.default.join(
                _path2.default.join(_path2.default.dirname(testPath), '__snapshots__'), _path2.default.basename(testPath) + '.' + SNAPSHOT_EXTENSION)
            }); `
        );

        fs.writeFile(filePath, result, 'utf8', function (err) {
            if (err) return console.log(err);
        });
    });
};

const filePath = path.join(__dirname, "..", "..", "..", 'node_modules/jest-snapshot/build/utils.js');


module.exports = async function () {
    console.log(filePath)

    replaceSnapshotPath(filePath)
};