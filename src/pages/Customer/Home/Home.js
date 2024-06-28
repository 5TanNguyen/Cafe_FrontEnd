import './Home.css';

export default function Home() {
  return (
    <div className="home-container">
      <div className="home-content">
        <div className="home-text">
          <p>MEET YOU NEW BEST FRIEND</p>

          <h4>With over 80 breeds of puppies, you are sure to find your new furry friend!</h4>

          <button className="home-btn">VIEW AVAILABLE PUPPIES</button>
        </div>
      </div>

      <div className='home-story'>
        <div className='home-story-image'>
          <img src="https://www.ilovepets.com/wp-content/uploads/2019/11/corgi-6-1024x913.jpg" />
        </div>
        <div className='home-story-content'>
          <h2>THE PET SHOP STORY</h2>
          <p>
            The need for a different kind of pet store inspired our founder to create The Pet Shop in 1975. His vision was to put the health and happiness of all his pets first which created our company motto: “Animals First in All That We Do.” For 40 years we have been doing just that. We have grown into a full-line pet shop.

            Our Pet Counselors all love what they do in caring for and handling all our pets. Many of whom started as customers prior to coming to work for us. Everyone has taken our exclusive training and testing program and will love answering any of your pet questions.
          </p>

          <button className='home-stoty-btn'>VIEW DEAIL</button>
        </div>
      </div>

      <div className="home_product">
          <h3 className="heading">Sản phẩm đề xuất</h3>
          <div className="box_container">
            <div className="box">
              <img className="box_img" src="https://www.ilovepets.com/wp-content/uploads/2019/11/corgi-6-1024x913.jpg" />
              <h3>Cún</h3>
              <p>Sẽ tìm được việc trước 28/5</p>
              <a href="" className="btn">MUA</a>
            </div>

            <div className="box">
              <img className="box_img" src="https://www.ilovepets.com/wp-content/uploads/2019/11/corgi-6-1024x913.jpg" />
              <h3>Cún</h3>
              <p>Sẽ tìm được việc trước 28/5</p>
              <a href="" className="btn">MUA</a>
            </div>

            <div className="box">
              <img className="box_img" src="https://www.ilovepets.com/wp-content/uploads/2019/11/corgi-6-1024x913.jpg" />
              <h3>Cún</h3>
              <p>Sẽ tìm được việc trước 28/5</p>
              <a href="" className="btn">MUA</a>
            </div>
          </div>
        </div>
    </div>
  ) 
}
