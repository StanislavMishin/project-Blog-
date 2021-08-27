const URL_POSTS = 'http://localhost:8080/api/posts';

class Post {
    constructor(creationDate, longDescription, previewUrl, shortDescription, title, ) {
        this.creationDate = creationDate;
        this.longDescription = longDescription;
        this.previewUrl = previewUrl;
        this.shortDescription = shortDescription;
        this.title = title;
    }
}

function getAllPostsOnPage(numberPage) {
    let urlPosts = `http://localhost:8080/api/posts?page=${numberPage}`;

    let xhr = new XMLHttpRequest;
    xhr.open('GET', urlPosts, false);
    xhr.send();

    let response = xhr.response;
    let jsonPost = JSON.parse(response);
    let post = jsonPost._embedded.posts;
    return post.map( function callback(currentPost) {
        return new Post(currentPost.creationDate, currentPost.longDescription, currentPost.previewUrl, currentPost.shortDescription, currentPost.title);
    })
}

function preparation() {
    let qtyPage = 3;

    let parent = document.querySelector('.pagination__numberPage');

    for( let i = 1; i <= qtyPage; i++) {
        let div = document.createElement('div');
        div.insertAdjacentHTML('beforeend', `<a href="" onclick="event.preventDefault(); showBlockPost(${i-1}); activeNumber(${i});">${i}</a>`);
        parent.appendChild(div);
    }
    showBlockPost(0);
}

function showBlockPost(numberPage) {
    removeBlockPosts();
    let arrPost = getAllPostsOnPage(numberPage);
    arrPost.forEach(addPost);
}


function addPost(currentPost) {
    let parent = document.querySelector('.main-body-blogPost-flex');
    parent.insertAdjacentHTML('afterbegin', `
            <div class="main-body-blogPost-flex__img">
            </div>
            <div class="main-body-blogPost-flex-postInfo">
                <div class="main-body-blogPost-flex-postInfo__date">
                    <p>Date</p>
                </div>
            </div>
            <div class="main-body-blogPost-flex-text">
            </div>
            <div class="main-body-blogPost-flex__line">
            </div>`);

    let block = document.querySelector('.main-body-blogPost');
    
    let parentImg = document.querySelector('.main-body-blogPost-flex__img');
    let img = document.createElement('img');
    img.setAttribute('src', `${currentPost.previewUrl}`);
    parentImg.insertAdjacentElement('afterbegin', img);

    let parentSpanData = document.querySelector('.main-body-blogPost-flex-postInfo__date');
    let spanData = document.createElement('span');
    spanData.insertAdjacentHTML('afterbegin', `${currentPost.creationDate}`);
    parentSpanData.insertAdjacentElement('afterend', spanData);

    let parentTitleAndText = document.querySelector('.main-body-blogPost-flex-text');
    let title = document.createElement('p');
    title.setAttribute('class', 'main-body-blogPost-flex-text__title');
    title.insertAdjacentHTML('afterbegin', `${currentPost.title}`);
    parentTitleAndText.insertAdjacentElement('afterbegin', title);

    let text = document.createElement('p');
    text.insertAdjacentHTML('afterbegin', `${currentPost.longDescription}`);
    parentTitleAndText.insertAdjacentElement('beforeend', text);
    
    let line = document.querySelector('.main-body-blogPost-flex__line');
    let imgLine = document.createElement('img');
    imgLine.setAttribute('src', 'images/blog/line_300.png');
    line.insertAdjacentElement('afterbegin', imgLine);
    
    block.append(parent);

    activeNumber(1);
}

function removeBlockPosts() {
    let parent = document.querySelector('.main-body-blogPost-flex');
    parent.innerHTML = '';
}
function removeCircle() {
    let arrDiv = document.querySelectorAll('.pagination__numberPage div');
    arrDiv.forEach((currentDiv) => {
        if (currentDiv.hasAttribute('class')) {
            return currentDiv.removeAttribute('class');
        }
    })
}
function activeNumber(num) {
    removeCircle();
    let arrDiv = document.querySelectorAll('.pagination__numberPage div');
    arrDiv[num-1].setAttribute('class','activeCircle');
}
function removeCircle() {
    let arrDiv = document.querySelectorAll('.pagination__numberPage div');
    arrDiv.forEach((currentDiv) => {
        if (currentDiv.hasAttribute('class')) {
            return currentDiv.removeAttribute('class');
        }
    })
}

preparation();


