import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

// Disable prefetch as it is not supported by some environments
const client = postgres(process.env.DATABASE_URL!);
export const db = drizzle(client);