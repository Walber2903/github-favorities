export class Favorites {
    constructor(root) {
        this.root = document.querySelector(root)
        this.load()
    }

    load() {
        this.entries = JSON.parse(localStorage.getItem('@github-favorites:')) || []
        
/*        const entries = [{
            login: 'Walber2903',
            name: "Walber Araujo",
            public_repos: '73',
            followers: '1200'
        },
        {
            login: 'Hobyn',
            name: "Robert",
            public_repos: '13',
            followers: '5'
        }
        ] */ 

    }

    delete(user) {
        const filteredEntries = this.entries.filter(entry => entry.login !== user.login)

        this.entries = filteredEntries
        this.update()
    }
}

export class FavoritesView extends Favorites {
    constructor(root) {
        super(root)

        this.tbody = this.root.querySelector('table tbody')

        this.update()
    }

    update() {
        this.removeAllTr()

   
        
        this.entries.forEach( user => {
            const row = this.createRow()
            
            row.querySelector('.user img').src =`https://github.com/${user.login}.png`
            row.querySelector('.user img').alt =`Image of ${user.name}`
            row.querySelector('.user p').textContent = user.name
            row.querySelector('.user span').textContent = user.login
            row.querySelector('.repositories').textContent = user.public_repos
            row.querySelector('.followers').textContent = user.followers

            row.querySelector('.remove').onclick = () => {
                const isOk = confirm('Are you shure to delete this row?')

                if(isOk) {
                    this.delete(user)
                }
            }   

            this.tbody.append(row)
        })

    }

    createRow() {
        const tr = document.createElement('tr')

        const dataTr = `    
            <td class="user">
                <img src="https://github.com/walber2903.png" alt="Imagem de walber2903">
                <a href="https://github.com/walber2903" target="_blank">
                    <p>Walber Araujo</p>
                    <span>walber2903</span>
                </a>
            </td>
            <td class="repositories">
                33
            </td>
            <td class="followers">
                21
            </td>
            <td class="remove">
                &times;
            </td>    
        `

        tr.innerHTML = dataTr

        return tr
    }

    removeAllTr() {      
        this.tbody.querySelectorAll('tr').forEach((tr) => {
            tr.remove()
        })
    }
}

/*
<tr>
                    <td class="user">
                        <img src="https://github.com/walber2903.png" alt="Imagem de walber2903">
                        <a href="https://github.com/walber2903" target="_blank">
                            <p>Walber Araujo</p>
                            <span>walber2903</span>
                        </a>
                    </td>
                    <td class="repositories">
                        33
                    </td>
                    <td class="followers">
                        21
                    </td>
                    <td class="remove">
                        &times;
                    </td>
                </tr>

                <tr>
                    <td class="user">
                        <img src="https://github.com/Hobyn.png" alt="Imagem de Roberto">
                        <a href="https://github.com/Hobyn" target="_blank">
                            <p>Robert</p>
                            <span>Hobyn</span>
                        </a>
                    </td>
                    <td class="repositories">
                        13
                    </td>
                    <td class="followers">
                        5
                    </td>
                    <td class="remove">
                        &times;
                    </td>
                </tr>
*/