import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "../../../../Node/TRPC_crud-api/src/app";

export const trpc = createTRPCReact<AppRouter>();
