<?php

namespace Construct;

class BackdoorPassUpdater implements ArtefactUpdater
{
    public function update(Artefact $artefact): void
    {
        // On applique d'abord les règles d'intégrité, puis on décrémente timeToLive (comme dans le code d'origine)
        if ($artefact->integrity < 50) {
            $artefact->integrity++;
            if (($artefact->timeToLive - 1) < 11 && $artefact->integrity < 50) {
                $artefact->integrity++;
            }
            if (($artefact->timeToLive - 1) < 6 && $artefact->integrity < 50) {
                $artefact->integrity++;
            }
        }
        $artefact->timeToLive--;
        if ($artefact->timeToLive < 0) {
            $artefact->integrity = 0;
        }
    }
}
