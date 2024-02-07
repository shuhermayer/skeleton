const cardWrapper = document.querySelectorAll('.cardWrapper')
const editBtn = document.querySelector('.editBtn')
const editWidget = document.querySelectorAll('.editWidget')
const deleteWidget = document.querySelectorAll('.deleteWidget')
const cardEditForm = document.getElementById('cardEditForm')
const publishBtn = document.querySelector('.publishBtn')
const buyBtn = document.querySelectorAll('.buyBtn')

if (cardEditForm) {
  const { cardId } = cardEditForm.dataset

  const pathName = window.location.pathname
  const method = pathName.includes('new') ? 'POST' : 'PUT'
  const url = pathName.includes('new') ? '/api/card' : `/api/card/${cardId}`
  console.log('window.location.pathname', window.location.pathname)
  cardEditForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    const formData = Object.fromEntries(new FormData(cardEditForm))
    console.log('cardEditForm submit', formData)
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
    const resData = await res.json()
    if (res.status === 200 || res.status === 201) window.location.href = `/card/${resData.card.id}`
  })
}

if (buyBtn) {
  console.log(buyBtn)
  buyBtn.forEach((element) => {
    console.log(element)
    element.addEventListener('click', async () => {
      console.log('buyBtn')
      const { cardId } = element.dataset
      const res = await fetch('/api/cart/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cardId }),
      })
      // const resData = await res.json()
      if (res.status === 201) {
        element.textContent = 'В корзине'
        element.disabled = true
      }
    })
  })
}

if (publishBtn) {
  publishBtn.addEventListener('click', async () => {
    const status = publishBtn.textContent === 'Снять с публикации'
    const res = await fetch(`/api/${window.location.pathname}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ published: !status }),
    })
    const resData = await res.json()
    if (resData.card.published) {
      publishBtn.textContent = 'Снять с публикации'
    } else {
      publishBtn.textContent = 'Опубликовать'
    }
  })
}

if (window.location.pathname === '/shop-cabinet') {
  const newCard = document.querySelector('.addNew')
  newCard.addEventListener('click', () => {
    window.location.href = '/card/new'
  })
  const cards = document.querySelectorAll('.cardWrapper')
  cards.forEach((card) => {
    if (card.classList.length === 1) {
      card.addEventListener('click', (e) => {
        if (!e.target.closest('.cardToolbarBtn')) {
          // e.stopPropagation()
          const { cardId } = card.dataset
          window.location.href = `/card/${cardId}`
        }
      })
    }
  })
}

// хорошая идея, но не пригодилось

// document.addEventListener('click', (event) => {
//   const target = event.target.closest('.cardToolbarBtn')
//   if (target) {
//     const card = target.closest('.cardWrapper')
//     if (card) {
//       const cardId = card.getAttribute('data-card-id')
//     }
//   }
// })

if (editBtn) {
  editBtn.addEventListener('click', (ev) => {
    console.log('editBtn clicked', ev)
    window.location.href += '/edit'
  })
}

if (editWidget) {
  editWidget.forEach((element) => {
    element.addEventListener('click', () => {
      const { cardId } = element.closest('.cardWrapper').dataset
      window.location.href = `/card/${cardId}/edit`
    })
  })
}

if (deleteWidget) {
  deleteWidget.forEach((element) => {
    element.addEventListener('click', async () => {
      const card = element.closest('.cardWrapper')
      const { cardId } = card.dataset
      const res = await fetch(`/api/card/${cardId}`, {
        method: 'DELETE',
      })
      if (res.status === 204) card.remove()
    })
  })
}
