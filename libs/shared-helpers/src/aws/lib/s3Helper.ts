import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

import { logger } from '../../utils';

export async function uploadFileToS3 (bucketName: string, key: string, fileContent: string) {
  // Create S3 client
  const s3Client = new S3Client({});

  // Set upload parameters
  const params = {
    Body: fileContent,
    Bucket: bucketName,
    Key: key,
  };

  try {
    // Upload file to S3
    const command = new PutObjectCommand(params);
    const response = await s3Client.send(command);
    logger.info('File uploaded successfully', response);
  } catch (error) {
    logger.error('Error uploading file', error);
  }
}
