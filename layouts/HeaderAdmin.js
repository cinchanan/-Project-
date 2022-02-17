import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const HeaderAdminLayout = () => {


  return (
    <div
      className="header-wrapper py-3"
     
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-8 ">
       
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
    
          </div>
          <div className="col-lg-4">
          
            <div className="user-avater" style={{ marginTop: '10px' ,marginLeft: '10px'}}>
              <img src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png" alt="user" />
              <div className="user-menu">
                <ul className="w-100 p-0">
             
                  <li>
                    <Link href="/">
                    <a>
                      <i className="ti-user"></i>Logout
                    </a>
                    </Link>
                  </li>
                 
                </ul>
              </div>
            </div>
           
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderAdminLayout;
