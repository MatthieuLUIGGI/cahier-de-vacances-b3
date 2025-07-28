<?php

namespace Construct;

class StealthCloakUpdater implements ArtefactUpdater
{
    private array $daysCounter = [];

    public function update(Artefact $artefact): void
    {
        $oid = spl_object_id($artefact);
        if (!isset($this->daysCounter[$oid])) {
            $this->daysCounter[$oid] = 0;
        }
        $this->daysCounter[$oid]++;

        if ($this->daysCounter[$oid] % 2 === 0 && $artefact->integrity > 0) {
            $artefact->integrity--;
        }
        if ($artefact->integrity < 0) {
            $artefact->integrity = 0;
        }
        $artefact->timeToLive--;
    }
}
