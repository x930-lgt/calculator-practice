/**
 * 2つの数値と演算子を受け取り、計算結果を返す関数
 * 
 * @param a - 左辺の数値
 * @param b - 右辺の数値
 * @param op - 演算子 ("+", "-", "*", "/")
 * @returns number - 計算結果の数値。無効な演算子の場合は `NaN` を返します。
 */
export function calculateExpression(a:number,b:number,op:"+" | "-" | "*" | "/"):number{
    let result: number;
  
    switch(op){
      //加算
      case "+":
        result = a + b;
        break;
      //減算
      case "-":
        result = a - b;
        break;
      //乗算
      case "*":
        result = a * b;
        break;
      //除算
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
 *0除算を検出し、エラーが発生した場合は計算を停止し、エラーメッセージを表示する関数
 *
 * @param operator - 現在選択されている演算子。"/" の場合のみ0除算をチェック。
 * @param rightValue - 右の値。0除算が発生するかどうかを判断するために使用。
 * @returns boolean - 0除算が発生した場合は `true` を返し、エラー処理を行う。エラーがなければ `false` を返す。
 */
  export function checkDivisionByZero(operator: string | null, rightValue: number): boolean {
    //0除算かどうかを判定
    if(operator === "/" && rightValue === 0){
     
      //開発者向けに0除算エラーを通知
      console.error("0除算を検出した為、エラーが発生しました。");
      // エラー発生の場合
      return true; 
    }
    // エラーなし
    return false; 
  }