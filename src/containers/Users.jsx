import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import UserForm from './components/Form';
import Users from './components/Users';
import { ContainerGroup, Container, Title, WrapperForm, WrapperUsers } from './layout/AppStyled';

function PageUsers() {

	const [users, setUsers] = useState(""); // User list
	const [isUpdating, setIsUpdating] = useState(false); // If is updating en not creating
	const [userId, setUserId] = useState("");
	const [name, setName] = useState("");
	const [lastname, setLastname] = useState("");
	const [age, setAge] = useState("");

	const getUsers = async () => {
        const response = await axios.get("/api/v1.0/users/");
            setUsers(response.data);
        }
        useEffect(() => {
            getUsers();
    }, [setUsers]);

  return (
    <ContainerGroup>
		<Container>
			<Title>React form validation with formik and styled components</Title>
			<WrapperForm>
				<UserForm name={name}
							setName={setName}
							lastname={lastname}
							setLastname={setLastname}
							age={age}
							setAge={setAge}
							isUpdating={isUpdating}
							setIsUpdating={setIsUpdating}
							userId={userId}
							getUsers={getUsers}
				/>
				<ToastContainer />
			</WrapperForm>
			<WrapperUsers>
				<Users users={users}
						setUsers={setIsUpdating}
						setUserId={setUserId}
						setName={setName}
						setLastname={setLastname}
						setAge={setAge}
						setIsUpdating={setIsUpdating}
						getUsers={getUsers}
				/>
			</WrapperUsers>
		</Container>
	</ContainerGroup>
	);
}

export default PageUsers;
