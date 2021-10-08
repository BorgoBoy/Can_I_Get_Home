import React from 'react'
import { useHistory } from 'react-router-dom';
import { PlusIcon } from "@heroicons/react/solid";

function Add (props) {
    let history = useHistory()

    return (
        <div>
            <button className="z-10 fixed bottom-25 right-25 bg-green-500 hover:bg-green-700 py-4 px-4 rounded-full" onClick={() => history.push(props.to)}>
                <PlusIcon className="h-8 w-8 text-white"/>
            </button>
        </div>
    )
}

export default Add