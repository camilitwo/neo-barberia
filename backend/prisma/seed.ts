import { prisma } from '../src/services/prisma.js';

async function seed() {
  await prisma.booking.deleteMany();
  await prisma.service.deleteMany();
  await prisma.barber.deleteMany();

  const barbers = await prisma.barber.createMany({
    data: [
      { name: 'Neo Barber', bio: 'Especialista en fades y estilos modernos', avatarUrl: '/barbers/neo.png' },
      { name: 'Aurora', bio: 'Diseños creativos y cuidado premium', avatarUrl: '/barbers/aurora.png' },
    ],
  });

  const barberList = await prisma.barber.findMany();

  await prisma.service.createMany({
    data: [
      { name: 'Corte clásico', description: 'Corte tradicional con terminaciones limpias', duration: 30, price: 12000, barberId: barberList[0].id },
      { name: 'Fade premium', description: 'Fade avanzado con detalles', duration: 45, price: 15000, barberId: barberList[0].id },
      { name: 'Barba y perfilado', description: 'Afeitado y cuidado de barba', duration: 30, price: 10000, barberId: barberList[1].id },
    ],
  });

  console.log(`Seeded ${barbers.count} barbers with services`);
}

seed()
  .catch(error => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
