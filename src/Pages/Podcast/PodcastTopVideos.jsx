import React, { useState, useEffect, Fragment } from "react";
import { CiPlay1 } from "react-icons/ci";
import { IoBookmarkOutline } from "react-icons/io5";
// import img from './img2.jpeg';
import RelatedPodcast from './RelatedPodcast';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { fetchPodcast } from "../../API";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify'; // Import toast components
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles
import { REACT_APP_API_BASE_URL } from "../../ENV";

function PodcastTopVideos() {
  const API_BASE_URL = REACT_APP_API_BASE_URL;
  const [recentdata, setRecentData] = useState([]);
const [recentview,setRecentView] = useState([])
const location = useLocation()
const filteredData = location.state?.filteredData;
console.log("podcast filter state",filteredData)

useEffect(() => {
 

  
}, []);

  useEffect(() => {
    const fetchViews = async () => {
   
      try {
        const response = await fetch(`${API_BASE_URL}/views/${getUserId()}`);
        const data = await response.json();
        console.log("response data",data.podcast)
       
        setRecentView(data.podcast);
      } catch (error) {
        console.error("Error fetching views:", error);
      }
    };
    const getData = async () => {
      try {
        const result = await fetchPodcast();
        console.log({ result });
        setRecentData(result.data);
      } catch (error) {
        console.error("Fetching data error", error);
      }
    };
    if(filteredData && filteredData.length > 0){
      setRecentData(filteredData)
      
    }else{
      fetchViews();
      getData()
     
    }
    
  }, [filteredData]);

  const navigate = useNavigate();

  const formatDuration = (duration) => {
    const seconds = Math.floor(duration / 1000);
    
    if (seconds < 60) {
      return `${seconds} seconds`;
    } else {
      const minutes = Math.floor(seconds / 60);
      return `${minutes} min${minutes > 1 ? 's' : ''}`;
    }
  };

  const getUserId = () => {
    const str = document.cookie;
    const userKey = str.split('=')[1];
    return userKey;
  };

  const user_id = getUserId();


 

  const handleSaveToWishlist = async (podcastId) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/wishlist`, {
        wishItemType: 'podcast',
        wishItemId: podcastId,
        userId: user_id,
      });
      console.log('Wishlist item saved:', response.data);
      toast.success('Podcast saved to wishlist!'); // Show success toast
    } catch (error) {
      console.error('Error saving to wishlist:', error);
      toast.error('Could not save to wishlist. Please try again.'); // Show error toast
    }
  };

  return (
    <Fragment>
      <ToastContainer /> {/* Include the ToastContainer here */}
      <section className="w-full h-[89%] bg-white mt-1 text-white overflow-y-scroll Podcast_Top_Videos">
        <h1 className="flex items-center text-xl font-bold my-3 ps-3 text-black">Recently Played</h1>
        <section className="h-[90%] w-full">
          <div className="flex gap-1 w-full overflow-x-scroll Podcast_Top_Videos ps-5">
            {recentview.map((elm, ind) => (
              <div
                key={ind}
                className="cursor-pointer lg:h-[30vh] h-[25vh] lg:w-[11vw] md:w-[15vw] max-[425px]:w-[46vw] w-[22vw] flex-shrink-0 rounded-lg relative"
                onClick={() => navigate(`/podcastdetails`, { state: { id: elm.data._id } })}
              >
                <div className="absolute h-full w-full ShadedBG rounded-lg">
                  <div className="absolute right-1 top-1">
                    <IoBookmarkOutline
                      className="text-2xl cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent triggering onClick of parent div
                        handleSaveToWishlist(elm.data._id);
                      }}
                    />
                  </div>
                  <div className="absolute bottom-1 left-1 w-[93%]">
                    <p className="text-xl whitespace-nowrap overflow-hidden text-ellipsis">{elm.episodeTitle}</p>
                  
                    <p className="text-xs flex gap-1 items-center lg:text-[20px]">
                      <CiPlay1 size={15}/> {formatDuration(elm.podcastDuration)}
                    </p>
                  </div>
                </div>
                <img src={elm.picUrl ? elm.picUrl : "/loading.jpg"} alt={`Img-${ind}`} className="h-full w-full rounded-lg object-cover" />
              </div>
            ))}
          </div>
<h1 className="ps-3 text-xl font-bold my-3 text-black">Related Podcasts</h1>
          
          <div className="flex justify-start ps-5 gap-1 flex-wrap w-full overflow-x-auto Podcast_Top_Videos mt-2 ">
            {recentdata.slice(0, 3).map((elm, ind) => (
              <div
                key={ind}
                className="cursor-pointer lg:h-[42vh] h-[25vh] lg:w-[23vw] max-[998px]:w-[23vw] max-[425px]:w-[45.33vw] w-[45.33vw] flex-shrink-0 rounded-2xl relative max-[766px]:h-[26.3vh]"
                onClick={() => navigate(`/podcastdetails`, { state: { id: elm._id } })} // Handle navigation
              >
                <div className="absolute h-full w-full ShadedBG rounded-lg">
                  <IoBookmarkOutline
                    className="absolute right-1 top-1 text-2xl cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering onClick of parent div
                      handleSaveToWishlist(elm._id); // Save to wishlist
                    }}
                  />
                  <div className="absolute bottom-1 left-1 SVTBottom w-[93%] rounded-lg ps-3">
                    <p className="text-lg lg:py-1 whitespace-nowrap overflow-hidden text-ellipsis">{elm.episodeTitle}</p>
                    <Link to="/userprofile" state={{id:elm.userID ? elm.userID :""}}   onClick={(e) => {
                      e.stopPropagation()}}  ><p className="text-[16px] text-[#B4B6B7] whitespace-nowrap text-ellipsis overflow-hidden">{elm.user ? elm.user.name : ""}</p></Link>
                    <p className="text-xs flex gap-1 items-center lg:text-lg whitespace-nowrap text-ellipsis">
                      <CiPlay1 size={20}/> {formatDuration(elm.podcastDuration)}
                    </p>
                  </div>
                </div>
                <img src={elm.picUrl ? elm.picUrl : "/loading.jpg"} alt={`Img-${ind}`} className="h-full w-full rounded-lg object-cover" />
              </div>
            ))}
          </div>

          <h1 className="ps-3 text-xl font-bold my-3 text-black">Suggested Podcast</h1>

          <div className="flex gap-1 w-full overflow-x-scroll Podcast_Top_Videos ps-5">
            {recentdata.map((elm, ind) => (
              <div
                key={ind}
                className="cursor-pointer lg:h-[30vh] h-[25vh] lg:w-[11vw] md:w-[15vw] max-[425px]:w-[46vw] w-[21vw] flex-shrink-0 rounded-2xl relative"
                onClick={() => navigate(`/podcastdetails`, { state: { id: elm._id } })}
              >
                <div className="absolute h-full w-full ShadedBG rounded-lg">
                  <IoBookmarkOutline
                    className="absolute right-1 top-1 text-2xl cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering onClick of parent div
                      handleSaveToWishlist(elm._id);
                    }}
                  />
                  <div className="absolute bottom-1 left-1  w-[93%] rounded-lg ps-3">
                    <p className="text-lg  whitespace-nowrap overflow-hidden text-ellipsis lg:py-1">{elm.episodeTitle}</p>
                    {/* <Link to="/userprofile" state={{id:elm.userID ? elm.userID :""}}  onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering onClick of parent div
                    }}><p className="text-sm text-[#B4B6B7]">{elm.user ? elm.user.name : ""}</p></Link>
                    <p className="text-xs  lg:text-lg flex gap-1 items-center">
                      <CiPlay1 size={20}/> {formatDuration(elm.podcastDuration)}
                    </p> */}
                  </div>
                </div>
                <img src={elm.picUrl ? elm.picUrl : "/loading.jpg"} alt={`Img-${ind}`} className="h-full w-full rounded-lg" />
              </div>
            ))}
          </div>

          <RelatedPodcast />
        </section>
      </section>
    </Fragment>
  );
}

export default PodcastTopVideos;
