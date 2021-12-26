import React from 'react'
import { Link } from 'react-router-dom'
import "./UserItem.css"
import Avatar from '../../shared/components/UIElements/Avatar/Avatar/Avatar';
import Card from "../../shared/components/UIElements/Card/Card"
export default function UserItem({ id, name, placeCount, image }) {
    return (
        <div className="user-item">
            <Card>
                <Link to={`${id}/place`}>
                    <div className="user-item__content">
                        <div className="user-item-image">
                            <Avatar image={image} alt={name} />
                        </div>
                        <div className="user-item__info">
                            <h2>{name}</h2>
                            <h3>{placeCount} {placeCount === 1 ? 'place' : 'places'}</h3>

                        </div>

                    </div>
                </Link>
            </Card>
        </div>
    )
}
