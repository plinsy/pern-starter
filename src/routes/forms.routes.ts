import express from "express";
import cors from "cors";
import { authenticate } from "../middleware";
import { Form } from "../models";
import { Op } from "sequelize";
const router = express.Router({ mergeParams: true });
router.use(express.json());
router.use(cors());

router.get("/:date", authenticate, async (req: any, res: any) => {
  try {
    const form: Form | null = await Form.findOne({
      where: {
        state: {
          [Op.not]: ["closed", "canceled"],
        },
      },
      order: [["createdAt", "DESC"]],
      // include: [
      //   {
    });
    if (!form) {
      return res
        .status(400)
        .send({ message: `Fiche d'évaluation introuvable` });
    }
    res.send({ form });
  } catch (error: any) {
    res.status(500).send({ message: error.message });
  }
});

module.exports = router;
