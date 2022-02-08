import React from 'react';
import { Form, Image, Card } from 'react-bootstrap';
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterIcon,
  TwitterShareButton,
  LineIcon,
  LineShareButton,
} from 'react-share';
import Avatar from '@material-ui/core/Avatar';


import moment from 'moment'

moment.locale('th')


const Url ="http://localhost:3000/content/"
const colorBadges = {
  //Digital_Marketing: '#90CCFC',
 // Data: '#E6E6FA',
  Pet: '#F4A460',
  Rabbit: '#F586E9',
  Cartoon :'#B5EE69 '

};

const Description = (props) => {
console.log('propsDes',props);

  const shareUrl = `${Url}${props.dataDetails.id}`
  console.log(shareUrl);
  const title = props.dataDetails.Title
  return (
    <div>
      <Form.Row>
        <div className="col mb-4 " style={{paddingLeft:"0px",paddingRight:"0px"}}>
          <div className="row">
            <div className="col-md-9">
              <b style={{ fontSize: 24 }}>{props.dataDetails.Title}</b>
            </div>
            <div
              className="col-md-3"
              style={{ textAlign: 'end', paddingRight: '10px', paddingLeft: '0px' }}
            >
              <p className="mb-0" style={{ fontSize: 14 }}>
                SHARE 
                <FacebookShareButton
                  url={shareUrl}
                  quote={title}
                  className="Demo__some-network__share-button ml-2"
                  style={{ marginRight: '5px' }}
                >
                  <FacebookIcon size={32} round />
                </FacebookShareButton>
                <TwitterShareButton
                  url={shareUrl}
                  title={title}
                  className="Demo__some-network__share-button"
                  style={{ marginRight: '5px' }}
                >
                  <TwitterIcon size={32} round />
                </TwitterShareButton>
                <LineShareButton
                  url={shareUrl}
                  title={title}
                  className="Demo__some-network__share-button"
                  style={{ marginRight: '5px' }}
                >
                  <LineIcon size={32} round />
                </LineShareButton>
              </p>
            </div>
          </div>

          <div className="d-flex justify-content-start" style={{ fontSize: '12px' }}>
            <p className="mb-1">{props.dataDetails.View} View</p>
            <p style={{ marginLeft: '5px' }} className="mb-1">
              {' '}
              - {moment(props.dataDetails.date).format('l')}
            </p>
          </div>
          { props.dataDetails.Category && props.dataDetails.Category.map((t) => (
            <span className="badge mr-2" style={{ backgroundColor: colorBadges[t] }}>
              {t}
            </span>
          ))}
          <hr style={{ width: '100%' }}></hr>

          <Card.Text style={{ textAlign: 'justify' }}>
            <lable style={{ paddingRight: '50px' }} />
            {props.dataDetails.Description}
          </Card.Text>
          <div className="d-flex justify-content-end " style={{ marginBottom: '10px' }}>
            <Avatar style={{ width: '32px', height: '30px', marginRight: '10px' }}>S</Avatar>
            <b className="my-auto">{props.dataDetails.Author}</b>
          </div>
        </div>
      </Form.Row>

    
    </div>
  );
};

export default Description;
