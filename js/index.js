document.addEventListener("DOMContentLoaded", (e)=> {
    moneyBox.getData();
});

var progress;
const moneyBox = {
    currentSum: 0,
    target: 15,
    getData(){ 
      $.ajax({
          url: 'http://alex.devel.softservice.org/testapi/',
          type: 'GET',
          success(res){
              moneyBox.currentSum = res.balance_usd;
              moneyBox.setCurrentSum();
              moneyBox.startCount();
          },
          error(){
            console.log('error');
        }
      });
    },
    setCurrentSum(){ 
        const percent = Math.floor(moneyBox.currentSum/(moneyBox.target/100));

        $('.progressbar div').css({width: percent+'%'});
        $('.progressbar span').html('$'+moneyBox.currentSum);

        if(moneyBox.currentSum == moneyBox.target){
            $('.target').css({boxShadow: '0 -60px 90px -40px #00A910 inset'});
            $('.currentSum').css({opacity:0});
        }

    },
    startCount(){     
        progress = setInterval(()=>{
            if(moneyBox.currentSum < moneyBox.target){
                moneyBox.currentSum += 0.2;
                moneyBox.currentSum = Number(moneyBox.currentSum.toFixed(1));
                moneyBox.setCurrentSum();
            }
            else{
                clearInterval(progress);
            }
        },2000)
    }
};

