// TODO: Configurar Multer para upload
// const multer = require('multer');
//
// const storage = multer.diskStorage({
//   destination: 'uploads/',
//   filename: (req, file, cb) => {
//     const uniqueName = Date.now() + '-' + file.originalname;
//     cb(null, uniqueName);
//   }
// });
//
// const fileFilter = (req, file, cb) => {
//   const allowedTypes = ['image/jpeg', 'image/png'];
//   if (allowedTypes.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(new Error('Tipo de arquivo inválido'), false);
//   }
// };
//
// const upload = multer({
//   storage,
//   fileFilter,
//   limits: { fileSize: 2 * 1024 * 1024 } // 2MB
// });
//
// module.exports = upload;

