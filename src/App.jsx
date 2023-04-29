import './App.css'
import data from './data';

function App() {

  return (
    <>
      <div>
        <header>
          <a href="/"> Amazon. </a>
        </header>
        <main>
            <h1> Featured Product </h1>
          <div className='products'>
            {
              data.products.map(product => (
                <div className='product' key={product.id}>
                  <a href={`/products/${product.slug}`} >
                  <img src={product.image} alt={product.slug} />
                  </a>
                  <div className='product-info'>
                  <a href={`/products/${product.slug}`} >
                      <p> {product.name} </p>
                    </a>
                    <p> <strong> ${product.price} </strong></p>
                    <button> Add to cart </button>
                  </div>
                </div>
              ))
            }
          </div>
        </main>
      </div>

    </>
  )
}

export default App
