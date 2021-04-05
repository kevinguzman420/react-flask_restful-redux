import React from 'react';
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Forms, FormGroup, Label, Input, Info, Btn } from '../layout/AppStyled';

import { useDispatch, useSelector } from 'react-redux';
import { createUserAction, updateUserAction } from '../../redux/userDucks';


function UserForm() {

  const dispatch = useDispatch();
  const user = useSelector(store => store.users.user);
  const userIsUpdating = useSelector(store => store.users.userIsUpdating); // If an user is updating

  return (
    <Formik
      initialValues={{
        name: user.name || "",
        lastname: user.lastname || "",
        age: user.age || "",
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
      onSubmit={(values, { setSubmitting, resetForm }) => {
        if (!userIsUpdating) {
          // Creating user
          const res = dispatch(createUserAction(values.name, values.lastname, values.age));
          console.log("res -> ", res);
        } else {
          // Updating user
          const response = dispatch(updateUserAction(user.user_id, values.name, values.lastname, values.age));
          // console.log("response.data.response  ", response);
        }
        setSubmitting(false);
        resetForm({values: ""});
      }}
    >
      {({ values, handleSubmit, handleChange, handleBlur}) => {
        return (
          <Forms name="contact" onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="name">Fullname</Label> <br />
              <Input
                type="text"
                name="name"
                autoComplete="name"
                placeholder="your name"
                values={user.name}
                onChange={handleChange}
                onBlur={handleBlur}
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
                values={user.lastname}
                onChange={handleChange}
                onBlur={handleBlur}
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
                values={user.age}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage name="age">{(msg) => <Info>{msg}</Info>}</ErrorMessage>
            </FormGroup>
            <FormGroup>
              <Btn type="submit">{userIsUpdating ? "Update" : "Create"}</Btn>
            </FormGroup>
          </Forms>
        );
      }}
    </Formik>
  )
}


export default UserForm;
