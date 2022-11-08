class comment extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        const style = document.createElement('link');
        style.setAttribute('rel','stylesheet');
        style.setAttribute('href','/css/comments.css')
        const wrapper = document.createElement('div');
        wrapper.setAttribute('class', 'comment-wrapper');
        const info = wrapper.appendChild(document.createElement('div'));
        info.setAttribute('class', 'comment-info');
        const infoimg = info.appendChild(document.createElement('div'));
        infoimg.setAttribute('class', 'comment-info-img');
        const img = infoimg.appendChild(document.createElement('img'));
        const infoname = info.appendChild(document.createElement('div'));
        infoname.setAttribute('class', 'comment-info-name');
        const content = wrapper.appendChild(document.createElement('div'));
        content.setAttribute('class', 'comment-content');
        const slot = content.appendChild(document.createElement('slot'));
        var observer = new MutationObserver((list) => {
            for (const mutation of list) {
                if (mutation.type == 'attributes') {
                    console.log(mutation.attributeName);
                    switch (mutation.attributeName) {
                        case 'data-img':
                            img.src = this.getAttribute('data-img');
                            break;
                        case 'data-name':
                            let a = document.createElement('a');
                            a.append(document.createTextNode(this.getAttribute('data-name')));
                            infoname.append(a);
                            break;
                    }
                }
            }
        });
        this.shadowRoot.append(style,wrapper)
        observer.observe(this, { childList: true, subtree: true, attributes: true })
    }
}
customElements.define('post-comment', comment)
class Post extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        const style = document.createElement('link');
        style.setAttribute('rel','stylesheet')
        style.setAttribute('href','/css/post.css')
        const wrapper = document.createElement('div');
        wrapper.setAttribute('class', 'post-wrapper');
        const imgContainer = wrapper.appendChild(document.createElement('div'));
        imgContainer.setAttribute('class', 'img-container');
        const img = imgContainer.appendChild(document.createElement('img'));
        img.setAttribute('class', 'post-img');
        const info = wrapper.appendChild(document.createElement('div'));
        info.setAttribute('class', 'post-info');
        const userinfo = info.appendChild(document.createElement('div'));
        userinfo.setAttribute('class', 'post-info-user');
        const userimg = userinfo.appendChild(document.createElement('div'));
        userimg.setAttribute('class', 'post-info-user-img');
        const username = userinfo.appendChild(document.createElement('div'));
        username.setAttribute('class', 'post-info-user-name');
        const contentinfo = info.appendChild(document.createElement('div'));
        contentinfo.setAttribute('class', 'post-info-content');
        const likebutton = contentinfo.appendChild(document.createElement('div'));
        const likeImg = likebutton.appendChild(document.createElement('img'));
        likeImg.src = 'like-button.png';
        const likecount = likebutton.appendChild(document.createElement('p'));
        likebutton.setAttribute('class', 'post-info-content-like');
        const dislikebutton = contentinfo.appendChild(document.createElement('div'));
        const dislikeImg = dislikebutton.appendChild(document.createElement('img'));
        dislikeImg.src = 'like-button.png';
        const dislikecount = dislikebutton.appendChild(document.createElement('p'));
        dislikebutton.setAttribute('class', 'post-info-content-dislike');
        const comment_place = wrapper.appendChild(document.createElement('div'));
        comment_place.setAttribute('class', 'post-comments');
        comment_place.appendChild(document.createElement('slot'))
        this.shadowRoot.append(style, wrapper);
        let childObservers = new Map();
        var observer = new MutationObserver((list) => {
            for (const mutation of list) {
                if (mutation.type == 'childList') {
                    childObservers.set(childObservers.size, new MutationObserver((li) => {
                        if (!mutation.type == 'attributes') return;
                        switch (mutation.attributeName) {
                            case 'data-name':
                                img.src = this.getAttribute('img');
                                break;
                            case 'data-img':
                                likecount.innerHTML = this.getAttribute('like-count');
                            case 'data-count':
                                dislikecount.innerHTML = this.getAttribute('dislike-count');
                        }

                    }));
                    childObservers.get(childObservers.size - 1).observe(this.lastChild, { attributes: !0 })
                    return
                }
                if (mutation.type == 'attributes') {
                    switch (mutation.attributeName) {
                        case 'img':
                            img.src = this.getAttribute('img');
                            break;
                        case 'like-count':
                            likecount.innerHTML = this.getAttribute('like-count');
                            break;
                        case 'dislike-count':
                            dislikecount.innerHTML = this.getAttribute('dislike-count');
                            break;
                    }
                }
            }
        });
        observer.observe(this, { childList: true, subtree: true, attributes: true })
    }
}
customElements.define('user-post', Post)