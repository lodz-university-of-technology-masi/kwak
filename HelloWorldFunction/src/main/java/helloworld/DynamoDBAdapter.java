package helloworld;

import com.amazonaws.client.builder.AwsClientBuilder;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClientBuilder;
import com.amazonaws.services.dynamodbv2.document.DynamoDB;

public class DynamoDBAdapter {
    private final DynamoDB dynamoDB;

    public DynamoDBAdapter() {
        AmazonDynamoDBClientBuilder builder = AmazonDynamoDBClientBuilder
                .standard();

        if (System.getenv("AWS_SAM_LOCAL") != null) {
            builder.withEndpointConfiguration(
                    new AwsClientBuilder.EndpointConfiguration("http://host.docker.internal:8000", "us-east-1")
            );
        } else {
            builder.withRegion(System.getenv("AWS_REGION"));
        }

        AmazonDynamoDB amazonDynamoDB = builder.build();
        dynamoDB = new DynamoDB(amazonDynamoDB);
    }

    public DynamoDB getDynamoDB() {
        return dynamoDB;
    }
}
