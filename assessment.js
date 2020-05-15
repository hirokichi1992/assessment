'use strict'; {
    const userNameText = document.getElementById('user-name');
    const assessmentButton = document.getElementById('assessment');    
    const resultDivided = document.getElementById('result-area');
    const tweetDivided = document.getElementById('tweet-area');
    const answers = [
        '{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
        '{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
        '{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
        '{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
        '{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
        '{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
        '{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
        '{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
        '{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
        '{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
        '{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
        '{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
        '{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
        '{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
        '{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
        '{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。',
        '{userName}のいいところは優しさです。{userName}の優しい雰囲気や立ち振る舞いに多くの人が癒やされています。'
    ];


    /**
     * JSDoc：関数の内部の処理と、 外部から受ける出力や入力を定義している内外の境界を表す定義
     * 
     * @param {string} userName ユーザーの名前
     * @return {string} 診断結果
     */

     function assessment(userName = '名無しのごんべえ'){
        // 文字のコード番号を取得して足し合わせる
        let sumOfCharCode = 0;
        for (let i = 0; i < userName.length; i++) { // let で宣言した変数は for や if などの {} で囲まれた中での利用に限ることができるため、 var よりも安全に使うことが可能
            sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
        }

        // 文字のコード番号の合計を回答の数で割ったあまりの数を配列の添え字に設定する
        const index = sumOfCharCode % answers.length;
        const result = answers[index];

        // 正規表現（gオプション：すべてのuserNameをリプレイスする）
        return result.replace(/\{userName\}/g, userName);
     }

     
     /**
      * 
      * @param {HTMLElement} element HTML要素
      */

     function removeAllChildren(element){
         while (element.firstChild){
             // 子供要素がある限り削除する
             element.removeChild(element.firstChild);
         }
     }


    // 診断ボタンを押した時に、inputエリアの入力内容を取得する
    assessmentButton.onclick = () => {
        const userName = userNameText.value;

        // ガード句：未入力の場合は何もしない
        if (userNameText.length === 0) {
            return;
        }
        
        // 診断結果表示エリアの作成
        removeAllChildren(resultDivided);
        const header = document.createElement('h3');
        header.innerText = '診断結果';
        resultDivided.appendChild(header);

        const paragraph = document.createElement('p');
        const result = assessment(userName);
        paragraph.innerText = result;
        resultDivided.appendChild(paragraph);

        // ツイートエリアの作成

        // <a href="https://twitter.com/intent/tweet?button_hashtag=あなたのいいところ&ref_src=twsrc%5Etfw" class="twitter-hashtag-button" data-text="診断の結果" data-show-count="false">Tweet #あなたのいいところ</a><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

        removeAllChildren(tweetDivided);
        const anchor = document.createElement('a');
        const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag=' + encodeURIComponent('あなたのいいところ') + '&ref_src=twsrc%5Etfw';

        anchor.setAttribute('href', hrefValue);
        anchor.className = 'twitter-hashtag-button';
        anchor.setAttribute('data-text', result);
        anchor.innerText = 'Tweet #あなたのいいところ';
        tweetDivided.appendChild(anchor);

        // widgets.jsの設定
        const script = document.createElement('script');
        script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
        tweetDivided.appendChild(script);

    }


    // ボタンをEnterした時も診断結果が表示されるようにする

    // userNameText.onkeydown = (event, function () {
    //     if (event.key === 'Enter') {
    //         assessmentButton.onclick();
    //     }
    // });

    // 上記の省略形
    userNameText.onkeydown = event => {
        if (event.key === 'Enter') {
            assessmentButton.onclick();
        }
    };
    

     // テスト：assert(bool式, エラーメッセージ（コンソールに出力される）);
    console.assert(
        assessment('太郎') ===
        '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。',
        '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
    );

    // 同じ名前の時は同じ結果になることを確認する
    console.assert(
        assessment('太郎') ===　assessment('太郎'),
        '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
    );
}
