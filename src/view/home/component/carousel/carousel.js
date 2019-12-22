import React from "react"
import { Carousel } from 'antd';
import './carousel.scss'
function onChange(a, b, c) {
    console.log(a, b, c);
}

export default function CoustomCarousel(props) {
    let images=[
       
        "http://pic1.win4000.com/wallpaper/5/585900095b4b0.jpg",
        "http://ww1.sinaimg.cn/large/d2e27164gw1fbtmndc12xj21kw0w04fy.jpg",
        "http://desk-fd.zol-img.com.cn/t_s960x600c5/g5/M00/01/00/ChMkJ1XNTAiIHoSKAAKNzF75fKsAAAEIQCglckAAo3k967.jpg"        
    ]
    return (
        <div style={styles.wrapper}>
            <Carousel autoplay afterChange={onChange}>
                {
                    images.map(item=>{
                        return(
                            <img style={styles.image} src={item}></img> 
                        )
                    })
                }
                
            </Carousel>
        </div>
    )
}
const styles = {
    wrapper:{
        padding:"20px"
    },
    image:{
        height:"300px"
    }
}
