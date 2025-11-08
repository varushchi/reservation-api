import { Router } from "express";

import { reservationController } from "../controllers/reservationController.ts";

const router = Router()

router.post("/bookings/reserve", reservationController.reserve)

export default router
