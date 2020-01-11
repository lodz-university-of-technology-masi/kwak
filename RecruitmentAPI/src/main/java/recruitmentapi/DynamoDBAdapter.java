package recruitmentapi;

import com.amazonaws.client.builder.AwsClientBuilder;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClientBuilder;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.document.DynamoDB;

public class DynamoDBAdapter {
    private final DynamoDBMapper mapper;

    public DynamoDBAdapter() {
        AmazonDynamoDBClientBuilder builder = AmazonDynamoDBClientBuilder
                .standard();

        if (System.getenv("AWS_SAM_LOCAL") != null) {
            builder.withEndpointConfiguration(
                    new AwsClientBuilder.EndpointConfiguration("http://192.168.99.100:8000", "eu-central-1")
            );
        } else {
            builder.withRegion(System.getenv("AWS_REGION"));
        }

        AmazonDynamoDB amazonDynamoDB = builder.build();
        mapper = new DynamoDBMapper(amazonDynamoDB);
    }

    public DynamoDBMapper getMapper() {
        return mapper;
    }
}
