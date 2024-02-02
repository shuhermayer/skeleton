const deck = document.getElementById('deck')
const afterGameStatElement = document.getElementById('afterGameStat')

function getCookie() {
  const { cookie } = document
  const cookieArr = cookie.split(';')
  const cookieObj = {}
  cookieArr.forEach((item) => {
    const [key, value] = item.split('=')
    cookieObj[key.trim()] = value
  })
  console.log('cookieObj', cookieObj)
}
getCookie()
