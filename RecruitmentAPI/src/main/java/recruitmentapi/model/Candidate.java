package recruitmentapi.model;

import com.amazonaws.services.cognitoidp.model.AttributeType;
import com.amazonaws.services.cognitoidp.model.UserType;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

public class Candidate {
    private String id;
    private String login;
    private String email;
    private String name;
    private String surname;

    public Candidate() { }

    public Candidate(String id, String login, String email, String name, String surname) {
        this.id = id;
        this.login = login;
        this.email = email;
        this.name = name;
        this.surname = surname;
    }

    public String getId() {
        return id;
    }

    public String getLogin() {
        return login;
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

    public static String getSub(UserType userType) {
        AttributeType attribute = userType.getAttributes().stream()
                .filter(attributeType -> attributeType.getName().equals("sub"))
                .findAny()
                .orElse(null);
        if (attribute != null) {
            return attribute.getValue();
        }

        return null;
    }

    public static Candidate fromUserType(UserType userType) {
        String email = "", name = "", surname = "", id = "";
        for (AttributeType attribute : userType.getAttributes()) {
            if (attribute.getName().equals("sub")) {
                id = attribute.getValue();
            }
            if (attribute.getName().equals("email")) {
                email = attribute.getValue();
            }
            if (attribute.getName().equals("given_name")) {
                name = attribute.getValue();
            }
            if (attribute.getName().equals("family_name")) {
                surname = attribute.getValue();
            }
        }

        return new Candidate(id, userType.getUsername(), email, name, surname);
    }
}
