import { Request, Response } from "express";
import { z } from "zod";
import { CreateItemService } from "../services/CreateItemService";
import { RemoveItemService } from "../services/CreateItemService copy";

export class ItemController {
  async create(req: Request, res: Response) {
    const body = z
      .object({
        order_id: z.string({ message: "O campo id do perdido é obrigatório" }),
        product_id: z.string({
          message: "O campo id do produto é obrigatório",
        }),
        quantity: z.coerce.number({
          message: "O campo quantidade é obrigatório",
        }),
      })
      .parse(req.body);

    const createItem = new CreateItemService();

    await createItem.execute(body);

    res.status(201).send({});
  }

  async remove(req: Request, res: Response) {
    const id = req.query.id as string;

    const removeItem = new RemoveItemService();

    await removeItem.execute(id);

    res.status(200).send({});
  }
}
