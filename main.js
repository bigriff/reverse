var simp = {
//True is on, to be walked through each action.
  db: true,

//Alerts, step by step, in each function.
  dbMsgs: [],
  dbMsg: function(msg){
    if(this.db){
      alert(msg);
      this.dbMsgs.push(msg);
    }
},

//Draw a number, 38 & 39 are zeros
  numbers: [],
  drawNumber: function(){
      num = Math.floor(Math.random() * Math.floor(38) + 1);
      this.dbMsg("The number drawn was: " + num);
      this.numbers.unshift(num);
      return num;
},

//The bets to be made, 0+last=bet
  betList: [99],
  defaultBetList: [1,2,3,4,5],
//Adding up the default bet list.
  defaultTotal: function(){
    defaultBetList = this.defaultBetList;
    var defaultTotal = 0;

    for(i=0;i<defaultBetList.length;i++){
      defaultTotal = defaultTotal + defaultBetList[i];
    }
    this.dbMsg("The default bet list total is " + defaultTotal);
    return defaultTotal;
  },

//Tracking expenses
  losses: [],
  addLoss: function(arg){
    this.losses.push(arg);
    this.dbMsg("Pushed to losses, " + this.losses + " the amount was " + arg);
  },
//Tracking transactions
  wins: [],
  addWin: function(arg){
    this.wins.push(arg);
    this.dbMsg("Pushed to win: " + arg);
  },
//At what value do we log, and reset?
  goal: 50,

//The minimum wager for the table, bet list will reset if lower.
  minBet: 5,//Causes error if betList doesn't invoke bet equal too or higher.

//Sets the bet, and tracks default (too small, or empty bet list) wins/losses.
  setBet: function(){
    betList = this.betList;

    //Setting bet depends on length of list.
    if(betList.length >= 2){
      num = betList[0] + betList[betList.length-1];
    }else if(betList.length === 1){
      num = betList[0];
    }else if(betList.length === 0){
      num = 0;
    }

    this.dbMsg("BetList length is " + betList.length + " and the list is: " + betList);

    //If the bet is too low, we have to cancel out and track add to balance.
    if(num < this.minBet || !num){
      this.dbMsg("less than " + this.minBet + ", it is only " + num);
      //Tables won't allow bets less than $5, so...
      this.betList = this.defaultBetList;
      this.dbMsg("Reset bet list as bet was less than 5. It is now " + this.betList);

      if(num){
        this.addWin(num);
      }else if(num === 0){
        this.addLoss(this.defaultTotal());
      }
      this.setBet();
    }else{
      bet = num;
    }
    this.dbMsg("The bet is now: " + bet); //Why does this fire twice?

    var value = this.betListTotal();
    this.dbMsg("Checking if goal is met for " + value);

    if(value >= this.goal){
      this.wins.push(value);
      this.betList = this.defaultBetList;
      this.dbMsg("We logged " + value + " as a win. Resetting...");
      this.setBet();
    }
    this.dbMsg("Goal value not met, continuing.");
    return bet;
  },

//Totaling the betList
  betListTotal: function(){
    blTotal = 0;
    this.dbMsg("running total...");
    for(i=0;i<this.betList.length;i++){
      blTotal = blTotal + this.betList[i];
    }
    this.dbMsg("The betList total is " + blTotal);
    return blTotal;
  }



};

simp.drawNumber();
simp.setBet();
simp.betListTotal();
alert(simp.numbers);
