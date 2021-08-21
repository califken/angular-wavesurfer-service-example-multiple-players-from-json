import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  maxTop = 9;
  varianceDown = 5;
  colorsList = [
    'rgba(255,0,0,.' +
      (this.maxTop - this.randomNumber(this.varianceDown)) +
      ')',
    'rgba(255,0,97,.' +
      (this.maxTop - this.randomNumber(this.varianceDown)) +
      ')',
    'rgba(255,0,157,.' +
      (this.maxTop - this.randomNumber(this.varianceDown)) +
      ')',
    'rgba(113,0,255,.' +
      (this.maxTop - this.randomNumber(this.varianceDown)) +
      ')',
    'rgba(0,20,255,.' +
      (this.maxTop - this.randomNumber(this.varianceDown)) +
      ')',
    'rgba(0,255,255,.' +
      (this.maxTop - this.randomNumber(this.varianceDown)) +
      ')',
    'rgba(59,255,55,.' +
      (this.maxTop - this.randomNumber(this.varianceDown)) +
      ')',
    'rgba(239,255,0,.' +
      (this.maxTop - this.randomNumber(this.varianceDown)) +
      ')',
    'rgba(255,87,0,.' +
      (this.maxTop - this.randomNumber(this.varianceDown)) +
      ')'
  ];

  constructor() {}

  public generateUUID() {
    var alphaPart = this.timestampToAlpha();

    var firstPart = (Math.random() * 46656) | 0;
    var secondPart = (Math.random() * 46656) | 0;
    var firstPartx = ('000' + firstPart.toString(36)).slice(-3);
    var secondPartx = ('000' + secondPart.toString(36)).slice(-3);
    return alphaPart + firstPartx + secondPartx;
  }

  digitToAlpha(digit) {
    return 'QRSTUVWXYZ'.charAt(digit);
  }
  timestampToAlpha() {
    let ts = Date.now();
    let tsstr = ts.toString();
    let alphaStr = '';
    for (var i = 0; i < tsstr.length; i++) {
      alphaStr += this.digitToAlpha(tsstr.charAt(i));
    }
    return alphaStr;
  }
  randomRGBAColor() {
    return `rgba(${this.randomNumber(255)}, ${this.randomNumber(
      255
    )}, ${this.randomNumber(255)}, ${this.randomNumber(1)})`;
  }

  randomNumber(max: number) {
    return Math.floor(Math.random() * max);
  }

  public colorByNumber(numberColors: number, thisNumberStr: string) {
    let thisNumber = parseInt(thisNumberStr);
    // let thisindex =
    //   numberColors * Math.ceil(thisNumber / numberColors) - thisNumber;
    let thisindex = this.randomNumber(9) - 1;
    return this.colorsList[thisindex];
  }
}
