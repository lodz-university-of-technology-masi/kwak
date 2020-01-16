package recruitmentapi.endpoints.tests.model;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBDocument;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBIgnore;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@DynamoDBDocument
public class Answer {
    private String content;
    private String code;
    private Boolean isSelected;

    public Answer() {

    }

    public Answer(String content) {
        this.content = content;
    }

    public Boolean getSelected() {
        return isSelected;
    }

    public void setSelected(Boolean selected) {
        isSelected = selected;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    @DynamoDBIgnore
    @JsonIgnore
    List<String> getTranslatableTexts() {
        if (content != null && !content.isEmpty()) {
            return Collections.singletonList(content);
        }
        return new ArrayList<>();
    }

    static Answer translate(Answer base, List<String> texts) {
        Answer answer = new Answer();
        answer.code = base.code;
        answer.isSelected = base.isSelected;

        if (base.content != null && !base.content.isEmpty()) {
            answer.content = texts.remove(0);
        }

        return answer;
    }

}
