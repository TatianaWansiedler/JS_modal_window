let root = document.querySelector('#root')

async function fetchUsers() {
    let url = "https://api.slingacademy.com/v1/sample-data/users"
    const resp = await fetch(url)
    const data = await resp.json()
    render(data.users);
}


function render(data) {
    const card_container = document.createElement('div')
    card_container.className = 'card_container'

    for (const elem of data) {
        let user_card = document.createElement('div')
        user_card.className = 'user_card'

        let user_img = document.createElement('img')
        let user_name = document.createElement('h3')
        let user_email = document.createElement('a')
        let user_job = document.createElement('p')
        let posts_btn = document.createElement('button')

        user_img.src = 'https://media.istockphoto.com/id/1300845620/de/vektor/user-icon-flat-isolated-auf-wei%C3%9Fem-hintergrund-benutzersymbol-vektor-illustration.jpg?s=612x612&w=0&k=20&c=VSrirSynT-0Sg1li-R9kqIZE7cDizbThAgjDcebXXlI='
        user_name.innerText = `${elem.first_name} ${elem.last_name}`
        user_email.innerText = `${elem.email}`
        user_email.href = `mailto:${elem.email}`
        user_job.innerText = `${elem.job}`
        posts_btn.innerText = "POSTS"

        user_card.append(user_img, user_name, user_job, user_email, posts_btn)
        card_container.append(user_card)

        posts_btn.onclick = () => {
            modal(elem.id, elem.first_name)
        }
    }
    root.append(card_container)
}


async function modal(user_id, first_name) {
    //Modal area
    let modal_container = document.createElement('div')
    modal_container.className = "modal_container"
    //Modal
    let modal_window = document.createElement('div')
    modal_window.className = "modal_window"

    let close_button = document.createElement('button')
    close_button.className = "close_button"
    close_button.innerHTML = '<i class="las la-times"></i>'

    //Content

    let posts_container = document.createElement('div')
    posts_container.className = 'posts_container'

    const data = await fetch("https://api.slingacademy.com/v1/sample-data/blog-posts")
        .then(resp => resp.json())
        .then(data => getPosts(data.blogs, user_id))

    if (data.length) {
        const content_title = document.createElement('h3')
        const posts_list = document.createElement('ul')

        content_title.innerText = `${first_name}'s Post List:`

        data.forEach((el) => {
            const post_item = document.createElement('li')
            post_item.innerText = el
            posts_list.append(post_item)
        })

        posts_container.append(content_title, posts_list)
    } else {
        const no_posts_text = document.createElement('p')
        no_posts_text.className = 'no_posts_text'
        const no_posts_icon = document.createElement('span')

        no_posts_text.innerText = 'No Posts Yet!'
        no_posts_icon.classList = "las la-blog"

        posts_container.append(no_posts_icon, no_posts_text)
    }

    modal_window.append(close_button, posts_container)

    modal_container.append(modal_window)
    root.append(modal_container)

    // Close modal

    close_button.onclick = () => {
        modal_container.remove()
    }
    modal_container.onclick = () => {
        modal_container.remove()
    }
    modal_window.onclick = (e) => {
        e.stopPropagation()
    }
}

function getPosts(posts, id) {
    const temp = document.createElement('div')
    const user_posts_title = posts.filter(({ user_id }) => user_id === id)
    temp.innerHTML = user_posts_title[0]?.content_html
    const h2_collection = temp.getElementsByTagName('h2')

    return Array.from(h2_collection).map(el => el.innerHTML)
}


fetchUsers()