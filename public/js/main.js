document.addEventListener('click', (event) => {
  const target = event.target.closest('.cardToolbarBtn')
  console.log(target)
  console.log(target.getAttribute('data-type'))
  if (target) {
    const card = target.closest('.cardWrapper')
    if (card) {
      const cardId = card.getAttribute('data-card-id')
      console.log(`card id = ${cardId}`)
    }
  }
})
