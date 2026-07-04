const diceFace = [
    "",
    "⚀",
    "⚁",
    "⚂",
    "⚃",
    "⚄",
    "⚅"
];

let balance = 1000;

function randomDice() {
    return Math.floor(Math.random() * 6) + 1;
}

function updateBalance() {
    document.getElementById("balance").innerHTML = balance;
}

updateBalance();

function play(choice) {

    let bet = parseInt(document.getElementById("bet").value);

    if (isNaN(bet) || bet <= 0) {
        alert("Nhập số điểm cược hợp lệ!");
        return;
    }

    if (bet > balance) {
        alert("Không đủ điểm!");
        return;
    }

    let d1 = randomDice();
    let d2 = randomDice();
    let d3 = randomDice();

    document.getElementById("d1").innerHTML = diceFace[d1];
    document.getElementById("d2").innerHTML = diceFace[d2];
    document.getElementById("d3").innerHTML = diceFace[d3];

    let total = d1 + d2 + d3;

    document.getElementById("sum").innerHTML = total;

    let result;

    if (total >= 11 && total <= 17) {
        result = "tai";
        document.getElementById("result").innerHTML = "KẾT QUẢ: TÀI";
    }
    else if (total >= 4 && total <= 10) {
        result = "xiu";
        document.getElementById("result").innerHTML = "KẾT QUẢ: XỈU";
    }
    else {
        result = "bo";
        document.getElementById("result").innerHTML = "BỘ BA";
    }

    if (result == "bo") {
        balance -= bet;
        document.getElementById("message").innerHTML =
            "Bộ ba - Mất " + bet + " điểm";
    }
    else if (choice == result) {
        balance += bet;
        document.getElementById("message").innerHTML =
            "🎉 Thắng +" + bet + " điểm";
    }
    else {
        balance -= bet;
        document.getElementById("message").innerHTML =
            "❌ Thua -" + bet + " điểm";
    }

    updateBalance();

    if (balance <= 0) {
        alert("Bạn đã hết điểm!");
        balance = 1000;
        updateBalance();
    }
}
let shakeCount = 0;

const bowl = document.getElementById("bowl");

let lastX = 0;

bowl.onmousedown = function(e){

    lastX = e.clientX;

    document.onmousemove = function(ev){

        if(Math.abs(ev.clientX-lastX)>15){

            shakeCount++;

            document.getElementById("count").innerHTML = shakeCount;

            lastX = ev.clientX;

            bowl.style.transform =
                `translateX(${Math.random()*12-6}px)`;

            if(shakeCount>=15){

                document.getElementById("openBtn").disabled=false;

            }

        }

    }

    document.onmouseup=function(){

        document.onmousemove=null;

    }

}