import React from 'react';
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import moment from 'moment'
const url ="http://localhost:1337"
const Cardvideo = (props) => {
 console.log(props)
  return (
    <div>
      <Link href={{ pathname: '/content/[id]', query: { id: props.data.id } }}>
        <Card
          className="h-100 mb-3"
          data-toggle="tooltip"
          data-placement="top"
          title={props.data.Title}
          style={{ cursor: 'pointer' }}
        >
          <Image variant="left" src={`${url}${props.data.Thumbnail}`} style={{ width: '100%',height:'22vh'}} />
          <Card.Body className="px-3" style={{ height: '100px' }}>
            <Card.Subtitle className="mb-2 text-muted">
              <div
                className="nameClip d-flex align-items flex-column bd-highlight mb-3 "
                style={{ height: '75px' }}
              >
                <h4 className="p-1 bd-highlight">{props.data.Title}</h4>

                <div className=" mt-auto p-1 bd-highlight ">
                  <div className="d-flex justify-content-between">
                    <a>{props.data.Author}</a>
                    <a>{moment(props.data.Create).fromNow()}</a>
                  </div>
                </div>
              </div>
            </Card.Subtitle>
          </Card.Body>
        </Card>
      </Link>
    </div>
  );
};

export default Cardvideo;
