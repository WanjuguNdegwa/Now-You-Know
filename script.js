const selectCountry = document.querySelector('#top-stories-countries');
const topStories = document.querySelector('#top-stories')
// const searchFrom = document.querySelector('.search');
// const input = document.querySelector('.input');
// const newsList = document.querySelector('.news-list');
const apiToken = 'JQwKBt3SpUJsKPGuzxCaTg4TPc2WG95U7UvKGLle'


selectCountry.addEventListener('change', retrieveTopStories);

function retrieveTopStories(e) {

    // if (input.value === '') {
    //     alert('Input field is empty!');
    //     return
    // }

    // newsList.innerHTML = ''

    e.preventDefault();

    let locale = selectCountry.value;

    let url = `https://api.thenewsapi.com/v1/news/top?api_token=${apiToken}&locale=us&limit=5&locale=${locale}`

    fetch(url)
        .then((response) => response.json())
        .then((response) => {
            console.log(response);
            const cards = response.data.map(article => {
                return `
                <div class="card" style="width: 16rem;">
                <a href="${article.url}" target='_blank'><img src="${article.image_url}" class="card-img-top" alt="..."></a>
                    <div class="card-body">
                        <a href="${article.url}" target='_blank'><h5 class="card-title">${article.title}</h5></a>
                        <p class="card-text">${article.description}</p>
                    </div>
                </div>
                `
            })
        topStories.innerHTML = cards.join('')


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