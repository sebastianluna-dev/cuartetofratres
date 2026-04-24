import type { Instrumentation } from "next";
import { logError } from "@/lib/logger";

// The single point every error Next catches while serving a request passes
// through (render, route handlers and server actions). The `digest` is the
// same one the error boundary shows, so a failure a visitor reports can be
// located in the logs.
export const onRequestError: Instrumentation.onRequestError = async (error, request, context) => {
  logError("next.request", "Error sin capturar al servir una petición", error, {
    path: request.path,
    method: request.method,
    routePath: context.routePath,
    routeType: context.routeType,
    renderSource: context.renderSource,
  });
};
