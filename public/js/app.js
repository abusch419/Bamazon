


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

                showModal("You made a purchase! Get ready to start rockin!", product.name, `$${product.price}.99`)
                updateStock(product, qty)
            }
            else if (qty >= parseInt(product.stock)) {
                showModal("We are sorry, that item is sold out.", product.name, "")
            }
        })
    }

    // create modal function to show that product was purchased

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
                    <button type="button" class="btn btn-default" data-dismiss="modal" id="confirm">Close</button>
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
                `<div class="col-lg-4 card">
                <div>
                    <div class="card-header" id="product-name-${i}">
                        ${items[i].name}
                    </div>
                    <div class="card-body">
                    <img id="product-image" src="${items[i].imgUrl}" alt="Product Image">
                        
                        </div>
                        <div class="form-group">
                            <form class="form-row">
                                    <label for="qty" class="col-sm-6 col-xs-12 col-form-label price-label" id="price-${i}"> $${items[i].price}.99</label>
                                    <input type="number" class="form-control col-sm-6 col-xs-12 qty" data-stock="" placeholder="Qty" data-id="${items[i].id}">
                                    <button type="button" class="btn btn-primary btn-defult col-sm-12 col-xs-12 purchase-button" data-id="${items[i].id}">Purchase</button>
                            </form>
                    </div>
                </div>
            </div>`
            $(".card-row").append(productCard)
        }
    }
})



