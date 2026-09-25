import type { SubscriberArgs, SubscriberConfig } from "@medusajs/framework"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"
import { sendToAgents } from "../lib/agent-webhook"

// Opłacone zamówienie → Agent Fulfillmentu (przez serwis agentów). Model uprawnień: ADR-001.
export default async function orderPlacedHandler({ event: { data }, container }: SubscriberArgs<{ id: string }>) {
  const query = container.resolve(ContainerRegistrationKeys.QUERY)
  const {
    data: [order],
  } = await query.graph({
    entity: "order",
    fields: ["id", "display_id", "email", "sales_channel_id", "currency_code", "total", "items.*", "shipping_address.*"],
    filters: { id: data.id },
  })

  await sendToAgents({ id: `order.placed:${data.id}`, name: "order.placed", data: order as Record<string, unknown> })
}

export const config: SubscriberConfig = {
  event: "order.placed",
}
