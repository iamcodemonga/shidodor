import React from 'react';
import LegendImage from '../resources/img/shidodorImg.jpg';

export default function Biography() {
    return (
        <section className="info-wrapper">
            <div className="container">
                <div className="row gx-5 gy-4">
                    <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6">
                        <div>
                            {/* <img className="w-100" src="https://m.media-amazon.com/images/I/61NHYftHg0L._SY355_.jpg" alt='Legend_img'/> */}
                            <img className="w-100" src={LegendImage} alt='Legend_img'/>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6">
                        <div className="h-100 mt-3">
                        <h1>ABOUT ME</h1>
                        <p>Shidodor Nwatu is a devotional artist by birth, and was among the 6,000 artistes being initially auditioned nation wide for selection into the Nigerian national troupe under the director of late chief Herbert Ogunde who was also made to be the consultant of that troupe in 1988.HIS NAMES ARE Chief Priest Ndubuisi Nnamchi Shidodor Nwatuechi. was born On 3rd of November 1964 to the family of Late Chief Nnamchi Echi Nwaogbodo in Umuaniagu Attakwu autonomous community Akegbe-Ugwu Awkunanaw of Nkanu West local government area, Enugu state Nigeria. Because I am born into the Ancestral home of Ugwuakum in Attakwu, I am often referred to as Prince Prophet Ebenezer Nwatu Echi. Echi is gotten from my fathers name Nnamchiechi..&nbsp;&nbsp;</p>
                        <p> The music I am playing is the music of my people, it is my family inheritance from nature. My late father  Chief Nnamchi Echi nwaogbodo ,The Enyi di Uru 1 of Nkanu lanu, was a dealer and a consultant in all kind of cultural and traditional costumes, such as Metal gong  (Ogene) wooden gong (ekwe) ,costumes for masquerades with traditional burial cloth Isi Ota, traditional.&nbsp;&nbsp;</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
