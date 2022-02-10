import React, { useState } from 'react';
import Cardvideo from '../pages/content/home/card';
import Form from '../pages/content/home/form';
import { Card, Tabs, Tab, Carousel } from 'react-bootstrap';
import { GetContent } from './content/api';



const category = {
  // Digital_Marketing: '#90CCFC',
 //Data: '#E6E6FA',
  Pet: '#F4A460',
  Cartoon: '#F586E9',
   Rabbit :'#B5EE69 '

};
const imgNotFound = '/uploads/image_not_found_10eedcba0a.png';
const Home = () => {
  
  const [getDataContent, setDataContent] = useState([]);

  const DataContent = async () => {
    const { data } = await GetContent();
    if (data) {
      let new_data = data.map((item, index) => {
      //   console.log(item);
        return {
          id: item.id,
          ContentType: item.ContentType,
          Author: item.Author,
          Title: item.Title,
          Thumbnail: item.Thumbnail.length > 0 ? item.Thumbnail[0].url : imgNotFound,
          category: item.Category.map((item) => {
            return item.Name_Ctgr;
          }),
          Create:item.created_at
        };
      });
      // console.log(new_data);
      setDataContent(new_data);
    }
  };

  React.useEffect(() => {
    DataContent();
  }, []);

  return (
    <div>
      
      
       <div  style={{ marginTop: '20px', marginBottom: '20px' }}>
        <div>
          <img
            className="d-block w-60"
            style={{ width: 'auto', height: '65vh', margin: 'auto',border: '1px solid #edece9' }}
            src="https://www.teahub.io/photos/full/254-2545392_the-secret-life-of-pets-wallpaper-secret-life.jpg"
          />
        </div>

      </div>
      <div className="container">
        <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
          <Tab eventKey="home" title="All Video">
            <div className="row" style={{ paddingTop: '20px' }}>
              {' '}
              {getDataContent.map((value, index) => {
                return (
                  <div className="col-3">
                    <Cardvideo data={value} index={index} />
                  </div>
                );
              })}
            </div>
          </Tab>
          {Object.keys(category).map((value) => {
            const filtercategory = getDataContent.filter((category) => {
              return category.category.includes(value);
            });

            return (
              <Tab eventKey={value} title={value.charAt(0).toUpperCase() + value.slice(1)}>
                <div className="row" style={{ paddingTop: '20px' }}>
                  {filtercategory.map((value, index) => {
                    return (
                      <div className="col-3">
                        <Cardvideo data={value} index={index} />
                      </div>
                    );
                  })}
                </div>
              </Tab>
            );
          })}
        </Tabs>
      </div>
    </div>
  );
};

export default Home;
