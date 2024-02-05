if (window.location.pathname === '/cart') {
  console.log('cart.js')
  const cartItems = document.querySelectorAll('.cartItemContainer')
  const minusCartItemBtn = document.querySelectorAll('.minusCartItemBtn')
  const plusCartItemBtn = document.querySelectorAll('.plusCartItemBtn')
  const deleteCartItemBtn = document.querySelectorAll('.deleteCartItemBtn')

  plusCartItemBtn.forEach((plusCartItem) => {
    plusCartItem.addEventListener('click', async (e) => {
      const target = e.target.closest('.cartItemContainer')
      if (target) {
        const { cartItemId } = target.dataset
        const currentValContainer = plusCartItem.closest('.counterContaier').querySelector('.countValue')
        fetch(`/api/cart/${cartItemId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            count: 1 + Number(currentValContainer.textContent),
          }),
        })
        currentValContainer.textContent = Number(currentValContainer.textContent) + 1
      }
    })
  })

  minusCartItemBtn.forEach((minusCartItem) => {
    minusCartItem.addEventListener('click', async (e) => {
      const target = e.target.closest('.cartItemContainer')
      if (target) {
        const { cartItemId } = target.dataset
        const currentValContainer = minusCartItem.closest('.counterContaier').querySelector('.countValue')
        const newVal = Number(currentValContainer.textContent) - 1 < 1 ? 1 : Number(currentValContainer.textContent) - 1
        fetch(`/api/cart/${cartItemId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            count: newVal,
          }),
        })
        currentValContainer.textContent = newVal
      }
    })
  })

  deleteCartItemBtn.forEach((deleteCartItem) => {
    deleteCartItem.addEventListener('click', async (e) => {
      const target = e.target.closest('.cartItemContainer')
      if (target) {
        const { cartItemId } = target.dataset
        const res = await fetch(`/api/cart/${cartItemId}`, {
          method: 'DELETE',
        })
        if (res.status === 201) target.remove()
      }
    })
  })
}
