<?php

namespace Construct;

class StealthCloakUpdater implements ArtefactUpdater
{
    public function update(Artefact $artefact): void
    {
        if ($artefact->name === "Stealth Cloak v2.0") {
            $artefact->cloakDayCounter++;
            if ($artefact->cloakDayCounter % 2 === 0 && $artefact->integrity > 0) {
                $artefact->integrity--;
            }
            if ($artefact->integrity < 0) {
                $artefact->integrity = 0;
            }
            $artefact->timeToLive--;
        }
    }
}
