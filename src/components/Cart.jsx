/* eslint-disable react/prop-types */
export function Cart ({cart, handleAddToCart,setCart}){
  function handleRemoval(evt, product){
      const alreadyInCard = cart.filter(item => item.id !== product.id)
      
      localStorage.setItem("cart", JSON.stringify(alreadyInCard))
     setCart(alreadyInCard)
    }
  
  return cart.length === 0 ?      ( <h2 className="cart_total">
  Your cart is currently empty. Show it some love by adding some items.
</h2> ) : (
        <div>
        <div className="cart_total">
          <h3>TOTAL: </h3>
          <h3>
            ${' '}
            {this.props.cart
              .reduce((acc, item) => {
                acc += item.price * item.order_item.quantity / 100
                return acc
              }, 0)
              .toFixed(2)}
          </h3>
          {/* <Link to="/checkout"> */}
            <button type="submit">Checkout</button>
          {/* </Link> */}
        </div>
        <div>
          {cart.map((item) => (
            <div key={item.id} className="cart">
              <div>
                <img src={item.image} />
              </div>

              <h3>{item.name}</h3>
              <h3>${item.price / 100} each</h3>
              <h3>
                Subtotal: ${item.price * item.order_item.quantity / 100}{' '}
              </h3>

              <div className="main">
                <label htmlFor="qty">Quantity: {item.quantity}</label>
                <select
                  name="qty"
                  defaultValue={item.count}
                  onChange={evt => handleAddToCart(evt, item)}
                >
                  {/* {item.inventory > 15 */}
                    { Array.from(Array(15)).map((ele, idx) => (
                        <option key={idx} value={idx + 1}>
                          {idx + 1}
                        </option>
                      ))}
                    {/* : Array.from(Array(item.inventory)).map((ele, idx) => (
                        <option key={idx} value={idx + 1}>
                          {idx + 1}
                        </option>
                      ))} */}
                </select>
              </div>
              <button
                type="button"
                onClick={event => handleRemoval(event, item.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
)
}