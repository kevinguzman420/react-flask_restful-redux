import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Table, Thead, Th, Td, UserActions, UserIconAction } from '../layout/AppStyled';

import { useDispatch, useSelector } from 'react-redux';
import { getUserAction, deleteUserAction } from '../../redux/userDucks';

function Users() {

    const dispatch = useDispatch();
    const users = useSelector(store => store.users.array);

    return (
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
            <tbody>
                {
                    users ? users.map(user => (
                                    <tr key={user.id}>
                                        <Td>{user.name}</Td>
                                        <Td>{user.lastname}</Td>
                                        <Td>{user.age}</Td>
                                        <UserActions>
                                            <UserIconAction
                                                className="fas fa-pen"
                                                onClick={() => dispatch(getUserAction(user.id, user.name, user.lastname, user.age))}
                                            >
                                            </UserIconAction>

                                            <UserIconAction
                                                className="fas fa-trash"
                                                onClick={() => dispatch(deleteUserAction(user.id))}
                                            >
                                            </UserIconAction>

                                        </UserActions>
                                    </tr>
                    ))
                        : null
                }
            </tbody>
            }
        </Table>
    )
}

export default Users;