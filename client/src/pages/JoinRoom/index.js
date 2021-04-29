import React, { useState } from 'react';

function JoinRoom () {
    const [url, setUrl] = useState('')

    const handleChange = (e) => {
        setUrl(e.target.value)
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        location.href = `lobby/${url}`;
    }

    return (
    <>
        <form aria-label="redirect" onSubmit={handleSubmit}>
           <h3>Type URL here to Join Game</h3>
           <label for="url">Shared Link</label>
           <input id='url' aria-label="joinLink" type='text' name="urlInput" placeholder="Type url here" value={url} onChange={handleChange} />
           <input type="submit" value="Join Game"/>
        </form>   
    </>)

}

export default JoinRoom;