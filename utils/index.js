const formatNumberJapan = (number, no) => {
    if ((typeof number) === 'number') {
        if (no > 0) {
            return number.toFixed(no).replace(/\d(?=(\d{3})+\.)/g, '$&,')
        } else {
            if (number > 0) {
                return Math.round(number).toString().split(/(?=(?:\d{3})+(?:\.|$))/g).join(',')
            } else {
                return Math.round(number).toString().replace(/(\d{1,2}?)((\d{3})+)$/, '$1,$2')
            }
        }
    } else {
        return number
    }
}

export  {
    formatNumberJapan
}
