import { deleteContact } from "../../redux/contactsSlice";
import { RiPhoneFill } from "react-icons/ri";
import { IoPerson } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import s from "./Contact.module.css";

const Contact = ({ contact }) => {
  const dispatch = useDispatch();
  return (
    <div className={s.contactCard}>
      <li className={s.item}>
        <span className={s.name}>
          <IoPerson /> {contact.name}:
        </span>
        <span className={s.number}>
          <RiPhoneFill /> {contact.number}
        </span>
      </li>
      <button
        className={s.btn}
        onClick={() => dispatch(deleteContact(contact.id))}>
        <MdDelete className={s.icon} />
      </button>
    </div>
  );
};

export default Contact;