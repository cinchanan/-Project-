import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup';
import Scrollbar from 'react-perfect-scrollbar';
import Link from 'next/link';
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const url ="http://localhost:1337"
const Course =(props) => {

    return(
        <div className="h-100">
        <Scrollbar component="div" options={{ suppressScrollX: true }} style={{ minHeight: 400 }}>
          <ListGroup>
                <div className="slide-wrapper" style={{ marginBottom: 5 }}>
                  <div className="row">
                    <div className="col-sm-12">
                      <div
                        className="owl-item "
                        style={{
                          width: '100%',
                          height: 100,
                          cursor:"pointer"
                        }}
                      >
                           {props.clip.Link.map((value, index) => {
                return (
                    <div className="owl-items" onClick={props.clickVideo.bind(this,value)}>
                      <a className="slide-one slide-two slide-three" >
                        <div
                          className="slide-image"
                          style={{
                            width: '100%',
                            height: 100,
                            backgroundImage: `url(${url}${props.clip.Thumbnail})`,
                          }}
                        >
                          {
                            props.id === value.id?                      
                            <>
                              <FontAwesomeIcon icon={faPlay} style={{fontSize:'30px',color:'#F2F2F2',zIndex:2,position:'absolute',left:'43%',bottom:'30%'}} />
                              <div className="layer" style={{backgroundColor:'#626567',opacity:'0.6',position:'absolute',width:'100%',height:'100%'}}/>
                            </> :null
                          }
                        </div>
                        <div className="slide-content">
                          <h4 className="text-white">{ props.id === value.id ? "": `Part ${index+1} `} </h4>
                        </div>
                      </a>
                    </div>
                                 
                );
              })}
                       
                      </div>
                    </div>
                  </div>
                </div>
              {/* ) */}
            {/* })} */}
          </ListGroup>
        </Scrollbar>
      </div>
    )
}

export default Course
