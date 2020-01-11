package recruitmentapi.services;

import com.amazonaws.HttpMethod;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.GeneratePresignedUrlRequest;

import java.net.URL;
import java.util.UUID;

public class S3Service {
    private AmazonS3 s3 = AmazonS3ClientBuilder.defaultClient();
    private final String BUCKET_NAME = "th7nder-cp";

    public URL generatePresignedURL() {
        java.util.Date expiration = new java.util.Date();
        long expTimeMillis = expiration.getTime();
        expTimeMillis += 1000 * 60 * 60;
        expiration.setTime(expTimeMillis);

        return s3.generatePresignedUrl(
                new GeneratePresignedUrlRequest(BUCKET_NAME, UUID.randomUUID().toString())
                        .withMethod(HttpMethod.PUT)
                        .withExpiration(expiration)
        );
    }

}
