package construct;

public class BackdoorPassBehaviour implements Behaviour {
    @Override
    public void update(Artefact artefact) {
        if (artefact.isBelowMaxIntegrity()) {
            artefact.increaseIntegrity();

            if (artefact.isBelowTimeBoostThreshold()) {
                artefact.increaseIntegrity();
            }

            if (artefact.iBelowTimeCriticalThreshold()) {
                artefact.increaseIntegrity();
            }
        }

        artefact.decreaseTimeToLive();

        if (artefact.noTimeToLive()) {
            artefact.resetIntegrity();
        }
    }
}