document.addEventListener('DOMContentLoaded', () => {
	let productId;
	let deleteForm = document.forms['delete-form'];

	$('#delete-modal').on('show.bs.modal', function (event) {
		let buttonDelete = $(event.relatedTarget);
		productId = buttonDelete.data('id');
	});

	$('#btn-delete-product').click(function () {
		deleteForm.action = '/admin/products/' + productId + '?_method=DELETE';
		deleteForm.submit();
	});

	$('#input-filter').on('keyup', function () {
		let value = $(this).val();
		console.log(value);
		// try {
		// 	const res = await fetch(`/admin/products?search=${value}`, {
		// 		method: 'GET',
		// 		headers: { 'Content-Type': 'application/json' },
		// 	});
		// 	const data = await res.json();
		// 	console.log(data);
		// } catch (error) {
		// 	console.log(error);
		// }
	});

	$('#select-dropdown').on('change', async function () {
		let value = this.value;
		// try {
		// 	const res = await fetch(`/admin/products?page=${value}`, {
		// 		method: 'GET',
		// 		headers: { 'Content-Type': 'application/json' },
		// 	});
		// 	const data = await res.json();
		// 	console.log(data);
		// } catch (error) {
		// 	console.log(error);
		// }
	});
});
