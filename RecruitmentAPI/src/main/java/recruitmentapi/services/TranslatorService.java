package recruitmentapi.services;

import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;
import org.json.JSONObject;
import recruitmentapi.model.Answer;
import recruitmentapi.model.Question;
import recruitmentapi.model.Test;

import java.util.*;

public class TranslatorService {

    private static final String KEY = "trnsl.1.1.20200112T171012Z.5f8464444c72f989.95f2b70a13bb6194bd1ec7b477069d900c1ace74";

    public static Test translateTest(Test source, String targetLang) {
        List<String> translation = new ArrayList<String>() {{
            add(source.getTitle());
            for (Question question : source.getQuestions()) {
                add(question.getTitle());
                add(question.getDescription());

                for (Answer answer : question.getAnswers()) {
                    add(answer.getContent());
                }
            }
        }};

        int translationIdx = 0;
        translation = translate(translation, targetLang);
        if (translation == null) {
            return null;
        }

        Test translatedTest = new Test();
        translatedTest.setLang(targetLang);
        translatedTest.setTitle(translation.get(translationIdx++));

        for (Question question : source.getQuestions()) {
            Question translatedQuestion = new Question();

            translatedQuestion.setTitle(translation.get(translationIdx++));
            translatedQuestion.setDescription(translation.get(translationIdx++));

            translatedQuestion.setCode(question.getCode());
            translatedQuestion.setType(question.getType());

            for (Answer answer : question.getAnswers()) {
                Answer translatedAnswer = new Answer();
                translatedAnswer.setCode(answer.getCode());
                translatedAnswer.setContent(translation.get(translationIdx++));
            }
        }

        return translatedTest;
    }

    public static List<String> translate(Collection<String> texts, String targetLang) {
        List<String> translations = new ArrayList<>();

        try {
            for (Object o : Unirest.post("https://translate.yandex.net/api/v1.5/tr.json/translate")
                    .queryString("key", KEY)
                    .queryString("text", texts)
                    .queryString("lang", targetLang)
                    .queryString("format", "plain")
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

    public static Map<String, String> getLanguages() {
        Map<String, String> langs = new HashMap<>();

        try {
            JSONObject langsObject = Unirest.post("https://translate.yandex.net/api/v1.5/tr.json/getLangs")
                    .queryString("ui", "en")
                    .queryString("key", KEY)
                    .asJson()
                    .getBody()
                    .getObject()
                    .getJSONObject("langs");

            for (String key : langsObject.keySet()) {
                langs.put(key, langsObject.getString(key));
            }
        } catch (UnirestException ignored) {
            return null;
        }

        return langs;
    }

}
