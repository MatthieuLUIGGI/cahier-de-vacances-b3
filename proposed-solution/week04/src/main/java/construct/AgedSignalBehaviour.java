package construct;

public class AgedSignalBehaviour implements Behaviour {
    @Override
    public void update(Artefact artefact) {
        artefact.increaseIntegrity();
        artefact.decreaseTimeToLive();

        if (artefact.noTimeToLive() && artefact.isBelowMaxIntegrity()) {
            artefact.increaseIntegrity();
        }
    }
}
