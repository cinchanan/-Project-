import React from 'react';
import Head from 'next/head'
import { useRouter } from "next/router";
import HeaderLayout from '../layouts/Header';
import FooterLayout from '../layouts/Footer';
import HeaderAdminLayout  from '../layouts/HeaderAdmin';
import { GetContent } from './content/api';
import 'react-perfect-scrollbar/dist/css/styles.css';
import 'plyr-react/dist/plyr.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/themify-icons/themify-icons.css';
import 'swiper/swiper.min.css';
import '../styles/main.css';

import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/pagination/pagination.min.css';
import 'swiper/components/scrollbar/scrollbar.min.css';

import '../styles/autonimation.css';
import '../styles/custom.css';



const Template = ({ Component, pageProps, ...appProps }) => {
const imgNotFound = '/uploads/image_not_found_10eedcba0a.png';
const [Allvideo, setAllvideo] = React.useState([]);
  const [getsearch, setsearch] = React.useState('');
  const [getDataContent, setDataContent] = React.useState({});

  const DataContent = async () => {
    const { data } = await GetContent();
    if (data) {
      let new_data = data.map((item, index) => {
        // console.log(item);
        return {
          id: item.id,
          ContentType: item.ContentType,
          Author: item.Author,
          Title: item.Title,
          Thumbnail: item.Thumbnail.length > 0 ? item.Thumbnail[0].url : imgNotFound,
          category: item.Category.map((item) => {
            return item.Name_Ctgr;
          }),
        };
      });
  console.log(new_data);
      setDataContent(new_data);
    }
  };

  const search = (e) => {
    setsearch(e.target.value);
    const result = getDataContent.filter((elm) => {
      console.log(elm);
      return elm.Title.toLowerCase().match(e.target.value.toLowerCase());
    }); 
   console.log(result);
    setAllvideo(result);
  };
  const clearSearch = () => {
    setsearch('');
  };

 
  React.useEffect(() => {
    setAllvideo(getDataContent);
    setsearch('');
    DataContent();
  }, []);
  const router = useRouter();
  console.log(router.asPath)
  const getLogin = () =>{
    if([`/login/signin`,`/content/create/listcontent`,`/content/create/[id]`].includes(appProps.router.pathname))
  
    return (
      <div className="main-wrapper">
      <Head>
        <title>Pet Academy</title>
      </Head>
      <HeaderAdminLayout/>
    <Component {...pageProps} />
    <FooterLayout />
    </div>);
  return (
    <>
      <div className="main-wrapper">
        <Head>
          <title>Pet Academy</title>
        </Head>
         <HeaderLayout
          listOfVideo={Allvideo}
          search={search}
          getsearch={getsearch}
          clearSearch={clearSearch}
          setsearch={setsearch}
        />
        <Component {...pageProps}/>
        <FooterLayout />
      </div>
    </>
  );
};
return getLogin();
}
export default Template;
