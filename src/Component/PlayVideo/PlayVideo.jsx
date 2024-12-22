import React, { useEffect, useState } from 'react'
import './PlayVideo.css'

import like from '../../assets/like.png'
import dislike from '../../assets/dislike.png'
import share from '../../assets/share.png'
import save from '../../assets/save.png'
import jack from '../../assets/jack.png'
import user_profile from '../../assets/user_profile.jpg'
import { API_KEY, value_converter } from '../../data'
import moment from 'moment'
import { useParams } from 'react-router-dom'
//import default from './../../../eslint.config';
function PlayVideo() {
const {videoId} = useParams();

    const [channelData, setChannelData] = useState(null);
    const [apiData,setApiData] = useState(null);
    const [commentData, setcommentData] = useState([]);

    const fetchVideoData = async () => {
        //fetch video data
        const videoDetails_url=`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`
 
        const res = await fetch(videoDetails_url);
        const data = await res.json();
        setApiData(data.items[0]);
    }

    const fetchOtherData = async ()=> {
        //fetching chennel data
        const channelData_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`
      const res = await fetch(channelData_url);
      const data = await res.json();
      setChannelData(data.items[0])

const comment_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=${videoId}&key=${API_KEY}`
const re = await fetch(comment_url)
const comment = await re.json();
setcommentData(comment.items);

 
    }
    useEffect(()=>{
        fetchVideoData();
    },[videoId])

    useEffect(()=>{
        fetchOtherData();
    },[apiData])



  return (
    <div className='play-video'>
    {/* <video src={video1} controls autoPlay muted></video> */}
    <iframe   src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" ></iframe>
    <h3>{apiData?apiData.snippet.title:"Title here "}</h3>
    <div className='play-video-info'>
    <p>{apiData?value_converter(apiData.statistics.viewCount):"16"} views &bull; {apiData?moment(apiData.snippet.publishedAt).fromNow():""}</p>
    <div>
        <span><img src={like}/>{apiData?value_converter(apiData.statistics.likeCount):155}</span>
        <span><img src={dislike}/></span>
        <span><img src={share}/>Share</span>
        <span><img src={save}/>Save</span>
    </div>
    </div>
    <hr/>
    <div className='publisher'>
        <img src={channelData?channelData.snippet.thumbnails.default.url:""}/>
        <div>
           <p>{apiData?apiData.snippet.channelTitle:""}</p> 
           <span>{channelData?value_converter(channelData.statistics.subscriberCount):""} Subscribers</span>
        </div>
        <button>Subscribe</button>
    </div>
    <div className='vid-description'>
        <p>{apiData?apiData.snippet.description.slice(0,250):"Description here"}</p>
        <p>Subscribe GreatStack to watch More Tutorials on web dev</p>
        <hr/>
        <h4>{apiData?value_converter(apiData.statistics.commentCount):102} Comments</h4>
        {commentData.map((item,index)=>{
            return(
                <div key={index} className='comment'>
        <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl}/>
        <div> 
        <h3>{(item.snippet.topLevelComment.snippet.authorDisplayName).slice(0)} <span>1 day ago</span></h3>
        <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
        <div className='comment-action'>
            <img src={like}/>
            <span>{item.snippet.topLevelComment.snippet.likeCount}</span>
            <img src={dislike}/>
        </div>
        </div>
        </div>

            )

        })}
        
        
    </div>

    </div>
  )
}

export default PlayVideo