import React from 'react'
import UserList from '../components/UserList'
export default function Users() {
    const USERS=[
        {id:'u1',name:'dummy name1',places:2,image:'https://cdn.pixabay.com/photo/2012/05/07/16/59/maze-48698_960_720.png'},
        {id:'u2',name:'dummy name1',places:2,image:'https://cdn.pixabay.com/photo/2012/05/07/16/59/maze-48698_960_720.png'},
        {id:'u3',name:'dummy name1',places:2,image:'https://cdn.pixabay.com/photo/2012/05/07/16/59/maze-48698_960_720.png'},
        {id:'u4',name:'dummy name1',places:2,image:'https://cdn.pixabay.com/photo/2012/05/07/16/59/maze-48698_960_720.png'},

    ]
    return (
        <div style={{color:'white'}}>
            <UserList items={USERS}/>
        </div>
    )
}
