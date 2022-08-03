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
                        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.&nbsp;&nbsp;</p>
                        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.&nbsp;&nbsp;</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
