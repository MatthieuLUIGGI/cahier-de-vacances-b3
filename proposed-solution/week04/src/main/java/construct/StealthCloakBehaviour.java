package construct;

public class StealthCloakBehaviour implements Behaviour {
    private static final int DECAY_INTERVAL = 2;

    @Override
    public void update(Artefact artefact) {
        if (shouldDecayToday(artefact)) {
            decreaseIntegrity(artefact);
        }
        artefact.decreaseTimeToLive();
    }

    private boolean shouldDecayToday(Artefact artefact) {
        return artefact.remainingTimeToLive() % DECAY_INTERVAL == 0;
    }

    private void decreaseIntegrity(Artefact artefact) {
        if (artefact.hasTimeToLive()) {
            artefact.decreaseIntegrity();
        }
    }
}
