const formatRupiah = (amount) => {
	return new Intl.NumberFormat("id-ID", {
		style: "currency",
		currency: "IDR",
	}).format(amount);
};

const formatDate = (date) => {
	date = date.toISOString().split("T")[0];
	return date;
};

module.exports = { formatDate, formatRupiah };
