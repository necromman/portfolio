$(function () {
    var auth = firebase.auth();
    var database = firebase.database();
    var userInfo;
    auth.onAuthStateChanged(function (user) {
        if (user) {
            userInfo = user;
            get_text_list()
        } else {
            firebase.auth().signInAnonymously(); // 익명로그인
        }
    });
    var Now = new Date();
    var NowTime = Now.getFullYear();
    NowTime += '-' + leadingZeros((Now.getMonth() + 1),2);
    NowTime += '-' + leadingZeros(Now.getDate(),2);
    NowTime += ' ' + leadingZeros(Now.getHours(),2);
    NowTime += ':' + leadingZeros(Now.getMinutes(),2);
    NowTime += ':' + leadingZeros(Now.getSeconds(),2);

    function leadingZeros(n, digits) {
        var zero = '';
        n = n.toString();

        if (n.length < digits) {
            for (var i = 0; i < digits - n.length; i++)
                zero += '0';
        }
        return zero + n;
    }


    var psearch = $("#p-search");
    $("input[name=p-search]").keydown(function (key) {
        if (key.keyCode == 13) { //키가 13이면 실행 (엔터는 13)
            goSearch();
            $("#pac-input").val("");
        }
    });
    psearch.click(function () {
        goSearch();
    });

    function goSearch() {
        var keyword = $("#pac-input").val();
        if (!keyword == "") {
            // =========== 파이어베이스 입력 시작
            var publicKeyIn = database.ref('/채팅/' + "퍼블릭채팅");
            publicKeyIn.push({
                keyword: keyword,
                date: NowTime
            });
            // =========== 파이어베이스 입력 끝
        } else {
            alert("입력값이 없어요")
        }
    }


    function get_text_list() {
        var publicGetKeyIn = firebase.database().ref('/채팅/' + "퍼블릭채팅");
        publicGetKeyIn.on('child_added', public_on_child_added);
    }

    function public_on_child_added(data) {
        // var key = data.key;
        var sData = data.val();
        var Kword = sData.keyword;
        var Kdate = sData.date;

        var html2 =
            "<div class='timeline-item'>" +
            "<div class='timeline-icon'>" + Kdate + "</div>" +
            "<div class='timeline-content'>" +
            "<h2>익명</h2>" +
            "<p>" + Kword + "</p>" +
            "</div>" +
            "</div>";

        $("#timeline").prepend(html2);
    }
});
