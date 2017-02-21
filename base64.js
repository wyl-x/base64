function toBase64(string) {

    return (function(str) {
        var change = 0
        var bin = str.replace(/./g, toBinary)
        if (bin.length / 8 % 3 == 1) {
            bin = bin + '0000000000000000'
            change = 2
        }
        if (bin.length / 8 % 3 == 2) {
            bin = bin + '00000000'
            change = 1
        }
        result = bin.replace(/.{6}/g, to64)
        if (change == 1) {
            return result.replace(/.$/, '=')
        }
        if (change == 2) {
            return result.replace(/..$/, '==')
        }
        return result
    })(string)

    function toBinary(match) {
        var b = match.charCodeAt(0).toString(2)
        if (b.length < 8) {
            var len = b.length
            for (var i = 0; i < 8 - len; i++) {
                b = '0' + b
            }
        }
        return b
    }

    function to64(match) {
        var baseCode = parseInt(match, 2)
        if (baseCode >= 0 && baseCode <= 25) {
            return String.fromCharCode(baseCode + 65)
        } else if (baseCode <= 51) {
            return String.fromCharCode(baseCode + 71)
        } else if (baseCode <= 61) {
            return String.fromCharCode(baseCode - 4)
        } else if (baseCode == 62) {
            return '+'
        } else if (baseCode == 63) {
            return '/'
        }
    }

}
