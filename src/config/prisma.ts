// src/config/prisma.ts
import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

const connectionString = process.env.DATABASE_URL;

let prisma: PrismaClient;

if (connectionString) {
  const adapter = new PrismaPg({ connectionString });
  prisma = new PrismaClient({ adapter });
} else {
  // Defer throwing until a DB operation is attempted. This prevents
  // serverless function cold-start failures when DATABASE_URL isn't set
  // (e.g., during preview deployments or misconfigured environments).
  // Any runtime DB operation will still fail without a proper DATABASE_URL.
  // Create a default PrismaClient instance so imports don't throw.
  // eslint-disable-next-line no-console
  console.warn('DATABASE_URL is not set — Prisma will be initialized without a connection string.');
  prisma = new PrismaClient();
}

export default prisma;
