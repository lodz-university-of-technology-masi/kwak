package recruitmentapi.services;

import com.amazonaws.HttpMethod;
import com.amazonaws.services.s3.model.S3Object;

public interface S3Service {
    PresignedURL generatePresignedURL(HttpMethod httpMethod, String contentType);

    S3Object openFile(String key);

    class PresignedURL {
        private String key;
        private String url;

        public PresignedURL(String key, String url) {
            this.key = key;
            this.url = url;
        }

        public String getKey() {
            return key;
        }

        public void setKey(String key) {
            this.key = key;
        }

        public String getUrl() {
            return url;
        }

        public void setUrl(String url) {
            this.url = url;
        }
    }
}
