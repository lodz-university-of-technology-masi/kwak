package recruitmentapi.services;

import com.amazonaws.HttpMethod;
import com.amazonaws.services.s3.model.S3Object;

public interface S3Service {
    PresignedURL generatePresignedURL(HttpMethod httpMethod, String contentType);

    S3Object openFile(String key);
}
