async function domReady(condition = ['complete', 'interactive']) {
    if (condition.includes(document.readyState)) return true
    document.addEventListener('readystatechange', () => {
        if (condition.includes(document.readyState)) return true
    })
}