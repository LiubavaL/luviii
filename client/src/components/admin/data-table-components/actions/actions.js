import React from 'react'

import IconButton from '../../../icon-button'

import './actions.scss'

const Actions = ({id, onEdit, onDelete}) => {
    return <>
            <IconButton icon="edit" onClick={onEdit}/>
            <IconButton icon="delete" onClick={onDelete}/>
        </>
}

export default Actions