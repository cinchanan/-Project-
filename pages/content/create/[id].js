import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import Switch from 'react-switch';
import { Col, Container, Card, Form, Button } from 'react-bootstrap';
import { FaTrashAlt, FaPlusSquare } from 'react-icons/fa';
import PlyrComponent from 'plyr-react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Link from 'next/link';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  ContentCreateService,
  GetCategory,
  GetContentID,
  LinkService,
  UpdateContent,
  UpdateLinkService
} from '../api';

import { FilePond, File, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginImageTransform from 'filepond-plugin-image-transform';
import FilePondPluginImageCrop from 'filepond-plugin-image-crop';
import FilePondPluginImageResize from 'filepond-plugin-image-resize';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';

import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

registerPlugin(
  FilePondPluginFileValidateType,
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginImageCrop,
  FilePondPluginImageResize,
  FilePondPluginImageTransform
);
//check input 
const schema = yup.object().shape({
  Title: yup.string().min(10).required(),
  Author: yup.string().required(),
  Description: yup.string().min(10).max(1000).required(),
});
//check search 
const useStyles = makeStyles((theme) => ({
  root: {
    width: 500,
    '& > * + *': {
      marginTop: theme.spacing(3),
    },
  },
}));

const Create = () => {
  const classes = useStyles();
  const router = useRouter();

  const [getVideo, setVideo] = useState('');
  const [files, setFiles] = useState([]);
  const [idthumbnail, setId] = useState();
  const [category, setCategory] = useState([]);
  const [fields, setFields] = useState([{ name:'',link:'', id: null}]);
  const [publicStatus, setPublicStatus] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  // const [Link, setLink] = useState([]);
  // const [getdata,setdata] = useState([]);

  const { handleSubmit, register, watch, setValue, errors } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const sourceVideo = {
    type: 'video',
    sources: [
      {
        src: getVideo,
        provider: 'youtube',
      },
    ],
  };
  const onVideo = (index, event) => {
    // setVideo(event.target.value);
    // handleLinkChange(event);
    fields[index].link =event.target.value
    setFields([...fields]);
  };

  //
  const fetchData = async () => {
    const { data } = await GetCategory();
    if (data) {
     
      let new_data = data.map((item, index) => {
        return { id: item.id, title: item.Name_Ctgr };
      });
      setCategory(new_data);
    }
  };
  const fetchDataContent = async () => {
    const { data } = await GetContentID(router.query.id);

    setValue('ContentType', data.ContentType);
    setValue('Author', data.Author);
    setValue('Description', data.Description);
    setValue('Title', data.Title);
    setPublicStatus(data.Status);
    setSelectedCategory(
      data.Category.map((item, index) => {
        return {
          id: item.id,
          title: item.Name_Ctgr,
        };
      })
    );
  
    data.Link.map((item, index) => { //Put link to array link for render in html
      manualAdd(index, item.Name, item.Url ,item.id);
      setButtonDisabled(false);
    });
    
  };
  const LinkContent = async (link) => {  //Create link 
    let new_link = [];
    for (const item of link) {
      console.log('item',item);
      let temp_link = []; 
      if(item.id == ""){
        temp_link = await LinkService(item.sequence, item.name, item.url);
      }else{
        temp_link = await UpdateLinkService(item.sequence, item.name, item.url, item.id);
      }
      new_link.push(temp_link);
    }
    console.log('after temp', new_link);
    new_link = new_link.map((elm) => {
      return elm.data.id;
    });
    console.log('complete link', new_link);
    return new_link;
  };

  const contentType = watch('ContentType');
  const manualAdd = (index, name, link ,id) => { //function receive parameters (index,name,link,id)
    if (index === 0) {
      setFields((fields) => [{ name: name, link: link ,id:id }]);
      return;
    }
    setFields((fields) => [...fields, { name: name, link: link ,id:id }]);
  };

  const handleAdd = () => { 
    let values = [...fields];
    values.push({ value: '1' });
    setFields(values);
    setButtonDisabled(true);
  };

  const handleRemove = (i) => {
    let values = [...fields];
    values.splice(i, 1);
    setFields(values);
  };

  const submit = async (form) => {
    const conf = confirm('Success');
    // console.log(selectedCategory);
    if (conf) {
      let transform_link = handleLinkSubmit(form);
      let new_link = await LinkContent(transform_link);
      let new_tag = selectedCategory.map((item) => {
        return item.id;
      });

      if (isEditMode) {
        const { data } = await UpdateContent(
          router.query.id,
          form.Author,
          form.ContentType,
          form.Title,
          form.Description,
          idthumbnail,
          publicStatus,
          new_link,
          new_tag
        );
      } else {
        console.log('created', new_link);
        const { data } = await ContentCreateService(
          form.Author,
          form.ContentType,
          form.Title,
          form.Description,
          idthumbnail,
          publicStatus,
          new_link,
          new_tag
        );
      }
    }
  };
  const handleLinkSubmit = (form) => { //transform form to link
    let link = [];
    
    for (const [key, value] of Object.entries(form)) {
     console.log(`${key}: ${value}`);
     let temp_link = document.getElementsByName(key)[0];
     let link_id = (temp_link != undefined) ? temp_link.id : null;
      console.log('link_id',link_id);
      if (key.includes('link-name') || key.includes('link')) {
        let index = key.charAt(key.length - 1);
        if (link[index] == null) { //if link is null
          link.push({
            sequence: index,
            name: null,
            url: null,
            id: null
          });
        }
        if(key.includes('link-name')) {
          link[index].name = value;
        } else if (key.includes('link')) {
          link[index].url = value;
        }
        
        if(link_id != null){
          link[index].id = link_id;
        }
      }
    }
    console.log(link);
    return link;
  };

  //button add link
  const handleLinkChange = (index, event) => {
    console.log('1');
    let name_arry = Array.from(document.getElementsByClassName('name-link-input'));
    let link_arry = Array.from(document.getElementsByClassName('link-input'));
    fields[index].name = event.target.value;
    // fields[index].link =event.target.value
    setFields([...fields]);
    if (name_arry.length > 0 && link_arry.length > 0) {
      let found_name = name_arry.find((element) => element.value.length === 0);
      let found_link = link_arry.find((element) => element.value.length === 0);

      if (!found_name && !found_link) {
        setButtonDisabled(false);
        return;
      }

      setButtonDisabled(true);
    }
  };

  React.useEffect(() => {
    fetchData();
    //fetchDataContent()
    if (router.query.id !== 'clip' && router.query.id !== undefined) {
      setIsEditMode(() => true);
      // alert('edit')
    }
    if (isEditMode) {
      fetchDataContent();
    }
  }, [router.query.id, isEditMode]);
  //console.log(router.query.id);

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Container>
        <Form.Group>
          <Form.Row>
            <Col>
              <Form.Label>Content Type</Form.Label>
              <Form.Control name="ContentType" ref={register} as="select" placeholder="Choose..">
                <option value="Video">Video</option>
                <option value="Course">Course</option>
              </Form.Control>

              <Form.Label>Clip Title</Form.Label>
              <Form.Control name="Title" ref={register} placeholder="Enter Title" />
              <p style={{ color: 'red' }}>{errors.Title?.message}</p>
              <Form.Label>Description</Form.Label>
              <Form.Control
                className="pt-2"
                name="Description"
                placeholder="Write something"
                ref={register}
                as="textarea"
                rows={5}
              />
              <p style={{ color: 'red' }}>{errors.Description?.message}</p>

              <Card body className="mt-4">
                <Form.Label className="mt-0">Name Link</Form.Label>
                <Form.Control
                  className="name-link-input"
                   ref={register}
                  name="link-name-0"
                  value={fields[0]?.name} //select first data name_link for single link video 
                  id={fields[0]?.id}
                  placeholder="Enter Name Link"
                  onChange={handleLinkChange.bind(this, 0)}
                />
                <Form.Label className="mt-2">Link</Form.Label>
                <Form.Control
                  className="link-input"
                   ref={register}
                  name="link-0"
                  value={fields[0] ? fields[0].link : null}//select first data url_link for single link video 
                  id={fields[0]?.id} 
                  placeholder="Enter Link Video"
                  onChange={onVideo.bind(this, 0)}
                />
              </Card>

              {/* {getVideo && (
                <div>
                  <PlyrComponent source={sourceVideo} />
                </div>
              )} */}

              
              {fields.map((field, idx) => { //select multi data url_link for video course
                console.log(fields);
                if (idx !== 0) { // start from second link
                  console.log(field);
                  return (
                    <div key={`${field.name}-${idx}`}>
                      <Card body className="mt-2">
                        <FaTrashAlt className="float-right" onClick={() => handleRemove(idx)} />
                        <Form.Label className="mt-0">Name Link</Form.Label>
                        <Form.Control
                          className="name-link-input"
                           ref={register}
                          name={`link-name-${idx}`}
                          value={field.name}
                          id={field?.id}
                          // value={name.value}
                          placeholder="Enter Name Link"
                          onChange={handleLinkChange.bind(this, idx)}
                        />
                        <Form.Label className="mt-2">Link</Form.Label>
                        <Form.Control
                          className="link-input"
                         ref={register}
                          name={`link-${idx}`}
                          value={field.link}
                          id={field?.id}
                          placeholder="Enter Link Video"
                          onChange={onVideo.bind(this,idx)}
                        />
                      </Card>
                    </div>
                  );
                }
              })}

              {contentType === 'Course' ? (
                <div className="mt-2">
                  <Button
                    variant="primary"
                    size="md"
                    block
                    disabled={buttonDisabled}
                    onClick={() => handleAdd()}
                  >
                    <FaPlusSquare className="mr-2" /> Add link
                  </Button>
                </div>
              ) : (
                ''
              )}
            </Col>

            <Col>
              <Form.Label>Thumbnail</Form.Label>
            
              <div className= "w-50 p-2 mx-auto float-center">
                <FilePond
                  files={files}
                  onupdatefiles={setFiles}
                  allowMultiple={false}
                  name="files"
                  instantUpload={true}
                  acceptedFileTypes="image/png, image/jpeg"
                  labelIdle='Drag & Drop your picture or <span class="filepond--label-action">Browse</span> '
                  imagePreviewHeight="250"
                  imageCropAspectRatio="16:9"
                  imageResizeTargetWidth="740"
                  imageResizeTargetHeight="400"
                  stylePanelLayout="compact circle "
                  styleLoadIndicatorPosition="center bottom"
                  styleProgressIndicatorPosition="center bottom"
                  styleButtonRemoveItemPosition="center bottom"
                  styleButtonProcessItemPosition="center bottom"
                  server={{
                    url: 'http://localhost:1337',
                    process: {
                      url: '/upload',
                      method: 'POST',
                      withCredentials: false,
                      headers: {},
                      timeout: 7000,
                      onload: (response) => {
                        let data = JSON.parse(response);
                        setId(data[0].id);
                      },
                      onerror: (error) => console.error(error),
                      ondata: null,
                    },
                  }}
                />
             
              <h6 className='text-muted text-center'>Size 740 x 400 File PNG,JPG</h6>
              </div>

              <Form.Label className="mt-0">Author</Form.Label>
              <Form.Control name="Author" ref={register} placeholder="Enter Author" />
              <p style={{ color: 'red' }}>{errors.Author?.message}</p>

              <Form.Label>Tag</Form.Label>
              <div className={classes.root}>
                <Autocomplete
                  multiple
                  id="tags-outlined"
                  options={category}
                  getOptionLabel={(option) => option.title}
                  value={selectedCategory}
                  getOptionSelected={(option, value) => value.title === option.title}
                  filterSelectedOptions
                  onChange={(_, selectedOptions) => setSelectedCategory(selectedOptions)}
                  renderInput={(params) => (
                    <TextField {...params} variant="outlined" placeholder="Favorites" />
                  )}
                />
              </div>

              <Form.Label>State</Form.Label>
              <br />

              <Switch
                onChange={(checked) => setPublicStatus(checked)}
                checked={publicStatus}
                className="react-switch"
                height={25}
                width={50}
              />

              <p>
               <span>{publicStatus ? 'Published' : 'Draft'}</span>.
              </p>

              <div style={{ textAlign: 'end' }}>
                <Link href="/content/create/listcontent" >
                <Button variant="outline-secondary" size="md">
                  CANCLE
                </Button>
                </Link>

                {/* <Button variant="primary" size="md" type="submmit" className="ml-2">
                  SAVE
                </Button> */}
                {router.query.id !== 'clip' ? (
                  <Button variant="primary" size="md" type="submmit" className="ml-2">
                    UPDATE
                  </Button>
                ) : (
                  <Button variant="primary" size="md" type="submmit" className="ml-2">
                    SAVE
                  </Button>
                )}
              </div>
            </Col>
          </Form.Row>
        </Form.Group>
      </Container>
    </form>
  );
};

export default Create;
