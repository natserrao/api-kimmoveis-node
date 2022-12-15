import { Request, Response } from "express";
import { IScheduleRequest } from "../interfaces/schedules";
import createScheduleService from "../services/schedules/createSchedule.service";
import listSchedulePropertyService from "../services/schedules/listScheduleProperty.service";

export const createScheduleController = async (req: Request, res: Response) => {
  const data: IScheduleRequest = req.body;
  const id = req.user.id;
  await createScheduleService(data, id);
  return res.status(201).json({
    message: "Visit scheduled",
  });
};

export const listSchedulePropertyController = async (
  req: Request,
  res: Response
) => {
  const id: string = req.params.id;
  const allSchedules = await listSchedulePropertyService(id);
  return res.status(200).json({
    schedules: allSchedules,
  });
};
