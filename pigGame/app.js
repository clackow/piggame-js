/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var score, roundScore, activePlayer, dicePrev;

init();

document.querySelector('.btn-roll').addEventListener('click',function(){
		var dice = Math.floor(Math.random()*6)+1;
		var diceDom = document.querySelector('.dice');
		
		//display dice when roll is clicked
		diceDom.style.display = 'block';
		//change the dice picture
		diceDom.src = 'dice-'+dice+'.png';

		if(dice === dicePrev && dice === 6 ){
			//if double 6 player lose the score
			scores[activePlayer] = 0;
			document.querySelector('#current-' +activePlayer).textContent = '0';
			changePlayer();
		}else if(dice != 1){
			
			roundScore += dice;
			document.querySelector('#current-' +activePlayer).textContent = roundScore;

		}else{
			//nextplayer
			changePlayer();
		}
		dicePrev = dice; 
});
		// finalScore = document.querySelector('.final-score').value;
		// console.log(finalScore);

		document.querySelector('.btn-hold').addEventListener('click',function(){
		//把分加入总分
		scores[activePlayer] += roundScore;

		//display 总分
		document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
		//costumize a winning number
		var finalScore = document.querySelector('.final-score').value;
		console.log(finalScore);
		var winningScore;
		if(finalScore){
			winningScore = finalScore;
		}else{
			winningScore = 100;
		}

		//check if won
		if(scores[activePlayer] >= winningScore){
			//赢了之后display winner
			document.querySelector('#name-'+activePlayer).textContent = 'Winner!';
			document.querySelector('.dice').style.display = 'none';
			document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
			document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
			//赢了之后移除roll和hold
			document.querySelector('.btn-roll').style.display = 'none';
			document.querySelector('.btn-hold').style.display = 'none';



		}else{

		changePlayer();
		
		}


});



document.querySelector('.btn-new').addEventListener('click',init);

function init(){
	scores = [0,0];
	roundScore = 0;
	activePlayer = 0;

	//初始化，隐藏色子，所有积分归零
	document.querySelector('.dice').style.display = 'none';
	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';
	//上一局的winner class remove
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	//上一局的active class remove
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	//remove winner之后两个名字都变成Player
	document.querySelector('#name-0').textContent = 'Player 1';
	document.querySelector('#name-1').textContent = 'Player 2';
	//重新显示 roll 和 hold
	document.querySelector('.btn-roll').style.display = 'block';
	document.querySelector('.btn-hold').style.display = 'block';

	//默认开始玩家是player0
	document.querySelector('.player-0-panel').classList.add('active');


}


function changePlayer(){
		activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

		roundScore = 0;
		//如果摇到1，就把所有的current归零
		document.getElementById('current-0').textContent = 0;
		document.getElementById('current-1').textContent = 0;

		//如果1 active,切换到2，toggle用来切换
		document.querySelector('.player-0-panel').classList.toggle('active');
		document.querySelector('.player-1-panel').classList.toggle('active');
		//切换玩家后，隐藏色子
		document.querySelector('.dice').style.display = 'none';

}


//直接覆盖选中id的content
//document.querySelector('#current-' +activePlayer).innerHTML = '<em>'+dice+'</em>';
//加入html效果