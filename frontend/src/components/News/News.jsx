import React from 'react';
import FirstNews from '../images/altgtu.jpg';
import stiles from './News.module.css';

const News = () => {
    return (
        <div className={stiles.newscard} >
            <div className={stiles.imgnews}>
                <img className={stiles.imgstart} src={FirstNews} alt="news"/>
            </div>
            <h1 className="text-(--color-my-acient) font-bold text-center pt-3">News</h1>
            <p className="p-3">
                jnjndajbndjbn u iuah uaheugherugharuhgaeruhg arh g8ayrh g8yar h8h8 eg  sdfb sfd sdfb sdfb dfsb dsfb dfb sdf b dsf bdf bdf bdf b bfd bs dbsfd bsdf b
            </p>
        </div>
    );
};

export default News;