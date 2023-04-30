// import React from 'react'

function Rating({ rating, numReviews }) {

  return (
      <div className="rating">
          <span>
              <icon className={rating >= 1 ? 'fas fa-star' :
                  rating >= 0.5 ? 'fas fa-star-half-alt' : 'far fa-star '
              } />
          </span>
          <span>
              <icon className={rating >= 2 ? 'fas fa-star' :
                  rating >= 1.5 ? 'fas fa-star-half-alt' : 'far fa-star '
              } />
          </span>
          <span>
              <icon className={rating >= 3 ? 'fas fa-star' :
                  rating >= 2.5 ? 'fas fa-star-half-alt' : 'far fa-star '
              } />
          </span>
          <span>
              <icon className={rating >= 4 ? 'fas fa-star' :
                  rating >= 3.5 ? 'fas fa-star-half-alt' : 'far fa-star '
              } />
          </span>
          <span>
              <icon className={rating >= 5 ? 'fas fa-star' :
                  rating >= 4.5 ? 'fas fa-star-half-alt' : 'far fa-star '
              } />
          </span>
          <span> {numReviews} </span>
    </div>
  )
}

export default Rating