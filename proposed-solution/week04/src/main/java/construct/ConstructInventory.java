package construct;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

public class ConstructInventory {
    public static final String AGED_SIGNAL = "Aged Signal";
    public static final String BACKDOOR_PASS = "Backdoor Pass to TAFKAL80ETC Protocol";
    public static final String SULFURAS_CORE_FRAGMENT = "Sulfuras Core Fragment";
    public static final String STEALTH_CLOAK_V_2_0 = "Stealth Cloak v2.0";

    private final Artefact[] artefacts;
    private final Map<String, Behaviour> behaviours = new HashMap<>();

    public ConstructInventory(Artefact[] artefacts) {
        this.artefacts = artefacts;

        behaviours.put(AGED_SIGNAL, new AgedSignalBehaviour());
        behaviours.put(BACKDOOR_PASS, new BackdoorPassBehaviour());
        behaviours.put(SULFURAS_CORE_FRAGMENT, new SulfurasBehaviour());
        behaviours.put(STEALTH_CLOAK_V_2_0, new StealthCloakBehaviour());
    }

    public void updateSimulation() {
        Arrays.stream(artefacts)
                .forEach(this::update);
    }

    private void update(Artefact artefact) {
        behaviours.getOrDefault(artefact.getName(), new DefaultBehaviour())
                .update(artefact);
    }
}