import React,{useState,useEffect} from 'react'
import "../../style/reels.css"
import axios from "axios"
import ReelFeed from '../../component/ReelFeed'



const Home = () => {

   const [ videos, setVideos ] = useState([])
    // Autoplay behavior is handled inside ReelFeed
    console.log("start")

  useEffect(()=>{
    axios.get("http://localhost:3000/api/foodAdd/",{withCredentials:true})
      .then(response => {

                console.log(response.data);

                setVideos(response.data.foods)
        })

        .catch(() => { /* noop: optionally handle error */ })
  },[])

   // Using local refs within ReelFeed; keeping map here for dependency parity if needed

  async function likeVideo(item) {

        const response = await axios.post("http://localhost:3000/api/foodAdd/like", { foodId: item._id }, {withCredentials: true})

        if(response.data.like){
            console.log("Video liked");
            setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, likeCount: v.likeCount + 1 } : v))
        }else{
            console.log("Video unLiked");
            setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, likeCount: v.likeCount - 1 } : v))
        }
        
  }

  async function saveVideo(item) {
        const response = await axios.post("http://localhost:3000/api/foodAdd/save", { foodId: item._id }, { withCredentials: true })
        
        if(response.data.save){
          console.log("video saved")
            setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, savesCount: v.savesCount + 1 } : v))
        }else{
          console.log("video unsaved")
            setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, savesCount: v.savesCount - 1 } : v))
        }
    }
  return (

       <ReelFeed
            items={videos}
            onLike={likeVideo}
            onSave={saveVideo}
            emptyMessage="No videos available."
      />
    
  )
}

export default Home