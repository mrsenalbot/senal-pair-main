const mega = require("megajs");

const auth = {
    email: 'sanarathnas0@gmail.com',
    password: 'Sena11@#usn',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.246'
};

const upload = (data, name) => {
    return new Promise((resolve, reject) => {
        const storage = new mega.Storage(auth, () => {
            const file = storage.upload({ name, allowUploadBuffering: true });

            data.pipe(file);

            file.on('complete', () => {
                const link = `https://mega.nz/file/${file.downloadId}#${file.key}`;
                storage.close(); // clean up connection
                resolve(link);
            });

            file.on('error', (err) => {
                storage.close(); // still clean up on error
                reject(err);
            });
        });

        storage.on('error', (err) => {
            reject(err);
        });
    });
};

module.exports = { upload };
