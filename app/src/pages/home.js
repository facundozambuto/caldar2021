import React from 'react';
import '../assets/css/aos.css';
// import './bootstrapp-datepicker.css';
// import './bootstrapp.min.css';
// import './jquery-ui.css';
// import './jquery-fancybox.min.css';
// import './magnific-popup.css';
// import './meidaelementplayer.css';
// import './owl.carousel.min.css';
// import './owl.theme.default.min.css';
import '../assets/css/style.css';

function Home() {
  return (
    <div className='home'>
        <div className="ftco-blocks-cover-1">
            <div className="ftco-cover-1 overlay" style={{backgroundImage: `url('assets/images/hero_1.jpg')`}}>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-5">
                            <h1 className="line-bottom">Caldar 2021</h1>
                        </div>
                        <div className="col-lg-5 ml-auto">
                        
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default Home;