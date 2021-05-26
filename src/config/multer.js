const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

module.exports = {

    /**
     * Config Path files destination
     */
    dest: path.resolve(__dirname, '..', '..', 'tmp', 'uploads'),

    /**
     * Storage config
     */
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname, '..', '..', 'tmp', 'uploads'))
        },

        filename: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash) => {
                if(err) cb(err);

                const filename = `${hash.toString('hex')}-${file.originalname}`;

                cb(null, filename);
            })
        }
    }),


    /**
     * Config files limits
     */
    limits: {
        fileSize: 50 * 1024 * 1024
    },

    /**
     * Filter type file
     */

    fileFilter: (req, file, cb) => {
        const allowedMimes = [

            /**
             * Images filter
             */

            // 'image/jpeg',
            // 'image/pjped',
            // 'image/png',
            // 'image/git'


            /**
             * PDF
             */
            'application/pdf',


            /**
             * Videos filter
             */
            'video/mp4',
            'video/x-m4v',
            'video/*'
            
        ]

        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Invalid file type"));
        }
    }

}