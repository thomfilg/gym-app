import * as path from 'path';

// Get the uploaded file in an aray buffer from the request
export async function getUploadedFileInArrayBuffer(
  request: Request,
): Promise<{ fileExtension: string; fileName: string; file: File; formData: FormData }> {
  const formData = await request.formData();
  const file = formData.get('my-file');

  if (!(file instanceof File)) {
    throw new Error('Invalid file');
  }
  // Get the file content
  await file.arrayBuffer();
  const fileName = file.name;
  const fileExtension = path.extname(fileName);

  return { fileExtension, fileName, file, formData };
}
