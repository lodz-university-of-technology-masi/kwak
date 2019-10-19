package helloworld;

import com.amazonaws.client.builder.AwsClientBuilder;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClientBuilder;
import com.amazonaws.services.dynamodbv2.document.DynamoDB;
import com.amazonaws.services.dynamodbv2.document.Item;
import com.amazonaws.services.dynamodbv2.document.Table;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;

import java.util.HashMap;
import java.util.Map;

public class GetTests implements RequestHandler<Object, Object> {
    private final String TABLE_NAME = "Tests";
    private DynamoDB dynamoDB;

    @Override
    public Object handleRequest(Object input, Context context) {
        initDynamoDbClient();

        Table table = dynamoDB.getTable(TABLE_NAME);
        Item item = new Item()
                .withPrimaryKey("Id", "1")
                .withString("NameXDD", "Najs name");

        table.putItem(item);

        Map<String, String> headers = new HashMap<>();
        headers.put("Content-Type", "application/json");
        String output = table.getItem("Id", "1", "NameXDD", null).toJSONPretty();
        return new GatewayResponse(output, headers, 200);
    }

    private void initDynamoDbClient() {
        AmazonDynamoDB builder = AmazonDynamoDBClientBuilder
                .standard()
                .withEndpointConfiguration(
                        new AwsClientBuilder.EndpointConfiguration("http://docker.for.mac.localhost:8000", "us-east-1")
                ).build();
        dynamoDB = new DynamoDB(builder);
    }
}
