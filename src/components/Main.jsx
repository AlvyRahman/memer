import React from "react"

export default function Main()
{
    const [meme, setMeme] = React.useState({
        topText: "One does not simply",
        bottomText: "Walk into Mordor",
        imageUrl: "http://i.imgflip.com/1bij.jpg"
    })

    const [allMemes, setAllMemes] = React.useState([])

    function handleChange(event) {
        const {value, name} = event.currentTarget
        setMeme(prevMeme => ({...prevMeme, [name]: value}))
    }

    React.useEffect(()=>{
        fetch('https://api.imgflip.com/get_memes')
        .then(res => res.json())
        .then(json => setAllMemes(json.data.memes))
    }, [])

    function getNewMeme()
    {
        const randomIndex = Math.floor(Math.random() * allMemes.length)
        const randomMemeUrl = allMemes[randomIndex].url
        setMeme(prev => ({
            ...prev,
            imageUrl: randomMemeUrl
        }))
    }

    return(
        <main>
            <div className="form">
                <label>Top Text
                    <input
                        type="text"
                        placeholder="One does not simply"
                        name="topText"
                        value={meme.topText}
                        onChange={handleChange}
                    />
                </label>

                <label>Bottom Text
                    <input
                        type="text"
                        placeholder="Walk into Mordor"
                        name="bottomText"
                        value={meme.bottomText}
                        onChange={handleChange}
                    />
                </label>
                <button onClick={getNewMeme}>Get a new meme image 🖼</button>
            </div>
            <div className="meme">
                <img src={meme.imageUrl} />
                <span className="top">{meme.topText}</span>
                <span className="bottom">{meme.bottomText}</span>
            </div>
        </main>
    )
}