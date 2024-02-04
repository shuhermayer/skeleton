const modal = document.querySelector('.modal')
const login = document.getElementById('login')
const signin = document.getElementById('signin')
const signout = document.getElementById('signout')

// кнопка перехода на главную
const home = document.getElementById('home')

// кнопка перехода в кабинет магазина
const storeCabinet = document.getElementById('storeCabinet')
const modalTitle = document.getElementById('modalTitle')
const modalOverlay = document.getElementById('modalOverlay')
const modalContainer = document.querySelector('.modalContainer')

modalContainer.addEventListener('click', (e) => {
  e.stopPropagation()
})
modalOverlay.addEventListener('click', () => {
  modal.hidden = true
})

home.addEventListener('click', () => {
  window.location.href = '/'
})

if (signin) {
  signin.addEventListener('click', (e) => {
    console.log('e', e)
    modal.hidden = false
    modalTitle.textContent = 'Регистрация'
    const form = document.getElementById('form')
    form.elements.btm.textContent = 'Зарегистрироваться'
    form.addEventListener('submit', async (event) => {
      event.preventDefault()
      const res = await fetch('/api/register', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify({
          login: form.login.value,
          password: form.password.value,
        }),
      })
      if (res.status === 201) {
        window.location.href = '/'
      } else {
        console.log('Неверный пароль')
      }
    })
  })

  login.addEventListener('click', () => {
    modal.hidden = false
    modalTitle.textContent = 'Авторизация'
    const form = document.getElementById('form')
    console.log('form.elements', form.elements)
    form.elements.btm.textContent = 'Войти'
    console.log('form', form)
    form.addEventListener('submit', async (e) => {
      e.preventDefault()
      let errorElement = document.getElementById('errorMessage')
      if (errorElement) errorElement.remove()
      const res = await fetch('/api/login', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify({
          login: form.login.value,
          password: form.password.value,
        }),
      })
      if (res.status === 200) {
        window.location.href = '/'
      } else {
        errorElement = document.createElement('div')
        errorElement.id = 'errorMessage'
        const error = await res.json()
        errorElement.textContent = error.error
        form.append(errorElement)
        console.log('Неверный пароль')
      }
    })
  })
} else {
  console.log('signout', signout)
  signout.addEventListener('click', async () => {
    await fetch('/api/login', {
      method: 'DELETE',
    })
    window.location.href = '/'
  })

  storeCabinet.addEventListener('click', () => {
    window.location.href = '/shop-cabinet'
  })
}
