import React from 'react'
import "./MainHeader.css"
export default function MainHeader(props) {
    return (
        <div>
            <header>
                {props.children}
            </header>
        </div>
    )
}
