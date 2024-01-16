import React, { useRef, useState } from 'react';
import './ImageGenerator.css';
import default_image from '../Assets/default_image.svg';


const ImageGenerator = () => {

const [image_url,setImage_url]=useState("/");
let inputRef = useRef(null);
const [loading,setLoading] = useState(false);

const generateImage = async () =>{
    if(inputRef.current.value===""){
return 0;
    }
    try {
        setLoading(true);

        
    const response = await fetch(
        "https://api.openai.com/v1/images/generations",
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                Authorization:
                "Bearer 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",
                "User-Agent":"Chrome",
            },
            body:JSON.stringify({
                prompt:`${inputRef.current.value}`,
                n:1,
                size:'512x512',
            }),
        }
    );

    if (!response.ok) {
        throw new Error(`Failed to generate image. Status: ${response.status}`);
      }

      const data = await response.json();
      const imageUrl = data.data[0].url;

      setImage_url(imageUrl);
      setLoading(false);
    } catch (error) {
      console.error("Error generating image:", error);
      setLoading(false);
    }
  };

  return (
    <div className='ai-image-generator'>
      <div className="header">Ai image <span>generator</span></div>
      <div className="img-loading">
        <div className="image">
          <img src={image_url === "/" ? default_image : image_url} alt="" />
        </div>
        <div className="loading">
          <div className={loading ? "loading-bar-full" : "loading-bar"}></div>
          <div className={loading ? "loading-text" : "display-none"}>Loading...</div>
        </div>
      </div>
      <div className="search-box">
        <input type="text" ref={inputRef} className='search-input' placeholder='Describe what you want to see' />
        <div className="generate-btn" onClick={() => { generateImage() }}>Generate</div>
      </div>
    </div>
  );
}

export default ImageGenerator;