package recruitmentapi;

import org.junit.Test;
import recruitmentapi.endpoints.tests.ImportTest;
import recruitmentapi.model.Question;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.List;

import static org.junit.Assert.assertEquals;

public class ImportTests {

    @Test
    public void shouldLoadExampleCsv() throws IOException {
        ImportTest importTest = new ImportTest();

        try (FileInputStream fileInputStream = new FileInputStream("csv/example.csv")) {
            List<Question> questions = importTest.loadQuestions(fileInputStream);
            assertEquals(3, questions.size());
        }
    }

    @Test
    public void shouldLoadEscapedCsv() throws IOException {
        ImportTest importTest = new ImportTest();

        try (FileInputStream fileInputStream = new FileInputStream("csv/escaped.csv")) {
            List<Question> questions = importTest.loadQuestions(fileInputStream);
            assertEquals(3, questions.size());
        }
    }

    @Test
    public void shouldLoadValidCsv() throws IOException {
        ImportTest importTest = new ImportTest();

        try (FileInputStream fileInputStream = new FileInputStream("csv/valid.csv")) {
            List<Question> questions = importTest.loadQuestions(fileInputStream);
            assertEquals(3, questions.size());
        }
    }
}
