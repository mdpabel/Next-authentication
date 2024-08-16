import { PrismaClient } from '@prisma/client/edge';

let prisma: PrismaClient;

declare const globalThis: {
  prismaGlobal: PrismaClient;
} & typeof global;

// Ensure the Prisma client is not reinitialized during hot-reloading in development
if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!globalThis.prismaGlobal) {
    globalThis.prismaGlobal = new PrismaClient();
  }
  prisma = globalThis.prismaGlobal;
}

export default prisma;
