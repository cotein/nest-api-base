export const fileFilter = (
  request: Express.Request,
  file: Express.Multer.File,
  callback: Function,
): void => {
  if (!file) return callback(new Error('File is empty'), false);

  const fileExtension = file.originalname.split('.').pop();
  const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];

  if (!allowedExtensions.includes(fileExtension)) {
    return callback(new Error('File extension is not allowed'), false);
  }

  if (allowedExtensions.includes(fileExtension)) {
    return callback(null, true);
  }

  return callback(null, true);
};
