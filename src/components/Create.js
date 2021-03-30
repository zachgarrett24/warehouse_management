import {React, useRef} from 'react'

const Create = () => {
    const titleRef = useRef();

    return (<>
    <div className='formWrapper'>
        <form className='createForm'>
            <input placeholder={'Title'} ref={titleRef} />
            <button type="submit">Create</button>
        </form>
    </div>
    </>)
}

export default Create;