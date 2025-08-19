package construct;

public class Artefact {
    private static final int MAX_INTEGRITY = 50;
    private static final int TIME_BOOST_THRESHOLD = 11;
    private static final int TIME_CRITICAL_THRESHOLD = 6;
    public static final int MIN_INTEGRITY = 0;

    private final String name;
    private int integrity;
    private int timeToLive;

    public Artefact(String name, int integrity, int timeToLive) {
        this.name = name;
        this.integrity = integrity;
        this.timeToLive = timeToLive;
    }

    void decreaseIntegrity() {
        integrity--;
    }

    void increaseIntegrity() {
        if (isBelowMaxIntegrity()) {
            integrity++;
        }
    }

    void decreaseTimeToLive() {
        timeToLive--;
    }

    void resetIntegrity() {
        integrity = MIN_INTEGRITY;
    }

    boolean iBelowTimeCriticalThreshold() {
        return timeToLive < TIME_CRITICAL_THRESHOLD;
    }

    boolean isBelowMaxIntegrity() {
        return integrity < MAX_INTEGRITY;
    }

    boolean isBelowTimeBoostThreshold() {
        return timeToLive < TIME_BOOST_THRESHOLD;
    }

    boolean noTimeToLive() {
        return timeToLive < 0;
    }

    boolean hasIntegrity() {
        return integrity > MIN_INTEGRITY;
    }

    boolean hasTimeToLive() {
        return timeToLive > 0;
    }

    public int remainingTimeToLive() {
        return timeToLive;
    }

    public String getName() {
        return name;
    }

    @Override
    public String toString() {
        return this.name + ", 🥄 integrity:" + this.integrity + ", 💓timeToLive:" + this.timeToLive;
    }
}
