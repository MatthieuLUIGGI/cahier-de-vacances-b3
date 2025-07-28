<?php

namespace Construct;

class BackdoorPassUpdater implements ArtefactUpdater
{
    public function update(Artefact $artefact): void
    {
        if ($artefact->integrity < 50) {
            $artefact->integrity++;
            if ($artefact->timeToLive < 11 && $artefact->integrity < 50) {
                $artefact->integrity++;
            }
            if ($artefact->timeToLive < 6 && $artefact->integrity < 50) {
                $artefact->integrity++;
            }
        }
        $artefact->timeToLive--;
        if ($artefact->timeToLive < 0) {
            $artefact->integrity = 0;
        }
    }
}
