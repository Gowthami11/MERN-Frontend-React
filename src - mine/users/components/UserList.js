import React from 'react'
import "./UserList.css"
import UserItem from './UserItem';
import Card from '../../shared/components/UIElements/Card/Card';
export default function UserList(props) {
    if (props.items.length === 0)
        return (
            <div className="center">
                <Card>
                No users found
                </Card>
            </div>
        )
    return (
        <div className="users-list">
        <ul>{props.items.map(item => (
            <UserItem key={item.id}
                id={item.id} image={item.image}
                name={item.name}
                placeCount={item.places} />
        ))}</ul>
        </div>
    )
}
