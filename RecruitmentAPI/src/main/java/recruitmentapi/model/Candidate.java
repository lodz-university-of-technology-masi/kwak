package recruitmentapi.model;

import com.amazonaws.services.cognitoidp.model.AttributeType;
import com.amazonaws.services.cognitoidp.model.UserType;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

public class Candidate {
    private String id;
    private String email;
    private String name;
    private String surname;

    public void setId(String id) {
        this.id = id;
    }

    public String getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public String getName() {
        return name;
    }

    public String getSurname() {
        return surname;
    }

    public List<AttributeType> createAttributes() {
        List<AttributeType> attributes = new ArrayList<>();
        attributes.add(new AttributeType().withName("email").withValue(email));
        attributes.add(new AttributeType().withName("given_name").withValue(name));
        attributes.add(new AttributeType().withName("family_name").withValue(surname));
        return attributes;
    }

    public static Candidate fromAttributes(String id, Collection<AttributeType> attributes) {
        Candidate candidate = new Candidate();
        candidate.setId(id);
        for (AttributeType attribute : attributes) {
            if (attribute.getName().equals("email")) {
                candidate.email = attribute.getValue();
            }
            if (attribute.getName().equals("given_name")) {
                candidate.name = attribute.getValue();
            }
            if (attribute.getName().equals("family_name")) {
                candidate.surname = attribute.getValue();
            }
        }

        return candidate;
    }

    public static Candidate fromUserType(UserType userType) {
        return fromAttributes(userType.getUsername(), userType.getAttributes());
    }
}
