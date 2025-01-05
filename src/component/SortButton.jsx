import React from 'react'

const SortButton = ({label, onClick}) => {
    return (
        <li className="border border-white rounded-md p-2.5 my-0 mx-2.5 bg-none hover:bg-cyan-gradient hover:shadow-sortbtnHoverShadow">
            <span className="no-underline text-white cursor-pointer"
            onClick={onClick}>
                {label}
            </span>
        </li>
    )
}

export default SortButton