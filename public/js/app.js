


$(document).ready(function () {
    $(document).on("click", ".purchase-button", purchaseItem)

    var products = []

    // display products on site immediatelywhen page loads

    getProducts();

    // when purchase button is clicked - check if item is out of stock or not
    
    function purchaseItem(event) {
        event.preventDefault()
        var id = $(this).attr("data-id")
        var qty = $(`.qty[data-id="${id}"]`).val()
        $.get("/api/products/" + id, function (data) {
            const product = data; 
            if (qty <= parseInt(product.stock)) {

                showModal("If you are sure you would like to make this purchase please press confirm.", product.name, `$${product.price}.99`)
                updateStock(product, qty)
            }
            else if (qty >= parseInt(product.stock)) {
                showModal("We are sorry, that item is sold out.", product.name, "")
            }
        })
    }

    // create modal function

    function updateStock(product, qty, id) {
        newQty = product.stock -= qty;
        $.ajax({
            method: "PUT",
            url: "/api/products/" + product.id,
            data: {stock: newQty}
        })
    }

    // show modal when product is selected for purchase

    function showModal(message, name, price) {
        var modal = ` <div id="purchaseModal" class="modal fade" role="dialog">
        <div class="modal-dialog">

            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    <h3 class="modal-title">
                       ${message}
                    </h3>
                </div>
                <div class="modal-body img-responsive">
                    <h4 id="match-name">${name}</h4>
                    <h5 id="match-name">${price}</h5>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal" id="confirm">Confirm</button>
                </div>
            </div>

        </div>
    </div>`
        $(modal).modal("toggle");
    }

    function getProducts() {
        $.get("/api/products", function (data) {
            products = data;
            createCard(products)
        })
    }

    // create card from each product in db

    function createCard(items) {
        for (let i = 0; i < items.length; i++) {

            const productCard =
                `<div class="col-lg-4">
                <div class="card">
                    <div class="card-header" id="product-name-${i}">
                        ${items[i].name}
                    </div>
                    <div class="card-body">
                    <img src="${items[i].imgUrl}" alt="Product Image">
                        <div class="form-group">
                            <form>
                                <label for="qty" class="col-sm-4 col-form-label" id="price-${i}"> $${items[i].price}.99</label>
                                <div class="col-sm-4">
                                    <input type="number" class="form-control qty" data-stock="" placeholder="Qty" data-id="${items[i].id}">
                                    <button type="button" class="btn btn-primary btn-defult purchase-button" data-id="${items[i].id}">Purchase</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>`
            $(".row").append(productCard)
        }
    }
})



