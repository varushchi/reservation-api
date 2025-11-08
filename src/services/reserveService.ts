import { Prisma } from "@prisma/client";

import { prisma } from "../configs/db.ts";
import { ReservationDto } from "../dto/reservationDto.ts";
import { EventBookedByUserError, EventFullError, EventNotFoundError } from "../errors/reserveErrors.ts";




export async function makeReservation(dto: ReservationDto) {
  try {
    const booking = await prisma.$transaction(async (tx) => {
      const event = await tx.events.findUnique({
        where: {
          id: dto.event_id
        }
      })

      if (!event) {
        throw new EventNotFoundError
      }

      const bookingCount = await tx.bookings.count({
        where: {
          event_id: dto.event_id
        }
      })

      if (bookingCount >= event.total_seats) {
        throw new EventFullError
      }

      return tx.bookings.create({
        data: {
          event_id: dto.event_id,
          user_id: dto.user_id
        }
      })
    })

    return booking

  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        throw new EventBookedByUserError
      }
    }
    throw error
  }
}
