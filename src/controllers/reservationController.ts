
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response } from "express";

import { ReservationDto } from "../dto/reservationDto.ts";
import { EmptyBodyError, EventBookedByUserError, EventFullError, EventNotFoundError } from "../errors/reserveErrors.ts";
import { makeReservation } from "../services/reserveService.ts";

export const reservationController = {
  async reserve(req: Request, res: Response) {
    try {
      if (!req.body || typeof req.body !== "object" || Object.keys(req.body).length === 0) {
        throw new EmptyBodyError
      }
      const dto = plainToInstance(ReservationDto, req.body)
      const errors = await validate(dto)
      if (errors.length > 0) {
        return res.status(400).json({ errors })
      }

      const booking = await makeReservation(dto)
      res.status(201).json({ booking })
    } catch (error) {
      if (error instanceof EmptyBodyError) {
        return res.status(400).json({ error: error.message })
      }
      if (error instanceof EventNotFoundError) {
        return res.status(404).json({ error: "event was not found" })
      }
      if (error instanceof EventFullError) {
        return res.status(404).json({ error: "event is already fully booked" })
      }
      if (error instanceof EventBookedByUserError) {
        return res.status(404).json({ error: "event was already book by this user" })
      }
      console.error(error)
      return res.status(500)
    }
  }
}
