import { v4 as uuidv4 } from 'uuid';

export const fileNamer = (
  request: Express.Request,
  file: Express.Multer.File,
  callback: Function,
): void => {
  if (!file) return callback(new Error('File is empty'), false);

  const fileExtension = file.mimetype.split('/')[1];
  const fileName = `${uuidv4()}.${fileExtension}`;

  return callback(null, fileName);
};
