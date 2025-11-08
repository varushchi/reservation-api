import { prisma } from '../src/utils/prisma.ts'

async function main() {
  await prisma.bookings.deleteMany()
  await prisma.events.deleteMany()

  await prisma.events.createMany({
    data: [
      { name: 'event 1', total_seats: 10 },
      { name: 'event 2', total_seats: 38 },
      { name: 'event 3', total_seats: 25 },
    ]
  })
}

main()
