package recruitmentapi;

import com.amazonaws.client.builder.AwsClientBuilder;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClientBuilder;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.document.DynamoDB;

public class DynamoDBAdapter {
    private final DynamoDB dynamoDB;
    private final DynamoDBMapper mapper;

    private DynamoDBAdapter() {
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
        dynamoDB = new DynamoDB(amazonDynamoDB);
        mapper = new DynamoDBMapper(amazonDynamoDB);
    }
    private static DynamoDBAdapter adapter = null;
    public static DynamoDBMapper getMapper() {
       if (adapter == null) {
           adapter = new DynamoDBAdapter();
       }

       return adapter.mapper;
    }
}
