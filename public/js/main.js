const cardWrapper = document.querySelectorAll('.cardWrapper')
const editBtn = document.querySelector('.editBtn')
const cardEditForm = document.getElementById('cardEditForm')

if (cardEditForm) {
  cardEditForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    const formData = Object.fromEntries(new FormData(cardEditForm))
    const { cardId } = cardEditForm.dataset

    const res = await fetch('/api/card', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        id: cardId,
      }),
    })
    console.log('res', res)
    const resData = await res.json()
    if (resData.status === 'OK') window.location.href = `/card/${cardId}`
  })
}

console.log('cardWrapper', cardWrapper)

cardWrapper.forEach((card) => {
  card.addEventListener('click', () => {
    const { cardId } = card.dataset
    window.location.href = `/card/${cardId}`
    // window.location.assign(`/card/${cardId}`)
  })
})

if (editBtn) {
  editBtn.addEventListener('click', () => {
    window.location.href += '/edit'
  })
}

document.addEventListener('click', (event) => {
  const target = event.target.closest('.cardToolbarBtn')
  if (target) {
    console.log(target)
    console.log(target.getAttribute('data-type'))
    const card = target.closest('.cardWrapper')
    if (card) {
      const cardId = card.getAttribute('data-card-id')
      console.log(`card id = ${cardId}`)
    }
  }
})
