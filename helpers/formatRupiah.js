function formatRupiah(salary){
    return new Intl.NumberFormat('id-ID',{style:"currency",currency: "IDR"}).format(
        salary
    )
}
module.exports = formatRupiah