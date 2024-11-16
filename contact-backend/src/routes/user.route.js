import {Router} from "express";
import { getContacts, addContact, updateContact, deleteContact } from "../controller/user.controller.js";
const router = Router()

router.route("/pagination").post(
    getContacts
)
router.route("/:id").delete(
    deleteContact
)
router.route("/").post( 
    addContact
)
router.route("/:id").put(
    updateContact
)

export default router;