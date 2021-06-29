import  React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Form, Image, Card } from 'react-bootstrap';
import Link from 'next/link';

import SwiperCore, { Navigation, Pagination } from 'swiper';
import moment from 'moment'
SwiperCore.use([Navigation, Pagination]);


const url ="http://localhost:1337"
const RelateClip = (props) => {
    const prevRef = React.useRef(null);
    const nextRef = React.useRef(null);
console.log('relate',props);

    // React.useEffect(() => {}, [props.clipCategory])
    return(
          <div className="row mt-3 " >
        <h2 style={{ paddingLeft: '15px', paddingBottom: '10px' }}>Related Clip</h2>
        <div className="col ">
          <Swiper
            spaceBetween={10}
            loop
            pagination={{ clickable: true }}
            // navigation={{
            //   prevEl: prevRef.current ? prevRef.current : undefined,
            //   nextEl: nextRef.current ? nextRef.current : undefined,
            // }}
            onInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
              swiper.navigation.update();
            }}
            slidesPerView={3}
          >
      
            {props.clipCategory.map((data) => {
                console.log('relate_data',data);
                return (
              <SwiperSlide>
                <Link
                  href={{ pathname: '/content/[id]', query: { id: data.id } }}
                >
                  <Card
                    className="h-100"
                    data-toggle="tooltip"
                    data-placement="top"
                    title={data.Title}
                    style={{ cursor: 'pointer' }}
                  >
                    <Image
                      variant="left"
                      src={`${url}${data.Thumbnail[0].url}`}
                      style={{ width: '100%', height: '18vh' }}
                    />
                    <Card.Body className="px-3" style={{ height: '100px' }}>
                      <Card.Subtitle className="mb-2 text-muted">
                        <div
                          className="nameClip d-flex align-items flex-column bd-highlight mb-3 "
                          style={{ height: '75px' }}
                        >
                          <h4 className="p-1 bd-highlight">{data.Title}</h4>
                          <div className=" mt-auto p-1 bd-highlight ">
                            <div className="d-flex justify-content-between">
                              <a>{data.Author}</a>
                              <a>{moment(data.created_at).fromNow()}</a>
                            </div>
                          </div>
                        </div>
                      </Card.Subtitle>
                    </Card.Body>
                  </Card>
                </Link>
              </SwiperSlide>
            )})}
            {/* <SwiperSlide >
                       <Card className = 'h-100' data-toggle="tooltip" data-placement="top" title={props.data.Title} style={{cursor:"pointer"}} >
                                <Image variant="left" src="https://i.ytimg.com/vi/jmeKj9wuIfc/maxresdefault.jpg" style={{ width: '100%', height: '17vh' }} />
                                    <Card.Body className="px-3" style={{height:'100px'}}>                                     
                                        <Card.Subtitle className="mb-2 text-muted">
                                       <div className="nameClip d-flex align-items flex-column bd-highlight mb-3 " style={{height:"75px"}}>
                                        <h4 className="p-1 bd-highlight">{props.data.Title}</h4>                                   
                                        <div className=" mt-auto p-1 bd-highlight ">
                                            <div className="d-flex justify-content-between">    
                                            <a>{props.data.Author}</a>  
                                            <a >3 mins ago</a>
                                            </div>
                                            </div>
                                            </div>
                                        </Card.Subtitle>
                                    </Card.Body>
                                </Card>                         
                              </SwiperSlide>  */}
          </Swiper> 
        </div>
      </div> 
    )

}
export default RelateClip