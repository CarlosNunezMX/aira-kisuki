export function strEncodeUTF16(str: string) {
    var arr = []
    for (var i = 0; i < str.length; i++) {
      arr[i] = str.charCodeAt(i)
    }
    return arr
  }
  