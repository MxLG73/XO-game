let player_1 = "X";
let player_2 = "O";

let play = true

let player_1_spots = []
let player_2_spots = []
let spots = [1,2,3,4,5,6,7,8,9]
let pick
let player_1_wins = 0
let player_2_wins = 0
let cells = [cell1,cell2,cell3,cell4,cell5,cell6,cell7,cell8,cell9]

let win2 = [1,2,3]
let win1 = [4,5,6]
let win3 = [7,8,9]
let win6 = [1,4,7]
let win4 = [2,5,8]
let win5 = [3,6,9]
let win7 = [1,5,9]
let win8 = [3,5,7]
let wins = [win1,win2,win3,win4,win5,win6,win7,win8]

scren    = document.getElementById('screen')
rst_btn  = document.getElementById('reset')
bck_btn  = document.getElementById('back')
menu     = document.getElementById('menu')
diff     = document.getElementById('dif')
computer = document.getElementById('computer')
baby     = document.getElementById('baby')
normal   = document.getElementById('normal')
x_wins   = document.getElementById('x_wins')
o_wins   = document.getElementById('o_wins')
// ------------------------------------------------------------------------
start_game()
// ------------------------------------------------------------------------
function start_game (){
    Math.ceil(Math.random()*2) == 1 ? current_player=player_1 : current_player=player_2 ; 
    scren.innerHTML = `${current_player} turn`
    x_wins.innerHTML = `${player_1} : ${player_1_wins}`
    o_wins.innerHTML = `${player_2} : ${player_2_wins}`
    if (computer.checked){computer_turn()}
}

function turn (cell){
   if (play) {
    cells[cell-1].innerHTML = current_player;
    current_player == player_1 ? player_1_spots.push(cell):player_2_spots.push(cell);
    cells[cell-1].setAttribute('disabled',true);
    pick = spots.indexOf(cell)
    if (pick > -1){spots.splice(pick,1)}
        
    if(!(check_winner())){
        current_player == player_1 ? current_player=player_2 : current_player=player_1;
        scren.innerHTML = `${current_player} turn`
        if (computer.checked && spots.length>0){computer_turn()} 
    }     
    }
}

function check_winner() {
    draw_win = 0
    for(i=0;i<8;i++){
        let w=0
        player_1_spots.forEach(num => { 
        wins[i].indexOf(num) >=0 ?  w+=1 : w+=0 
        })           
        draw_win += 1
        if(w==3) {end_game('win')
            return 1
        }
    }
    draw_win = 0
    for(i=0;i<8;i++){
        let w=0
        player_2_spots.forEach(num => { 
        wins[i].indexOf(num) >=0 ?  w+=1 : w+=0 
        })           
        draw_win += 1
        if(w==3) {end_game('win')
            return 1
        }
    }
    if(player_1_spots.length>4||player_2_spots.length>4){end_game('draw')
        return 1}
}

function computer_turn(){
    let random = true
    if(current_player == player_2){
        if (normal.checked) {
            for(i=0;i<8;i++){
                let t=0
                player_2_spots.forEach(num => { 
                    wins[i].indexOf(num) >=0 ?  t+=1 : false        
                })
                if(t==2){
                    wins[i].forEach(spot => {
                    if(player_2_spots.indexOf(spot)<0){
                        if (player_1_spots.indexOf(spot)<0) { 
                              turn(spot)
                              random = false
                        }       
                    } 
                    })
                }
            }
            for(i=0;i<8;i++){
                let t=0
                player_1_spots.forEach(num => { 
                    wins[i].indexOf(num) >=0 ?  t+=1 : false        
                })
                if(t==2){
                    wins[i].forEach(spot => {
                    if(player_1_spots.indexOf(spot)<0){
                        if (player_2_spots.indexOf(spot)<0) { 
                              turn(spot)
                              random = false
                        }       
                    } 
                    })
                }
            }
        }
        if(random){
            computer_chose = spots[(Math.ceil(Math.random()*spots.length))-1]
            turn(computer_chose)
        }  
    }  
}

function end_game(condition) {
    switch (condition) {
        case 'win' :
        scren.innerHTML = `${current_player} WON!`
        play = false
        document.getElementById(`win${draw_win}`).classList.toggle('win')
        switch (current_player){
            case player_1 :
                player_1_wins +=1
                x_wins.innerHTML = `${player_1} : ${player_1_wins}`
                break;
            case player_2 :
                player_2_wins +=1
                o_wins.innerHTML = `${player_2} : ${player_2_wins}`
                break;
        }
        break ;
        case 'draw' :
            scren.innerHTML = "DRAW!"
            draw_win = 0
            break;
    }
    rst_btn.classList.toggle('reset-btn')
    bck_btn.classList.toggle('back-btn')
}

function reset_game(){
    if(draw_win !=0){document.getElementById(`win${draw_win}`).classList.toggle('win')}
    for(let i=0;i<9;i+=1){
        cells[i].disabled = false
        cells[i].innerHTML = ""
    }
    player_1_spots = []
    player_2_spots = []
    spots = [1,2,3,4,5,6,7,8,9]
    win = 0
    play = true
    start_game()
    rst_btn.classList.toggle('reset-btn')
    bck_btn.classList.toggle('back-btn')   
}

function back_to_menu(){
    player_1_wins = 0
    player_2_wins = 0
    computer.checked = false
    baby.checked = false
    normal.checked =false
    menu.classList.toggle('game-start')
    diff.classList.toggle('game-start-4real')
    reset_game()
}

function start_pvp() {
    menu.classList.toggle('game-start')
    diff.classList.toggle('game-start-4real')
}

function start_pvc(dif) {
    switch (dif){
        case 'start' :
            computer.checked = true
            menu.classList.toggle('game-start')
            break;
        case 'baby' :
            baby.checked = true
            diff.classList.toggle('game-start-4real')
            break;
        case 'normal' :
            normal.checked = true 
            diff.classList.toggle('game-start-4real')
            break;
    }
    computer_turn()
}