import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ContainerGroup = styled.div`
  ${"" /* border: 1px solid red; */}
	background: #e6e6e6;
	color: #171717;
	width: 100vw;
	height: 100vh;
	margin: 0;
	padding: 0;
	display: flex;
	justify-content: center;
	align-items: center;
`;
const Container = styled.div`
	width: 80%;
	height: 80%;
	display: grid;
	grid-template-areas: "title title" "form users";
	grid-template-rows: 15% 85%;
	column-gap: 1em;
`;
const Title = styled.h1`
	margin: 0;
	margin-bottom: 1em;
	grid-area: title;
	text-transform: uppercase;
	font-size: 1.7em;
	text-align: center;
	color: blue;
`;
const WrapperForm = styled.div`
	border: 1px solid blue;
	grid-area: form;
	display: flex;
	justify-content: center;
	align-items: center;
`;
const Forms = styled(Form)`
	width: 80%;
	height: 80%;
`;
const FormGroup = styled.div`
	width: 90%;
	/* text-align: center; */
	margin: 0 auto;
	margin-bottom: 1em;
`;
const Label = styled.label`
	color: #0000ff;
	text-transform: uppercase;
	font-size: .9em;
`;
const Input = styled(Field)`
	width: 95%
`;
const Info = styled.p`
	color: red;
	margin: 0;
	margin-top: .5em;
`;
const Btn = styled.button`
	background-color: #0000ff;
	border: none;
	border-radius: 5px;
	padding: .5em 3.5em;
	color: #e6e6e6;
	cursor: pointer;
`;

const WrapperUsers = styled.div`
	border: 1px solid blue;
	grid-area: users;
	display: flex;
	justify-content: center;
	align-items: top;
`;
const Table = styled.table`
	width: 80%;
	height: 80%;
	overflow-y: auto;
`;
const Thead = styled.thead`
	height: 30px;
	border: 1px solid red;
`;
const Th = styled.th`
	/* border: 1px solid black; */
	background: #171717;
	color: #e6e6e6;
`;
const Td = styled.td`
	/* border: 1px solid blue; */
`;
const UserActions = styled.td`
	text-align: center;
`;
const UserIconAction = styled.i`
	cursor: pointer;
	margin: 0 .5em;
`;
function App() {

	const [users, setUsers] = useState(""); // User list
	const [isUpdating, setIsUpdating] = useState(false); // If is updating en not creating
	const [userId, setUserId] = useState("");
	const [name, setName] = useState("");
	const [lastname, setLastname] = useState("");
	const [age, setAge] = useState("");

	async function getUsers() {
    const response = await axios.get("/api/v1.0/users/");
    setUsers(response.data);
  }
  useEffect(() => {
    getUsers();
  }, [setUsers]);


	const updateUser = async id => {
	  const response = await axios.get(`/api/v1.0/users/${id}`);
	  setUserId(response.data.id);
	  setName(response.data.name);
	  setLastname(response.data.lastname);
	  setAge(response.data.age);
	  setIsUpdating(true);
  	}

  const deleteUser = async id => {
	let confirm = window.confirm(`Are you sure you to delete this user ${id}?`);
	if (confirm) {
		const response = await axios.delete(`/api/v1.0/users/${id}/`);
		getUsers();
		toast(response.data.response, {
			type: "error"
		})
		console.log(response.data);
	}
  }

  return (
    <ContainerGroup>
		<Container>
			<Title>React form validation with formik and styled components</Title>
			<WrapperForm>
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
					onSubmit={ async (values, { setSubmitting, resetForm }) => {
						if (!isUpdating) {
							const response = await axios.post("/api/v1.0/users/", {
								name: values.name,
								lastname: values.lastname,
								age: values.age
							})
							console.log(response.data);
							toast(response.data.response, {
								type: "success"
							})
						} else {
							const response = await axios.put(`/api/v1.0/users/${userId}/`,{
								name: values.name,
								lastname: values.lastname,
								age: values.age
							});
							console.log(response.data);
							setIsUpdating(false);
							toast(response.data.response, {
								type: "info"
							})
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
				{({
					values,
					handleSubmit,
					handleChange
				}) => {
					return (
						<Forms name="contact" onSubmit={handleSubmit}>
							<FormGroup>
								<Label htmlFor="name">
									Fullname
								</Label> <br/>
								<Input
									type="text"
									name="name"
									autoComplete="name"
									placeholder="your name"
									values={values.name}
									onChange={handleChange}
								/>
								<ErrorMessage name="name">
								{(msg) => <Info>{msg}</Info>}
								</ErrorMessage>
							</FormGroup>
							<FormGroup>
								<Label htmlFor="lastname">
									Lastname
								</Label> <br/>
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
								<Label htmlFor="age">
									Age
								</Label> <br/>
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
								<Btn type="submit">
									{isUpdating ? "Update" : "Create"}
								</Btn>
							</FormGroup>
						</Forms>
					);}}
				</Formik>
				<ToastContainer />
			</WrapperForm>
			<WrapperUsers>
				<Table>
					<Thead>
						<tr>
							<Th>Name</Th>
							<Th>Lastname</Th>
							<Th>Age</Th>
							<Th>Actions</Th>
						</tr>
					</Thead>
					{
						users ? users.map(user => {
							return (
									<tbody key={user.id}>
										<tr>
											<Td>{user.name}</Td>
											<Td>{user.lastname}</Td>
											<Td>{user.age}</Td>
											<UserActions>
												<UserIconAction
													className="fas fa-pen"
													onClick={() => updateUser(user.id)}
												>
												</UserIconAction>

												<UserIconAction
													className="fas fa-trash"
													onClick={() => deleteUser(user.id)}
												>
												</UserIconAction>

											</UserActions>
										</tr>
									</tbody>
								)
							})
							: null
					}
				</Table>
			</WrapperUsers>
		</Container>
	</ContainerGroup>
	);
}

export default App;
