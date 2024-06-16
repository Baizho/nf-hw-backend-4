import { S3 } from '@aws-sdk/client-s3'
import { Upload } from '@aws-sdk/lib-storage'

export const s3 = new S3({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
  }
})

export const listBuckets = async () => {
  await s3
    .listBuckets()
    .then((res) => console.log(res.Buckets))
    .catch((err) => console.log(`Error listing buckets: ${err.Code}`))
}

export const createBucket = async (bucketName: string) => {
  await s3
    .createBucket({ Bucket: bucketName })
    .then((res) => console.log(res))
    .catch((err) => console.log(`Error creating bucket: ${err.Code}`))
}

