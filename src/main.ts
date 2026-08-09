// 今入力中の数字（文字列）
let currentValue = "0";
// 履歴表示エリア（文字列）
let historyString = "";
// 左辺の値
let leftValue: number | null = null;
// 演算子
let operator: "+" | "-" | "*" | "/" | null = null;

// false：数字を連結して入力中の状態（通常モード）
// true：次の数字入力で currentValue を置き換える準備ができている状態（置き換えモード）
let waitingForNext = false;

// 履歴表示用の演算子
const OP_DISPLAY_MAP: Record<"+" | "-" | "*" | "/", string> = {
  "+": "+",
  "-": "-",
  "*": "×",
  "/": "÷",
};

/**
 * 必要なDOM要素を取得する関数
 * 
 * @throws {Error} DOM 要素が存在しない場合にエラーをスロー
 * @returns {{ currentDisplay: HTMLDivElement, historyDisplay: HTMLDivElement, equalButton: HTMLButtonElement }}
 */
function getDomElements() {
  // 各DOM要素の取得
  const currentDisplay = document.getElementById("current") as HTMLDivElement | null;
  const historyDisplay = document.getElementById("history") as HTMLDivElement | null;
  const equalButton = document.getElementById("equal") as HTMLButtonElement | null;

  // nullチェックで安全性を確保
  if (!currentDisplay || !historyDisplay || !equalButton) {
    console.error("DOMの取得に失敗しました。必要な要素が存在しません。");
    throw new Error("DOM取得エラー");
  }

  return { currentDisplay, historyDisplay, equalButton };
}

const { currentDisplay, historyDisplay, equalButton } = getDomElements();

// ページ読み込み時に電卓を初期状態にする
currentDisplay.textContent = currentValue;
historyDisplay.textContent = "";

// ボタンを全て取得してクリックイベントに紐付ける
const buttons = document.querySelectorAll<HTMLButtonElement>(".btn");


// すべてのボタンにクリックイベントを設定
buttons.forEach((button)=>{
  button.addEventListener("click",()=>{

    // HTMLのボタン要素からdata-value属性の値を取り出し、それを保存。
    const value = button.dataset.value!;

    // 数字ボタンが押下された場合
    if (!isNaN(Number(value))) {
      onNumberClick(value);
    } 
    // 小数点ボタンが押下された場合
    else if (value === ".") {
      onDotClick();
    } 
    // 演算子ボタンが押下された場合
    else if (["+", "-", "*", "/"].includes(value)) {
      handleOperatorButton(value as "+" | "-" | "*" | "/"); // ←まとめた関数で処理
    } 
    // クリアボタンが押下された場合
    else if (value === "c") {
      onClear();
    }
  });
});
// 「＝」が押下された場合
equalButton.addEventListener("click", onEqualClick);



/**
 * 数字ボタンが押された時の処理を行う関数
 * 
 * @param num - 押された数字（"0" から "9" の文字列）
 * @returns なし（void）-この関数は値を返さず、ディスプレイや内部状態を直接更新。
 */
function onNumberClick(num:string):void{
  // 次の値が入力待ちの場合は値を置き換える
  if (waitingForNext) {
    currentValue = num;
    // false：数字を連結して入力中の状態（通常モード）
    waitingForNext = false;
    // 計算エリアに現在値を表示
    currentDisplay.textContent = currentValue;
    return;
  }
  
 const digitCount = getDigitCount(currentValue);
// 桁数制限8桁を超える場合の入力は無視される
 if(digitCount >= 8) return;

// 0を置き換えるのか、後ろに追加するのかを判定する
 if(currentValue === "0"){
  currentValue = num;
 }else{
  currentValue += num;
 }
// 現在の値を更新し、ディスプレイに反映
  currentDisplay.textContent = currentValue;
}


/**
 * 現在入力されている数字の桁数を数える関数（小数点・符号・先頭ゼロは除く）
 * 
 * @param value - 桁数を数えたい文字列（数値を文字列化したもの）
 * @returns number - 実際に入力されている数字の桁数を返す。
 */
function getDigitCount(value:string):number{
// 符号と小数点を桁数に数えないように除去
  let digits = value.replace(".","").replace("-","");
// 先頭のゼロを削除
  digits = digits.replace(/^0+/,"");
 
  return digits.length;
}


/**
 * 現在の入力値に小数点を追加する関数
 * 
 * @param なし
 * @returns なし（void）値を返さない
 */
function onDotClick():void {
  // 次の入力が新しい数値で、かつ小数点から入力する場合は "0." から開始
  if(waitingForNext){
    currentValue = "0.";
    // false：数字を連結して入力中の状態（通常モード）
    waitingForNext = false;
    currentDisplay.textContent = currentValue;
    return;
  }
  // すでに小数点がある場合は何もしない
  if(currentValue.includes("."))return;
  // 現在値が "0" の場合は "0." に更新
  if(currentValue === "0"){
    currentValue = "0.";
  // 0以外の場合は小数点を後ろに追加
  }else{
    currentValue += ".";
  }
  // 現在の値を更新し、ディスプレイに反映
  currentDisplay.textContent = currentValue;
}

/**
 * 現在値が 0 のときに、符号入力用に '-' に設定する関数
 * 
 * @param なし
 * @returns なし（void）-この関数は値を返さない
 */
function handleMinusSign():void{
  // 画面に "0" が表示されている場合
  if (currentValue === "0") {
    //"-" に置き換える。
    currentValue = "-";
    // 現在の値を更新し、ディスプレイに反映
    currentDisplay.textContent = currentValue;
  }
}


/**
 * 演算子ボタンがクリックされたときの処理を行う関数
 * 
 * @param op - クリックされた演算子 ("+", "-", "*", "/")
 * @returns　void - 値は返さず、内部状態と表示を更新。
 */
function onOperatorClick(op: "+" | "-" | "*" | "/"):void{
  // 入力が '-' のみの場合は演算を行わず無視する
  if(currentValue === "-"){
    return; 
  }
  // 左辺の値が未設定で次の数字入力待ちの場合
  if(waitingForNext && leftValue === null){
    // 左の値を確定させる
   leftValue = Number (currentValue);

   // 履歴エリアに左の値と演算子を表示
   historyString = `${currentValue} ${OP_DISPLAY_MAP[op]} `;
   historyDisplay.textContent = historyString;
    // 現在押された演算子を保存
    operator = op;
    // true：次の数字入力で currentValue を置き換える準備ができている状態（置き換えモード）
    waitingForNext = true;
    return;
  }

  // 右の値を入力を待機状態の場合
  if(waitingForNext){ 
    // 履歴エリアの演算子だけを置き換える
    historyString = historyString.replace(
      // 履歴エリアの最後にある演算子（と空白）があれば
      /[+\-×÷]\s*$/,
      OP_DISPLAY_MAP[op] + " "
    );
    // 履歴表示を更新
    historyDisplay.textContent = historyString;
    // 演算子を保存
    operator = op; 
    return; 
  }
  // 左の値と演算子が存在し、右の値が入力済みの場合に計算
  if(operator != null && leftValue !=null && !waitingForNext){
    // 右の値を数値に変換
    const rightValue = Number(currentValue);
    // 計算処理する関数に引数として数字と演算子を渡す。その後に計算結果を受け取り保存。
    const result = calculateExpression(leftValue,rightValue,operator); 
    // 計算結果を左の値に保存
    leftValue = result;
    // 計算結果を画面表示用にフォーマットして currentValue に反映
    currentValue = formatResult(result);
  // まだ計算できない場合、今の入力値を左の値として保存して次に備える
  }else{
    leftValue = Number(currentValue);
  }

  // 履歴エリアに現在値 + 演算子 を追加
  historyString = `${currentValue} ${OP_DISPLAY_MAP[op]} `;
  historyDisplay.textContent = historyString;
  // 新しく押された演算子を保存
  operator = op;
  // true：次の数字入力で currentValue を置き換える準備ができている状態（置き換えモード）
  waitingForNext = true;
 
 // 計算エリアに現在値を表示
 currentDisplay.textContent = currentValue;
}


/**
 * 「符号入力」と「演算子処理」を振り分ける関数
 * 
 * @param op 演算子 ("+", "-", "*", "/")
 * @returns void - 値は返さない。
 */
function handleOperatorButton(op: "+" | "-" | "*" | "/"):void {
  // 現在値が "0" で "-" が押された場合は符号入力
  if (op === "-" && currentValue === "0") {
    handleMinusSign();
  // それ以外は通常の演算子処理を行う
  } else {
    onOperatorClick(op);
  }
}

/**
 * 「=」ボタンがクリックされたときの処理を行う関数
 * 
 * @param なし
 * @returns void - 値は返さず、内部状態と表示を更新する。
 */
function onEqualClick():void {
  // 演算子や左の値がない場合はなにもしない
  if(operator === null || leftValue === null){
    return;
  }
  // 右の値が入力されていない場合はなにもしない
  if(waitingForNext){
    return;
  }
  // 現在の入力値を数値に変換して右の値にする
  const rightValue = Number(currentValue);

  // 履歴エリアに「[左の値] [演算子] [右の値] [=]」の式を表示
  historyDisplay.textContent = `${leftValue} ${OP_DISPLAY_MAP[operator!]} ${currentValue} =`;

  // 0除算チェック
  if(checkDivisionByZero(operator, rightValue)){
    // エラーなら計算終了
    return; 
    }


  // 計算処理する関数に引数として数字と演算子を渡す。その後に計算結果を受け取り保存。
  const result = calculateExpression(leftValue, rightValue, operator);
  

  // 計算結果を画面表示用にフォーマットして currentValue に反映
  currentValue = formatResult(result);
  // 計算エリアに現在値を表示
  currentDisplay.textContent = currentValue;
  // 左の値をリセット
  leftValue = null;
  // 演算子をリセット
  operator = null;
  // true：次の数字入力で currentValue を置き換える準備ができている状態（置き換えモード）
  waitingForNext = true;

}


/**
 *0除算を検出し、エラーが発生した場合は計算を停止し、エラーメッセージを表示する関数
 *
 * @param operator - 現在選択されている演算子。"/" の場合のみ0除算をチェック。
 * @param rightValue - 右の値。0除算が発生するかどうかを判断するために使用。
 * @returns boolean - 0除算が発生した場合は `true` を返し、エラー処理を行う。エラーがなければ `false` を返す。
 */
function checkDivisionByZero(operator: string | null, rightValue: number): boolean {
  // 演算子が '/' かつ右辺が 0 の場合、0除算として処理
  if(operator === "/" && rightValue === 0){
    // 計算画面に「エラー」と表示
    currentDisplay.textContent = "エラー";
    // 入力値を初期化
    currentValue = "0";
    // 左の値をリセット
    leftValue = null;
    // 演算子をリセット
    operator = null;
    // false：数字を連結して入力中の状態（通常モード）
    waitingForNext = false;
    // 開発者向けに0除算エラーを通知
    console.error("0除算を検出した為、エラーが発生しました。");
    // エラー発生の場合
    return true; 
  }
  // エラーなし
  return false; 
}

/**
 * 計算結果を表示用に整形する関数
 * 
 * @param value - 整形したい計算結果の数値
 * @returns string - 計算結果を画面に表示するための文字列
 */
function formatResult(value: number): string {
  // 数値を文字列に変換。（-の符号と小数点は桁数に含めない）
  const digits = value.toString().replace(".", "").replace("-", "");
  // ８桁を超えている場合
  if (digits.length > 8) {
    // 指数表記にする
    return value.toExponential(7);
  }
  // 8桁未満の場合、そのまま文字列として返す
  return value.toString();
}

/**
 * 2つの数値と演算子を受け取り、計算結果を返す関数
 * 
 * @param a - 左辺の数値
 * @param b - 右辺の数値
 * @param op - 演算子 ("+", "-", "*", "/")
 * @returns number - 計算結果の数値。無効な演算子の場合は `NaN` を返す。
 */
function calculateExpression(a:number,b:number,op:"+" | "-" | "*" | "/"):number{
  let result: number;

  switch(op){
    // 加算
    case "+":
      result = a + b;
      break;
    // 減算
    case "-":
      result = a - b;
      break;
    // 乗算
    case "*":
      result = a * b;
      break;
    // 除算
    case "/":
      result =  a / b;
      break;
    // サポートされていない演算子が渡された場合  
    default:
      console.error(`存在しない演算子です: ${op}`);
      return NaN;
  }
  return result;
}

/**
 * 「C（クリア）」ボタンが押されたときに呼ばれる関数
 * 
 * @param なし
 * @returns void - 値は返さず、内部状態と表示をリセット。
 */
function onClear():void{
  // 現在の値を "0" にリセット
  currentValue = "0";
  // 履歴を保持する文字列をリセット
  historyString = "";

  // 画面上の表示を更新（現在の値が "0"）
  currentDisplay.textContent = currentValue
  // 履歴表示エリアを更新（履歴をクリア）
  historyDisplay.textContent = "";

  // 左の値をリセット
  leftValue = null;
  // 演算子をリセット
  operator = null;
  // false：数字を連結して入力中の状態（通常モード）
  waitingForNext = false;
}
