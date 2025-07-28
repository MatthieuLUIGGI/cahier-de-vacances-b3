<?php

namespace Construct;

class ConstructInventory
{
    /** @var Artefact[] */
    private array $artefacts;

    public function __construct(array $artefacts)
    {
        $this->artefacts = $artefacts;
    }

    public function updateSimulation(): void
    {
        foreach ($this->artefacts as $artefact) {
            $updater = $this->getUpdaterFor($artefact);
            $updater->update($artefact);
        }
    }

    private function getUpdaterFor(Artefact $artefact): ArtefactUpdater
    {
        return match (true) {
            $artefact->name === "Aged Signal" => new AgedSignalUpdater(),
            $artefact->name === "Sulfuras Core Fragment" => new SulfurasUpdater(),
            $artefact->name === "Backdoor Pass to TAFKAL80ETC Protocol" => new BackdoorPassUpdater(),
            $artefact->name === "Stealth Cloak v2.0" => new StealthCloakUpdater(),
            default => new DefaultArtefactUpdater(),
        };
    }

    public function getArtefacts(): array
    {
        return $this->artefacts;
    }
}
