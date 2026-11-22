# Deployment IIS

Fișierele din `deploy/iis/frontend/web.config` și
`deploy/iis/api/web.config` configurează IIS URL Rewrite pentru a trimite
toate cererile către aplicația Next.js de pe `http://localhost:3000`.

Ambele reguli folosesc pattern-ul `.*`, au `stopProcessing="true"` și
reconstituiesc calea originală prin `{R:0}`.
