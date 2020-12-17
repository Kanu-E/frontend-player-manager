class Player {

    static allPlayers = []

    constructor(player){
        this.name = player.name;
        this.number = player.number;
        this.id = player.id;
        Player.allPlayers.push(this)
    }

    static renderPlayers(){
        for(let player of this.allPlayers){
            player.renderPlayer();
        }
    }

    renderPlayer(){
        let p = document.createElement('p');
        let card = document.createElement('div');
        let deleteButton = document.createElement('button');
        deleteButton.innerHTML = 'delete'
        p.dataset.id = this.id
        card.className = "card"
        p.innerHTML = `${this.number}. ${this.name}`
        p.className = "input-text"
        deleteButton.addEventListener('click', this.deletePlayer)
        console.log(this)
        card.append(p, deleteButton);
        players.append(card);
    }


    static fetchPlayers(){
        fetch(playerURL)
        .then (rsp => rsp.json())
        .then(players =>{
            for(let player of players){
                let newPlayer = new Player(player)
            }
            this.renderPlayers()
        })
    }

    static submitPlayer(){
        event.preventDefault()
        const configObj = {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                    name: event.target[0].value,
                    number: event.target[1].value
            })
        };
        fetch(playerURL, configObj)
        .then(rsp => rsp.json())
        .then(data => {
            let newPlayer = new Player(data)
            newPlayer.renderPlayer()
        
        })
        
    }

   deletePlayer(){
        const playerId = this.previousElementSibling.dataset.id
            fetch(`${playerURL}/${playerId}`, 
            {method: "DELETE"})
            this.parentElement.remove()
    }
}