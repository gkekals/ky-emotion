import React from 'react'
import "./DiaryItem.css"
import { getEmotionImage } from "./../util/getEmotionImage"
import Button from './Button'
const DiaryItem = () => {
    const emotionId=2
    return (
        <div className='DiaryItem'>
            <div className={`img-section bg-${emotionId}`}>
                <img src={getEmotionImage(emotionId)} alt="emotion icon"/>
            </div>
            <div className="info-section">
            <div className="created-date">2025-08-19</div>
            <div className="content">일기 컨텐츠</div>
            </div>
            <div className="button-section">
                <Button text={"수정하기"}/>
            </div>
        </div>
    )
}

export default DiaryItem