
const Banner = () => {
    return (
        <div className="carousel w-full rounded-lg md:h-[300px] lg:h-[550px]">
            <div id="slide1" className="carousel-item relative w-full">
                <img src='https://img.freepik.com/premium-photo/vector-illustration-worlds-most-iconic-tourist-destinations-flown-by-airplane_1091302-53897.jpg?size=626&ext=jpg&ga=GA1.1.1097308270.1724586854&semt=ais_hybrid' className="w-full" />
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#slide4" className="btn btn-circle">❮</a>
                    <a href="#slide2" className="btn btn-circle">❯</a>
                </div>
            </div>
            <div id="slide2" className="carousel-item relative w-full">
                <img src='https://img.freepik.com/free-photo/beautiful-girl-standing-viewpoint-koh-nangyuan-island-near-koh-tao-island-surat-thani-thailand_335224-1094.jpg?size=626&ext=jpg&ga=GA1.1.1097308270.1724586854&semt=ais_hybrid' className="w-full" />
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#slide1" className="btn btn-circle">❮</a>
                    <a href="#slide3" className="btn btn-circle">❯</a>
                </div>
            </div>
            <div id="slide3" className="carousel-item relative w-full">
                <img src="https://i.ibb.co/PgwnYL1/pexels-ninauhlikova-725255.jpg" className="w-full" />
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#slide2" className="btn btn-circle">❮</a>
                    <a href="#slide4" className="btn btn-circle">❯</a>
                </div>
            </div>
                <div id="slide4" className="carousel-item relative w-full">
                    <img src="https://i.ibb.co/7JRpS3J/pexels-zaib-1707310.jpg" className="w-full" />
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a href="#slide3" className="btn btn-circle">❮</a>
                        <a href="#slide1" className="btn btn-circle">❯</a>
                    </div>
                </div>
        </div>
    );
};

export default Banner;
