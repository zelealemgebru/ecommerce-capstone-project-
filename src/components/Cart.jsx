/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom'

export function Cart({ cart, handleAddToCart, setCart }) {
  function handleRemoval(evt, product) {
    const alreadyInCard = cart.filter((item) => item.id !== product.id)
    localStorage.setItem('cart', JSON.stringify(alreadyInCard))
    setCart(alreadyInCard)
  }
  const navigate = useNavigate()

  // JR:
  // You didn't have checkout
  // had inconsistent key naming in local storage
  // changing quantity didn't work
  // wrong formula for getting price

  return cart.length === 0 ? (
    <h2 className="cart_total">
      Your cart is currently empty. Show it some love by adding some items.
    </h2>
  ) : (
    <div>
      <div className="cart_total">
        <h3>TOTAL: </h3>
        <h3>
          {cart
            .reduce((acc, item) => {
              acc += item.price * item.count
              return acc
            }, 0)
            .toFixed(2)}
        </h3>
        {/* <Link to="/checkout"> */}
        <button
          type="button"
          onClick={() => {
            alert('thank you for Shopping!')
            localStorage.setItem('cart', JSON.stringify([]))
            setCart([])
            navigate('/')
          }}>
          Checkout
        </button>
        {/* </Link> */}
      </div>
      <div>
        {cart.map((item) => (
          <div key={item.id} className="cart">
            <div>
              <img src={item.image} />
            </div>

            <h3>{item.name}</h3>
            <h3>${item.price.toFixed(2)} each</h3>
            <h3>Subtotal: ${(item.price * item.count).toFixed(2)} </h3>

            <div className="main">
              <label htmlFor="qty">Quantity: {item.count}</label>
              <select
                name="qty"
                id={`changeQty${item.id}`}
                defaultValue={item.count}
                onChange={(evt) => handleAddToCart(evt, item)}>
                {/* {item.inventory > 15 */}
                {Array.from(Array(15)).map((ele, idx) => (
                  <option key={idx} value={idx + 1}>
                    {idx + 1}
                  </option>
                ))}
              </select>
            </div>
            <button type="button" onClick={(event) => handleRemoval(event, item.id)}>
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
