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
		let keyword = $(this).val() || '';
		if(keyword !== '') {
      $.ajax({
        url: `/api/products?search=${keyword}`,
        type: 'GET',
      })
        .then((data) => {
          $('#tbody-products').html('');
          for (let i = 0; i < data.length; i++) {
            const ele = data[i];

            let item = $(`
              <tr>
                <td>${ele._id}</td>
                <td>${ele.name}</td>
                <td><img
                    style='border: 1px solid grey'
                    src='${ele.thumbnail}'
                    alt='${ele.name}'
                    width='100'
                  /></td>
                <td>${ele.shortDescription}</td>

                <td>${ele.categoryId}</td>

                <td class='text-right'>$ ${ele.salePrice}</td>
                <td class='text-right'>$ ${ele.originalPrice}</td>
                <td class='text-center'>
                  <img
                    class='mb-8'
                    style='border: 1px solid grey;'
                    src='${ele.images[0]}'
                    width='100'
                  />
                  <img style='border: 1px solid grey' src='${ele.images[1]}' width='100' />
                </td>
                <td class='text-center'>
                  <a
                    style='justify-content: center;'
                    class='btn btn-outline btn-success btn-xs mb-1'
                    href='products/${this._id}'
                  >Edit</a>
                  <a
                    class='btn btn-danger'
                    data-toggle='modal'
                    data-target='#delete-modal'
                    data-id=${this._id}
                  >
                    Delete
                  </a>
                </td>
              </tr>
            `);

            $('#tbody-products').append(item);
          }
        })
        .catch((err) => console.log(err));
    } else {
      loadPage(1);
    }
	});
});

$('.pagination .page-click').click(function (e) {
	$('.pagination .page-click.active').removeClass('active');
	$(this).addClass('active');
	e.preventDefault();
});

$('.pagination .next-page').click(function (e) {
	$('.pagination .page-click.active').next().addClass('active');
	$('.pagination .page-click.active').prev().removeClass('active');
	e.preventDefault();
});

$('.pagination .prev-page').click(function (e) {
	$('.pagination .page-click.active').prev().addClass('active');
	$('.pagination .page-click.active').next().removeClass('active');
	e.preventDefault();
});

$('#select-dropdown').on('change', async function () {
	let limit = this.value || 10;
	$.ajax({
		url: `/api/products?filter={"offset":0,"limit":${limit}, "page": 1}`,
		type: 'GET',
	})
		.then((data) => {
			$('#tbody-products').html('');
			for (let i = 0; i < data.length; i++) {
				const ele = data[i];

				let item = $(`
          <tr>
            <td>${ele._id}</td>
            <td>${ele.name}</td>
            <td><img
                style='border: 1px solid grey'
                src='${ele.thumbnail}'
                alt='${ele.name}'
                width='100'
              /></td>
            <td>${ele.shortDescription}</td>

            <td>${ele.categoryId}</td>

            <td class='text-right'>$ ${ele.salePrice}</td>
            <td class='text-right'>$ ${ele.originalPrice}</td>
            <td class='text-center'>
              <img
                class='mb-8'
                style='border: 1px solid grey;'
                src='${ele.images[0]}'
                width='100'
              />
              <img style='border: 1px solid grey' src='${ele.images[1]}' width='100' />
            </td>
            <td class='text-center'>
              <a
                style='justify-content: center;'
                class='btn btn-outline btn-success btn-xs mb-1'
                href='products/${this._id}'
              >Edit</a>
              <a
                class='btn btn-danger'
                data-toggle='modal'
                data-target='#delete-modal'
                data-id=${this._id}
              >
                Delete
              </a>
            </td>
          </tr>
        `);

				$('#tbody-products').append(item);
			}
		})
		.catch((err) => console.log(err));
});

let currentPage = 1;

function loadPage(page) {
	currentPage = page;
	let limit = 10;
	let skip = (page - 1) * limit || 0;

	if (currentPage === 1) {
		$('.pagination .page-item').first().addClass('disabled');
	} else {
		$('.pagination .page-item').first().removeClass('disabled');
	}

	$.ajax({
		url: `/api/products?filter={"offset":${skip},"limit":${limit}, "page": ${currentPage}}`,
		type: 'GET',
	})
		.then((data) => {
			$('#tbody-products').html('');
			for (let i = 0; i < data.length; i++) {
				const ele = data[i];

				let item = $(`
          <tr>
            <td>${ele._id}</td>
            <td>${ele.name}</td>
            <td><img
                style='border: 1px solid grey'
                src='${ele.thumbnail}'
                alt='${ele.name}'
                width='100'
              /></td>
            <td>${ele.shortDescription}</td>

            <td>${ele.categoryId}</td>

            <td class='text-right'>$ ${ele.salePrice}</td>
            <td class='text-right'>$ ${ele.originalPrice}</td>
            <td class='text-center'>
              <img
                class='mb-8'
                style='border: 1px solid grey;'
                src='${ele.images[0]}'
                width='100'
              />
              <img style='border: 1px solid grey' src='${ele.images[1]}' width='100' />
            </td>
            <td class='text-center'>
              <a
                style='justify-content: center;'
                class='btn btn-outline btn-success btn-xs mb-1'
                href='products/${ele._id}'
              >Edit</a>
              <a
                class='btn btn-danger'
                data-toggle='modal'
                data-target='#delete-modal'
                data-id=${ele._id}
              >
                Delete
              </a>
            </td>
          </tr>
        `);

				$('#tbody-products').append(item);
			}
		})
		.catch((err) => console.log(err));
}

function nextPage() {
	currentPage++;
	loadPage(currentPage);
}

function previousPage() {
	currentPage--;
	loadPage(currentPage);
}

// $.ajax({
// 	url: `/api/products`,
// 	type: 'GET',
// })
// 	.then((data) => {
// 		$('#dataTables-example_info').html('');
//     let totalData = data.total;

//     let statistic = $(`
//       Showing 0 to
//       {{products.length}}
//       of ${totalData} entries
//     `)

//     $('#dataTables-example_info').append(statistic);
// 	})
// 	.catch((err) => console.log(err));
