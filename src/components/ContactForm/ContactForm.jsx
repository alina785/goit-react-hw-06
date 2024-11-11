import { ErrorMessage, Field, Form, Formik } from "formik";
import { nanoid } from "nanoid";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addContact, selectContacts } from "../../redux/contactsSlice";
import s from "./ContactForm.module.css";

const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const initialValue = {
    name: "",
    number: "",
  };

  const handleSubmit = (values, { resetForm }) => {
    const contactExists = contacts.some(
      (contact) => contact.name === values.name
    );
    if (!contactExists) {
      dispatch(addContact({ id: nanoid(), ...values }));
      resetForm();
    } else {
      alert(`${values.name} is already in contacts`);
    }
  };

  const ContactSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Min 3 characters")
      .max(50, "Max 50 characters")
      .required("Required field!"),
    number: Yup.string()
      .matches(
        /^[0-9()+\-\s]+$/,
        "The phone number can only contain numbers and symbols +, -, (, ) and spaces') // Numbers and symbols are allowed"
      )
      .min(3, "Min 3 characters")
      .max(50, "Max 50 characters")
      .required("Required fild!"),
  });

  return (
    <Formik
      initialValues={initialValue}
      validationSchema={ContactSchema}
      onSubmit={handleSubmit}
    >
      <Form className={s.form}>
        <label className={s.label}>
          Name
          <Field
            type="text"
            name="name"
            className={s.field}
            placeholder="Enter name..."
          />
          <ErrorMessage className={s.error} name="name" component="span" />
        </label>
        <label className={s.label}>
          Number phone
          <Field
            type="text"
            name="number"
            className={s.field}
            placeholder="Enter number..."
          />
          <ErrorMessage className={s.error} name="number" component="span" />
        </label>
        <button type="submit" className={s.btn}>
          ADD
        </button>
      </Form>
    </Formik>
  );
};

export default ContactForm;