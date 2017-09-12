$(function () {

    /*
     *==================================================================
     *  current time zero add
     *==================================================================
     */
    var Now = new Date();
    var NowTime = Now.getFullYear();
    NowTime += '-' + leadingZeros((Now.getMonth() + 1), 2);
    NowTime += '-' + leadingZeros(Now.getDate(), 2);
    NowTime += ' ' + leadingZeros(Now.getHours(), 2);
    NowTime += ':' + leadingZeros(Now.getMinutes(), 2);
    NowTime += ':' + leadingZeros(Now.getSeconds(), 2);

    function leadingZeros(n, digits) {
        var zero = '';
        n = n.toString();

        if (n.length < digits) {
            for (var i = 0; i < digits - n.length; i++)
                zero += '0';
        }
        return zero + n;
    }


    /*
     *==================================================================
     *  firebase start
     *==================================================================
     */
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


    function get_text_list() {
        var publicGetKeyIn = firebase.database().ref('/채팅/' + "퍼블릭채팅");
        publicGetKeyIn.on('child_added', public_on_child_added);
    }


    function public_on_child_added(data) {

        var key = data.key;
        var sData = data.val();
        var Kword = sData.keyword;
        var Kdate = sData.date;

        var html2 =
            "<div id='" + key + "' class='timeline-item'>" +
            "<div class='timeline-icon'>" + Kdate + "</div>" +
            "<div class='timeline-content'>" +
            "<h2>익명</h2>" +
            "<p>" + Kword + "</p>" +
            "<div class='reply-wrap'></div>" +
            "<div class='reply-input-box'>"+
            "<input id='" + key + "' name='reply' class='controls' placeholder='리플입력'>" +
            "</div>"+
            "<label for='" + key + "' class=\"display-n\">" + key + "</label>" +
            "</div>" +
            "</div>";

        $("#timeline").prepend(html2);

        var publicGetReply = firebase.database().ref('/채팅/' + "/퍼블릭채팅/" + "/" + key + "/" + "reply");
        publicGetReply.on('child_added', public_on_reply_added);

        function public_on_reply_added(data2) {
            var Rkey = data2.key;
            var RData = data2.val();
            var Rcomment = RData.comment;
            var Rdate = RData.date;

            var htmlR =
                "<p>" + Rcomment + "</p>";
            $("#" + key + " .reply-wrap").prepend(htmlR);
        }
    }

    $("#timeline").on('keydown', '.controls', function (x) {
        var _thisval = $(this).val();
        var _thisid = $(this).parent().parent().parent().attr("id");

        if (x.keyCode == 13 && !_thisval == "") { //키가 13이면 실행 (엔터는 13)
            var publicKeyIn2 = database.ref('/채팅/' + "/퍼블릭채팅/" + "/" + _thisid + "/" + "reply");
            publicKeyIn2.push({
                comment: _thisval,
                date: NowTime
            });
            $(this).val("");
        }
    });


});
