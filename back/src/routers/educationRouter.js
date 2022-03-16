import { Router } from "express";
import { educationService } from "../services/educationService";
const educationRouter = Router();

educationRouter.post("/education/create", async (req, res, next) => {
  try {
    const { user_id, school, major, position } = req.body;

    const newEducation = await educationService.addEducation({
      user_id,
      school,
      major,
      position,
    });

    if (newEducation.errorMessage) {
      throw new Error(newEducation.errorMessage);
    }

    res.status(200).json(newEducation);
  } catch (error) {
    next(error);
  }
});

educationRouter.get("/educations/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const foundEducation = await educationService.getEducationById({ id });

    if (foundEducation.errorMessage) {
      throw new Error(foundEducation.errorMessage);
    }

    res.status(200).json(foundEducation);
  } catch(error) {
    next(error);
  }
});

educationRouter.get("/educationlist/:user_id", async (req, res, next) => {
  try {
    const { user_id } = req.params;

    const foundEducations = await educationService.getEducationsByUserId({ user_id });

    if(foundEducations.errorMessage) { 
      throw new Error(foundEducations.errorMessage);
    }

    res.status(200).json(foundEducations);
  } catch(error) {
    next(error);
  }
});

educationRouter.put("/educations/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { school, major, position } = req.body;

    const updatedEducation = await educationService.setEducationById({ id, school, major, position });

    if(updatedEducation.errorMessage) {
      throw new Error(updatedEducation.errorMessage);
    }

    res.status(200).json(updatedEducation);
  } catch(error) {
    next(error);
  }
})

export { educationRouter };
