document.addEventListener('DOMContentLoaded', (e) => {
    const apiKey = '7faa108fc7ec4cb3bcf3b5aa7e0c4ec8'

    const selectCountry = document.querySelector('#top-stories-countries');
    const topStories = document.querySelector('#top-stories');
    const search = document.getElementById('search');
    const loadingAnimation = document.getElementById('loading')

    function removeAllChildNodes(parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }

    function retrieveTopStories({category, query, country}) {
        removeAllChildNodes(topStories);
        loadingAnimation.style.display = 'inline-block';

        category = category || '';
        query = query || search.value;
        country = country || selectCountry.value;

        let url = `https://newsapi.org/v2/top-headlines?
                    q=${query}&
                    apiKey=${apiKey}&
                    country=${country}&
                    category=${category}&
                    limit=15`;
        url = url.replace(/\s/g, '');

        fetch(url)
            .then((response) => response.json())
            .then((response) => {
                const cards = response.articles
                    .filter(article => article.content !== null)
                    .map(article => {
                        return `
                <div class="card" style="width: 16rem;">
                <a href="${article.url}" target='_blank'><img src="${article.urlToImage}" class="card-img-top" alt="..."></a>
                    <div class="card-body">
                        <a href="${article.url}" target='_blank'><h5 class="card-title">${article.title}</h5></a>
                        <p class="card-text">${article.content}</p>
                    </div>
                </div>
                `
                    })
                    loadingAnimation.style.display = 'none';
                topStories.innerHTML = cards.join('')


            }).catch((error) => {
                console.log(error);
            })
    }

    selectCountry.addEventListener('change', (e) => {
        e.preventDefault();
        const country = e.target.value;
        retrieveTopStories({country});
    });

    search.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && e.target.value.length > 0) {
            e.preventDefault();
            const query = e.target.value;
            retrieveTopStories({query})
        }

    });

    document.querySelectorAll('.category-button').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            let category = e.target.textContent;
            category = category === 'World' ? 'general' : category;
            retrieveTopStories({category: category.toLowerCase()});
        })
    })

    retrieveTopStories({})
})