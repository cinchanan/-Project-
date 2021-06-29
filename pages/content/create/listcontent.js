import React, { useState } from 'react';
import { Button, Image } from 'react-bootstrap';
import { MdbDataTable } from '../../../template/mdbDataTable';
import Link from 'next/link';
import { FaPen, FaTrashAlt } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import { GetContent,DeleteContent } from   '../api';

const url ="http://localhost:1337"
const DataTable = () => {

  const [body, setBody] = useState({
    columns: [
      { label: 'ID', field: 'id', width: 70 },
      { label: 'ContentType', field: 'contenttype', width: 150 },
      { label: 'Thumbnail', field: 'thumbnail', width: 150  },
      { label: 'Title', field: 'title', width: 130 },
      { label: 'Author', field: 'author', width: 150 },
      { label: 'Like', field: 'like', type: 'number', width: 100 },
      { label: 'Share', field: 'share', type: 'number', width: 100 },
      { label: 'View', field: 'view', type: 'number', width: 100 },
      { label: 'Status', field: 'status', width: 130 },
      { label: 'Action', field: 'action', width: 100 },
    ],
    rows: [
      {
        id: 1,
        contenttype: 'Clip',
        thumbnail: '',
        title: 'test',
        author: 'Softnix Technology',
        like: '123',
        share: null,
        view: '3000',
        status: 'true',
        action: (
          <div>
            <FaPen className="mr-2" />
            <IconContext.Provider value={{ style: { color: 'rgb(205, 45, 45)' },cursor:"pointer"  }}>
           <FaTrashAlt/>
                       </IconContext.Provider>
          </div>
        ),
      },
    ],
  });

const SubmitDelete = async(del)=> {
  const conf = confirm('Delete')
  if(conf){
 
    const {data}=await DeleteContent(del)
    if(data){
      let new_body =body;
      new_body.rows = new_body.rows.filter(element => element.id !== data.id)
      console.log(data);
      console.log(body);
      setBody([])
      setBody(new_body)
    }
  }
}

  const fetchData = async () => {
    const { data } = await GetContent();

    // console.log(data);
    if(data){
      let new_body = body;
      data.map((e, index) => {
        new_body.rows.push({
          id: e.id,
          contenttype: e.ContentType,
          thumbnail: e.Thumbnail.length > 0 &&<div className="text-center"> <Image src={`${url}${e.Thumbnail[0].url}`} style={{width:'50%' ,height:'20vh'}} /></div>,
          title: e.Title,
          author: e.Author,
          like: e.Like,
          share: e.Share,
          view: e.View,
          status: (e.Status === true)?'true':'false',  
          action: (
            <div>
              <Link href={{pathname:"/content/create/"+e.id}} ><FaPen className="mr-2" style={{cursor:"pointer"}} /></Link>
             <span  onClick={SubmitDelete.bind(this,e.id)} >
              <IconContext.Provider value={{ style: { color: 'rgb(205, 45, 45)' } }}>
               <FaTrashAlt style={{cursor:"pointer"}}/>
              </IconContext.Provider>
               </span>
            </div>
          ),
        });
      });

      setBody([]);
      setBody(new_body);
    }
  };

  React.useEffect(() => {
    fetchData();
    // console.log(body);
  }, []);

  return (
    <div className="container">
      <div className="row pt-4">
        <Link href="/content/create/clip">
          <Button className="position-absolute mt-3" style={{ right: '72px' }}>
            Create Content
          </Button>
        </Link>

        <div className="w-100">
          <MdbDataTable bordered body={body} />
        </div>
      </div>
    </div>
  );
};
export default DataTable;
