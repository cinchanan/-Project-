import React from 'react'
import PlyrComponent from 'plyr-react';


const Shortvideo =(props) => {

  // React.useEffect(() => {
  //   console.log('propsShort',props)
  // },[props.clip]);
  
    const sourceVideo = React.useMemo(()=> {
      return {
        type: 'video',
        sources: [
          {
            src: props.clip,
            provider: 'youtube',
          }
        ],
      }
    },[props.clip]);




    return(
        <div style={{width:"100%",height:"100%"}} className="singleVideo">
            <PlyrComponent source={sourceVideo} style={{width:'761px'}} />
          
        </div>
    )
}

export default Shortvideo
