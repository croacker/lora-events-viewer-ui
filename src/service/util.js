const util = {
  formatFloat: function (number, fixed) {
    if (!fixed) {
      fixed = 2
    }
    number = this.parseStringToFloat(number)
    if (!isNaN(number)) {
      return number.toFixed(fixed)
    }
    return ''
  },
  someIsNullOrEmpty: function (stringArray) {
    if (stringArray && stringArray.length) {
      const res = stringArray.some((str) => {
        return this.stringIsNullOrEmpty(str)
      })

      return res
    }

    return false
  },
  stringIsNullOrEmpty: function (str) {
    return !(str && str.length)
  },
  stringTrimEnd: function (str, char) {
    if (!this.stringIsNullOrEmpty(str)) {
      if (str.endsWith(char)) {
        str = str.slice(0, -1)
      }
    }
    return str
  },
  stringTrimStart: function (str, char) {
    if (!this.stringIsNullOrEmpty(str)) {
      if (str.startsWith(char)) {
        str = str.substr(1)
      }
    }
    return str
  },
  stringTrim: function (str, char) {
    str = this.stringTrimEnd(str, char)
    str = this.stringTrimStart(str, char)
    return str
  },
  parseStringToFloat: function (value) {
    if (typeof (value) === 'number') {
      return value
    }

    if (!this.stringIsNullOrEmpty(value)) {
      try {
        return parseFloat(value)
      } catch (err) {
        throw new RangeError(value)
      }
    } else {
      return NaN
    }
  },
  async fileToBase64(file, readAs) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => {
        resolve(reader.result)
      }

      reader.onerror = (e) => {
        reject(e)
      }

      if (!readAs) {
        readAs = 'DataURL'
      }
      if (readAs === 'DataURL') {
        reader.readAsDataURL(file)
      } else if (readAs === 'BinaryString') {
        reader.readAsBinaryString(file)
      } else {
        throw new Error('UnSupported')
      }
    })
  },
  openDocument(href) {
    const win = window.open()
    win.document.write('<iframe src="' + href + '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>')
  }
}

export {
  util
}
