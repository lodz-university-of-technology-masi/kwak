package recruitmentapi.services.impl;

import com.amazonaws.HttpMethod;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.GeneratePresignedUrlRequest;
import com.amazonaws.services.s3.model.GetObjectRequest;
import com.amazonaws.services.s3.model.S3Object;
import recruitmentapi.model.PresignedURL;
import recruitmentapi.services.S3Service;

import java.net.URL;
import java.util.UUID;

public class S3ServiceImpl implements S3Service {
    private AmazonS3 s3 = AmazonS3ClientBuilder.defaultClient();
    private final String BUCKET_NAME = "th7nder-cp";

    @Override
    public PresignedURL generatePresignedURL(HttpMethod httpMethod, String contentType) {
        java.util.Date expiration = new java.util.Date();
        long expTimeMillis = expiration.getTime();
        expTimeMillis += 1000 * 60 * 60;
        expiration.setTime(expTimeMillis);

        String key = UUID.randomUUID().toString();
        URL url = s3.generatePresignedUrl(
                new GeneratePresignedUrlRequest(BUCKET_NAME, key)
                        .withMethod(httpMethod)
                        .withExpiration(expiration)
                        .withContentType(contentType)
        );

        return new PresignedURL(key, url.toString());
    }

    @Override
    public S3Object openFile(String key) {
        return s3.getObject(new GetObjectRequest(BUCKET_NAME, key));
    }

}
