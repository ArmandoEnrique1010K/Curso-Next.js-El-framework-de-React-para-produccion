import prisma from './src/lib/prisma';

async function test() {
    await prisma.$connect();
    console.log('✅ Prisma conecta');
    await prisma.$disconnect();
}

test();
