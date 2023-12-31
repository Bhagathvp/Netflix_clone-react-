import React from 'react'
import Youtube from 'react-youtube'
import { useEffect,useState } from 'react'
import axios from '../../axios'
import './RowPost.css'
import {imageUrl,API_KEY} from '../../constants/constants'

function RowPost(props) {
    const [movies, setMovies] = useState([]);
    const [urlId,setUrlId] = useState('');

    useEffect(() => {
      axios.get(props.url).then((response)=>{
        console.log(response.data);
        setMovies(response.data.results)
    }).catch(err=>{
        console.log("url not found");
        // alert('Network Error')
    })
    
    }, [])
    
    const opts = {
        height: '390',
        width: '100%',
        playerVars: {
          autoplay: 1,
        },
      };

      const handleMovie = (id)=>{
        console.log(id);
        axios.get(`movie/${id}/videos?language=en-US&api_key=${API_KEY}`).then(response =>{
            console.log(response.data);
            if(response.data.results.length!==0){
                setUrlId(response.data.results[0])
            }else{
                console.log("Array Empty");
            }
        }).catch(err=>{
            console.log("Returning a 404 error");
            console.log(err);
        })
      }
    
    
  return (
    <div className='row'>
        <h2>{props.title}</h2>
        <div className='posters'>
            {movies.map((obj)=>
                <img onClick={()=>handleMovie(obj.id)} className={props.isSmall ?'smallPoster' :'poster'} src={`${imageUrl+obj.backdrop_path}`} alt="poster" />

            )}
        </div>
        {urlId  &&  <Youtube opts={opts} videoId={urlId.key} />  }
    </div>
  )
}

export default RowPost