package recruitmentapi.services;

import com.amazonaws.HttpMethod;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.GeneratePresignedUrlRequest;
import recruitmentapi.model.PresignedURL;

import java.net.URL;
import java.util.UUID;

public class S3Service {
    private AmazonS3 s3 = AmazonS3ClientBuilder.defaultClient();
    private final String BUCKET_NAME = "th7nder-cp";

    public PresignedURL generatePresignedURL() {
        java.util.Date expiration = new java.util.Date();
        long expTimeMillis = expiration.getTime();
        expTimeMillis += 1000 * 60 * 60;
        expiration.setTime(expTimeMillis);

        String key = UUID.randomUUID().toString();
        URL url = s3.generatePresignedUrl(
                new GeneratePresignedUrlRequest(BUCKET_NAME, key)
                        .withMethod(HttpMethod.PUT)
                        .withExpiration(expiration)
                        .withContentType("text/csv")
        );

        return new PresignedURL(key, url.toString());
    }

}
