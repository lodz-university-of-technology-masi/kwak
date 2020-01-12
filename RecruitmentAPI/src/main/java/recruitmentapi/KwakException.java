package recruitmentapi;

public class KwakException extends RuntimeException {
    public KwakException(String message) {
        super(message);
    }

    public KwakException(Throwable cause) {
        super(cause);
    }

    @Override
    public String toString() {
        Throwable self = getCause();
        if (self.getCause() != null) {
            return self.getMessage() + self.getCause().getMessage();
        }

        return self.getMessage();
    }
}
