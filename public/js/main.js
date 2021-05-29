$(document).ready(() => {
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
});

