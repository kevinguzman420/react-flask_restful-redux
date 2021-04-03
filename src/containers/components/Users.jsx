import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Table, Thead, Th, Td, UserActions, UserIconAction } from '../layout/AppStyled';


function Users({users, setIsUpdating, setUserId, setName, setLastname, setAge, getUsers}) {

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
    )
}

export default Users;