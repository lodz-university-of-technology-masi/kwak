package recruitmentapi.services;

import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;
import com.mashape.unirest.request.HttpRequest;
import org.json.JSONObject;
import recruitmentapi.model.Answer;
import recruitmentapi.model.Question;
import recruitmentapi.model.Test;

import java.util.*;

public class TranslatorService {

    private static final String KEY = "trnsl.1.1.20200112T171012Z.5f8464444c72f989.95f2b70a13bb6194bd1ec7b477069d900c1ace74";

    public static Test translateTest(Test source, String targetLang) {
        List<String> translation = translate(source.getTranslatableTexts(), targetLang);
        if (translation == null) {
            return null;
        }

        return Test.translate(source, targetLang, translation);
    }

    public static List<String> translate(Collection<String> texts, String targetLang) {
        List<String> translations = new ArrayList<>();

        HttpRequest request = Unirest.post("https://translate.yandex.net/api/v1.5/tr.json/translate")
                .queryString("key", KEY)
                .queryString("text", texts)
                .queryString("lang", targetLang)
                .queryString("format", "plain");

        try {
            for (Object o : request
                    .asJson()
                    .getBody()
                    .getObject()
                    .getJSONArray("text")) {
                translations.add((String) o);
            }
        } catch (UnirestException ignored) {
            return null;
        }

        return translations;
    }

}
