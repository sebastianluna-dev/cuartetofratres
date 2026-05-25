import { getPayload as getPayloadInstance } from "payload";
import config from "@payload-config";

let payloadPromise: ReturnType<typeof getPayloadInstance> | null = null;

/** One Payload instance per process: the local API is what the site reads. */
export function getPayload() {
  if (!payloadPromise) {
    payloadPromise = getPayloadInstance({ config });
  }
  return payloadPromise;
}
