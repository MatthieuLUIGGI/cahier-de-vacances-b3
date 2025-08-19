package construct;

import org.approvaltests.Approvals;
import org.approvaltests.combinations.CombinationApprovals;
import org.junit.jupiter.api.Test;

import static construct.ConstructInventory.*;

public class InventoryTest {
//    @Test
//    void classicUnitTest() {
//        // Arrange
//        var artefact = new Artefact("Mirror Shard", 0, 0);
//        var constructInventory = new ConstructInventory(new Artefact[]{artefact});
//
//        // Act
//        constructInventory.updateSimulation();
//
//        // Assert
//        assertThat(artefact.getTimeToLive()).isEqualTo(-1);
//        assertThat(artefact.getIntegrity()).isEqualTo(0);
//    }

    @Test
    void singleApprovalTestForExample() {
        var artefact = new Artefact("Mirror Shard", 0, 0);
        var constructInventory = new ConstructInventory(new Artefact[]{artefact});

        constructInventory.updateSimulation();

        // No more assertions here, just use Approvals
        Approvals.verify(artefact);
    }

    @Test
    void approvalTests() {
        CombinationApprovals.verifyAllCombinations(
                this::updateSimulation,
                new String[]{
                        "Mirror Shard",
                        AGED_SIGNAL,
                        BACKDOOR_PASS,
                        SULFURAS_CORE_FRAGMENT,
                        STEALTH_CLOAK_V_2_0
                },
                new Integer[]{-1, 0, 1, 10, 11, 51},
                new Integer[]{-1, 0, 1, 4, 5, 49, 50}
        );
    }

    private String updateSimulation(String name, int integrity, int timeToLive) {
        var artefact = new Artefact(name, integrity, timeToLive);
        var constructInventory = new ConstructInventory(new Artefact[]{artefact});
        constructInventory.updateSimulation();

        return artefact.toString();
    }
}