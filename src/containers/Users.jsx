import React, { useEffect } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import UserForm from './components/Form';
import Users from './components/Users';
import { ContainerGroup, Container, Title, WrapperForm, WrapperUsers, button } from './layout/AppStyled';


import { useDispatch } from 'react-redux';
import { getUsersAction } from '../redux/userDucks';

function PageUsers() {

	// Lanza el reducer userReducer
	const dispatch = useDispatch()

	useEffect(() => {
		// Evento que lanza el reducer, userReducer.
		dispatch(getUsersAction());
	}, []);

	return (
		<ContainerGroup>
			<Container>
				<Title>React form validation with formik and styled components</Title>
				<WrapperForm>
					<UserForm />
					<ToastContainer />
				</WrapperForm>
				<WrapperUsers>
					<Users />
					<ToastContainer />
				</WrapperUsers>
			</Container>
		</ContainerGroup>
	);
}

export default PageUsers;
