document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('*[data-date]').forEach(e => {
    e.innerText = moment(parseInt(e.dataset.date)).format('YYYY/MM/DD')
  })
  document.querySelectorAll('*[data-time]').forEach(e => {
    e.innerText = moment(parseInt(e.dataset.time)).format('YYYY/MM/DD HH:mm:ss')
  })
})
