import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const HeaderLayout = (props) => {
  console.log(props);
  const [over, setOver] = useState(false);
  const router = useRouter();
  // console.log(router);
  const regex = /^[a-zA-Z0-9-_* .ก-๙]/;
  const checkRegex = (e) => {
    setOver(false);
    if (!regex.test(e.key)) {
      e.preventDefault();
    }
  };

  const mouseOver = (event) => {
    if (event.type === 'mouseover') {
      setOver(false);
    } else if (event.type === 'mouseleave') {
      setOver(true);
    } else if (event.type === 'mouseout') {
      setOver(true);
    }
  };
  useEffect(() => {
    props.setsearch('');
  }, [router]);

  return (
    <div
      className="header-wrapper py-3"
      style={{
        boxShadow: '1px 0px 1px 0px rgba(50,50,50,.8);',
        paddingTop: '0px !important',
        paddingBottom: '0px !important',
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-8 ">
            <Link href="/" className="logo">
              <img
                src="https://www.nicepng.com/png/detail/216-2164807_image-the-secret-life-of-pets-logo-catalanpng.png"
                style={{
                  width: '100px',
                  height: '40px',
                  cursor: 'pointer',
                  marginTop: '10px',
                  marginBottom: '10px',
                }}
                alt="logo"
              />
            </Link>
          </div>
          <div className="col-lg-4">
            <div className="user-avater" style={{ marginTop: '10px' ,marginLeft: '10px'}}>
              <img src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png" alt="user" />
              <div className="user-menu">
                <ul className="w-100 p-0">
                  <li>
                    <Link href="login/signin">
                    <a>
                      <i class="ti-user"></i>Login
                    </a>
                    </Link>
                  </li>
                 
                </ul>
              </div>
            </div>
            <div className="search-div mt-2 mr-0" >
              <input
                type="text"
                placeholder="Search"
                onChange={props.search}
                value={props.getsearch}
                onMouseOver={mouseOver}
                onKeyPress={checkRegex}
              />
              <div className="listVideo" onMouseOver={mouseOver} onMouseLeave={mouseOver}>
                {props.getsearch !== '' && !over ? (
                  <div style={{ position: 'absolute', zIndex: 3 }}>
                    <ul style={{ minWidth: '198px', maxWidth: '450px' }}>
                      {props.listOfVideo.map((data) => {
                         return (
                          <Link href={{ pathname: '/content/[id]', query: { id:data.id  } }}>
                            <li style={{ cursor: 'pointer' }} onClick={props.clearSearch}>
                              {data.Title}
                            </li>
                          </Link>
                        );
                      })}
                    </ul>
                  </div>
                ) : (
                  ''
                )}
              </div>
            </div>
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderLayout;
