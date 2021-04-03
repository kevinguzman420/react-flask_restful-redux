import { Form, Field } from "formik";
import styled from 'styled-components';


export const ContainerGroup = styled.div`
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
export const Container = styled.div`
	width: 80%;
	height: 80%;
	display: grid;
	grid-template-areas: "title title" "form users";
	grid-template-rows: 15% 85%;
	column-gap: 1em;


	@media only screen and (max-width: 1023px) {
		grid-template-areas: "title" "form" "users";
		grid-template-rows: 15% auto auto;
		row-gap: 1em;
	}
	@media only screen and (max-width: 480px) {
		width: 90%;
	}
`;
export const Title = styled.h1`
	margin: 0;
	margin-bottom: 1em;
	grid-area: title;
	text-transform: uppercase;
	font-size: 1.7em;
	text-align: center;
	color: blue;
`;
export const WrapperForm = styled.div`
	border: 1px solid blue;
	grid-area: form;
	display: flex;
	justify-content: center;
	align-items: center;
`;
export const Forms = styled(Form)`
	width: 80%;
	height: 80%;

	@media screen and (max-width: 480px) {
		width: 100%;
	}
`;
export const FormGroup = styled.div`
	width: 90%;
	/* text-align: center; */
	margin: 0 auto;
	margin-bottom: 1em;
`;
export const Label = styled.label`
	color: #0000ff;
	text-transform: uppercase;
	font-size: .9em;
`;
export const Input = styled(Field)`
	width: 95%
`;
export const Info = styled.p`
	color: red;
	margin: 0;
	margin-top: .5em;
`;
export const Btn = styled.button`
	background-color: #0000ff;
	border: none;
	border-radius: 5px;
	padding: .5em 3.5em;
	color: #e6e6e6;
	cursor: pointer;
`;

export const WrapperUsers = styled.div`
	border: 1px solid blue;
	grid-area: users;
	display: flex;
	justify-content: center;
	align-items: top;
`;
export const Table = styled.table`
	width: 80%;
	height: 80%;
	overflow-y: auto;
	padding-top: .5em;

	@media screen and (max-width: 480px) {
		width: 95%;
	}
`;
export const Thead = styled.thead`
	height: 30px;
	border: 1px solid red;
`;
export const Th = styled.th`
	/* border: 1px solid black; */
	background: #171717;
	color: #e6e6e6;
`;
export const Td = styled.td`
	/* border: 1px solid blue; */
`;
export const UserActions = styled.td`
	text-align: center;
`;
export const UserIconAction = styled.i`
	cursor: pointer;
	margin: 0 .5em;
`;

