import React from 'react';
import Course from './detail/course';
import Description from './detail/description';
import Shortvideo from './detail/shortvideo';
import RelateClip from './detail/relatedclip';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { GetContent, GetContentID,ContentView } from './api';

const Detail = () => {
  const [video, setVideo] = React.useState('');
  const [id, setId] = React.useState('');
  const [contentVideo, setContentVideo] = React.useState([]);
  const [contentCategory, setContentCategory] = React.useState([]);

  const router = useRouter();

  const clickVideo = (data, e) => {
    console.log('data', data);
    e.preventDefault();
    router.push('/content/' + router.query.id + '?video=' + data.id);
    setVideo(data.url);
    setId(data.id);
  };
  const DataContentClip = async () => {
    await ContentView (router.query.id)
    const { data } = await GetContentID(router.query.id);

    if (data) {
      return {
        id: data.id,
        ContentType: data.ContentType,
        Author: data.Author,
        Title: data.Title,
        Thumbnail: data.Thumbnail[0].url,
        Category: data.Category.map((data) => {
          return data.Name_Ctgr;
        }),
        View: data.View,
        date: data.created_at,
        Description: data.Description,
        Link: data.Link.map((data) => {
          return {
            name: data.Name,
            url: data.Url,
            id: data.id,
            seq: data.Sequence,
          };
        }),
      };
    }
  };
  const GetContentByCategory = async (selectedContentVideo) => {
    const { data } = await GetContent();
    console.log('content', data);
    let filteredContentVideo = data.filter((e) =>
      e.Category.some((Category) => selectedContentVideo.Category.includes(Category.Name_Ctgr))
    );
    
    console.log('filter',filteredContentVideo);
    setContentCategory(filteredContentVideo)
  };

  React.useEffect(async () => {
    if (router.query.id) {
      const new_content_video = await DataContentClip();
      //console.log('newVideo',new_content_video);
      if (router.query.video) {
        let findVideo = new_content_video.Link.find((f) => f.id == router.query.video);
        if (findVideo) {
          setVideo(findVideo.url);
          setId(findVideo.id);
        }
      } else {
        setVideo(new_content_video.Link[0].url);
        setId(new_content_video.Link[0].id);
      }
      setContentVideo(new_content_video);
      GetContentByCategory(new_content_video);
    }
  }, [router.query.id]);

  // React.useEffect(() => {
  //   console.log('video', video)
  // }, [video]);

  return (
    <div className="container">
      <div
        className={
          contentVideo.ContentType === 'Course' ? 'col-md-8 offset-md-1' : 'col-md-8 offset-md-2'
        }
        style={{ marginBottom: '10px', fontSize: 12, marginTop: '15px', paddingLeft: '4px' }}
      >
        <Link href="/">Home </Link>

        <a>/ {contentVideo.Title}</a>
      </div>
      <div className="row mt-3 mb-3">
        <div
          className={
            contentVideo.ContentType === 'Course' ? 'col-md-8 offset-md-1' : 'col-md-8 offset-md-2'
          }
        >
          <Shortvideo clip={video} />
        </div>
        {contentVideo.ContentType === 'Course' && (
          <div className="col-2">
            <Course clip={contentVideo} id={id} clickVideo={clickVideo} />
          </div>
        )}
      </div>
      <div
        className={
          contentVideo.ContentType === 'Course' ? 'col-md-10 offset-md-1' : 'col-md-8 offset-md-2'
        }
      >
        <Description dataDetails={contentVideo} />
        {contentCategory.length > 0 && <RelateClip clipCategory={contentCategory} />}
      </div>
    </div>
  );
};

export default Detail;
