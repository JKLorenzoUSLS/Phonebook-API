import { Router } from "express";
import { MongoClient } from "mongodb";
import { authorize, isValidReq } from "../../../modules/Auth.js";
import AuthData from "../../../structures/AuthData.js";

export default function (router: Router, client: MongoClient): Router {
  return router.post("/", (req, res) => {
    console.log("auth/register post");
    try {
      const auth_header = req.headers.authorization;
      const register_token = auth_header && auth_header.split(" ")[1];
      const register_data = req.body as AuthData;
      if (!register_token) return res.sendStatus(401);

      // verify register request
      if (!isValidReq(register_token, register_data)) {
        return res.sendStatus(403);
      }

      // authorize
      res.json(authorize(register_data));
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  });
}
