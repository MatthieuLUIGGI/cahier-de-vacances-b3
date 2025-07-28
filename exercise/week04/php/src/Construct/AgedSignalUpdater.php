<?php

namespace Construct;

class AgedSignalUpdater implements ArtefactUpdater
{
    public function update(Artefact $artefact): void
    {
        if ($artefact->integrity < 50) {
            $artefact->integrity++;
        }
        $artefact->timeToLive--;
        if ($artefact->timeToLive < 0 && $artefact->integrity < 50) {
            $artefact->integrity++;
        }
    }
}
