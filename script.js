const searchFrom = document.querySelector('.search');
const input = document.querySelector('.input');
const newsList = document.querySelector('.news-list');
const apiToken = 'JQwKBt3SpUJsKPGuzxCaTg4TPc2WG95U7UvKGLle'


searchFrom.addEventListener('submit', retrieveTopStories);

function retrieveTopStories(e) {

    if (input.value === '') {
        alert('Input field is empty!');
        return
    }

    newsList.innerHTML = ''

    e.preventDefault();

    let topic = input.value;

    let url = `https://api.thenewsapi.com/v1/news/top?api_token=${apiToken}&locale=us&limit=5&search=${topic}`

    fetch(url).then((response) => {
        return response.json();
    }).then((response) => {
        console.log(response);
        response.data.forEach(article => {
            let li = document.createElement('li');
            let a = document.createElement('a');
            a.setAttribute('href', article.url);
            a.setAttribute('target', '_blank');
            a.textContent = article.title;
            li.appendChild(a);
            newsList.appendChild(li);
        })
    }).catch((error) => {
        console.log(error);
    })
}



function retrieveAllNews(e) {

    e.preventDefault()

    let topic = input.value;

    let url = ``

    console.log(topic)

}

function retrieveSimilarNews(e) {

    e.preventDefault()

    let topic = input.value;

    let url = ``

    console.log(topic)

}