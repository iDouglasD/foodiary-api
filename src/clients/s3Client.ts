import { S3Client } from "@aws-sdk/client-s3";

const region = process.env.AWS_REGION || process.env.AWS_DEFAULT_REGION || "us-east-1"
export const s3Client = new S3Client({ region })