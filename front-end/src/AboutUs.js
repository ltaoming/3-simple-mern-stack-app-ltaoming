import React, { useState, useEffect } from 'react'
import axios from 'axios'

const AboutUs = props => {
  const [intro, setIntro] = useState('')
  const [imageUrl, setImageUrl] = useState('')

//   const fetchMessages = () => {
//     // setMessages([])
//     // setLoaded(false)
//     axios
//       .get(`${process.env.REACT_APP_SERVER_HOSTNAME}/messages`)
//       .then(response => {
//         // axios bundles up all response data in response.data property
//         const messages = response.data.messages
//         setMessages(messages)
//       })
//       .catch(err => {
//         const errMsg = JSON.stringify(err, null, 2) // convert error object to a string so we can simply dump it to the screen
//         setError(errMsg)
//       })
//       .finally(() => {
//         // the response has been received, so remove the loading icon
//         setLoaded(true)
//       })
//   }

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_HOSTNAME}/aboutus`)
      .then(response => {
        const intro = response.data.intro
        const imageUrl = response.data.imageUrl
        setIntro(intro)
        setImageUrl(imageUrl)
      })
      .catch(error => {
        console.error('failed to retrieve info: ', error)
      })
  }, [])
  return (
    <>
      <h1>Taoming Liu</h1>
      <p id="my-intro">{intro}</p>
      <img
        src={imageUrl}
        alt="MyPhoto"
      />
    </>
  )
}

// make this component available to be imported into any other file
export default AboutUs