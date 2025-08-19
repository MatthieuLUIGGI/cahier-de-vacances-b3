package construct;

public class DefaultBehaviour implements Behaviour {
    @Override
    public void update(Artefact artefact) {
        if (artefact.hasIntegrity()) {
            artefact.decreaseIntegrity();
        }

        artefact.decreaseTimeToLive();

        if (artefact.noTimeToLive() && artefact.hasIntegrity()) {
            artefact.decreaseIntegrity();
        }
    }
}
