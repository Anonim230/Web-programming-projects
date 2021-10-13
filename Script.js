var toSee = [],
    arrayToSearch = [],
    sortCategories = ['Up to down', 'Down to Up', "By stars", "Stars(reverse)"],
    categories = ["All", "Adventure", "Animation", 'Comedy', 'Family', 'Fantasy', 'Documentary', 'Music', 'Uncategorized'],
    filmList = [{
        "Title": "Patton Oswalt: Annihilation",
        "fulltitle": "Patton Oswalt: Annihilation (2017)",
        "movie_year": 2017,
        "Categories": "Uncategorized",
        "summary": "Patton Oswald, despite a personal tragedy, produces his best standup yet. Focusing on the tribulations of the Trump era and life after the loss of a loved one, Patton Oswald continues his journey to contribute joy to the world.",
        "ImageURL": "https://hydramovies.com/wp-content/uploads/2018/04/Patton-Oswalt-Annihilation-Movie-Poster.jpg",
        "imdb_id": "tt7026230",
        "imdb_rating": 7.4,
        "runtime": 66,
        "language": "English",
        "ytid": "4hZi5QaMBFc"
    }, {
        "Title": "New York Doll",
        "fulltitle": "New York Doll (2005)",
        "movie_year": 2005,
        "Categories": "Documentary|Music",
        "summary": "A recovering alcoholic and recently converted Mormon, Arthur \"Killer\" Kane, of the rock band The New York Dolls, is given a chance at reuniting with his band after 30 years.",
        "ImageURL": "https://hydramovies.com/wp-content/uploads/2018/04/New-York-Doll-Movie-Poster.jpg",
        "imdb_id": "tt0436629",
        "imdb_rating": 7.9,
        "runtime": 75,
        "language": "English",
        "ytid": "jwD04NsnLLg"
    }, {
        "Title": "Peter Rabbit",
        "fulltitle": "Peter Rabbit (2018)",
        "movie_year": 2018,
        "Categories": "Adventure|Animation|Comedy|Family|Fantasy",
        "summary": "Based on the books by Beatrix Potter: Peter Rabbit (James Corden;) his three sisters: Flopsy (Margot Robbie,) Mopsy (Elizabeth Debicki) and Cotton Tail (Daisy Ridley) and their cousin Benjamin (Colin Moody) enjoy their days harassing Mr McGregor in his vegetable garden. Until one day he dies and no one can stop them roaming across his house and lands for a full day or so. However, when one of Mr McGregor's relatives inherits the house and goes to check it out, he finds much more than he bargained for. What ensues, is a battle of wills between the new Mr McGregor and the rabbits. But when he starts to fall in love with Bea (Rose Byrne,) a real lover of all nature, his feelings towards them begin to change. But is it too late?",
        "ImageURL": "https://hydramovies.com/wp-content/uploads/2018/04/Peter-Rabbit-Movie-Poster.jpg",
        "imdb_id": "tt5117670",
        "imdb_rating": 6.6,
        "runtime": 95,
        "language": "English",
        "ytid": "7Pa_Weidt08"
    }],
    bookmarkButton = document.createElement("ul"),
    bookmarked = []
append = (array, mother) => array.map(item => mother.appendChild(item))
search = event => {
    var foundFilms = []
    event.preventDefault()
    for (let a of event.target.children) {
        // console.log(a.name);
        if (a.type == 'submit') continue
        if (a.name == "Title") {
            if (a.value) {
                foundFilms = filmList.filter(object => object[a.name].toUpperCase().indexOf(a.value.toUpperCase()) != -1)
            } else foundFilms = filmList
        } else if (a.name == "imdb_rating") {
            // console.log(foundFilms);
            foundFilms = foundFilms.filter(object => object[a.name] > +a.value)
                // console.log(foundFilms);
        } else if (a.name == "Categories") {
            for (let i of a.children) {
                if (i.innerHTML == "All") foundFilms = foundFilms
                if (i.selected && i.innerHTML != 'All') {
                    console.log(i.innerHTML);
                    foundFilms = foundFilms.filter(object => +object[a.name].split('|').indexOf(i.innerHTML) >= 0)
                }
            }
            // console.log(foundFilms);
            foundFilms.reverse()
                // console.log(foundFilms);
        } else if (a.name == 'sort') {
            for (let i of a.children) {
                console.log(i.innerHTML, i.selected);
                if (i.innerHTML == sortCategories[1] && i.selected) break
                else if (i.innerHTML == sortCategories[0] && i.selected) foundFilms.reverse()
                else if (i.innerHTML == sortCategories[3] && i.selected) foundFilms.sort((a, b) => a.imdb_rating - b.imdb_rating)
                else if (i.innerHTML == sortCategories[2] && i.selected) foundFilms.sort((a, b) => b.imdb_rating - a.imdb_rating)
            }
        }
    }
    console.log(foundFilms);
    createFilm(foundFilms)
        // bookmarkButton.appendChild()
        //  if (a.name == "Categories") {
        //     for (let i of a.children) {
        //         if (i.selected) console.log(i);
        //     }
        // }
}
createSearch = () => {
    var form = document.createElement('form'),
        searchName = document.createElement('input'),
        searchRating = document.createElement('input'),
        submit = document.createElement('input'),
        searchCategory = document.createElement('select'),
        searchSort = document.createElement('select')
    for (let op of categories) {
        let option = document.createElement('option')
        option.innerHTML = op
        searchCategory.appendChild(option)
    }
    for (let op of sortCategories) {
        let sortop = document.createElement('option')
        sortop.innerHTML = op
        searchSort.appendChild(sortop)
    }
    searchSort.name = 'sort'
    searchRating.type = "number"
    searchRating.placeholder = "Reyting bo'yicha qidiring"
    searchRating.maxLength = 2
    searchName.placeholder = 'Kino nomini qidirish'
    searchRating.className = 'form-control'
    searchName.className = searchSort.className = searchCategory.className = 'form-control my-1'
    submit.classList.add('form-control', 'btn-primary')
    submit.type = 'submit'
    submit.value = 'Search'
    form.onsubmit = search
    searchName.name = 'Title'
    searchCategory.name = 'Categories'
    searchRating.name = 'imdb_rating'
    append([searchName, searchRating, searchCategory, searchSort, submit], form)
    others.appendChild(form)
}
createSearch()
createBadge = (array) => {
    bookmarkButton.classList.add("position-relative", 'm-3', 'w-75')
    bookmarkButton.innerText = 'Bookmarked'
    others.append(bookmarkButton)
}
addBookmark = (event) => {
    // console.log(event, bookmarked);
    // console.log(event);
    if (event) {
        if (bookmarked.indexOf(event.target.parentNode) == -1) {
            bookmarked.push(event.target.parentNode)
            event.target.classList.add('bg-danger')
            event.target.innerHTML = 'Bookmarked'
                // console.log('Doing');
        } else {
            bookmarked.find((val, index) => val.id == event.target.parentNode.id ? bookmarked.splice(index, 1) : false)
            event.target.classList.remove('bg-danger')
            event.target.innerHTML = 'Bookmark'
        }
        bookmarkButton.innerHTML = 'Bookmarked'
        console.log(bookmarked);
        for (let a of bookmarked) {
            console.log(a);
            let li = document.createElement('li')
            li.innerHTML = event.target.title
            bookmarkButton.appendChild(li)
        }
    }
    // if (bookmarked.findIndex() == -1) {
    //     bookmarked.push(event.target.parentNode)
    //     addBookmark()
    // } error: Uncaught TypeError: undefined is not a function
    // at Array.findIndex (<anonymous>)
    // at <anonymous>:1:12
}
createFilm = (array) => {
        list.innerHTML = ''
        if (array.length == 0) list.innerHTML = 'Error 404:Films not found'
        array.map(object => {
            let card = document.createElement("li")
            card.classList.add("card", "col-3", 'my-3'),
                cardBody = document.createElement("div")
            cardBody.id = object.ytid
            cardBody.classList.add("card-body"),
                img = document.createElement("img")
                // console.log(object);
            img.src = `https://picsum.photos/200/200?random=${Math.floor(Math.random()*array.length)}`
                // img.classList.add("card")
            img.classList.add("card-img-top"),
                cardTitle = document.createElement("h5")
            cardTitle.classList.add("card-title"),
                cardText = document.createElement("p")
            cardText.classList.add("card-text", 'my-2')
            cardStar = document.createElement('p')
            cardStar.innerHTML = object.imdb_rating + '&#9733'
            card.style = 'width:40%'
            let watch = document.createElement('a')
            watch.setAttribute('href', 'https://www.youtube.com/watch?v=' + object.ytid)
            watch.innerHTML = "Watch trailer"
            watch.classList.add('btn', 'btn-primary', "text-white", 'border-primary')
            watch.id = object.id
            let info = document.createElement('button')
            info.innerHTML = "More info"
            info.classList.add('btn', 'btn-primary', "text-white", 'mx-3', 'border-primary')
            info.id = object.id
            info.setAttribute('data-info', object.summary)
            let bookmark = document.createElement('button')
            bookmark.innerHTML = "Bookmark"
            bookmark.onclick = addBookmark
            bookmark.classList.add('btn', 'btn-primary', "text-white", 'border-primary')
            bookmark.id = object.id
            bookmark.title = object.Title
                // cardText.innerText = `Type: ${object.type}`
            cardTitle.innerHTML = object.Title
            append([img, cardTitle, cardText, cardStar, watch, info, bookmark], cardBody)
            card.appendChild(cardBody)
            list.appendChild(card)
            arrayToSearch = array
        })
    }
    // addBookmark = () => {

// }
createBadge(toSee)
createFilm(movies)