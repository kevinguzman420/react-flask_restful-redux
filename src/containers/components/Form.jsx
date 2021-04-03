import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import { toast } from 'react-toastify';
import { Forms, FormGroup, Label, Input, Info, Btn } from '../layout/AppStyled';


function UserForm({name, setName, lastname, setLastname, age, setAge, isUpdating, setIsUpdating, userId, getUsers}) {
  return (
    <Formik
      initialValues={{
        name: name,
        lastname: lastname,
        age: age,
      }}
      enableReinitialize={true}
      validationSchema={Yup.object().shape({
        name: Yup.string()
          .min(2, "Your name is too short")
          .required("Please enter your name"),
        lastname: Yup.string()
          .min(2, "Your name is too short")
          .required("Please enter your lastname"),
        age: Yup.number().required("Enter your age."),
      })}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        if (!isUpdating) {
          const response = await axios.post("/api/v1.0/users/", {
            name: values.name,
            lastname: values.lastname,
            age: values.age,
          });
          console.log(response.data);
          toast(response.data.response, {
            type: "success",
          });
        } else {
          const response = await axios.put(`/api/v1.0/users/${userId}/`, {
            name: values.name,
            lastname: values.lastname,
            age: values.age,
          });
          console.log(response.data);
          setIsUpdating(false);
          toast(response.data.response, {
            type: "info",
          });
        }
        // Clear fields
        setName("");
        setLastname("");
        setAge("");
        getUsers();
        setSubmitting(false);
        resetForm({});
      }}
    >
      {({ values, handleSubmit, handleChange }) => {
        return (
          <Forms name="contact" onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="name">Fullname</Label> <br />
              <Input
                type="text"
                name="name"
                autoComplete="name"
                placeholder="your name"
                values={values.name}
                onChange={handleChange}
              />
              <ErrorMessage name="name">{(msg) => <Info>{msg}</Info>}</ErrorMessage>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="lastname">Lastname</Label> <br />
              <Input
                type="text"
                name="lastname"
                autoComplete="lastname"
                placeholder="your lastname"
                value={values.lastname}
                onChange={handleChange}
              />
              <ErrorMessage name="lastname">
                {(msg) => <Info>{msg}</Info>}
              </ErrorMessage>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="age">Age</Label> <br />
              <Input
                type="text"
                name="age"
                autoComplete="age"
                placeholder="your age"
                values={values.age}
                onChange={handleChange}
              />
              <ErrorMessage name="age">{(msg) => <Info>{msg}</Info>}</ErrorMessage>
            </FormGroup>
            <FormGroup>
              <Btn type="submit">{isUpdating ? "Update" : "Create"}</Btn>
            </FormGroup>
          </Forms>
        );
      }}
    </Formik>
  )
}

export default UserForm;
