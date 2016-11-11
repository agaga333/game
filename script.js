/**
 * Created by Agnieszka on 2016-11-10.
 */
$(function () {

    //saving dom objects to variables
var $container = $('#container');
var $bird = $('#bird');
var $pole = $('.pole');
var $upperPole = $('#upper-pole');
var $bottomPole = $('#bottom-pole');
var $score = $('#score');
var $speedSpan = $('#speed');
var $restartBtn = $('#restart-btn');

//saving some initial setup
var containerWidth = parseInt($container.width());
var containerHeight = parseInt($container.height());
var poleInitialPosition = parseInt($pole.css('right'));
var poleInitialHeight = parseInt($pole.css('height'));

var birdLeftPosition = parseInt($bird.css('left'));
var birdHeight = parseInt($bird.height());
var speed = 10;

//some other declarations
var goUp = false;
var scoreUpdated = false;
var gameOver = false;


var theGame = setInterval(function () {

    if (collision($bird, $upperPole) || collision($bird, $bottomPole) || parseInt($bird.css('top')) <= 0 || parseInt($bird.css('top')) > containerHeight - birdHeight) {

        stopTheGame();

    }

    else {
        var poleCurrentPosition = parseInt($pole.css('right'));

        //update the score when the poles have passed the bird successfully//
        if (poleCurrentPosition > containerWidth - birdLeftPosition) {
            if (scoreUpdated === false) {
                $score.text(parseInt($score.text()) + 1);
                scoreUpdated = true;
            }
        }

        //check whether the poles went out of the $container
        if (poleCurrentPosition > containerWidth) {
            var newPoleHeight = parseInt(Math.random() * 100);

            //change the pole's height
            $upperPole.css('height', poleInitialHeight + newPoleHeight);
            $bottomPole.css('height', poleInitialHeight - newPoleHeight);

            //increase speed
            speed = speed + 1;
            $speedSpan.text(speed);

            scoreUpdated = false;

            poleCurrentPosition = poleInitialPosition;
        }

        //move the poles
        $pole.css('right', poleCurrentPosition + speed);

        if (goUp === false) {
            birdGoDown();
        }
    }
}, 40);

$(document).on('keydown', function (e) {
    var key = e.keyCode;
    if (key === 32 && goUp === false && gameOver === false) {
        goUp = setInterval(birdGoUp, 50);
    }
});

$(document).on('keyup', function (e) {
    var key = e.keyCode;
    if (key === 32) {
        clearInterval(goUp);
        goUp = false;
    }
});

function birdGoDown() {
    $bird.css('top', parseInt($bird.css('top')) + 5);
}

function birdGoUp() {
    $bird.css('top', parseInt($bird.css('top')) - 10);
}

function stopTheGame() {
    clearInterval(theGame);
    gameOver = true;
    $restartBtn.slideDown();
}

$restartBtn.click(function () {
    location.reload();
});

function collision($div1, $div2) {
    var x1 = $div1.offset().left;
    var y1 = $div1.offset().top;
    var h1 = $div1.outerHeight(true);
    var w1 = $div1.outerWidth(true);
    var b1 = y1 + h1;
    var r1 = x1 + w1;
    var x2 = $div2.offset().left;
    var y2 = $div2.offset().top;
    var h2 = $div2.outerHeight(true);
    var w2 = $div2.outerWidth(true);
    var b2 = y2 + h2;
    var r2 = x2 + w2;

    if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
    return true;
}

});