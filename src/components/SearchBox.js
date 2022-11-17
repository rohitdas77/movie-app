import React from 'react';

const SearchBox= (props) =>{
    return (
        <div className='col col-sm-3'>
        <input 
        name='inputBox'
        placeholder='Search'
        value={props.value}
        onChange={(event)=>{
            props.setSearch(event.target.value)
        }}
         />
        </div>
    )
}

export default SearchBox;