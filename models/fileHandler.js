module.exports = {
    sitesArray: [],
    filename: String,
    filepath: String,
    uploadFile: function (file, path, name) {
        file.mv(path + name, function (error) {
            if (error) {
                console.log('Could not upload the file');
                console.log(error);
            } else {
                console.log(name + " " + 'has been uploaded');
            }
        });
    },

    fileToArray: function (arrOne, arrTwo) {
        for (let i = 0; i < arrOne.length; i++) {
            arrTwo[i] = arrOne[i];
        }
    },

    deleteFile: function (fs, path, name) {
        let filePath = path + name;
        try {
            fs.unlinkSync(filePath);
            console.log(`${name} file has been deleted from the directory ${path}`);
        } catch (error) {
            console.log(error);
        }
    }
}