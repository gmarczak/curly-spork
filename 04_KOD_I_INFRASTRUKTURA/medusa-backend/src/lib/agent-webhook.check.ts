// Test zgodności podpisu z serwisem agentów (Python) bez instalowania Medusy: npm run test:webhook
// Oczekiwana wartość wyliczona przez fabryka_agents.security.sign(b'{"id":"evt_1"}', "whsec", 1000).
import { strictEqual } from "node:assert"
import { sign } from "./agent-webhook.ts"

strictEqual(sign('{"id":"evt_1"}', "whsec", 1000), "t=1000,v1=3e52031107262c3063c3353d1197bb54dadf18ab9ec8702baea95181613a10f8")
console.log("OK: podpis zgodny z serwisem agentów")
